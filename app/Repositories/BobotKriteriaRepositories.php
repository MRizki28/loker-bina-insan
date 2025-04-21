<?php

namespace App\Repositories;

use App\Http\Requests\BobotKriteria\BobotKriteriaRequest;
use App\Interfaces\BobotKriteriaInterfaces;
use App\Models\BobotKriteriaModel;
use Illuminate\Http\Request;
use MRizki28\ApiResponse\ApiResponse;

class BobotKriteriaRepositories implements BobotKriteriaInterfaces
{
    protected $bobotKriteriaModel;

    public function __construct(BobotKriteriaModel $bobotKriteriaModel)
    {
        $this->bobotKriteriaModel = $bobotKriteriaModel;    
    }

    public function getAllData(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $page = $search ? 1 : (int) $request->input('page', 1);

        $query = $this->bobotKriteriaModel->query();

        if($search){
            $query->where('name_kriteria', 'like', '%'.$search.'%');
        }
        $data = $query->paginate($limit, ['*'], 'page', $page);
        if($data->isEmpty()){
            return ApiResponse::notFound();
        }
        return ApiResponse::success($data, 'Success get data bobot kriteria', 200);
    }

    public function createData(BobotKriteriaRequest $request)
    {
        try {
            $data = new $this->bobotKriteriaModel();
            // $data->name_kriteria = $request->input('name_kriteria');
            $data->bobot_prioriti_kriteria = $request->input('bobot_prioriti_kriteria');
            $data->save();
            return ApiResponse::success($data, 'Success create data bobot kriteria', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function getDataById($id)
    {
        $data = $this->bobotKriteriaModel::find($id);

        if(!$data){
            return ApiResponse::notFound();
        }
        return ApiResponse::success($data, 'Success get data bobot kriteria', 200);
    }

    public function updateData(BobotKriteriaRequest $request, $id)
    {
        $data = $this->bobotKriteriaModel::find($id);

        if(!$data){
            return ApiResponse::notFound();
        }
        try {
            // $data->name_kriteria = $request->input('name_kriteria');
            $data->bobot_prioriti_kriteria = $request->input('bobot_prioriti_kriteria');
            $data->save();
            return ApiResponse::success($data, 'Success update data bobot kriteria', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function deleteData($id)
    {
        $data = $this->bobotKriteriaModel::find($id);

        if(!$data){
            return ApiResponse::notFound();
        }
        try {
            $data->delete();
            return ApiResponse::success($data, 'Success delete data bobot kriteria', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }
}