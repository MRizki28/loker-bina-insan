<?php


namespace App\Interfaces;

interface ArchiveInterfaces
{
    public function getAllData($request);
    public function getDataById($id);
    public function getHistoryByUser($request);
    public function review($request, $id);
}