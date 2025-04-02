<?php


namespace App\Repositories;

use App\Http\Requests\FileApply\FileApplyRequest;
use App\Interfaces\FileApplyInterfaces;
use App\Models\FileApplyModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use MRizki28\ApiResponse\ApiResponse;

class FileApplyRepositories implements FileApplyInterfaces
{
    protected $fileApplyModel;

    public function __construct(FileApplyModel $fileApplyModel)
    {
        $this->fileApplyModel = $fileApplyModel;
    }

    public function getAllData(Request $request) {}

    public function createData(FileApplyRequest $request)
    {
        try {
            $data = new $this->fileApplyModel;
            $data->id_pelamar = Auth::user()->id;
            $data->id_job = $request->input('id_job');
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/fileapply'), $filename);
                $data->file = $filename;
            
            }
            $data->status = 'pending';
            $data->reason = $request->input('reason');
            $data->save();

            return ApiResponse::success($data, 'Data berhasil disimpan');
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function getDataById($id) {}

    public function updateData(FileApplyRequest $request, $id) {}

    public function deleteData($id) {}

    public function getHistoryByUser(Request $request)
    {
        try {
            $user = Auth::user()->id;
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);

            $query = $this->fileApplyModel->query();

            if($search){
                $query->where('status', 'like', '%'.$search.'%');
            }

            $data = $query->with('job')->where('id_pelamar', $user)->paginate($limit, ['*'], 'page', $page);

            if($data->isEmpty()){
                return ApiResponse::notFound();
            }

            return ApiResponse::success($data, 'Success get data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th);
        }
    }
}
