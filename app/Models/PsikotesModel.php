<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PsikotesModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_psikotes';
    protected $fillable = [
        'id',
        'id_interview',
        'status_psikotes',
        'time_psikotes',
        'reason_reject_psikotes',
    ];

    public function interview()
    {
        return $this->belongsTo(InterviewModel::class, 'id_interview', 'id');
    }
}
