<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiodataModel extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'tb_biodata';
    protected $fillable = [
        'id_user',
        'address',
        'birth_place_date',
        'mother_name',
        'father_name',
        'child_order',
        'sibling_count'
    ];
}
