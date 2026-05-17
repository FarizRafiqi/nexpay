<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Payment;
use App\Services\NotificationService;

class PaymentObserver
{
    public function created(Payment $payment)
    {
    }

    public function updated(Payment $payment)
    {
        if($payment->status == "success"){
            foreach ($payment->details as $detail) {
                $detail->bill()->update(['status' => 'LUNAS']);
            }
        }

        if ($payment->isDirty('status') && in_array($payment->status, ['success', 'failed'])) {
            NotificationService::paymentStatusChanged($payment, $payment->getOriginal('status'), $payment->status);
        }
    }

    public function deleted(Payment $payment)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'payments',
            'id_referensi' => $payment->id,
            'deskripsi' => 'Menghapus data pembayaran'
        ]);

        NotificationService::paymentDeleted($payment);
    }

    public function restored(Payment $payment)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'payments',
            'id_referensi' => $payment->id,
            'deskripsi' => 'Mengembalikan data pembayaran yang terhapus'
        ]);
    }

    public function forceDeleted(Payment $payment)
    {
    }
}
