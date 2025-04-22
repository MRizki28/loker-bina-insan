<?php

namespace Database\Seeders;

use App\Models\BobotAlternatifModel;
use App\Models\BobotKriteriaModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AlternatifSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data alternatif dengan name_alternatif dan bobot
        $alternatif = [
            ['name_alternatif' => '<= 25 tahun', 'bobot' => '0.454545454545455', 'kriteria' => 'USIA'],
            ['name_alternatif' => '24-29 tahun', 'bobot' => '0.0909090909090909', 'kriteria' => 'USIA'],
            ['name_alternatif' => '>= 30 tahun', 'bobot' => '0.454545454545455', 'kriteria' => 'USIA'],
            ['name_alternatif' => '<= 5 tahun', 'bobot' => '0.20', 'kriteria' => 'PENGALAMAN KERJA'],
            ['name_alternatif' => '6-9 tahun', 'bobot' => '0.60', 'kriteria' => 'PENGALAMAN KERJA'],
            ['name_alternatif' => '>= 10 tahun', 'bobot' => '0.20', 'kriteria' => 'PENGALAMAN KERJA'],
            ['name_alternatif' => 'SMA/K', 'bobot' => '0.333333333333333', 'kriteria' => 'PENDIDIKAN TERAKHIR'],
            ['name_alternatif' => 'S1', 'bobot' => '0.333333333333333', 'kriteria' => 'PENDIDIKAN TERAKHIR'],
            ['name_alternatif' => 'S2', 'bobot' => '0.333333333333333', 'kriteria' => 'PENDIDIKAN TERAKHIR'],
            ['name_alternatif' => 'Cukup', 'bobot' => '0.142857142857143', 'kriteria' => 'TES WAWANCARA'],
            ['name_alternatif' => 'Baik', 'bobot' => '0.714285714285714', 'kriteria' => 'TES WAWANCARA'],
            ['name_alternatif' => 'Sangat Baik', 'bobot' => '0.142857142857143', 'kriteria' => 'TES WAWANCARA'],
            ['name_alternatif' => 'Cukup', 'bobot' => '0.428571428571429', 'kriteria' => 'TES PSIKOLOGI'],
            ['name_alternatif' => 'Baik', 'bobot' => '0.142857142857143', 'kriteria' => 'TES PSIKOLOGI'],
            ['name_alternatif' => 'Sangat Baik', 'bobot' => '0.428571428571429', 'kriteria' => 'TES PSIKOLOGI'],
            ['name_alternatif' => 'Cukup', 'bobot' => '0.225396825396825', 'kriteria' => 'TES MENGAJI'],
            ['name_alternatif' => 'Baik', 'bobot' => '0.320634920634921', 'kriteria' => 'TES MENGAJI'],
            ['name_alternatif' => 'Sangat Baik', 'bobot' => '0.453968253968254', 'kriteria' => 'TES MENGAJI'],
        ];

        foreach ($alternatif as $item) {
            $idKriteria = BobotKriteriaModel::where('name_kriteria', $item['kriteria'])->value('id');
            
            if ($idKriteria) {
                BobotAlternatifModel::create([
                    'id' => Str::uuid(),
                    'id_kriteria' => $idKriteria,
                    'name_alternatif' => $item['name_alternatif'],
                    'bobot_prioriti_alternatif' => $item['bobot'],
                ]);
            }
        }
    }
}
