<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthRequest;
use App\Repositories\AuthRepositories;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authRepositories;

    public function __construct(AuthRepositories $authRepositories)
    {
        $this->authRepositories = $authRepositories;
    }

    public function login(AuthRequest $request)
    {
        return $this->authRepositories->login($request);
    }

    public function register(AuthRequest $request)
    {
        return $this->authRepositories->register($request);
    }

    public function logout(Request $request)
    {
        return $this->authRepositories->logout($request);
    }

    public function getDataUser(Request $request)
    {
        return $this->authRepositories->getDataUser($request);
    }

    public function createDataUser(AuthRequest $request)
    {
        return $this->authRepositories->createDataUser($request);
    }

    public function getAllData(Request $request)
    {
        return $this->authRepositories->getAllData($request);
    }

    public function getDataById($id)
    {
        return $this->authRepositories->getDataById($id);
    }

    public function updateDataUser(AuthRequest $request, $id)
    {
        return $this->authRepositories->updateDataUser($request, $id);
    }
    
    public function deleteData($id){
        return $this->authRepositories->deleteData($id);
    }

    public function setting(Request $request)
    {
        return $this->authRepositories->setting($request);
    }
}
