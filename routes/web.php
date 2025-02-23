<?php

use Illuminate\Support\Facades\Route;

Route::get('cms/admin/dashboard', function () {
    return view('pages.loker');
});

Route::get('/login' , function() {
    return view('frontend');
})->name('login');


Route::fallback(function () {
    return view('frontend');
});