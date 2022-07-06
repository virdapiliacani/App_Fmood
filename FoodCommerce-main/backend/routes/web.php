<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/about', function () {
    return view('about',["name"=>"Adio Ihsan",
                        "email"=>"AdioIhsan@gmail.com",
                        "image"=>"image/AdioIhsan.png"
]);
});
Route::get('/home', function () {
    return view('home');
});
Route::get('/post', function () {
    return view('post');
});
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
