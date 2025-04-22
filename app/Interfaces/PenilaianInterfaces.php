<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface PenilaianInterfaces {
    public function createPenilaianBerkas(Request $request);
    public function getKriteriaForBerkasReview();
}