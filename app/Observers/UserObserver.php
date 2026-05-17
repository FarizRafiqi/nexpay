<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\User;
use App\Services\NotificationService;

class UserObserver
{
    public function created(User $user)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'users',
            'id_referensi' => $user->id,
            'deskripsi' => 'Insert data user'
        ]);

        NotificationService::userRegistered($user);
    }

    public function updated(User $user)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'users',
            'id_referensi' => $user->id,
            'deskripsi' => 'Update data user'
        ]);
    }

    public function deleted(User $user)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'users',
            'id_referensi' => $user->id,
            'deskripsi' => 'Delete data user'
        ]);

        NotificationService::userDeleted($user);
    }

    public function restored(User $user)
    {
        ActivityLog::create([
            'id_user' => 1,
            'tabel_referensi' => 'users',
            'id_referensi' => $user->id,
            'deskripsi' => 'Mengembalikan data user yang terhapus'
        ]);
    }

    public function forceDeleted(User $user)
    {
    }
}
