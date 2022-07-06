<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiStore
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check()){
            if(auth()->user()->tokenCan('server:store')){
                return $next($request);
            }
            else{
                return response()->json([
                    'message'=>'Denied, Your doesnt have a store yet'
                ],403);
            }
        }
        else{
            return response()->json([
                'status'=> 401,
                'message'=>'Your are not authtenticated'
            ]);

        }
      //  return $next($request);
    }
}
