<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Interview\InterviewRequest;
use App\Repositories\InterviewRepositories;
use Illuminate\Http\Request;

class InterviewController extends Controller
{
    protected $interviewRepositories;

    public function __construct(InterviewRepositories $interviewRepositories)
    {
        $this->interviewRepositories = $interviewRepositories;
    }

    public function getAllData(Request $request)
    {
        return $this->interviewRepositories->getAllData($request);
    }

    public function getDataById($id)
    {
        return $this->interviewRepositories->getDataById($id);
    }

    public function getHistoryByUser(Request $request)
    {
        return $this->interviewRepositories->getHistoryByUser($request);
    }

    public function updateData(InterviewRequest $request, $id)
    {
        return $this->interviewRepositories->updateData($request, $id);
    }

}
