<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {

        return Auth::hasUser();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => ['required', 'max:255'],
            'body1' => 'required',
            'body2' => '',

        ];
    }

    /**
     * Get the message text that apply to the request.
     *
     * @return array<string, mixed>
     */

    public function messages()
    {
        return [
            'title' => 'Post Title is Required!',
            'body1' => 'Body Text is Required!',
            'body2' => 'Body Text is Required!',
        ];
    }

}
