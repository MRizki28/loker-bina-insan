<?php


namespace App\Interfaces;

use Illuminate\Http\Request;

interface InterviewInterface
{
    public function getAllData($request);
    public function getDataById($id);
    public function getHistoryByUser($request);
    public function review(Request $request, $id);
    
}