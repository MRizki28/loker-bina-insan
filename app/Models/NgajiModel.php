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
        'id_interview',
        'status_ngaji',
        'time_test',
    ];

    public function interview()
    {
        return $this->belongsTo(InterviewModel::class, 'id_interview', 'id');
    }
}
