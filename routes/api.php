<?php

use App\Http\Controllers\CMS\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('v1/check-auth', function () {
    return response()->json(['data' => true]);
})->middleware('auth:sanctum');
