<?php

namespace App\Repositories;

use App\Interfaces\InterviewInterface;
use Illuminate\Http\Request;

class InterviewRepositories implements InterviewInterface {
    protected $interviewModel;
    
    public function __construct($interviewModel)
    {
        $this->interviewModel = $interviewModel;
    }

    public function getAllData(Request $request)
    {
        try {
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);
            $query = $this->interviewModel->query();

            if($search){
                $query->where('status', 'like', '%'.$search.'%');
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function getDataById($id)
    {
        
    }

    public function getHistoryByUser($request)
    {
        
    }

    public function review($request, $id)
    {
        
    }
}