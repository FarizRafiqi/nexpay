<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Notifications/Index', [
            'notifications' => Notification::latest()->paginate(20),
        ]);
    }

    public function unread()
    {
        $notifications = Notification::unread()
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($n) {
                return [
                    'id' => $n->id,
                    'type' => $n->type,
                    'title' => $n->title,
                    'description' => $n->message,
                    'time' => $n->created_at ? $n->created_at->diffForHumans() : '',
                    'data' => $n->data,
                ];
            });

        return response()->json($notifications);
    }

    public function markAsRead(Notification $notification)
    {
        $notification->markAsRead();

        return response()->json(['message' => 'Notifikasi ditandai sudah dibaca.']);
    }

    public function markAllAsRead()
    {
        Notification::unread()->update(['read_at' => now()]);

        return response()->json(['message' => 'Semua notifikasi ditandai sudah dibaca.']);
    }

    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->json(['message' => 'Notifikasi berhasil dihapus.']);
    }
}
