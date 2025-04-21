<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BobotAlternatifModel extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'tb_bobot_alternatif';
    protected $fillable = [
        'id',
        'id_kriteria',
        'name_alternatif',
        'bobot_prioriti_alternatif',
    ];

    public function kriteria(){
        return $this->belongsTo(BobotKriteriaModel::class, 'id_kriteria', 'id');
    }
}
