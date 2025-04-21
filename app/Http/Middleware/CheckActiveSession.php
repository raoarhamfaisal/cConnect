<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;



class CheckActiveSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next)
    {
        // Check if the user is logged in
        if (Auth::check()) {
            $now = now();

            // If 'login_time' is not set, set it to the current time
            if (!Session::has('login_time')) {
                Session::put('login_time', $now);
            }

            $loginTime = Session::get('login_time');

            // dd($now);

            // Check if more than 365 days have passed since 'login_time'
            if ($now->diffInMinutes($loginTime) >= 365 * 24 * 60) {
                Auth::logout(); // Log the user out

                // Forget the 'login_time' session variable
                Session::forget('login_time');

                // Redirect to the login page with a message
                return redirect('/')->with('status', 'You have been logged out due to inactivity.');
            }
        }

        return $next($request);
    }
}
