<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class Localization
{
    public function handle(Request $request, Closure $next)
    {
        $locale = Session::get('locale', 'id');

        if ($request->has('lang')) {
            $locale = in_array($request->lang, ['id', 'en']) ? $request->lang : 'id';
            Session::put('locale', $locale);
        }

        App::setLocale($locale);

        return $next($request);
    }
}
