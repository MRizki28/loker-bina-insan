<?php

namespace App\Repositories;

use App\Interfaces\PenilaianInterfaces;
use App\Models\BobotAlternatifModel;
use App\Models\BobotKriteriaModel;
use App\Models\PenilaianModel;
use App\Models\PenilanDetailModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use MRizki28\ApiResponse\ApiResponse;

class PenilaianRepositories implements PenilaianInterfaces
{
    protected $penilaianModel;
    protected $detailPenilaianModel;
    protected $bobotKriteriaModel;
    protected $bobotAlternatifModel;
    protected $fileRepository;

    public function __construct(PenilaianModel $penilaianModel, PenilanDetailModel $detailPenilaianModel, BobotKriteriaModel $bobotKriteriaModel, BobotAlternatifModel $bobotAlternatifModel, FileApplyRepositories $fileRepository)
    {
        $this->fileRepository = $fileRepository;
        $this->penilaianModel = $penilaianModel;
        $this->detailPenilaianModel = $detailPenilaianModel;
        $this->bobotKriteriaModel = $bobotKriteriaModel;
        $this->bobotAlternatifModel = $bobotAlternatifModel;
    }


    public function createPenilaianBerkas(Request $request)
    {
        DB::beginTransaction();
        try {
            $validation = Validator::make($request->all(), [
                'id_file' => 'required|uuid',
                'id_bobot_kriteria' => 'required|array',
                'id_bobot_kriteria.*' => 'required|uuid',
                'id_bobot_alternatif' => 'required|array',
                'id_bobot_alternatif.*' => 'required|uuid',
            ]);

            if ($validation->fails()) {
                return response()->json([
                    'status' => 'not validate',
                    'message' => 'check your validation',
                    'errors' => $validation->errors()
                ], 422);
            }

            $dataPenilaian = new $this->penilaianModel();
            $dataPenilaian->id_file = $request->input('id_file');
            $dataPenilaian->save();

            foreach ($request->input('id_bobot_kriteria') as $key => $value) {
                $bobotPrioritiKriteria = $this->bobotKriteriaModel::find($value);
                $bobotPrioritiAlternatif = $this->bobotAlternatifModel::find($request->input('id_bobot_alternatif')[$key]);

                $dataDetailPenilaian = new $this->detailPenilaianModel();
                $dataDetailPenilaian->id_penilaian = $dataPenilaian->id;
                $dataDetailPenilaian->id_bobot_kriteria = $value;
                $dataDetailPenilaian->id_bobot_alternatif = $request->input('id_bobot_alternatif')[$key];
                $dataDetailPenilaian->bobot_prioriti_kriteria = $bobotPrioritiKriteria->bobot_prioriti_kriteria;
                $dataDetailPenilaian->bobot_prioriti_alternatif = $bobotPrioritiAlternatif->bobot_prioriti_alternatif;
                $dataDetailPenilaian->save();
            }

            DB::commit();

            return ApiResponse::success($dataDetailPenilaian, 'Success create penilaian berkas', 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th,  500);
        }
    }

    public function getKriteriaForBerkasReview()
    {
        $data = $this->bobotKriteriaModel::with('alternatif')->whereIn('name_kriteria', [
            'USIA', 'PENGALAMAN KERJA', 'PENDIDIKAN TERAKHIR'
        ])->get();

        if ($data->isEmpty()) {
            return ApiResponse::notFound();
        }

        return ApiResponse::success($data, 'Success get kriteria for berkas review', 200);
    }

    public function getKriteriaForInterviewReview()
    {
        $data = $this->bobotKriteriaModel::with('alternatif')->where('name_kriteria', 'TES WAWANCARA')->get();

        if ($data->isEmpty()) {
            return ApiResponse::notFound();
        }

        return ApiResponse::success($data, 'Success get kriteria for interview review', 200);
    }

    public function createPenilaianInterview(Request $request)
    {
        DB::beginTransaction();
        try {
            $validation = Validator::make($request->all(), [
                'id_file' => 'required|uuid',
                'id_bobot_kriteria' => 'required|array',
                'id_bobot_kriteria.*' => 'required|uuid',
                'id_bobot_alternatif' => 'required|array',
                'id_bobot_alternatif.*' => 'required|uuid',
            ]);

            if ($validation->fails()) {
                return response()->json([
                    'status' => 'not validate',
                    'message' => 'check your validation',
                    'errors' => $validation->errors()
                ], 422);
            }

            $dataPenilaian = new $this->penilaianModel();
            $dataPenilaian->id_file = $request->input('id_file');
            $dataPenilaian->save();

            foreach ($request->input('id_bobot_kriteria') as $key => $value) {
                $bobotPrioritiKriteria = $this->bobotKriteriaModel::find($value);
                $bobotPrioritiAlternatif = $this->bobotAlternatifModel::find($request->input('id_bobot_alternatif')[$key]);

                $dataDetailPenilaian = new $this->detailPenilaianModel();
                $dataDetailPenilaian->id_penilaian = $dataPenilaian->id;
                $dataDetailPenilaian->id_bobot_kriteria = $value;
                $dataDetailPenilaian->id_bobot_alternatif = $request->input('id_bobot_alternatif')[$key];
                $dataDetailPenilaian->bobot_prioriti_kriteria = $bobotPrioritiKriteria->bobot_prioriti_kriteria;
                $dataDetailPenilaian->bobot_prioriti_alternatif = $bobotPrioritiAlternatif->bobot_prioriti_alternatif;
                $dataDetailPenilaian->save();
            }

            DB::commit();

            return ApiResponse::success($dataDetailPenilaian, 'Success create penilaian review', 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th,  500);
        }
    }

    public function getKriteriaForNgaji()
    {
        $data = $this->bobotKriteriaModel::with('alternatif')->where('name_kriteria', 'TES MENGAJI')->get();

        if ($data->isEmpty()) {
            return ApiResponse::notFound();
        }

        return ApiResponse::success($data, 'Success get kriteria for interview review', 200);
    }

    public function createPenilaianNgaji(Request $request)
    {
        
    }
}
