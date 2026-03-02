<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::latest()->paginate(10)
        ]);
    }

    public function create() { return Inertia::render('Admin/Services/Create'); }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration_minutes' => 'required|integer|min:5',
            'category' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        Service::create($validated);
        return redirect()->route('admin.services.index');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Edit', ['service' => $service]);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration_minutes' => 'required|integer|min:5',
            'category' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $service->update($validated);
        return redirect()->route('admin.services.index');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->route('admin.services.index');
    }
}
