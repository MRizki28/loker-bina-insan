<?php


namespace App\Repositories;

use App\Http\Requests\Ngaji\NgajiRequest;
use App\Http\Requests\Psikotes\PsikotesRequest;
use App\Interfaces\NgajiInterfaces;
use App\Interfaces\PsikotesInterfaces;
use App\Jobs\EmailHandlerJob;
use App\Models\NgajiModel;
use App\Models\PsikotesModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MRizki28\ApiResponse\ApiResponse;

class PsikotesRepositories implements PsikotesInterfaces
{
    protected $psikotesModal;
    public function __construct(PsikotesModel $psikotesModal)
    {
        $this->psikotesModal = $psikotesModal;
    }

    public function getAllData(Request $request){
        try {
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);
            $query = $this->psikotesModal->query();

            if ($search) {
                $query->whereHas('pelamar', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            }

            $data = $query
                ->with('interview.file.pelamar', 'interview.file.job')
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
        try {
            $ngaji = $this->psikotesModal->find($id);
            if (!$ngaji) {
                return ApiResponse::notFound('Ngaji not found');
            }

            $ngaji->status_ngaji = 'approved';
            $ngaji->save();

            return ApiResponse::success($ngaji, 'Ngaji approved successfully', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }
    public function reject(Request $request, $id)
    {
        
    }

    public function updateData(PsikotesRequest $request, $id)
    {
        DB::beginTransaction();
        try {

            $data = $this->psikotesModal->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }
            $data->time_test = $request->input('time_test');
            $data->save();
            DB::commit();

            // $archive = $this->archiveModel->where('id_file', $data->id_berkas)->first();
            // if ($archive) {
            //     $archive->time_interview = $data->time_interview;
            //     $archive->link = $data->link;
            //     $archive->save();
            // }

            EmailHandlerJob::dispatch('Berikut jadwal psikotes anda ' . $data->time_test . ' untuk lokasinya SIT BINA INSAN PALU Terimakasih', $data->interview->file->pelamar->email);
            return ApiResponse::success($data, 'Success update waktu test ngaji', 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th, 500);
        }
    }
}