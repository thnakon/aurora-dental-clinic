<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['name' => 'General Consultation', 'price' => 500.00, 'duration_minutes' => 30, 'category' => 'General'],
            ['name' => 'Teeth Cleaning (Scaling)', 'price' => 1200.00, 'duration_minutes' => 45, 'category' => 'Preventive'],
            ['name' => 'Tooth Extraction', 'price' => 1500.00, 'duration_minutes' => 45, 'category' => 'Surgery'],
            ['name' => 'Root Canal Treatment', 'price' => 8500.00, 'duration_minutes' => 60, 'category' => 'Endodontics'],
            ['name' => 'Dental Filling', 'price' => 800.00, 'duration_minutes' => 30, 'category' => 'Restorative'],
            ['name' => 'Teeth Whitening', 'price' => 4500.00, 'duration_minutes' => 60, 'category' => 'Cosmetic'],
            ['name' => 'Orthodontic Consultation', 'price' => 1000.00, 'duration_minutes' => 30, 'category' => 'Orthodontics'],
            ['name' => 'Dental X-Ray', 'price' => 600.00, 'duration_minutes' => 15, 'category' => 'Diagnostic'],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(['name' => $service['name']], $service);
        }
    }
}
