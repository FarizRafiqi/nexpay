<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\PaymentMethod;
use App\Services\NotificationService;

class PaymentMethodObserver
{
    public function created(PaymentMethod $paymentMethod)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'payment_methods',
            'id_referensi' => $paymentMethod->id,
            'deskripsi' => 'Memasukkan data metode pembayaran'
        ]);
    }

    public function updated(PaymentMethod $paymentMethod)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'payment_methods',
            'id_referensi' => $paymentMethod->id,
            'deskripsi' => 'Memperbarui data metode pembayaran'
        ]);

        if ($paymentMethod->isDirty('is_active')) {
            NotificationService::paymentMethodToggled(
                $paymentMethod,
                $paymentMethod->getOriginal('is_active') ? 'active' : 'inactive',
                $paymentMethod->is_active ? 'active' : 'inactive'
            );
        }
    }

    public function deleted(PaymentMethod $paymentMethod)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'payment_methods',
            'id_referensi' => $paymentMethod->id,
            'deskripsi' => 'Menghapus data metode pembayaran'
        ]);
    }

    public function restored(PaymentMethod $paymentMethod)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'payment_methods',
            'id_referensi' => $paymentMethod->id,
            'deskripsi' => 'Mengembalikan data metode pembayaran yang terhapus'
        ]);
    }

    public function forceDeleted(PaymentMethod $paymentMethod)
    {
    }
}
