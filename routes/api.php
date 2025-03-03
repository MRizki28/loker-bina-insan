<?php

use App\Http\Controllers\CMS\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('v1/check-auth', function (Request $request) {
//     $user = $request->user(); // Ambil user dari token Sanctum
    
//     return response()->json([
//         'authenticated' => $user ? true : false,
//         'user' => $user, // Bisa dikomentari jika tidak ingin mengembalikan data user
//     ]);
// })->middleware('auth:sanctum');
