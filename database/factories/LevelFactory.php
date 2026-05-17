<?php

namespace Database\Factories;

use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

class LevelFactory extends Factory
{
    protected $model = Level::class;

    public function definition()
    {
        return [
            'level' => $this->faker->randomElement(['administrator', 'bank', 'pelanggan']),
        ];
    }
}
