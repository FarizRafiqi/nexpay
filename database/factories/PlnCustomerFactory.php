<?php

namespace Database\Factories;

use App\Models\PlnCustomer;
use App\Models\Tariff;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlnCustomerFactory extends Factory
{
    protected $model = PlnCustomer::class;

    public function definition()
    {
        return [
            'nama_pelanggan' => $this->faker->name,
            'nomor_meter' => $this->faker->numerify('############'),
            'alamat' => $this->faker->address,
            'id_tarif' => Tariff::factory(),
            'id_kota' => '1101',
        ];
    }
}
