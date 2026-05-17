<?php

namespace Database\Factories;

use App\Models\TaxType;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaxTypeFactory extends Factory
{
    protected $model = TaxType::class;

    public function definition()
    {
        return [
            'name' => $this->faker->randomElement(['PPN', 'PPh', 'PBB', 'BPHTB']),
            'description' => $this->faker->sentence,
        ];
    }
}
