<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InputFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'begin_date' => ['required', 'regex:/[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}/', 'max:10', 'min:10'],
            'begin_time' => ['required', 'regex:/[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}/', 'max:8', 'min:8'],
            'finish_time' => ['required', 'regex:/[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}/', 'max:8', 'min:8'],
            'memo' => 'nullable'
        ];
    }

    public function messages()
    {
        return [
            'begin_date.regex' => 'YYYY-MM-DD 形式で入力してください',
            'begin_date.min' => '文字数(10文字)オーバーです。',
            'begin_date.required' => 'ここの項目は必須です。',
            'begin_time.regex' => 'HH:MM:SS 形式で入力してください',
            'begin_time.max' => '文字数(8文字)オーバーです。',
            'begin_time.required' => 'ここの項目は必須です。',
            'finish_time.regex' => 'HH:MM:SS 形式で入力してください',
            'finish_time.max' => '文字数(8文字)オーバーです。',
            'finish_time.required' => 'ここの項目は必須です。'
        ];
    }
}