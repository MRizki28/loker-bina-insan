<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface BobotAlternatifInterfaces
{
    public function getAllData(Request $request);
    public function getDataById($id);
    public function updateData(Request $request, $id);
} 