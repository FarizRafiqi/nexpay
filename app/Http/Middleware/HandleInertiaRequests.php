<?php

namespace App\Http\Middleware;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $notifications = [];
        if ($request->user()) {
            $logs = ActivityLog::with('user')
                ->latest()
                ->take(10)
                ->get()
                ->map(function ($log) {
                    $time = $log->created_at ? $log->created_at->diffForHumans() : '';
                    return [
                        'id' => $log->id,
                        'title' => ucfirst(str_replace('_', ' ', $log->tabel_referensi ?? 'Aktivitas')),
                        'description' => $log->deskripsi,
                        'time' => $time,
                        'user' => $log->user?->nama ?? 'Sistem',
                    ];
                });
            $notifications = $logs;
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'nama' => $request->user()->nama,
                    'email' => $request->user()->email,
                    'username' => $request->user()->username,
                    'id_level' => $request->user()->id_level,
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
            ],
            'notifications' => $notifications,
        ]);
    }
}
