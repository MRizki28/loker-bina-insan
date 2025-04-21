<?php

namespace Database\Seeders;

use App\Models\BobotKriteriaModel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class KriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kriteria = [
            ['name_kriteria' => 'USIA', 'bobot' => '0.430934586839972'],
            ['name_kriteria' => 'PENGALAMAN KERJA', 'bobot' => '0.229630252778747'],
            ['name_kriteria' => 'PENDIDIKAN TERAKHIR', 'bobot' => '0.121613954524708'],
            ['name_kriteria' => 'TES WAWANCARA', 'bobot' => '0.099464931353422'],
            ['name_kriteria' => 'TES PSIKOLOGI', 'bobot' => '0.0713050689953882'],
            ['name_kriteria' => 'TES MENGAJI', 'bobot' => '0.0470512055077633'],
        ];
        

        foreach ($kriteria as $item) {
            BobotKriteriaModel::create([
                'id' => Str::uuid(),
                'name_kriteria' => $item['name_kriteria'],
                'bobot_prioriti_kriteria' => $item['bobot'],
            ]);
        }
    }
}
