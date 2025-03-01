<?php

use App\Http\Controllers\CMS\AuthController;
use Illuminate\Support\Facades\Route;


Route::get('/login', function () {
    return view('frontend');
})->name('login');

Route::fallback(function () {
    return view('frontend');
});


Route::prefix('v1')->group(function () {
    Route::prefix('auth')->controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
    });
});

Route::post('v1/auth/logout', [AuthController::class, 'logout']);

Route::middleware(['auth', 'web', 'adminRole'])->group(function () {
    Route::get('cms/admin/dashboard', function () {
        return view('pages.loker');
    });
});
