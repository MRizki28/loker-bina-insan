<?php

use Illuminate\Support\Facades\Route;

Route::get('/admin/loker', function () {
    return view('pages.loker');
});
Route::fallback(function () {
    return view('frontend');
});