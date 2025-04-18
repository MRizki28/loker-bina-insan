<?php

use App\Http\Controllers\CMS\ArchiveController;
use App\Http\Controllers\CMS\AuthController;
use App\Http\Controllers\CMS\DashboardController;
use App\Http\Controllers\CMS\FileApplyController;
use App\Http\Controllers\CMS\InterviewController;
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
        Route::post('create-data-user', 'createDataUser');
        Route::get('get-all-data', 'getAllData');
        Route::get('get/{id}', 'getDataById');
        Route::post('update-data-user/{id}', 'updateDataUser');
        Route::delete('delete/{id}', 'deleteData');
        Route::post('setting', 'setting');
    });

    Route::prefix('job')->controller(JobController::class)->group(function () {
        Route::get('/get-for-frontend', 'getForFrontend');
        Route::get('/get-for-frontend/get/{id}', 'getDataById');
    });
});

Route::post('v1/auth/logout', [AuthController::class, 'logout']);

Route::middleware(['auth', 'web'])->group(function () {

    Route::get('cms/admin/dashboard', function () {
        return view('pages.dashboard');
    })->name('dashboard')->middleware('role:admin,superadmin');

    Route::get('cms/admin/setting', function () {
        return view('pages.setting');
    })->middleware('role:admin,superadmin');

    Route::get('cms/admin/loker', function () {
        return view('pages.loker');
    })->middleware('role:admin,superadmin');

    Route::get('cms/admin/file-apply', function () {
        return view('pages.fileapply');
    })->middleware('role:admin,superadmin');

    Route::get('cms/admin/interview', function() {
        return view('pages.interview');
    })->middleware('role:admin,superadmin');

    Route::get('cms/admin/archive', function() {
        return view('pages.archive');
    })->middleware('role:admin,superadmin');

    Route::get('/cms/admin/usermanagement', function() {
        return view('pages.userManagement');
    })->middleware('role:superadmin');

    Route::prefix('v1')->group(function () {
        Route::get('user', [AuthController::class, 'getDataUser']);
        Route::get('dashboard', [DashboardController::class, 'dashboard']);
        
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
            Route::post('/review/{id}', 'reviewFile');
            Route::get('/get-data-interview', 'getDataInterview');
        });

        Route::prefix('archive')->controller(ArchiveController::class)->group(function () {
            Route::get('/', 'getAllData');
            Route::get('/get/{id}', 'getDataById');
            Route::get('/get-history-by-user', 'getHistoryByUser');
            Route::post('/review/{id}', 'review');
            Route::get('/get-data-by-pelamar/{id}', 'getDataByPelamar');
        }); 

        Route::prefix('interview')->controller(InterviewController::class)->group(function () {
            Route::get('/', 'getAllData');
            Route::post('/update/{id}', 'updateData');
            Route::post('approve/{id}', 'approve');
            Route::post('reject/{id}', 'reject');
        });
    });

});
