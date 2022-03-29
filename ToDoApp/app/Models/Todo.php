<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    public function status() {
        return $this->belongsTo(Status::class);
    }

    public function important() {
        return $this->belongsTo(Level::class, 'important_id');
    }

    public function urgent() {
        return $this->belongsTo(Level::class, 'urgent_id');
    }
}
