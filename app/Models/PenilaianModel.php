<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenilaianModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_penilaian';
    protected $fillable = [
        'id',
        'id_file',
    ];

    public function file()
    {
        return $this->belongsTo(FileApplyModel::class, 'id_file', 'id');
    }
}
