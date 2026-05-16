<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $appends = ['gambar_url'];

    public function getGambarUrlAttribute()
    {
        return $this->gambar ? \Illuminate\Support\Facades\Storage::url($this->gambar) : null;
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'id_metode_pembayaran');
    }
}
