<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CriteriaJobModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_job_criteria';
    protected $fillable = [
        'id',
        'id_job',
        'field',
        'operator',
        'value'
    ];
}
