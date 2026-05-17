<?php

namespace Database\Factories;

use App\Models\PaymentMethod;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentMethodFactory extends Factory
{
    protected $model = PaymentMethod::class;

    public function definition()
    {
        $banks = ['BCA', 'Mandiri', 'BNI', 'BRI'];
        $bank = $this->faker->randomElement($banks);
        return [
            'nama' => "VA $bank",
            'slug' => strtolower("va-$bank"),
            'gambar' => 'img/payment-methods/' . strtolower($bank === 'Mandiri' ? 'mandiri' : $bank) . '-thumb.png',
            'deskripsi' => $this->faker->sentence,
        ];
    }
}
