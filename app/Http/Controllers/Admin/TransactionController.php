<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Livewire\CheckBill;
use Illuminate\Http\Request;
use App\Models\TaxRate;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\PlnCustomer;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Midtrans\Config;
use Midtrans\CoreApi;
use Midtrans\Transaction as MidtransTransaction;

class TransactionController extends Controller
{

    public function __construct()
    {
        //Konfigurasi Midtrans
        Config::$serverKey = config("midtrans.serverKey");
        Config::$isProduction = config("midtrans.isProduction");
        Config::$isSanitized = config("midtrans.isSanitized");
        Config::$is3ds = config("midtrans.is3ds");
    }
    /**
     * Method untuk menampilkan halaman pembayaran
     */
    public function index(Request $request, Payment $payment)
    {
        $paymentMethods = PaymentMethod::all();
        if($payment->status === "success"){
            return redirect()->back()->with("success", "Tagihan sudah terbayar");
        }

        $paymentMethods = PaymentMethod::all();
        return view("pages.pelanggan.payments.index", compact("payment", "paymentMethods"));
    }

    /**
     * Method untuk mengecek tagihan dan menghitung total pembayaran suatu tagihan
     */
    public function create(Request $request, $nomorMeter = null)
    {
        $nomorMeter = $request->nomor_meter ?? $nomorMeter;
        $plnCustomer = PlnCustomer::with('usages')
                                  ->has('usages')
                                  ->where("nomor_meter", $nomorMeter)
                                  ->firstOrFail();
        
        //ambil penggunaan listrik tahun ini yang memiliki tagihan yang belum lunas 
        //dan belum pernah dibayar
        $usages = $plnCustomer->usages()
                              ->whereHas('bill', function(Builder $query){
                                $query->where('status', 'BELUM LUNAS')
                                      ->whereDoesntHave('paymentDetail.payment', function(Builder $query){
                                        $query->where('status', 'success');
                                      });
                              })
                              ->where("tahun", now()->year)
                              ->where("bulan", "<=", now()->month)
                              ->get();
        
        //jika tidak ada penggunaan yang dimaksud di atas, itu berarti tagihan 
        //dari penggunaan listrik tersebut sudah dibayar
        if($usages->isEmpty()) {
            return redirect()->back()->with("success", "Tagihan sudah terbayar");
        }
        //Cek PPJ berdasarkan daerah pelanggan
        $totalPayment = 0;
        $ppj = TaxRate::where('tax_type_id', 1)                             //tipe tax dengan id 1 adalah ppj
                      ->where('indonesia_city_id', $plnCustomer->city->id)
                      ->first()->rate;
        $data = [];
        foreach ($usages as $index => $usage) {
            $data[$index]['biaya_listrik'] = ($usage->bill->jumlah_kwh * $usage->plnCustomer->tariff->tarif_per_kwh);
            $data[$index]['ppj']  = ($ppj/100 * $data[$index]['biaya_listrik']);
            $data[$index]['total_tagihan'] = $data[$index]['biaya_listrik'] + $data[$index]['ppj'];

            //Kalau batas daya listrik pelanggan lebih dari 2200 watt maka kenakan pajak 10%
            $data[$index]['ppn'] = 0.0;
            if($plnCustomer->tariff->daya > 2200){
                $data[$index]['ppn'] = (10/100 * $data[$index]['biaya_listrik']);
                $data[$index]['total_tagihan'] += $data[$index]['ppn'];
            }

            //Cek denda
            $checkbill = new CheckBill;
            $data[$index]['denda'] = $checkbill->checkFine($usage, $plnCustomer, $data[$index]['biaya_listrik']);
            $data[$index]['total_tagihan'] += $data[$index]['denda'];
        }
        
        $totalPayment = collect($data)->sum('total_tagihan') + config('const.biaya_admin');

        $payment = $this->createPayment($usages, $totalPayment, $plnCustomer, $data);
        return $this->checkPayment($payment);
    }

    /**
     * Method ini digunakan untuk membuat data pembayaran
     */
    public function createPayment($usages, $totalPayment, $plnCustomer, $data)
    {
        $waktuSaatIni = now()->format("Y-m-d H:i:s");

        DB::beginTransaction();
        try {
            //Jika ada pembayaran tagihan yang sama maka update tanggal bayarnya saja.
            //Jika tidak ada maka buat pembayaran baru.
            $payment = Payment::updateOrCreate(
                [
                    "id_pelanggan_pln" => $plnCustomer->id,
                    "biaya_admin" => config('const.biaya_admin'),
                    "total_bayar" => $totalPayment,
                    "id_bank" => null,     //id bank diisi pada saat bank memverifikasi dan validasi
                    "status" => "pending"  //Pending = menunggu pembayaran
                ], 
                [
                    "id_customer" => auth()->id(),
                    "tanggal_bayar" => $waktuSaatIni
                ]
            );

            foreach($usages as $index => $usage){
                $payment->details()->updateOrCreate([
                    "id_tagihan" => $usage->bill->id,
                    "denda" => $data[$index]['denda'],
                    "ppn" => $data[$index]['ppn'],
                    "ppj" => $data[$index]['ppj'],
                    "total_tagihan" => $data[$index]['total_tagihan']
                ], ["updated_at" => $waktuSaatIni]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        
        return $payment;
    }

    /**
     * Method ini digunakan untuk mengecek pembayaran tertentu melalui Midtrans,
     * apabila data transaksi tertentu telah tercatat di Midtrans dan memiliki
     * status pending, maka pelanggan akan diarahkan ke halaman konfirmasi pembayaran
     * untuk melanjutkan transaksinya. Tetapi apabila data transaksi tertentu
     * belum tercatat di Midtrans, maka asumsinya data transaksi tersebut belum ada, 
     * maka pelanggan akan diarahkan ke halaman konfirmasi pembayaran untuk melakukan pembayaran.
     */
    public function checkPayment($payment)
    {
        try {
            $response = MidtransTransaction::status("PLN-".$payment->id);

            if($response->transaction_status == "pending") {
                $paymentMethod = null;

                if($response->payment_type == "echannel"){
                    $paymentMethod = PaymentMethod::firstWhere("nama", "like", "VA Mandiri");
                } else {
                    $paymentMethod = PaymentMethod::firstWhere("nama", "like", "%".$response->va_numbers[0]->bank."%");
                }

                return redirect()->route("payment.confirm", [
                    "payment_method" => $paymentMethod->slug, 
                    "payment" => $payment->id
                ]);
            } elseif($response->transaction_status == "settlement" && $payment->status == "success") {
                return redirect()->route('home')->with('success', "Tagihan sudah terbayar");
            } elseif($response->transaction_status == "settlement" && $payment->status == "pending") {

                return redirect()->route('transaction-history')->with('warning', 'Tagihan Anda Belum Terkonfirmasi. Silakan upload bukti pembayaran.');
            }

        } catch (Exception $ex) {
            if($ex->getCode() === 404){
                return redirect()->route("payment.index", $payment->id);
            }
            echo $ex->getMessage();exit;
        }
    }

    /**
     * Method ini digunakan untuk membuat data transaksi di Midtrans, 
     * setelah pelanggan memilih metode pembayaran.
     */
    public function process(Request $request, PaymentMethod $paymentMethod, Payment $payment)
    {
        $payment->paymentMethod()->associate($paymentMethod->id)->save();
    
        $midtransParams = [
            "payment_type" => "bank_transfer",
            "transaction_details" => [
                "order_id" => "PLN-" . $payment->id,
                "gross_amount" => (int)$payment->total_bayar,
            ],
            "customer_details" => [
                "email" => $payment->customer->email,
                "first_name" => $payment->customer->nama,
            ],
        ];

        $methodName = strtolower($paymentMethod->nama);

        //buat metode pembayarannya
        switch ($methodName) {
            case $methodName == "va bca":
                $midtransParams["bank_transfer"]["bank"] = "bca";
                break;
            case $methodName == "va mandiri":
                $midtransParams["payment_type"] = "echannel";
                $midtransParams["echannel"]["bill_info1"] = "Pembayaran untuk:";
                $midtransParams["echannel"]["bill_info2"] = "listrik pascabayar";
                $midtransParams["echannel"]["bill_info3"] = "Nama:";
                $midtransParams["echannel"]["bill_info4"] = $payment->customer->nama;
                $midtransParams["echannel"]["bill_info5"] = "tanggal";
                $midtransParams["echannel"]["bill_info6"] = $payment->tanggal_bayar->format("d-m-Y H:i:s");
                $midtransParams["echannel"]["bill_info7"] = "ID:";
                $midtransParams["echannel"]["bill_info8"] = $payment->id;
                break;
            case $methodName == "va bni":
                $midtransParams["bank_transfer"]["bank"] = "bni";
                break;
        }
        
        try {
            $response = CoreApi::charge($midtransParams);
            
            return redirect()->route("payment.confirm", [
                "payment_method" => $paymentMethod->slug, 
                "payment" => $payment->id
            ]);
        } catch (Exception $ex) {
            //kode 406, berarti transaksi sudah tercatat di midtrans atau transaksi duplikat.
            //oleh karena itu perlu dikonfirmasi terlebih dahulu
            if($ex->getCode() === 406){
                return $this->confirm(request(), $paymentMethod, $payment);
            }
            echo $ex->getMessage();
            exit;
        }
    }

    /**
     * menampilkan halaman konfirmasi pembayaran setelah transaksi di charge
     */
    public function confirm(Request $request, PaymentMethod $paymentMethod, Payment $payment){
        $response = MidtransTransaction::status("PLN-".$payment->id);
        $totalBill = $payment->details()->sum('total_tagihan');

        if($response->transaction_status == "pending") {
            $vaNumber = isset($response->va_numbers) ? 
                        $response->va_numbers[0]->va_number : 
                        $response->bill_key;

            return view(
                "pages.pelanggan.payments.confirm", 
                compact(
                    "paymentMethod", 
                    "response", 
                    "payment", 
                    "totalBill", 
                    "vaNumber",
                )
            );
        } elseif ($response->transaction_status == "expire") {
            return view('pages.pelanggan.payments.expire');
        }
        
        return redirect()->route('home')->with("success", "Tagihan sudah terbayar");
    }

    /**
     * mengubah metode pembayaran
     */
    public function changePaymentMethod(Payment $payment)
    {
        $payment->update(['status' => 'cancel']);
        $nomorMeter = $payment->plnCustomer->nomor_meter;

        try {
            MidtransTransaction::cancel('PLN-'.$payment->id);
        } catch (Exception $ex) {
            //Kode 412, terjadi ketika transaksi yang sebelumnya sudah pernah di cancel, kemudian di cancel lagi.
            //ini bisa terjadi ketika user mencoba untuk merefresh halaman web, sehingga request terkirim ulang.
            //Sebenarnya kasus ini sangat jarang terjadi, tapi hanya untuk antisipasi.
            if($ex->getCode() === 412) {
                return $this->create(request(), $nomorMeter);
            }
            echo $ex->getMessage();exit;
        }

        return $this->create(request(), $nomorMeter);
    }
    
    /**
     * Untuk menangani upload bukti pembayaran, untuk konfirmasi pembayaran.
     */
    public function uploadProofOfPayment(Request $request, Payment $payment)
    {
        $transaction = MidtransTransaction::status("PLN-".$payment->id);
        return view('pages.pelanggan.payment-confirmation', compact('payment', 'transaction'));
    }
    
    /**
     * menampilkan halaman riwayat transaksi pelanggan.
     */
    public function transactionHistory(Request $request)
    {
        return view("pages.pelanggan.transaction-history");
    }
}
