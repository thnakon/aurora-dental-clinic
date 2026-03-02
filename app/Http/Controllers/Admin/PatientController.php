<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::with('user')->latest()->paginate(10);
        return Inertia::render('Admin/Patients/Index', [
            'patients' => $patients
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Patients/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20',
            'hn' => 'required|string|unique:patients',
            'dob' => 'nullable|date',
            'address' => 'nullable|string',
            'blood_type' => 'nullable|string',
            'allergy' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make('password123'),
            ]);
            $user->assignRole('patient');

            Patient::create([
                'user_id' => $user->id,
                'hn' => $validated['hn'],
                'phone' => $validated['phone'],
                'dob' => $validated['dob'],
                'address' => $validated['address'],
                'blood_type' => $validated['blood_type'],
                'allergy' => $validated['allergy'],
            ]);
        });

        return redirect()->route('admin.patients.index')->with('success', 'Patient created successfully.');
    }

    public function edit(Patient $patient)
    {
        $patient->load('user');
        return Inertia::render('Admin/Patients/Edit', [
            'patient' => $patient
        ]);
    }

    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$patient->user_id,
            'phone' => 'required|string|max:20',
            'hn' => 'required|string|unique:patients,hn,'.$patient->id,
            'dob' => 'nullable|date',
            'address' => 'nullable|string',
            'blood_type' => 'nullable|string',
            'allergy' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated, $patient) {
            $patient->user->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
            ]);

            $patient->update([
                'hn' => $validated['hn'],
                'phone' => $validated['phone'],
                'dob' => $validated['dob'],
                'address' => $validated['address'],
                'blood_type' => $validated['blood_type'],
                'allergy' => $validated['allergy'],
            ]);
        });

        return redirect()->route('admin.patients.index')->with('success', 'Patient updated successfully.');
    }

    public function destroy(Patient $patient)
    {
        $patient->user()->delete();
        return redirect()->route('admin.patients.index')->with('success', 'Patient deleted successfully.');
    }
}
