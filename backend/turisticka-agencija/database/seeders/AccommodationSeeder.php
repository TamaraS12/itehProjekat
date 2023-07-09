<?php

namespace Database\Seeders;

use App\Models\Accommodation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccommodationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Accommodation::truncate();

        $accommodation1 = Accommodation::create([
            'name'=>'Stankovic',
            'location'=>'Zajecar',
            'type'=>'Vila',
            'capacity'=>7,
            'price_per_person'=>50.00,
            'photo'=>'zajecar.jpg'
        ]);

        Accommodation::factory()->create([
            'name'=>'Sunce',
            'type'=>'Apartman',
            'photo'=>'hotelSunce.jpg'
        ]);

        Accommodation::factory()->create([
            'name'=>'Biser Jadrana',
            'type'=>'Apartman',
            'photo'=>'biserJadrana.jpg'
        ]);

        Accommodation::factory()->create([
            'name'=>'Rezidencija Peric',
            'type'=>'Kuca',
            'photo'=>'rezidencijaPeric.jpg'
        ]);
    }
}
