<?php


namespace App\Interfaces;

use App\Http\Requests\Psikotes\PsikotesRequest;
use Illuminate\Http\Request;

interface PsikotesInterfaces{
    public function getAllData(Request $request);
    public function getHistoryByUser($request);
    public function approve(Request $request, $id);
    public function reject(Request $request, $id);
    public function updateData(PsikotesRequest $request, $id);
}