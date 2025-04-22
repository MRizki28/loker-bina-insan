<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Repositories\PenilaianRepositories;
use Illuminate\Http\Request;

class PenilaianController extends Controller
{
    protected $penilaianRepositories;

    public function __construct(PenilaianRepositories $penilaianRepositories)
    {
        $this->penilaianRepositories = $penilaianRepositories;
    }

    public function createPenilaianBerkas(Request $request)
    {
        return $this->penilaianRepositories->createPenilaianBerkas($request);
    }

    public function getKriteriaForBerkasReview()
    {
        return $this->penilaianRepositories->getKriteriaForBerkasReview();
    }
}
