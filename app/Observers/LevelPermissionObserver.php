<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\LevelPermission;
use App\Services\NotificationService;

class LevelPermissionObserver
{
    public function created(LevelPermission $levelPermission)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'level_permissions',
            'id_referensi' => $levelPermission->id,
            'deskripsi' => 'Memasukkan data level permissions'
        ]);

        NotificationService::levelPermissionChanged('created', $levelPermission);
    }

    public function updated(LevelPermission $levelPermission)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'level_permissions',
            'id_referensi' => $levelPermission->id,
            'deskripsi' => 'Memperbarui data level permissions'
        ]);
    }

    public function deleted(LevelPermission $levelPermission)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'level_permissions',
            'id_referensi' => $levelPermission->id,
            'deskripsi' => 'Menghapus data level permissions'
        ]);

        NotificationService::levelPermissionChanged('deleted', $levelPermission);
    }

    public function restored(LevelPermission $levelPermission)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'level_permissions',
            'id_referensi' => $levelPermission->id,
            'deskripsi' => 'Mengembalikan data level permissions yang terhapus'
        ]);
    }

    public function forceDeleted(LevelPermission $levelPermission)
    {
    }
}
