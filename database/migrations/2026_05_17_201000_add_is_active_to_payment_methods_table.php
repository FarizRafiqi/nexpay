<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsActiveToPaymentMethodsTable extends Migration
{
    public function up()
    {
        Schema::table('payment_methods', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('deskripsi');
        });
    }

    public function down()
    {
        Schema::table('payment_methods', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
}
