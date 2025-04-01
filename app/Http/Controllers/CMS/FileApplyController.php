<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\FileApply\FileApplyRequest;
use App\Repositories\FileApplyRepositories;
use Illuminate\Http\Request;

class FileApplyController extends Controller
{
    protected $fileApplyRepositories;

    public function __construct(FileApplyRepositories $fileApplyRepositories)
    {
        $this->fileApplyRepositories = $fileApplyRepositories;
    }

    public function getAllData(Request $request)
    {
        return $this->fileApplyRepositories->getAllData($request);
    }

    public function createData(FileApplyRequest $request)
    {
        return $this->fileApplyRepositories->createData($request);
    }

    public function getDataById($id)
    {
        return $this->fileApplyRepositories->getDataById($id);
    }

    public function updateData(FileApplyRequest $request, $id)
    {
        return $this->fileApplyRepositories->updateData($request, $id);
    }

    public function deleteData($id)
    {
        return $this->fileApplyRepositories->deleteData($id);
    }
}
