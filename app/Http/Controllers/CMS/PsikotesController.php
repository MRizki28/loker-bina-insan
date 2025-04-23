<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Psikotes\PsikotesRequest;
use App\Repositories\PsikotesRepositories;
use Illuminate\Http\Request;

class PsikotesController extends Controller
{
    protected $psikotesRepositories;

    public function __construct(PsikotesRepositories $psikotesRepositories)
    {
        $this->psikotesRepositories = $psikotesRepositories;
    }
    

    public function getAllData(Request $request)
    {
        return $this->psikotesRepositories->getAllData($request);
    }

    public function getHistoryByUser(Request $request)
    {
        return $this->psikotesRepositories->getHistoryByUser($request);
    }

    public function approve(Request $request, $id)
    {
        return $this->psikotesRepositories->approve($request, $id);
    }

    public function reject(Request $request, $id)
    {
        return $this->psikotesRepositories->reject($request, $id);
    }

    public function updateData(PsikotesRequest $request, $id)
    {
        return $this->psikotesRepositories->updateData($request, $id);
    }
}
