<?php

use App\Http\Controllers\CMS\AuthController;
use App\Http\Controllers\CMS\FileApplyController;
use App\Http\Controllers\CMS\JobController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::get('/login', function () {
    return view('frontend');
})->name('login');

Route::fallback(function () {
    return view('frontend');
});

Route::get('/email', function () {
    return view('email.loker');
});


Route::get('v1/check-auth', function () {
    $user = Auth::user();

    return response()->json([
        'authenticated' => $user ? true : false,
        'user' => $user
    ]);
});

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
    });

    Route::prefix('job')->controller(JobController::class)->group(function () {
        Route::get('/get-for-frontend', 'getForFrontend');
        Route::get('/get-for-frontend/get/{id}', 'getDataById');
    });

});

Route::post('v1/auth/logout', [AuthController::class, 'logout']);

Route::middleware(['auth', 'web'])->group(function () {
    Route::get('cms/admin/dashboard', function () {
        return view('pages.loker');
    });

    Route::get('cms/admin/loker', function () {
        return view('pages.loker');
    });

    Route::get('cms/admin/file-apply', function () {
        return view('pages.fileapply');
    });

    Route::prefix('v1')->group(function () {
        Route::prefix('job')->controller(JobController::class)->group(function () {
            Route::get('/', 'getAllData');
            Route::post('/create', 'createData');
            Route::get('/get/{id}', 'getDataById');
            Route::post('/update/{id}', 'updateData');
            Route::delete('/delete/{id}', 'deleteData');
        });

        Route::prefix('file-apply')->controller(FileApplyController::class)->group(function () {
            Route::get('/', 'getAllData');
            Route::post('/create', 'createData');
            Route::get('/get/{id}', 'getDataById');
            Route::get('/get-history-by-user', 'getHistoryByUser');
            Route::get('/download/{filename}', 'downloadFile');
        });
    });

});
