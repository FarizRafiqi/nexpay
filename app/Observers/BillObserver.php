<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Bill;
use App\Services\NotificationService;

class BillObserver
{
    public function created(Bill $bill)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'bills',
            'id_referensi' => $bill->id,
            'deskripsi' => 'Memasukkan data tagihan listrik'
        ]);
    }

    public function updated(Bill $bill)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'bills',
            'id_referensi' => $bill->id,
            'deskripsi' => 'Memperbarui data tagihan listrik'
        ]);

        if ($bill->isDirty('status')) {
            NotificationService::billStatusChanged(
                $bill,
                $bill->getOriginal('status'),
                $bill->status
            );
        }
    }

    public function deleted(Bill $bill)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'bills',
            'id_referensi' => $bill->id,
            'deskripsi' => 'Menghapus data tagihan listrik'
        ]);
    }

    public function restored(Bill $bill)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'bills',
            'id_referensi' => $bill->id,
            'deskripsi' => 'Mengembalikan data tagihan listrik yang terhapus'
        ]);
    }

    public function forceDeleted(Bill $bill)
    {
    }
}
