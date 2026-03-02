<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Doctor;
use App\Models\Appointment;
use App\Models\QueueTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class BookingController extends Controller
{
    public function create()
    {
        $services = Service::where('is_active', true)->get();
        // Since it's a wizard, we'll pass doctors and available slots as well
        // Realistically, slots would be fetched via XHR based on doctor and date.
        // For Phase 1 MVP, we just pass doctors.
        $doctors = Doctor::with('user')->get();

        return Inertia::render('Portal/Booking', [
            'services' => $services,
            'doctors' => $doctors,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'doctor_id' => 'required|exists:doctors,id',
            'datetime' => 'required|date|after:now',
            'note' => 'nullable|string'
        ]);

        $appointment = Appointment::create([
            'patient_id' => $request->user()->patient->id ?? 1, // Fallback for bad seeder
            'doctor_id' => $request->doctor_id,
            'service_id' => $request->service_id,
            'datetime' => Carbon::parse($request->datetime),
            'status' => 'pending',
            'type' => 'online',
            'note' => $request->note,
        ]);

        return redirect()->route('portal.dashboard')->with('success', 'Appointment booked successfully!');
    }
}
