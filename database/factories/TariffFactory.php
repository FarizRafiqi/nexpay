<?php

namespace Database\Factories;

use App\Models\Tariff;
use Illuminate\Database\Eloquent\Factories\Factory;

class TariffFactory extends Factory
{
    protected $model = Tariff::class;

    public function definition()
    {
        return [
            'golongan_tarif' => $this->faker->randomElement(['R1', 'R2', 'R3', 'B1', 'B2', 'I1', 'I2', 'I3', 'I4', 'P1', 'P2']),
            'daya' => $this->faker->randomElement([450, 900, 1300, 2200, 3500, 4400, 5500, 6600, 10600, 13200]),
            'tarif_per_kwh' => $this->faker->randomFloat(2, 500, 2000),
        ];
    }
}
