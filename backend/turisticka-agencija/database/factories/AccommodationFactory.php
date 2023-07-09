<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Accommodation>
 */
class AccommodationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'location' => $this->faker->address(),
            'capacity' => $this->faker->randomNumber(2, 20),
            'price_per_person' => $this->faker->randomFloat(2, 1000, 10000)
        ];
    }
}
