<?php


namespace App\Interfaces;

use Illuminate\Http\Request;

interface ArchiveInterfaces
{
    public function getAllData($request);
    public function getDataById($id);
    public function getHistoryByUser(Request $request);
    public function review($request, $id);
    public function getDataByPelamar(Request $request, $id);
}