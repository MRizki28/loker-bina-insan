<?php

namespace App\Repositories;

use App\Http\Requests\Interview\InterviewRequest;
use App\Interfaces\InterviewInterfaces;
use App\Jobs\EmailHandlerJob;
use App\Models\ArchiveModel;
use App\Models\InterviewModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use MRizki28\ApiResponse\ApiResponse;

class InterviewRepositories implements InterviewInterfaces
{
    protected $interviewModel;
    protected $archiveModel;

    public function __construct(InterviewModel $interviewModel, ArchiveModel $archiveModel)
    {
        $this->archiveModel = $archiveModel;
        $this->interviewModel = $interviewModel;
    }

    public function getAllData(Request $request)
    {
        try {
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);
            $query = $this->interviewModel->query();

            if ($search) {
                $query->whereHas('pelamar', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            }

            $data = $query
                ->with('file.pelamar', 'file.job')
                ->paginate($limit, ['*'], 'page', $page);

            if ($data->isEmpty()) {
                return ApiResponse::notFound();
            }

            return ApiResponse::success($data, 'Success get data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function getDataById($id) {}

    public function getHistoryByUser($request) {}

    public function updateData(InterviewRequest $request, $id)
    {
        DB::beginTransaction();
        try {

            $data = $this->interviewModel->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }
            $data->time_interview = $request->input('time_interview');
            $data->link = $request->input('link') ?? null;
            $data->save();
            DB::commit();

            $archive = $this->archiveModel->where('id_file', $data->id_berkas)->first();
            if ($archive) {
                $archive->time_interview = $data->time_interview;
                $archive->link = $data->link;
                $archive->save();
            }

            if ($data->link == null) {
                EmailHandlerJob::dispatch('Berikut jadwal interview anda ' . $data->time_interview . ' untuk lokasinya SIT BINA INSAN PALU Terimakasih', $data->file->pelamar->email);
            } else {
                EmailHandlerJob::dispatch('Berikut jadwal interview anda ' . $data->time_interview . '. Silahkan join pada link berikut 10 menit sebelum waktu yang di jadwalkan ' . $data->link, $data->file->pelamar->email);
            }
            return ApiResponse::success($data, 'Success create data job', 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th, 500);
        }
    }

    public function finnalization(Request $request, $id)
    {
        try {

            $validation = Validator::make($request->all(), [
                'status_interview' => 'required|boolean',
            ]);

            if ($validation->fails()) {
                return response()->json([
                    'status' => 'not validate',
                    'message' => $validation->errors(),
                ], 422);
            }

            $data = $this->interviewModel->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }

            $data->status_interview = $request->input('status_interview');
            $data->save();

            return ApiResponse::success($data, 'Success update data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function approve(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $data = $this->interviewModel->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }

            $data->status_interview = 'lolos';
            $data->save();

            DB::commit();
            $archive = $this->archiveModel->where('id_file', $data->id_berkas)->first();
            if ($archive) {
                $archive->status_interview = 'lolos';
                $archive->save();
            }

            EmailHandlerJob::dispatch('Selamat anda lolos seleksi wawancara, tunggu secepatnya kami akan menghubungi anda', $data->file->pelamar->email);
            return ApiResponse::success($data, 'Success update data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function reject(Request $request, $id)
    {
        DB::beginTransaction();
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

            $data = $this->interviewModel->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }

            $data->status_interview = 'gagal';
            $data->reason_reject_interview = $request->input('reason_reject');
            $data->save();

            DB::commit();
            $archive = $this->archiveModel->where('id_file', $data->id_berkas)->first();
            if ($archive) {
                $archive->status_interview = 'gagal';
                $archive->save();
            }
            Log::info('email', [
                'email' => $data->file->pelamar->email,
                'reason' => $data->reason_reject_interview
            ]);

            EmailHandlerJob::dispatch('Maaf anda tidak lolos seleksi wawancara ' . $data->reason_reject_interview, $data->file->pelamar->email);
            return ApiResponse::success($data, 'Success update data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }
}
