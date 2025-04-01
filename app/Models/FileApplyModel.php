<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileApplyModel extends Model
{
    protected $table = 'tb_file';
    protected $fillable = [
        'id',
        'id_pelamar',
        'id_job',
        'file',
        'reason',
        'status',
        'reason_reject',
    ];
}
