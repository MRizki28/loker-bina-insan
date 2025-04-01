<?php


namespace App\Interfaces;

use App\Http\Requests\FileApply\FileApplyRequest;
use Illuminate\Http\Request;

interface FileApplyInterfaces
{
    public function getAllData(Request $request);
    public function createData(FileApplyRequest $request);
    public function getDataById($id);
    public function updateData(FileApplyRequest $request, $id);
    public function deleteData($id);
}
