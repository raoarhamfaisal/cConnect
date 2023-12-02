<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'user_id' => 'required',
            'title' => ['required', 'max:255'],
            'image' => ['max:5000'],
            'body1' => 'required',
            'body2' => '',

            'is_body_bold' => 'boolean', // Assuming it's a boolean value
            'post_text_color_id' => 'nullable|exists:post_colors,id', // Ensure it exists in post_colors table
            'post_background_color_id' => 'nullable|exists:post_colors,id', // Ensure it exists in post_colors table
            'font_size' => 'nullable|string',
            'text_alignment' => 'in:left,center,right',

            'title_text_alignment' => 'nullable|in:left,center,right',
            'title_text_color_id' => 'nullable|exists:post_colors,id',
            'title_background_color_id' => 'nullable|exists:post_colors,id',
                
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
            'user_id' => 'User ID required!',
            'title' => 'Post Title is Required!',
            'body1' => 'Body Text is Required!',
            'body2' => 'Body Text is Required!',
        ];
    }

}
