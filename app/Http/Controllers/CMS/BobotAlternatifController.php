<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Repositories\BobotAlternatifRepositories;
use Illuminate\Http\Request;

class BobotAlternatifController extends Controller
{
    protected $bobotAlternatifRepositories;

    public function __construct(BobotAlternatifRepositories $bobotAlternatifRepositories)
    {
        $this->bobotAlternatifRepositories = $bobotAlternatifRepositories;
    }
    
    public function getAllData(Request $request){
        return $this->bobotAlternatifRepositories->getAllData($request);
    }

    public function getDataById($id){
        return $this->bobotAlternatifRepositories->getDataById($id);
    }

    public function updateData(Request $request, $id){
        return $this->bobotAlternatifRepositories->updateData($request, $id);
    }
}
