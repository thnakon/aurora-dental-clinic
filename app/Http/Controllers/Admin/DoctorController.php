<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DoctorController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Doctors/Index', [
            'doctors' => Doctor::with('user')->latest()->paginate(10)
        ]);
    }

    public function create() { return Inertia::render('Admin/Doctors/Create'); }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'specialization' => 'nullable|string|max:255',
            'license_no' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make('password123'),
            ]);
            $user->assignRole('doctor');

            Doctor::create([
                'user_id' => $user->id,
                'specialization' => $validated['specialization'],
                'license_no' => $validated['license_no'],
                'bio' => $validated['bio'],
            ]);
        });
        return redirect()->route('admin.doctors.index');
    }

    public function edit(Doctor $doctor)
    {
        $doctor->load('user');
        return Inertia::render('Admin/Doctors/Edit', ['doctor' => $doctor]);
    }

    public function update(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$doctor->user_id,
            'specialization' => 'nullable|string|max:255',
            'license_no' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated, $doctor) {
            $doctor->user->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
            ]);
            $doctor->update([
                'specialization' => $validated['specialization'],
                'license_no' => $validated['license_no'],
                'bio' => $validated['bio'],
            ]);
        });
        return redirect()->route('admin.doctors.index');
    }

    public function destroy(Doctor $doctor)
    {
        $doctor->user()->delete();
        return redirect()->route('admin.doctors.index');
    }
}
