<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminWithPaymentsPrivileges
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth()->user(); 

        if ($user && $user->payments_privileges) {
            return $next($request);
        }
    
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        return redirect('/');
    }
}
