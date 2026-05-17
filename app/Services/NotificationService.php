<?php

namespace App\Services;

use App\Models\Notification;

class NotificationService
{
    public static function create(string $type, string $title, string $message, array $data = []): Notification
    {
        return Notification::create([
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'data' => $data,
        ]);
    }

    public static function paymentStatusChanged($payment, string $oldStatus, string $newStatus): void
    {
        $type = $newStatus === 'success' ? 'payment_success' : 'payment_failed';
        $title = $newStatus === 'success' ? 'Pembayaran Berhasil' : 'Pembayaran Gagal';
        $customerName = optional($payment->customer)->nama ?? optional($payment->plnCustomer)->nama_pelanggan ?? 'Unknown';
        $message = $newStatus === 'success'
            ? "Pembayaran #{$payment->id} atas nama {$customerName} berhasil dikonfirmasi."
            : "Pembayaran #{$payment->id} atas nama {$customerName} gagal.";

        self::create($type, $title, $message, [
            'payment_id' => $payment->id,
            'old_status' => $oldStatus,
            'new_status' => $newStatus,
            'total_bayar' => $payment->total_bayar,
        ]);
    }

    public static function paymentDeleted($payment): void
    {
        $customerName = optional($payment->customer)->nama ?? optional($payment->plnCustomer)->nama_pelanggan ?? 'Unknown';
        self::create(
            'payment_deleted',
            'Pembayaran Dihapus',
            "Data pembayaran #{$payment->id} atas nama {$customerName} telah dihapus dari sistem.",
            ['payment_id' => $payment->id, 'total_bayar' => $payment->total_bayar]
        );
    }

    public static function userRegistered($user): void
    {
        self::create(
            'user_registered',
            'Pengguna Baru Mendaftar',
            "Pengguna baru '{$user->nama}' ({$user->email}) telah mendaftar di sistem.",
            ['user_id' => $user->id, 'email' => $user->email]
        );
    }

    public static function userDeleted($user): void
    {
        self::create(
            'user_deleted',
            'Pengguna Dihapus',
            "Pengguna '{$user->nama}' ({$user->email}) telah dihapus dari sistem.",
            ['user_id' => $user->id, 'email' => $user->email]
        );
    }

    public static function billStatusChanged($bill, string $oldStatus, string $newStatus): void
    {
        $customerName = optional($bill->usage->plnCustomer)->nama_pelanggan ?? 'Unknown';
        self::create(
            'bill_status_changed',
            'Status Tagihan Berubah',
            "Tagihan #{$bill->id} ({$bill->getMonthNameAttribute()} {$bill->tahun}) atas nama {$customerName} berubah status dari {$oldStatus} menjadi {$newStatus}.",
            [
                'bill_id' => $bill->id,
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
            ]
        );
    }

    public static function levelPermissionChanged(string $action, $levelPermission): void
    {
        $levelName = optional($levelPermission->level)->nama ?? "Level #{$levelPermission->id_level}";
        $permissionName = optional($levelPermission->permission)->title ?? "Permission #{$levelPermission->id_permission}";

        $actionLabel = $action === 'created' ? 'ditambahkan ke' : 'dihapus dari';
        self::create(
            'level_permission_changed',
            'Hak Akses Level Berubah',
            "Permission '{$permissionName}' {$actionLabel} level '{$levelName}'.",
            [
                'level_id' => $levelPermission->id_level,
                'permission_id' => $levelPermission->id_permission,
                'action' => $action,
            ]
        );
    }

    public static function paymentMethodToggled($paymentMethod, string $oldStatus, string $newStatus): void
    {
        $statusLabel = $newStatus === 'active' ? 'diaktifkan' : 'dinonaktifkan';
        self::create(
            'payment_method_changed',
            'Metode Pembayaran Berubah',
            "Metode pembayaran '{$paymentMethod->nama}' {$statusLabel}.",
            [
                'payment_method_id' => $paymentMethod->id,
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
                'slug' => $paymentMethod->slug,
            ]
        );
    }
}
