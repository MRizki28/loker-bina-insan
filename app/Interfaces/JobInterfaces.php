<?php

namespace App\Interfaces;

use App\Http\Requests\Job\JobRequest;
use Illuminate\Http\Request;

interface JobInterfaces
{
    public function getAllData(Request $request);
    public function createData(JobRequest $request);
    public function getDataById($id);
    public function updateData(JobRequest $request, $id);
    public function deleteData($id);
    public function getForFrontend(Request $request);
}
