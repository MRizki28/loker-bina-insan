<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface PenilaianInterfaces {
    public function createPenilaianBerkas(Request $request);
    public function getKriteriaForBerkasReview();
    public function getKriteriaForInterviewReview();
    public function createPenilaianInterview(Request $request);
    public function getKriteriaForNgaji();
    public function createPenilaianNgaji(Request $request);
    public function getKriteriaForPsikotes();
    public function createPenilaianPsikotes(Request $request);
}