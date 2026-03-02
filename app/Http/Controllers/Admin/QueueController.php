<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QueueTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class QueueController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $queues = QueueTicket::with(['appointment.patient.user', 'appointment.service', 'appointment.doctor.user'])
            ->whereHas('appointment', function($q) use ($today) {
                $q->whereDate('datetime', $today);
            })
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('Admin/Queue/Index', [
            'queues' => $queues
        ]);
    }

    public function update(Request $request, QueueTicket $queue)
    {
        $validated = $request->validate([
            'status' => 'required|in:waiting,calling,in_room,done,skipped'
        ]);

        $queue->update([
            'status' => $validated['status'],
        ]);

        if ($validated['status'] == 'calling') {
            $queue->update(['called_at' => now()]);
        } elseif ($validated['status'] == 'done') {
            $queue->update(['completed_at' => now()]);
            $queue->appointment->update(['status' => 'completed']);
        }

        return back()->with('success', "Queue {$queue->queue_number} updated to {$validated['status']}");
    }
}
