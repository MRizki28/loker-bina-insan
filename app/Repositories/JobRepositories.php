<?php

namespace App\Repositories;

use App\Http\Requests\Job\JobRequest;
use App\Interfaces\JobInterfaces;
use App\Models\CriteriaJobModel;
use App\Models\JobModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MRizki28\ApiResponse\ApiResponse;

class JobRepositories implements JobInterfaces
{
    protected $jobModel;
    protected $jobCriteriaModel;
    public function __construct(JobModel $jobModel, CriteriaJobModel $jobCriteriaModel)
    {
        $this->jobModel = $jobModel;
        $this->jobCriteriaModel = $jobCriteriaModel;
    }
    

    public function getAllData(Request $request){
        try {
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);

            $query = $this->jobModel->query();
            if($search){
                $query->where('name', 'like', '%'.$search.'%');
            }

            $data = $query->paginate($limit, ['*'], 'page', $page);

            if($data->isEmpty()){
                return ApiResponse::notFound();
            }

            return ApiResponse::success($data, 'Success get data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function createData(JobRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = new $this->jobModel;
            $data->name = $request->input('name');
            $data->description = $request->input('description');
            $data->start_date = $request->input('start_date');
            $data->end_date = $request->input('end_date');
            $data->job_type = $request->input('job_type');
            $data->category = $request->input('category');
            $data->save();

            //save data to job criteria
            $criteriaList = $request->input('criteria');
            foreach ($criteriaList as $item) {
                $this->jobCriteriaModel::create([
                    'id_job' => $data->id,
                    'field' => $item['field'],
                    'operator' => $item['operator'],
                    'value' => $item['value']
                ]);
            }

            DB::commit();
            

            return ApiResponse::success($data, 'Success create data job', 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th, 500);
        }
    }

    public function getDataById($id)
    {
        try {
            $data = $this->jobModel->find($id);
            if(!$data){
                return ApiResponse::notFound();
            }

            return ApiResponse::success($data, 'Success get data job by id', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function updateData(JobRequest $request, $id)
    {
        try {
            $data = $this->jobModel->find($id);
            if(!$data){
                return ApiResponse::notFound();
            }

            $data->name = $request->input('name');
            $data->description = $request->input('description');
            $data->qualification = $request->input('qualification');
            $data->requirement = $request->input('requirement');
            $data->start_date = $request->input('start_date');
            $data->end_date = $request->input('end_date');
            $data->job_type = $request->input('job_type');
            $data->category = $request->input('category');
            $data->save();

            return ApiResponse::success($data, 'Success update data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function deleteData($id)
    {
        try {
            $data = $this->jobModel->find($id);
            if(!$data){
                return ApiResponse::notFound();
            }

            $data->delete();

            return ApiResponse::success($data, 'Success delete data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function getForFrontend(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $page = $search ? 1 : (int) $request->input('page', 1);

        $query = $this->jobModel->query();

        if($search){
            $query->where('name', 'like', '%'.$search.'%');
        }

        $data = $query->paginate($limit, ['*'], 'page', $page);

        if($data->isEmpty()){
            return ApiResponse::notFound();
        }

        return ApiResponse::success($data, 'Success get data job for frontend', 200);
    }
}