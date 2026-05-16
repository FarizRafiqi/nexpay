<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndonesiaCity extends Model
{
    use HasFactory;
    public $incrementing = false;
    protected $keyType = "char";

    public function province()
    {
        return $this->belongsTo(IndonesiaProvince::class, 'province_code', 'code');
    }

}
