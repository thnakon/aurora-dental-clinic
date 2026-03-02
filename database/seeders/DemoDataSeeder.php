<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\QueueTicket;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $doctorUser = User::firstOrCreate(
            ['email' => 'alice@auroradental.com'],
            ['name' => 'Dr. Alice Surgeon', 'password' => Hash::make('password')]
        );
        $doctorUser->assignRole('doctor');
        
        $doc2 = Doctor::firstOrCreate(
            ['user_id' => $doctorUser->id],
            ['specialization' => 'Oral Surgeon', 'license_no' => 'OS-987654']
        );
        
        $doc1 = Doctor::firstOrCreate(
            ['user_id' => User::where('email', 'doctor@auroradental.com')->first()->id],
            ['specialization' => 'General Dentist', 'license_no' => 'GD-123456']
        );

        $patientsData = [
            ['name' => 'John Doe Patient', 'email' => 'johndoe@example.com', 'phone' => '0812345678'],
            ['name' => 'Jane Smith Patient', 'email' => 'janesmith@example.com', 'phone' => '0898765432'],
            ['name' => 'Bob Marley', 'email' => 'bob@example.com', 'phone' => '0871112233'],
        ];

        $patients = [];
        foreach ($patientsData as $index => $pd) {
            $u = User::firstOrCreate(
                ['email' => $pd['email']],
                ['name' => $pd['name'], 'password' => Hash::make('password')]
            );
            $u->assignRole('patient');
            
            $patients[] = Patient::firstOrCreate(
                ['user_id' => $u->id],
                [
                    'hn' => 'HN-' . str_pad(1000 + $index, 6, '0', STR_PAD_LEFT),
                    'phone' => $pd['phone'],
                    'dob' => Carbon::now()->subYears(20 + $index)->format('Y-m-d'),
                ]
            );
        }

        $serviceIds = Service::pluck('id')->toArray();
        if (empty($serviceIds)) return;

        $statuses = ['pending', 'confirmed', 'in_progress', 'completed'];

        if (Appointment::count() == 0) {
            for ($i = 0; $i < 5; $i++) {
                $appointment = Appointment::create([
                    'patient_id' => $patients[array_rand($patients)]->id,
                    'doctor_id' => ($i % 2 == 0) ? $doc1->id : $doc2->id,
                    'service_id' => $serviceIds[array_rand($serviceIds)],
                    'datetime' => Carbon::today()->addHours(9 + $i),
                    'status' => $statuses[array_rand($statuses)],
                    'type' => 'walk_in',
                ]);

                if ($appointment->status != 'pending') {
                    QueueTicket::create([
                        'appointment_id' => $appointment->id,
                        'queue_number' => 'A' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
                        'status' => ($appointment->status == 'completed') ? 'done' : 'waiting',
                    ]);
                }
            }
        }
    }
}
