<?php


namespace App\Interfaces;

use App\Http\Requests\Interview\InterviewRequest;
use Illuminate\Http\Request;

interface InterviewInterfaces
{
    public function getAllData(Request $request);
    public function getDataById($id);
    public function getHistoryByUser($request);
    public function updateData(InterviewRequest $request, $id);
    public function finnalization(Request $request, $id);
    public function approve(Request $request, $id);
}