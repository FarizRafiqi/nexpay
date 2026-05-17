<?php

namespace App\Http\Middleware;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
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
                    ];
                });
        }

        $locale = App::getLocale();

        return array_merge(parent::share($request), [
            'locale' => $locale,
            'translations' => [
                'messages' => __('messages'),
            ],
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
