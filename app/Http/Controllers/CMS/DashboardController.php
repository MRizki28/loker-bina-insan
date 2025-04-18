<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\FileApplyModel;
use App\Models\JobModel;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard(){
        $totalUser = User::count();
        $totalFileApply = FileApplyModel::count();
        $totalLoker = JobModel::count();

        return response()->json([
            'totalUser' => $totalUser ?? 0,
            'totalFileApply' => $totalFileApply ?? 0,
            'totalLoker' => $totalLoker ?? 0
        ]);
    }
}
