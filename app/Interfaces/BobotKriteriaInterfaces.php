<?php

namespace App\Interfaces;

use App\Http\Requests\BobotKriteria\BobotKriteriaRequest;
use Illuminate\Http\Request;

interface BobotKriteriaInterfaces{
    public function getAllData(Request $request);
    public function createData(BobotKriteriaRequest $request);
    public function getDataById($id);
    public function updateData(BobotKriteriaRequest $request, $id);
    public function deleteData($id);
}

