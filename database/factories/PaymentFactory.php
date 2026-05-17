<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\PlnCustomer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition()
    {
        $status = ['success', 'failed', 'pending', 'expire'];
        return [
            'id_customer' => User::factory(),
            'id_pelanggan_pln' => PlnCustomer::factory(),
            'tanggal_bayar' => $this->faker->dateTimeThisMonth,
            'biaya_admin' => config('const.biaya_admin', 2500),
            'total_bayar' => $this->faker->numberBetween(10000, 10000000),
            'id_metode_pembayaran' => PaymentMethod::factory(),
            'status' => $this->faker->randomElement($status),
            'bukti_bayar' => 'n/a',
        ];
    }
}
