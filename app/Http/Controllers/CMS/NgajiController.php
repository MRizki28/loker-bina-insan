<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ngaji\NgajiRequest;
use App\Repositories\NgajiRepositories;
use Illuminate\Http\Request;

class NgajiController extends Controller
{
    protected $ngajiRepositories;

    public function __construct(NgajiRepositories $ngajiRepositories)
    {
        $this->ngajiRepositories = $ngajiRepositories;
    }
    
    public function getAllData(Request $request)
    {
        return $this->ngajiRepositories->getAllData($request);
    }

    public function getHistoryByUser(Request $request)
    {
        return $this->ngajiRepositories->getHistoryByUser($request);
    }

    public function approve(Request $request, $id)
    {
        return $this->ngajiRepositories->approve($request, $id);
    }

    public function reject(Request $request, $id)
    {
        return $this->ngajiRepositories->reject($request, $id);
    }

    public function updateData(NgajiRequest $request, $id)
    {
        return $this->ngajiRepositories->updateData($request, $id);
    }
}
