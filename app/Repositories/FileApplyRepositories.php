<?php


namespace App\Repositories;

use App\Http\Requests\FileApply\FileApplyRequest;
use App\Interfaces\FileApplyInterfaces;
use App\Jobs\EmailHandlerJob;
use App\Mail\LokerMail;
use App\Models\ArchiveModel;
use App\Models\CriteriaJobModel;
use App\Models\FileApplyModel;
use App\Models\InterviewModel;
use App\Models\JobModel;
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
    protected $jobCriteriaModel;

    public function __construct(FileApplyModel $fileApplyModel, ArchiveModel $archiveModel, CriteriaJobModel $jobCriteriaModel)
    {
        $this->archiveModel = $archiveModel;
        $this->fileApplyModel = $fileApplyModel;
        $this->jobCriteriaModel = $jobCriteriaModel;
    }


    public function getAllData(Request $request)
    {
        try {
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);

            $query = $this->fileApplyModel->query();

            if ($search) {
                $query->where('status', 'like', '%' . $search . '%')
                    ->orWhereHas('pelamar', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%');
                    });
            }

            $data = $query->with('job', 'pelamar')->paginate($limit, ['*'], 'page', $page);

            if ($data->isEmpty()) {
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
            $criteriaJob = $this->jobCriteriaModel->where('id_job', $request->input('id_job'))->get();
    
            $isAllCriteriaValid = true; // Flag untuk cek validasi kriteria
    
            foreach ($criteriaJob as $jobCriterion) {
                $field = $jobCriterion->field;
                $operator = $jobCriterion->operator;
                $valueJob = $jobCriterion->value;
    
                $inputKey = 'criteria_' . $field;
                if (!$request->has($inputKey)) {
                    DB::rollBack();
                    return response()->json([
                        'status' => 'error',
                        'message' => "Pelamar tidak mengisi kriteria '$field'.",
                    ], 422);
                }
    
                $valueApplicant = $request->input($inputKey);
    
                if (is_numeric($valueApplicant)) {
                    $valueApplicant = +$valueApplicant;
                    $valueJob = +$valueJob;
                }
    
                $isValid = false;
                switch ($operator) {
                    case '>=':
                        $isValid = $valueApplicant >= $valueJob;
                        break;
                    case '<=':
                        $isValid = $valueApplicant <= $valueJob;
                        break;
                    case '>':
                        $isValid = $valueApplicant > $valueJob;
                        break;
                    case '<':
                        $isValid = $valueApplicant < $valueJob;
                        break;
                    case '=':
                        $isValid = $valueApplicant == $valueJob;
                        break;
                    case '!=':
                        $isValid = $valueApplicant != $valueJob;
                        break;
                    default:
                        DB::rollBack();
                        return response()->json([
                            'status' => 'error',
                            'message' => "Operator '$operator' tidak dikenali.",
                        ], 422);
                }
    
                if (!$isValid) {
                    // Kalau kriteria salah, tandai flag validasi jadi false tapi tidak langsung return
                    $isAllCriteriaValid = false;
                }
            }
    
            // Simpan data pelamar
            $data = new $this->fileApplyModel;
            $data->id_pelamar = Auth::user()->id;
            $data->id_job = $request->input('id_job');
    
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/fileapply'), $filename);
                $data->file = $filename;
            }
    
            // Set status berdasarkan validasi kriteria
            $data->status = $isAllCriteriaValid ? 'pending' : 'rejected';
            $data->reason = $request->input('reason');
            $data->save();
            $data->refresh();
    
            // Simpan ke archive
            $archive = new $this->archiveModel;
            $archive->id_pelamar = $data->id_pelamar;
            $archive->id_file = $data->id;
            $archive->file = $data->file;
            $archive->reason = $data->reason;
            $archive->id_job = $data->id_job;
            $archive->name = $data->job->name;
            $archive->description = $data->job->description;
            $archive->start_date = $data->job->start_date;
            $archive->end_date = $data->job->end_date;
            $archive->job_type = $data->job->job_type;
            $archive->category = $data->job->category;
            $archive->status = $data->status;
            $archive->salary_min = JobModel::where('id', $request->input('id_job'))->value('salary_min');
            $archive->salary_max = JobModel::where('id', $request->input('id_job'))->value('salary_max');
            $archive->save();
    
            DB::commit();
    
            return ApiResponse::success([
                'data' => $data,
                'status' => $data->status,
                'message_to_applicant' => $isAllCriteriaValid
                    ? 'Lamaran Anda berhasil dikirim dan sedang dalam proses seleksi.'
                    : 'Maaf, lamaran Anda ditolak karena tidak memenuhi kriteria lowongan.'
            ], 'Data berhasil disimpan');
            
    
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th, 500);
        }
    }
    



    public function getDataById($id)
    {
        $data = $this->fileApplyModel->with('job', 'pelamar')->find($id);
        if (!$data) {
            return ApiResponse::notFound();
        }

        return ApiResponse::success($data, 'Success get data job', 200);
    }

    public function updateData(FileApplyRequest $request, $id) {}

    public function deleteData($id)
    {
        try {
            $data = $this->fileApplyModel->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }

            if ($data->file) {
                $file_path = public_path('uploads/fileapply/' . $data->file);
                if (file_exists($file_path)) {
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

            if ($search) {
                $query->where('status', 'like', '%' . $search . '%');
            }

            $data = $query->with('job')->where('id_pelamar', $user)->paginate($limit, ['*'], 'page', $page);

            if ($data->isEmpty()) {
                return ApiResponse::notFound();
            }

            return ApiResponse::success($data, 'Success get data job', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th);
        }
    }

    public function downloadFile($filename)
    {
        $path = public_path('uploads/fileapply/' . $filename);
        if (file_exists($path)) {
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

            if ($validation->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation Error',
                    'errors' => $validation->errors()
                ], 422);
            }

            $data = $this->fileApplyModel->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }

            $data->status = $request->input('status');

            if ($request->input('status') == 'rejected') {
                $data->reason_reject = $request->input('reason_reject');
            }

            $data->save();

            DB::commit();
            if ($data->status == 'approved') {
                InterviewModel::create([
                    'id_berkas' => $data->id,
                    'time_interview' => $request->input('time_interview'),
                    'link' => $request->input('link') ?? null,
                ]);
                EmailHandlerJob::dispatch('Selamat anda lolos seleksi berkas, silahkan lanjut ke tahap selanjutnya', $data->pelamar->email);
            } else {
                EmailHandlerJob::dispatch('Maaf anda tidak lolos seleksi berkas, dengan alasan ' . $data->reason_reject, $data->pelamar->email);
            }

            $archive = $this->archiveModel->where('id_file', $id)->first();
            if ($archive) {
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
