<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Booking;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Booking::factory()->create([

            'number_of_persons'=> 5,
            'user_id'=> 11 ,
            'accommodation_id'=> 1
        ]);
    }
}
