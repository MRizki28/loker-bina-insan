<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [];
        if($this->is('api/v1/auth/login')) {
            $rules = [
                'email' => 'required|email',
                'password' => 'required|string',
            ];
        } elseif($this->is('v1/auth/register')) {
            $rules = [
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed',
                'password_confirmation' => 'required',
                'phone' => 'required|string|min:12|max:12',
                'address' => 'required',
                'birth_place_date' => 'required|string',
                'mother_name' => 'required|string',
                'father_name' => 'required|string',
                'child_order' => 'required|integer',
                'sibling_count' => 'required|integer',
            ];
        }elseif ($this->is('v1/auth/create-data-user')) {
            $rules = [
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'phone' => 'required|string|min:12|max:12',
                'role' => 'required|in:superadmin,admin,user',
                'address' => 'required_if:role,user',
                'birth_place_date' => 'required_if:role,user|string',
                'mother_name' => 'required_if:role,user|string',
                'father_name' => 'required_if:role,user|string',
                'child_order' => 'required_if:role,user|integer',
                'sibling_count' => 'required_if:role,user|integer',
            ];
        }elseif($this->is('v1/auth/update-data-user/*')) {
            $rules = [
                'name' => 'required|string',
                'email' => [
                    'required',
                    Rule::unique('users', 'email')->ignore($this->route('id')),
                ],
                'phone' => 'required|string|min:12|max:12',
                'role' => 'required|in:superadmin,admin,user',
                'password' => 'nullable',
                'address' => 'required_if:role,user',
                'birth_place_date' => 'required_if:role,user|string',
                'mother_name' => 'required_if:role,user|string',
                'father_name' => 'required_if:role,user|string',
                'child_order' => 'required_if:role,user|integer',
                'sibling_count' => 'required_if:role,user|integer',
            ];

        }elseif($this->is('v1/biodata/update')){
            $rules = [
                'address' => 'required',
                'birth_place_date' => 'required|string',
                'mother_name' => 'required|string',
                'father_name' => 'required|string',
                'child_order' => 'required|integer',
                'sibling_count' => 'required|integer',
            ];
        }
        return $rules;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => "not validate",
            'message' => 'Check your validation',
            'data' => $validator->errors(),
        ], 422));
    }
}
