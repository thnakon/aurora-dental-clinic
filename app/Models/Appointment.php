<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = ['patient_id', 'doctor_id', 'service_id', 'datetime', 'status', 'type', 'note'];

    protected $casts = [
        'datetime' => 'datetime',
    ];

    public function patient() { return $this->belongsTo(Patient::class); }
    public function doctor() { return $this->belongsTo(Doctor::class); }
    public function service() { return $this->belongsTo(Service::class); }
    public function queueTicket() { return $this->hasOne(QueueTicket::class); }
}
