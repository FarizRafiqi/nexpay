<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tariff extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    
    public function plnCustomers()
    {
        return $this->hasMany(PlnCustomer::class, 'id_tarif');
    }

    public function getFormattedTarifPerKwhAttribute()
    {
        $tarifPerKwh = number_format($this->tarif_per_kwh, 2, ',', '.');
        return "Rp $tarifPerKwh";
    }

    public function getFormattedDayaAttribute()
    {
        $daya = number_format($this->daya, 0, ",", ".") . " VA";
        return $daya;
    }
}
