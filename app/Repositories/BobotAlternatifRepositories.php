<?php


namespace App\Repositories;

use App\Interfaces\BobotAlternatifInterfaces;
use App\Models\BobotAlternatifModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use MRizki28\ApiResponse\ApiResponse;

class BobotAlternatifRepositories implements BobotAlternatifInterfaces{
    protected $bobotAlternatifModel;
    public function __construct(BobotAlternatifModel $bobotAlternatifModel)
    {
        $this->bobotAlternatifModel = $bobotAlternatifModel;
    }

    public function getAllData(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit ') : 100;
        $page = $search ? 1 : (int) $request->input('page', 1);

        $query = $this->bobotAlternatifModel->query();

        if($search){
            $query->where('name_alternatif' , 'like', '%'.$search.'%');
        }

        $query->orderBy('id_kriteria', 'desc');

        $data = $query->with('kriteria')->paginate($limit, ['*'], 'page', $page);
        if($data->isEmpty()){
            return ApiResponse::notFound();
        }
        return ApiResponse::success($data, 'Success get data bobot alternatif', 200);
    }

    public function getDataById($id)
    {
        $data = $this->bobotAlternatifModel->find($id);

        if(!$data){
            return ApiResponse::notFound();
        }

        return ApiResponse::success($data, 'Success get data by id', 200);
    }

    public function updateData(Request $request, $id)
    {
        try {
            $validation = Validator::make($request->all(), [
                'bobot_prioriti_alternatif' => 'required'
            ]);

            if($validation->fails()){
                return response()->json([
                    'status' => 'not validate',
                    'message' => 'check your validation',
                    'errors' => $validation->errors()
                ]);
            }

            $data = $this->bobotAlternatifModel->find($id);
            $data->bobot_prioriti_alternatif = $request->input('bobot_prioriti_alternatif');
            $data->save();

            return ApiResponse::success($data, 'Success update', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }
    
}