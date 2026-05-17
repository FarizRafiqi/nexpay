<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TariffRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'daya' => 'required|numeric|min:1',
            'tarif_per_kwh' => 'required|numeric|min:0',
            'golongan_tarif' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'daya.required' => 'Daya tidak boleh kosong',
            'daya.numeric' => 'Daya harus berupa angka',
            'tarif_per_kwh.required' => 'Tarif per kWh tidak boleh kosong',
            'tarif_per_kwh.numeric' => 'Tarif per kWh harus berupa angka',
        ];
    }
}
