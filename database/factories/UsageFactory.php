<?php

namespace Database\Factories;

use App\Models\PlnCustomer;
use App\Models\Usage;
use Illuminate\Database\Eloquent\Factories\Factory;

class UsageFactory extends Factory
{
    protected $model = Usage::class;

    public function definition()
    {
        return [
            'id_pelanggan_pln' => PlnCustomer::factory(),
            'bulan' => $this->faker->numberBetween(1, 12),
            'tahun' => date('Y'),
            'meter_awal' => $this->faker->numberBetween(0, 10000000),
            'meter_akhir' => $this->faker->numberBetween(10000000, 20000000),
        ];
    }
}
