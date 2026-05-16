<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Table untuk mengatur besar pajak berdasarkan wilayah tertentu
 */
class CreateTaxRatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tax_rates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tax_type_id')->constrained();
            $table->char('indonesia_city_id', 4)->index();
            $table->decimal('rate', 10, 2); //dalam satuan persen (%)
            $table->foreign('indonesia_city_id')->references('code')->on(config('laravolt.indonesia.table_prefix').'cities');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tax_rates');
    }
}
