<?php

namespace Database\Factories;

use App\Models\Bill;
use App\Models\Usage;
use Illuminate\Database\Eloquent\Factories\Factory;

class BillFactory extends Factory
{
    protected $model = Bill::class;

    public function definition()
    {
        $status = ['BELUM LUNAS', 'LUNAS'];
        return [
            'id_penggunaan' => Usage::factory(),
            'bulan' => $this->faker->numberBetween(1, 12),
            'tahun' => $this->faker->year(),
            'jumlah_kwh' => $this->faker->numberBetween(1, 500),
            'status' => $this->faker->randomElement($status),
        ];
    }
}
