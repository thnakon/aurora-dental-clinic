<?php

use App\Models\User;
use App\Models\Patient;
use App\Models\Service;
use App\Models\Doctor;
use Illuminate\Support\Carbon;

test('patient can book appointment', function () {
    $user = User::factory()->create();
    // Assuming Spatie roles are loaded or we mock it
    // $user->assignRole('patient');
    $patient = Patient::create(['user_id' => $user->id, 'hn' => 'TESTHN-123']);

    $doctorUser = User::factory()->create();
    $doctor = Doctor::create(['user_id' => $doctorUser->id]);

    $service = Service::create([
        'name' => 'Test Service',
        'price' => 100,
        'duration_minutes' => 30
    ]);

    $response = $this->actingAs($user)->post('/portal/booking', [
        'service_id' => $service->id,
        'doctor_id' => $doctor->id,
        'datetime' => Carbon::tomorrow()->toDateTimeString(),
        'note' => 'Test Note'
    ]);

    $response->assertRedirect('/portal/dashboard');
    $this->assertDatabaseHas('appointments', [
        'service_id' => $service->id,
        'doctor_id' => $doctor->id,
    ]);
});
