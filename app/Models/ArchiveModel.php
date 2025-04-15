<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchiveModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_archive';
    protected $fillable = [
        'id_pelamar',
        'id_file',
        'file',
        'reason',
        'reason_reject',
        'id_job',
        'name',
        'description',
        'qualification',
        'requirement',
        'start_date',
        'end_date',
        'job_type',
        'category'
    ];
    
    protected $casts = [
        'qualification' => 'array',
        'requirement' => 'array',
    ];

    public function pelamar()
    {
        return $this->belongsTo(User::class, 'id_pelamar');
    }
    
}
