<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\BobotKriteria\BobotKriteriaRequest;
use App\Repositories\BobotKriteriaRepositories;
use Illuminate\Http\Request;

class BobotKriteriaController extends Controller
{
    protected $bobotKriteriaRepositories;

    public function __construct(BobotKriteriaRepositories $bobotKriteriaRepositories)
    {
        $this->bobotKriteriaRepositories = $bobotKriteriaRepositories;
    }

    public function getAllData(Request $request)
    {
        return $this->bobotKriteriaRepositories->getAllData($request);
    }

    public function createData(BobotKriteriaRequest $request)
    {
        return $this->bobotKriteriaRepositories->createData($request);
    }

    public function getDataById($id)
    {
        return $this->bobotKriteriaRepositories->getDataById($id);
    }

    public function updateData(BobotKriteriaRequest $request, $id)
    {
        return $this->bobotKriteriaRepositories->updateData($request, $id);
    }
    
    public function deleteData($id)
    {
        return $this->bobotKriteriaRepositories->deleteData($id);
    }
}
