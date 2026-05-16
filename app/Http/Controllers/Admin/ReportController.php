<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Carbon\Carbon;
use App\Http\Requests\Admin\ReportRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;
use PDF;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Reports');
    }

    public function printPaymentReports(ReportRequest $request)
    {
        abort_if(Gate::denies('report_create'), Response::HTTP_FORBIDDEN, 'Forbidden');
        //jika laporannya per tanggal
        if($request->action == 'print_per_date') {
            $rentangTanggal = [
                Carbon::parse($request->print_per_date['tanggal_awal']),
                Carbon::parse($request->print_per_date['tanggal_akhir'])
            ];
            $payments = Payment::whereBetween('tanggal_bayar', $rentangTanggal)
                                ->orderBy('tanggal_bayar');
            $payments = ($request->status != '*') ? 
                            $payments->where('status', $request->status)->get() : 
                            $payments->get();
            //Buat laporan pembayaran
            $pdf = PDF::loadView('pages.admin.report-payments', compact('payments', 'request'))->setPaper('a4', 'landscape');
            return $pdf->stream();
        } else if ($request->action == 'today_report') {
            $payments = Payment::whereDate('tanggal_bayar', now())
                                ->when(auth()->user()->isBank(), function($query) {
                                    return 
                                    $query->whereHas('paymentMethod', function(Builder $query){
                                        $bankName = explode(" ", auth()->user()->username);
                                        $query->where('nama', 'like' ,'%'.$bankName[1].'%');
                                    });
                                })
                                ->orderBy('tanggal_bayar');
            $payments = ($request->status != '*') ? 
                            $payments->where('status', $request->status)->get() : 
                            $payments->get();
            //Buat laporan pembayaran
            $pdf = PDF::loadView('pages.admin.report-payments', compact('payments', 'request'))->setPaper('a4', 'landscape');
            return $pdf->stream();
        } else if($request->action == 'this_month_report') {
            $payments = Payment::whereMonth('tanggal_bayar', now()->month)
                                ->when(auth()->user()->isBank(), function($query) {
                                    return 
                                    $query->whereHas('paymentMethod', function(Builder $query){
                                        $bankName = explode(" ", auth()->user()->username);
                                        $query->where('nama', 'like' ,'%'.$bankName[1].'%');
                                    });
                                })
                                ->orderBy('tanggal_bayar');
            $payments = ($request->status != '*') ? 
                            $payments->where('status', $request->status)->get() : 
                            $payments->get();
            //Buat laporan pembayaran
            $pdf = PDF::loadView('pages.admin.report-payments', compact('payments', 'request'))->setPaper('a4', 'landscape');
            return $pdf->stream();
        } else {
            $payments = Payment::whereMonth('tanggal_bayar', now()->subMonth()->month)
                                ->when(auth()->user()->isBank(), function($query) {
                                    return 
                                    $query->whereHas('paymentMethod', function(Builder $query){
                                        $bankName = explode(" ", auth()->user()->username);
                                        $query->where('nama', 'like' ,'%'.$bankName[1].'%');
                                    });
                                })
                                ->orderBy('tanggal_bayar');
            $payments = ($request->status != '*') ? 
                            $payments->where('status', $request->status)->get() : 
                            $payments->get();
            //Buat laporan pembayaran
            $pdf = PDF::loadView('pages.admin.report-payments', compact('payments', 'request'))->setPaper('a4', 'landscape');
            return $pdf->stream();
        }  
    }
}
