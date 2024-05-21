<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminWithPostPrivileges
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth()->user();

        if ($user && $user->posts_privileges) {
            return $next($request);
        }
    
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        return redirect('/')->withErrors('You do not have permission to access this resource.');
    }
}
