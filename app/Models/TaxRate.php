<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaxRate extends Model
{
    use HasFactory;
    protected $with = ['city', 'taxType'];
    protected $guarded = [];
    public function city()
    {
        return $this->belongsTo(IndonesiaCity::class, 'indonesia_city_id', 'code');
    }

    public function taxType()
    {
        return $this->belongsTo(TaxType::class);
    }
}
