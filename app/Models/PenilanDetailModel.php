<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenilanDetailModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_detail_penilaian';
    protected $fillable = [
        'id',
        'id_penilaian',
        'id_bobot_kriteria',
        'id_bobot_alternatif',
        'bobot_prioriti_kriteria',
        'bobot_prioriti_alternatif',
    ];
}
