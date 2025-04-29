<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\ArchiveModel;
use App\Models\PenilanDetailModel;
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


    public function ranking(Request $request)
    {
        try {
            $lowongan = $request->query('lowongan');
    
            $details = PenilanDetailModel::with(['bobotKriteria', 'penilaian.file.job', 'penilaian.file.pelamar'])
                ->when($lowongan, function ($query) use ($lowongan) {
                    $query->whereHas('penilaian.file.job', function ($q) use ($lowongan) {
                        $q->where('name', 'like', "%$lowongan%");
                    });
                })->get();
    
            $kriteriaMap = [
                'USIA' => 'K1',
                'PENGALAMAN KERJA' => 'K2',
                'PENDIDIKAN TERAKHIR' => 'K3',
                'TES WAWANCARA' => 'K4',
                'TES PSIKOLOGI' => 'K5',
                'TES MENGAJI' => 'K6',
            ];
    
            $ranking = $details->groupBy('id_penilaian')->map(function ($items, $id) use ($kriteriaMap) {
                $total = '0';
                $kategori = [
                    'K1' => null,
                    'K2' => null,
                    'K3' => null,
                    'K4' => null,
                    'K5' => null,
                    'K6' => null,
                ];
    
                $firstItem = $items->first();
                $file = $firstItem->penilaian->file;
                $pelamar = $file->pelamar;
    
                $job = $file->job->name ?? null;
                $name_pelamar = $pelamar->name ?? null;
                $id_file = $file->id ?? null;
                $id_pelamar = $pelamar->id ?? null;
    
                foreach ($items as $item) {
                    $kriteriaNama = strtoupper($item->bobotKriteria->name_kriteria ?? '');
                    $kodeK = $kriteriaMap[$kriteriaNama] ?? null;
    
                    if ($kodeK) {
                        $score = bcmul((string)$item->bobot_prioriti_kriteria, (string)$item->bobot_prioriti_alternatif, 5);
                        $kategori[$kodeK] = $score;
                        $total = bcadd($total, $score, 5);
                    }
                }
    
                if (in_array(null, $kategori, true)) {
                    return null;
                }
    
                return array_merge([
                    'id_penilaian' => $id,
                    'id_file' => $id_file,
                    'id_pelamar' => $id_pelamar,
                    'total_score' => $total,
                    'job' => $job,
                    'name_pelamar' => $name_pelamar,
                ], $kategori);
            })->filter();
    
            $sorted = $ranking->values()->sortByDesc('total_score')->values();
    
            $final = $sorted->map(function ($item, $index) {
                return array_merge($item, [
                    'ranking' => $index + 1,
                ]);
            });
    
            if ($final->isEmpty()) {
                return ApiResponse::notFound();
            }
    
            // Save ranking to archive
            foreach ($final as $item) {
                ArchiveModel::where('id_file', $item['id_file'])
                    ->where('id_pelamar', $item['id_pelamar'])
                    ->update([
                        'rank' => $item['ranking'],
                        'updated_at' => now(), 
                    ]);
            }
    
            return response()->json([
                'status' => 'success',
                'message' => 'Ranking per penilaian berhasil dihitung',
                'data' => $final,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat menghitung ranking',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
    
}
