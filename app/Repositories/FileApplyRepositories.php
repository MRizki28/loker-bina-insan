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
}
