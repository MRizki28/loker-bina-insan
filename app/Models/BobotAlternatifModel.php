<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BobotAlternatifModel extends Model
{
    protected $table = 'tb_bobot_alternatif';
    protected $fillable = [
        'id',
        'id_kreteria',
        'name_alternatif',
        'bobot_prioriti_alternatif',
    ];
}
