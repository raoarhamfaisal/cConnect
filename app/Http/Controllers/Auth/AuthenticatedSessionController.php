<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Profile;
use App\Models\SessionViewSetting;
use App\Models\SessionTrade;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('index', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);

        // return Inertia::render('Auth/Login', [
        //     'canResetPassword' => Route::has('password.request'),
        //     'status' => session('status'),
        // ]);

    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();
        // $request->user()->createToken($request->token_name)->plainTextToken;

        $user = User::where('email', $request->email)->first();

        
        
        if($user) {
            $profile = Profile::where('user_id', $user->id)->first();

            if($profile) {
    
                // Store SessionViewSetting
                $sessionViewSetting = [
                    'view_locale' => $profile->view_locale,
                    'view_regional' => $profile->view_regional,
                    'view_statewide' => $profile->view_statewide,
                    'view_nationwide' => $profile->view_nationwide,
                    'view_following' => $profile->view_following,
                ];
                SessionViewSetting::updateOrCreate(
                    ['profile_id' => $profile->id],
                    $sessionViewSetting
                );
    
                // Store SessionTrade
                $profileTrades = $profile->trades;
                foreach ($profileTrades as $trade) {
                    SessionTrade::updateOrCreate(
                        ['profile_id' => $profile->id, 'trade_id' => $trade->id]
                    );
                }
            }            


            if(!$profile->is_payment_verified) {
                return redirect(RouteServiceProvider::PROFILE);
            }
        }
        

        return redirect()->intended(RouteServiceProvider::HOME);
    }


    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function loginUser($user, $request)
    {
        Auth::login($user);
        $request->session()->regenerate();
        return redirect(RouteServiceProvider::PROFILE);
    }
    
    
    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
