<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterviewModel extends Model
{
    use HasFactory , HasUuids;

    protected $table = 'tb_interview';
    protected $fillable = [
        'id',
        'id_berkas',
        'time_interview',
        'link',
        'status_interview'
    ];

    public function file()
    {
        return $this->belongsTo(FileApplyModel::class, 'id_berkas', 'id');
    }
    public function pelamar()
    {
        return $this->belongsTo(User::class, 'id_pelamar', 'id');
    }
    public function job()
    {
        return $this->belongsTo(JobModel::class, 'id_job', 'id');
    }
}
