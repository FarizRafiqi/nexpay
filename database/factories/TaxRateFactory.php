<?php

namespace Database\Factories;

use App\Models\TaxRate;
use App\Models\TaxType;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaxRateFactory extends Factory
{
    protected $model = TaxRate::class;

    public function definition()
    {
        return [
            'tax_type_id' => TaxType::factory(),
            'indonesia_city_id' => '1101',
            'rate' => $this->faker->randomFloat(2, 0.5, 10),
        ];
    }
}
