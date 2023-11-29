<?php

namespace Database\Factories;

use App\Models\RedFlag;
use Illuminate\Database\Eloquent\Factories\Factory;

class RedFlagFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RedFlag::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'profile_id' => $this->faker->numberBetween(1, 10),
            'region_id' => $this->faker->numberBetween(1, 10),
            'name_of_the_contractor_or_customer' => $this->faker->name,
            'complaint' => $this->faker->paragraph,
            'is_contractor_or_customer' => $this->faker->boolean,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
