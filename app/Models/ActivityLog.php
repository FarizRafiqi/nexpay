<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DateTimeInterface;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user', 'tabel_referensi', 
        'id_referensi', 'deskripsi'
    ];

    /**
     * Prepare a date for array / JSON serialization.
     *
     * @param  \DateTimeInterface  $date
     * @return string
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
