<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NgajiModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_ngaji';
    protected $fillable = [
        'id',
        'id_psikotes',
        'status_ngaji',
        'time_test',
    ];

    public function psikotes()
    {
        return $this->belongsTo(PsikotesModel::class, 'id_psikotes', 'id');
    }
}
