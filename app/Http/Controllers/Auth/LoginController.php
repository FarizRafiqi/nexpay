<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ActivityLog;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $this->validateLogin($request);
        
        if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            ActivityLog::create([
                'id_user' => auth()->user()->id,
                'tabel_referensi' => '-',
                'id_referensi' => null,
                'deskripsi' => 'User login',
            ]);
            return $this->sendLoginResponse($request);
        }

        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        if ($response = $this->authenticated($request)) {
            return $response;
        }

        return $request->wantsJson()
                    ? new JsonResponse([], 204)
                    : $this->checkUserLevel();
    }

    public function logout(Request $request)
    {
        ActivityLog::create([
            'id_user' => auth()->user()->id,
            'tabel_referensi' => '-',
            'id_referensi' => null,
            'deskripsi' => 'User logout',
        ]);
        
        $userLevel = auth()->user()->id_level;
        Auth::logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return  $userLevel === 2 ? 
               redirect()->route('home') :
               redirect()->route('login');
    }

    protected function authenticated(Request $request)
    {
        Auth::logoutOtherDevices($request->password);
    }

    protected function sendFailedLoginResponse(Request $request)
    {
        throw ValidationException::withMessages([
            $this->username() => [__('auth.failed')],
            'password' => [__('auth.password')],
        ]);
    }
    
    private function checkUserLevel()
    {
        if(auth()->user()->isAdmin() || auth()->user()->isBank()){
            return redirect()->intended('/admin');
        }

        return redirect()->route('home');
    }
}
