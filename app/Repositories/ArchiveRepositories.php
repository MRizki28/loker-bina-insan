<?php

namespace App\Repositories;

use App\Interfaces\ArchiveInterfaces;
use App\Models\ArchiveModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use MRizki28\ApiResponse\ApiResponse;

class ArchiveRepositories implements ArchiveInterfaces {
    protected $archiveModel;

    public function __construct(ArchiveModel $archiveModel)
    {
        $this->archiveModel = $archiveModel;
    }

    public function getAllData($request)
    {
        
    }

    public function getDataById($id)
    {
        
    }

    public function getHistoryByUser(Request $request)
    {
        try {
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);
            $status = $request->input('status');    
            $statusInterview = $request->input('status_interview');
            $statusPsikotes = $request->input('status_psikotes');
            $query = $this->archiveModel->query();

            if($search){
                $query->where('status', 'like', '%'.$search.'%')
                ->orWhere('status_interview', 'like', '%'.$search.'%')
                ->orWhere('status_psikotes', 'like', '%'.$search.'%')
                ->orWhere('status_ngaji', 'like', '%'.$search.'%');

            }

            if($status){
                $query->where('status', $status);
            }

            if($statusInterview){
                $query->where('status_interview', $statusInterview);
            }
            if($statusPsikotes){
                $query->where('status_psikotes', $statusPsikotes);
            }

            $data = $query->where('id_pelamar', Auth::user()->id)->with('pelamar')->paginate($limit, ['*'], 'page', $page);

            if($data->isEmpty()){
                return ApiResponse::notFound();
            }

            return ApiResponse::success($data, 'Success get data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th);
            
        }
    }

    public function review($request, $id)
    {
        
    }

    public function getDataByPelamar(Request $request , $id)
    {
        $search = $request->input('search');
        $page = $search ? 1 : (int) $request->input('page', 1);
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $query = $this->archiveModel->query();

        if ($search) {
            $query->whereHas('pelamar', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            });
        }
        
        $data = $query->where('id_pelamar', $id)->with('pelamar')
            ->paginate($limit, ['*'], 'page', $page);

        if ($data->isEmpty()) {
            return ApiResponse::notFound();
        }

        return ApiResponse::success($data, 'Success get data job', 200);
    }
    
}