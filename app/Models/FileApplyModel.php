<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileApplyModel extends Model
{
    use HasFactory, HasUuids;
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
