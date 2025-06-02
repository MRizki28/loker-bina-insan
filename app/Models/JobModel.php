<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_job';    

    protected $fillable = [
        'id',
        'name',
        'description',
        'start_date',
        'end_date',
        'job_type',
        'category',
    ];

    public function criteria()
    {
        return $this->hasMany(CriteriaJobModel::class, 'id_job', 'id');
    }
}
