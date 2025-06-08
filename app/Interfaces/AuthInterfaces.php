<?php

namespace App\Interfaces;

use App\Http\Requests\Auth\AuthRequest;
use Illuminate\Http\Request;

interface AuthInterfaces
{
    public function login(AuthRequest $request);
    public function register(AuthRequest $request);
    public function logout(Request $request);
    public function getDataUser(Request $request);
    public function createDataUser(AuthRequest $request);
    public function getAllData(Request $request);
    public function getDataById($id);
    public function updateDataUser(AuthRequest $request, $id);
    public function deleteData($id);
    public function setting(Request $request);
    public function getBiodata(Request $request);
    public function updateBiodata(AuthRequest $request);
}
