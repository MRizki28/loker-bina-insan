<?php


namespace App\Repositories;

use App\Http\Requests\FileApply\FileApplyRequest;
use App\Interfaces\FileApplyInterfaces;
use App\Jobs\EmailHandlerJob;
use App\Mail\LokerMail;
use App\Models\ArchiveModel;
use App\Models\FileApplyModel;
use App\Models\InterviewModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use MRizki28\ApiResponse\ApiResponse;

class FileApplyRepositories implements FileApplyInterfaces
{
    protected $fileApplyModel;
    protected $archiveModel;

    public function __construct(FileApplyModel $fileApplyModel, ArchiveModel $archiveModel)
    {
        $this->archiveModel = $archiveModel;
        $this->fileApplyModel = $fileApplyModel;
    }
    

    public function getAllData(Request $request) {
        try {
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);

            $query = $this->fileApplyModel->query();

            if($search){
                $query->where('status', 'like', '%'.$search.'%')
                ->orWhereHas('pelamar', function($q) use ($search) {
                    $q->where('name', 'like', '%'.$search.'%');
                });
            }

            $data = $query->with('job','pelamar')->paginate($limit, ['*'], 'page', $page);

            if($data->isEmpty()){
                return ApiResponse::notFound();
            }

            return ApiResponse::success($data, 'Success get data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th);
        }
    }

    public function createData(FileApplyRequest $request)
    {
        DB::beginTransaction();
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
            $data->refresh(); 

            DB::commit();

            $archive = new $this->archiveModel;
            $archive->id_pelamar = $data->id_pelamar;
            $archive->id_file = $data->id;
            $archive->file = $data->file;
            $archive->reason = $data->reason;
            $archive->id_job = $data->id_job;
            $archive->name = $data->job->name;
            $archive->description = $data->job->description;
            $archive->qualification = $data->job->qualification;
            $archive->requirement = $data->job->requirement;
            $archive->start_date = $data->job->start_date;
            $archive->end_date = $data->job->end_date;
            $archive->job_type = $data->job->job_type;
            $archive->category = $data->job->category;
            $archive->status = $data->status;
            $archive->save();

            return ApiResponse::success($data, 'Data berhasil disimpan');
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th, 500);
        }
    }

    public function getDataById($id) {
        $data = $this->fileApplyModel->with('job', 'pelamar')->find($id);
        if(!$data){
            return ApiResponse::notFound();
        }

        return ApiResponse::success($data, 'Success get data job', 200);
    }

    public function updateData(FileApplyRequest $request, $id) {}

    public function deleteData($id) {
        try {
            $data = $this->fileApplyModel->find($id);
            if(!$data){
                return ApiResponse::notFound();
            }

            if($data->file){
                $file_path = public_path('uploads/fileapply/' . $data->file);
                if(file_exists($file_path)){
                    unlink($file_path);
                }
            }

            $data->delete();

            return ApiResponse::success($data, 'Success delete data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

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

    public function downloadFile($filename) {
        $path = public_path('uploads/fileapply/' . $filename);
        if(file_exists($path)){
            return response()->download($path);
        }

        return ApiResponse::notFound();
    }

    public function reviewFile(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $validation = Validator::make($request->all(), [
                'status' => 'required',
                'reason_reject' => 'required_if:status,rejected',
            ]);

            if($validation->fails()){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation Error',
                    'errors' => $validation->errors()
                ], 422);
            }

            $data = $this->fileApplyModel->find($id);
            if(!$data){
                return ApiResponse::notFound();
            }

            $data->status = $request->input('status');

            if($request->input('status') == 'rejected'){
                $data->reason_reject = $request->input('reason_reject');
            }

            $data->save();
            
            DB::commit();
            if($data->status == 'approved'){
                InterviewModel::create([
                    'id_berkas' => $data->id,
                    'time_interview' => $request->input('time_interview'),
                    'link' => $request->input('link') ?? null,
                ]);
                EmailHandlerJob::dispatch('Selamat anda lolos seleksi berkas, silahkan lanjut ke tahap selanjutnya', $data->pelamar->email);
            }else{
                EmailHandlerJob::dispatch('Maaf anda tidak lolos seleksi berkas, dengan alasan ' . $data->reason_reject , $data->pelamar->email);
            }

            $archive = $this->archiveModel->where('id_file', $id)->first();
            if($archive){
                $archive->reason_reject = $data->reason_reject;
                $archive->status = $data->status;
                $archive->save();
            }
            $data->load('job', 'pelamar');

            return ApiResponse::success($data, 'Success review data job', 200);
        
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th, 500);
        }
    }
}
