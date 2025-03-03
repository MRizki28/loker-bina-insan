<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Job\JobRequest;
use App\Repositories\JobRepositories;
use Illuminate\Http\Request;

class JobController extends Controller
{
    protected $jobRepositories;

    public function __construct(JobRepositories $jobRepositories)
    {
        $this->jobRepositories = $jobRepositories;
    }

    public function getAllData(Request $request)
    {
        return $this->jobRepositories->getAllData($request);
    }

    public function createData(JobRequest $jobRequest)
    {
        return $this->jobRepositories->createData($jobRequest);
    }

    public function getDataById($id)
    {
        return $this->jobRepositories->getDataById($id);
    }

    public function updateData(JobRequest $jobRequest, $id)
    {
        return $this->jobRepositories->updateData($jobRequest, $id);
    }

    public function deleteData($id)
    {
        return $this->jobRepositories->deleteData($id);
    }
    
}
