<?php


namespace App\Repositories;

use App\Http\Requests\Ngaji\NgajiRequest;
use App\Http\Requests\Psikotes\PsikotesRequest;
use App\Interfaces\PsikotesInterfaces;
use App\Jobs\EmailHandlerJob;
use App\Models\ArchiveModel;
use App\Models\NgajiModel;
use App\Models\PsikotesModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use MRizki28\ApiResponse\ApiResponse;

class PsikotesRepositories implements PsikotesInterfaces
{
    protected $psikotesModal;
    protected $archiveModel;
    protected $ngajiModel;
    protected $ngajiInterfaces;

    public function __construct(PsikotesModel $psikotesModal, ArchiveModel $archiveModel, NgajiModel $ngajiModel)
    {
        $this->psikotesModal = $psikotesModal;
        $this->archiveModel = $archiveModel;
        $this->ngajiModel = $ngajiModel;
    }

    public function getAllData(Request $request){
        try {
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);
            $query = $this->psikotesModal->query();

            if ($search) {
                $query->whereHas('interview.file.pelamar', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            }

            $data = $query
                ->with('interview.file.pelamar', 'interview.file.job')
                ->paginate($limit, ['*'], 'page', $page);

            if ($data->isEmpty()) {
                return ApiResponse::notFound();
            }

            return ApiResponse::success($data, 'Success get psikotes', 200);
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
            $data = $this->psikotesModal->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }

            $data->status_psikotes = 'lolos';
            $data->save();

            DB::commit();
            $archive = $this->archiveModel->where('id_file', $data->interview->id_berkas)->first();
            if ($archive) {
                $archive->status_psikotes = 'lolos';
                $archive->save();
            }

            EmailHandlerJob::dispatch('Selamat anda lolos psikotes, dan silahkan check pada sistem untuk jadwal test mengaji', $data->interview->file->pelamar->email);

            if ($archive->status_psikotes == 'lolos') {
                $this->ngajiModel->create([
                    'id_psikotes' => $data->id,
                ]);
            }
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

            $data = $this->psikotesModal->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }

            $data->status_psikotes = 'gagal';
            $data->reason_reject_psikotes = $request->input('reason_reject');
            $data->save();

            DB::commit();
            $archive = $this->archiveModel->where('id_file', $data->interview->id_berkas)->first();
            if ($archive) {
                $archive->status_psikotes = 'gagal';
                $archive->reason_reject_psikotes = $data->reason_reject_psikotes;
                $archive->save();
            }

            EmailHandlerJob::dispatch('Maaf anda tidak lolos seleksi psikotes ' . $data->reason_reject_psikotes, $data->interview->file->pelamar->email);
            return ApiResponse::success($data, 'Success update data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function updateData(PsikotesRequest $request, $id)
    {
        DB::beginTransaction();
        try {

            $data = $this->psikotesModal->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }
            $data->time_psikotes = $request->input('time_psikotes');
            $data->save();
            DB::commit();

            $archive = $this->archiveModel->where('id_file', $data->interview->id_berkas)->first();
            if ($archive) {
                $archive->time_interview = $data->time_interview;
                $archive->save();
            }

            EmailHandlerJob::dispatch('Berikut jadwal psikotes anda ' . $data->time_psikotes . ' untuk lokasinya SIT BINA INSAN PALU Terimakasih', $data->interview->file->pelamar->email);
            return ApiResponse::success($data, 'Success update waktu psikotes', 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th, 500);
        }
    }
}