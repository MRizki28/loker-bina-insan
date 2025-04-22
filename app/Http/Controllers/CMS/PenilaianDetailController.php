<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MRizki28\ApiResponse\ApiResponse;

use Illuminate\Support\Str;


class PenilaianDetailController extends Controller
{
    
    public function createData(Request $request)
    {
        $request->validate([
            'id_pelamar' => 'required|uuid|exists:users,id',
            'detail' => 'required|array|min:1',
            'detail.*.id_bobot_kriteria' => 'required|exists:tb_bobot_kriteria,id',
            'detail.*.id_bobot_alternatif' => 'required|exists:tb_bobot_alternatif,id',
        ]);
    
        DB::beginTransaction();
        try {
            // Step 1: Buat data penilaian
            $idPenilaian = Str::uuid();
            DB::table('tb_penilaian')->insert([
                'id' => $idPenilaian,
                'id_pelamar' => $request->id_pelamar,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
    
            // Step 2: Ambil semua bobot kriteria sekaligus untuk efisiensi
            $kriteriaIds = collect($request->detail)->pluck('id_bobot_kriteria')->unique();
            $bobotKriteriaMap = DB::table('tb_bobot_kriteria')
                ->whereIn('id', $kriteriaIds)
                ->pluck('bobot_prioriti_kriteria', 'id');

            $alternatifIds = collect($request->detail)->pluck('id_bobot_alternatif')->unique();
            $bobotAlternatifMap = DB::table('tb_bobot_alternatif')
                ->whereIn('id', $alternatifIds)
                ->pluck('bobot_prioriti_alternatif', 'id');
    
            // Step 3: Loop data detail dan insert ke detail_penilaian
            foreach ($request->detail as $item) {
                $bobotPrioritiKriteria = $bobotKriteriaMap[$item['id_bobot_kriteria']] ?? null;
                $bobotPrioritiAlternatif = $bobotAlternatifMap[$item['id_bobot_alternatif']] ?? null;

                DB::table('tb_detail_penilaian')->insert([
                    'id' => Str::uuid(),
                    'id_penilaian' => $idPenilaian,
                    'id_bobot_kriteria' => $item['id_bobot_kriteria'],
                    'id_bobot_alternatif' => $item['id_bobot_alternatif'],
                    'bobot_prioriti_kriteria' => $bobotPrioritiKriteria,
                    'bobot_prioriti_alternatif' => $bobotPrioritiAlternatif,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
    
            DB::commit();
            return ApiResponse::success(null, 'Berhasil menyimpan penilaian dan detailnya', 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error($e, 500);
        }
    }

   
    public function countTotal(Request $request)
{
    $data = DB::table('tb_detail_penilaian as dp')
        ->join('tb_penilaian as p', 'dp.id_penilaian', '=', 'p.id')
        ->select(
            'p.id_pelamar',
            'dp.bobot_prioriti_kriteria',
            'dp.bobot_prioriti_alternatif'
        )
        ->get();

    if ($data->isEmpty()) {
        return ApiResponse::notFound();
    }

    $scores = [];

    foreach ($data as $row) {
        $idPelamar = $row->id_pelamar;

        // Parse dari string agar tidak ada pembulatan implicit
        $kriteria = (float) $row->bobot_prioriti_kriteria;
        $alternatif = (float) $row->bobot_prioriti_alternatif;

        // Hitung hasil kali dengan presisi tinggi
        $product = $kriteria * $alternatif;

        if (!isset($scores[$idPelamar])) {
            $scores[$idPelamar] = 0;
        }

        $scores[$idPelamar] += $product;
    }

    // Format hasil total score sebagai string dengan presisi tinggi
    $results = collect($scores)->map(function ($total, $idPelamar) {
        return [
            'id_pelamar' => $idPelamar,
            // Format hasil sebagai string presisi 15 digit lalu hilangkan trailing nol
            'total_score' => rtrim(rtrim(sprintf('%.15f', $total), '0'), '.')
        ];
    })->sortByDesc('total_score')->values();

    return ApiResponse::success($results, 'Ranking berdasarkan total nilai', 200);
}

    
    
    
}
