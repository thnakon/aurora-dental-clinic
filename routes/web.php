<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        if ($user->hasRole(['admin', 'doctor', 'receptionist'])) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('portal.dashboard');
    })->name('dashboard');

    // Admin/Staff Routes
    Route::middleware(['role:admin|doctor|receptionist'])->prefix('admin')->name('admin.')->group(function () {
        Route::inertia('dashboard', 'Admin/Dashboard')->name('dashboard');
        // Placeholder routes for admin entities
        Route::resource('queue', \App\Http\Controllers\Admin\QueueController::class)->only(['index', 'update']);
        Route::resource('patients', \App\Http\Controllers\Admin\PatientController::class);
        Route::resource('services', \App\Http\Controllers\Admin\ServiceController::class);
        Route::resource('doctors', \App\Http\Controllers\Admin\DoctorController::class);
        Route::inertia('appointments', 'Admin/Appointments/Index')->name('appointments.index');
        Route::inertia('billing', 'Admin/Billing/Index')->name('billing.index');
        Route::inertia('inventory', 'Admin/Inventory/Index')->name('inventory.index');
        Route::inertia('reports', 'Admin/Reports/Index')->name('reports.index');
        Route::inertia('settings', 'Admin/Settings/Index')->name('settings.index');
    });

    // Patient Portal Routes
    Route::middleware(['role:patient'])->prefix('portal')->name('portal.')->group(function () {
        Route::inertia('dashboard', 'Portal/Dashboard')->name('dashboard');
        Route::get('booking', [\App\Http\Controllers\Portal\BookingController::class, 'create'])->name('booking.create');
        Route::post('booking', [\App\Http\Controllers\Portal\BookingController::class, 'store'])->name('booking.store');
        Route::inertia('appointments', 'Portal/Appointments/Index')->name('appointments.index');
    });
});

require __DIR__.'/settings.php';
