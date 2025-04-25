<?php


namespace App\Repositories;

use App\Http\Requests\Ngaji\NgajiRequest;
use App\Interfaces\NgajiInterfaces;
use App\Jobs\EmailHandlerJob;
use App\Models\ArchiveModel;
use App\Models\NgajiModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use MRizki28\ApiResponse\ApiResponse;

class NgajiRepositories implements NgajiInterfaces
{
    protected $ngajiModel;
    protected $archiveModel;    
    public function __construct(NgajiModel $ngajiModel, ArchiveModel $archiveModel)
    {
        $this->archiveModel = $archiveModel;
        $this->ngajiModel = $ngajiModel;
    }


    public function getAllData(Request $request){
        try {
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);
            $query = $this->ngajiModel->query();

            if ($search) {
                $query->whereHas('psikotes.interview.file.pelamar', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            }

            $data = $query
                ->with('psikotes.interview.file.pelamar', 'psikotes.interview.file.job')
                ->paginate($limit, ['*'], 'page', $page);

            if ($data->isEmpty()) {
                return ApiResponse::notFound();
            }

            return ApiResponse::success($data, 'Success get ngaji', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function getHistoryByUser($request)
    {
        
    }

    public function approve(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $data = $this->ngajiModel->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }

            $data->status_ngaji = 'lolos';
            $data->save();

            DB::commit();
            $archive = $this->archiveModel->where('id_file', $data->psikotes->interview->id_berkas)->first();
            if ($archive) {
                $archive->status_ngaji = 'lolos';
                $archive->save();
            }

            EmailHandlerJob::dispatch('Selamat anda lolos test mengaji , silahkan tunggu tim kami akan menghubungi anda', $data->psikotes->interview->file->pelamar->email);

            return ApiResponse::success($data, 'Success update data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }
    
    public function reject(Request $request, $id)
    {
        try {
            $validation = Validator::make($request->all(), [
                'reason_reject' => 'required',
            ]);
            if ($validation->fails()) {
                return response()->json([
                    'status' => 'not validate',
                    'message' => $validation->errors(),
                ], 422);
            }

            $data = $this->ngajiModel->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }

            $data->status_ngaji = 'gagal';
            $data->reason_reject_ngaji = $request->input('reason_reject');
            $data->save();

            DB::commit();
            $archive = $this->archiveModel->where('id_file', $data->psikotes->interview->id_berkas)->first();
            if ($archive) {
                $archive->status_ngaji = 'gagal';
                $archive->save();
            }

            EmailHandlerJob::dispatch('Maaf anda tidak lolos seleksi ngaji ' . $data->reason_reject_ngaji, $data->psikotes->interview->file->pelamar->email);
            return ApiResponse::success($data, 'Success update data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function updateData(NgajiRequest $request, $id)
    {
        DB::beginTransaction();
        try {

            $data = $this->ngajiModel->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }
            $data->time_ngaji = $request->input('time_ngaji');
            $data->save();
            DB::commit();

            $archive = $this->archiveModel->where('id_file', $data->psikotes->interview->id_berkas)->first();
            if ($archive) {
                $archive->time_ngaji = $data->time_ngaji;
                $archive->save();
            }

            EmailHandlerJob::dispatch('Berikut jadwal test mengaji anda ' . $data->time_ngaji . ' untuk lokasinya SIT BINA INSAN PALU Terimakasih', $data->psikotes->interview->file->pelamar->email);
            return ApiResponse::success($data, 'Success update waktu test ngaji', 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th, 500);
        }
    }
}