<?php

namespace App\Interfaces;

use App\Http\Requests\Ngaji\NgajiRequest;
use Illuminate\Http\Request;

interface NgajiInterfaces
{
    public function getAllData(Request $request);
    public function getHistoryByUser($request);
    public function approve(Request $request, $id);
    public function reject(Request $request, $id);
    public function updateData(NgajiRequest $request, $id);
}