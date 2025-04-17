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

    public function job()
    {
        return $this->belongsTo(JobModel::class, 'id_job', 'id');
    }

    public function pelamar()
    {
        return $this->belongsTo(User::class, 'id_pelamar', 'id');
    }

    public function interview()
    {
        return $this->hasOne(InterviewModel::class, 'id_berkas', 'id');
    }
}
