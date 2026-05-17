<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Usage extends Model
{
    use HasFactory, SoftDeletes;
    protected $with = ['bill', 'plnCustomer'];
    protected $withCount = ['bill', 'plnCustomer'];
    protected $guarded = [];

    public function bill()
    {
        return $this->hasOne(Bill::class, 'id_penggunaan');
    }

    public function plnCustomer()
    {
        return $this->belongsTo(PlnCustomer::class, 'id_pelanggan_pln');
    }

    public function getMeterAwalAttribute($value)
    {
        return sprintf("%08d", $value);
    }

    public function getMeterAkhirAttribute($value)
    {
        return sprintf("%08d", $value);
    }

    public function getStandMeter()
    {
        $standMeter = sprintf("%08d", $this->meter_akhir) . '-' . sprintf("%08d", $this->meter_akhir);
        return $standMeter; 
    }

    public function getMonthNameAttribute()
    {
        return Carbon::create(0, $this->bulan)->monthName;
    }
}
