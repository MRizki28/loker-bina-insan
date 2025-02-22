<?php

use App\Http\Controllers\CMS\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->controller(AuthController::class)->group(function() {
        Route::post('login', 'login');
        Route::post('register', 'register');
        Route::post('logout', 'logout');
    });
});
