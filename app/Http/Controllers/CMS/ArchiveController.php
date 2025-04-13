<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Repositories\ArchiveRepositories;
use Illuminate\Http\Request;

class ArchiveController extends Controller
{
    protected $archiveRepositories;

    public function __construct(ArchiveRepositories $archiveRepositories)
    {
        $this->archiveRepositories = $archiveRepositories;
    }
    

    public function getAllData(Request $request)
    {
        return $this->archiveRepositories->getAllData($request);
    }

    public function getDataById($id)
    {
        return $this->archiveRepositories->getDataById($id);
    }

    public function getHistoryByUser(Request $request)
    {
        return $this->archiveRepositories->getHistoryByUser($request);
    }

    public function review(Request $request, $id)
    {
        return $this->archiveRepositories->review($request, $id);
    }

    
}
