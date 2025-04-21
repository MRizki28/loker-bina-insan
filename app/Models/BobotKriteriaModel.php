<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BobotKriteriaModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_bobot_kriteria';
    protected $fillable = [
        'id',
        'name_kriteria',
        'bobot_prioriti_kriteria',
    ];

    public function alternatif()
    {
        return $this->hasMany(BobotAlternatifModel::class, 'id_kreteria', 'id');
    }
}
