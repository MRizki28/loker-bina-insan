<?php
namespace App\Repositories;

use App\Http\Requests\Auth\AuthRequest;
use App\Interfaces\AuthInterfaces;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use MRizki28\ApiResponse\ApiResponse;

class AuthRepositories implements AuthInterfaces
{
    protected $userModel;

    public function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    public function login(AuthRequest $request)
    {
        try {
            if(!Auth::attempt($request->only('email','password'))){
                return ApiResponse::unauthorized();
            } else {
                $user = $this->userModel->where('email', $request->email)->first();
                $token = $user->createToken('token')->plainTextToken;
                return ApiResponse::success($token, 'Login Success', 200);
            };
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function register(AuthRequest $request)
    {
        try {
            $user = $this->userModel->create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'password' => Hash::make($request->password)
            ]);
            $token = $user->createToken('token')->plainTextToken;
            return ApiResponse::success($token, 'Register Success', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return response()->json([
                'status' => 'success',
                'message' => 'logout success',
            ], 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

}