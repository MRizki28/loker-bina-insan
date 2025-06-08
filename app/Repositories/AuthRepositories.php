<?php

namespace App\Repositories;

use App\Http\Requests\Auth\AuthRequest;
use App\Interfaces\AuthInterfaces;
use App\Models\BiodataModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use MRizki28\ApiResponse\ApiResponse;

class AuthRepositories implements AuthInterfaces
{
    protected $userModel;
    protected $biodataModel;

    public function __construct(User $userModel, BiodataModel $biodataModel)
    {
        $this->userModel = $userModel;
        $this->biodataModel = $biodataModel;
    }

    public function login(AuthRequest $request)
    {
        try {
            $user = $this->userModel->where('email', $request->email)->first();

            if (!$user || !Auth::attempt($request->only('email', 'password'))) {
                return ApiResponse::unauthorized();
            }

            $token = $user->createToken('token')->plainTextToken;
            return ApiResponse::success([
                'token' => $token,
                'role' => $user->role
            ], 'Login Success', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function register(AuthRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = $this->userModel->create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'role' => 'user',
            ]);

            $this->biodataModel->create([
                'id_user' => $user->id,
                'address' => $request->address,
                'birth_place_date' => $request->birth_place_date,
                'mother_name' => $request->mother_name,
                'father_name' => $request->father_name,
                'child_order' => $request->child_order,
                'sibling_count' => $request->sibling_count,
            ]);

            DB::commit();

            $token = $user->createToken('token')->plainTextToken;
            return ApiResponse::success($token, 'Register Success', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user() ?? Auth::user();

            if ($user) {
                $user->tokens()->delete();
            }

            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'status' => 'success',
                'message' => 'Logout successful',
            ], 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function getDataUser(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $page = $search ? 1 : (int) $request->input('page', 1);

        $query = $this->userModel->query();

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }
        $data = $query->where('role', 'user')->paginate($limit, ['*'], 'page', $page);

        if ($data->isEmpty()) {
            return ApiResponse::notFound();
        }
        return ApiResponse::success($data, 'Success get data user', 200);
    }

    public function createDataUser(AuthRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $this->userModel->create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make('123456'),
                'role' => $request->role,
            ]);

            if($request->role === 'user') {
                $this->biodataModel->create([
                    'id_user' => $data->id,
                    'address' => $request->address,
                    'birth_place_date' => $request->birth_place_date,
                    'mother_name' => $request->mother_name,
                    'father_name' => $request->father_name,
                    'child_order' => $request->child_order,
                    'sibling_count' => $request->sibling_count,
                ]);
            }
            DB::commit();
            return ApiResponse::success($data, 'Success create data user', 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th, 500);
        }
    }

    public function getAllData(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $page = $search ? 1 : (int) $request->input('page', 1);

        $query = $this->userModel->query();

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }
        $data = $query->paginate($limit, ['*'], 'page', $page);

        if ($data->isEmpty()) {
            return ApiResponse::notFound();
        }
        return ApiResponse::success($data, 'Success get data user', 200);
    }

    public function getDataById($id)
    {
        $data = $this->userModel->with('biodata')->find($id);
        if(!$data){
            return ApiResponse::notFound();
        }

        return ApiResponse::success($data, 'SUccess get data by id', 200);
    }

    public function updateDataUser(AuthRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $data = $this->userModel->find($id);
            if (!$data) {
                return ApiResponse::notFound();
            }

            $data->name = $request->input('name');
            $data->email = $request->input('email');
            $data->phone = $request->input('phone');
            $data->password = $request->input('password') ? Hash::make($request->input('password')) : $data->password;
            $data->role = $request->input('role');
            $data->save();

            if($request->role === 'user') {
                $biodata = $this->biodataModel->where('id_user', $data->id)->first();
                if (!$biodata) {
                    return ApiResponse::notFound();
                }
                $biodata->address = $request->input('address');
                $biodata->birth_place_date = $request->input('birth_place_date');
                $biodata->mother_name = $request->input('mother_name');
                $biodata->father_name = $request->input('father_name');
                $biodata->child_order = $request->input('child_order');
                $biodata->sibling_count = $request->input('sibling_count');
                $biodata->save();
            }
            if ($data->role === 'admin' || $data->role === 'superadmin') {
                $biodata = $this->biodataModel->where('id_user', $data->id)->first();
                if ($biodata) {
                    $biodata->delete();
                }
            }
            DB::commit();

            return ApiResponse::success($data, 'Success update data user', 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponse::error($th, 500);
        }
    }

    public function deleteData($id)
    {
        try {
            $id_login = Auth::user()->id;
            $data = $this->userModel->find($id);

            if($id === $id_login){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cannot delete your self'
                ],422);
            }

            $data->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Success delete user'
            ]);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function setting(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), [
                'password_old' => 'required',
                'password' => 'required|confirmed|min:6',
                'password_confirmation' => 'required'
            ]);

            if ($validation->fails()) {
                return response()->json([
                    'status' => 'not validate',
                    'message' => 'Check your validation',
                    'errors' => $validation->errors()
                ],422);
            }

            $id = Auth::user()->id;
            $data = $this->userModel->where('id', $id)->first();
            if (!Hash::check($request->password_old, $data->password)) {
                return response()->json([
                    'code' => 200,
                    'message' => 'Old password is wrong'
                ]);
            }

            if (Hash::check($request->password, $data->password)) {
                return response()->json([
                    'code' => 200,
                    'message' => 'New password must be different from old password'
                ]);
            }

            $data->password = Hash::make($request->input('password'));
            $data->save();
            if ($data) {
                Auth::guard('web')->logout();
            
                if ($request->user()) {
                    // Hapus semua token user
                    $request->user()->tokens()->delete();
                    // atau kalau cuma token request saat ini
                    // $request->user()->currentAccessToken()->delete();
                }
            
                // Bersihkan session
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            
                return ApiResponse::success($data, 'Success update password', 200);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed update password'
                ], 422);
            }
            
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function getBiodata(Request $request)
    {
        try {
            $id = Auth::user()->id;
            $data = $this->biodataModel->where('id_user', $id)->first();

            if (!$data) {
                return ApiResponse::notFound();
            }

            return ApiResponse::success($data, 'Success get biodata', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }

    public function updateBiodata(AuthRequest $request)
    {
        try {
            $id = Auth::user()->id;
            $data = $this->biodataModel->where('id_user', $id)->first();

            if (!$data) {
                return ApiResponse::notFound();
            }

            $data->address = $request->input('address');
            $data->birth_place_date = $request->input('birth_place_date');
            $data->mother_name = $request->input('mother_name');
            $data->father_name = $request->input('father_name');
            $data->child_order = $request->input('child_order');
            $data->sibling_count = $request->input('sibling_count');
            $data->save();

            return ApiResponse::success($data, 'Success update biodata', 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th, 500);
        }
    }
}
