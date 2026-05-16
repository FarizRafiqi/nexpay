<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVillagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(config('laravolt.indonesia.table_prefix').'villages', function (Blueprint $table) {
            $table->char('code', 10);
            $table->char('district_code', 7);
            $table->string('name', 255);
            $table->text('meta')->nullable();
            $table->primary('code');
            $table->foreign('district_code')
                ->references('code')
                ->on(config('laravolt.indonesia.table_prefix').'districts')
                ->onUpdate('cascade')->onDelete('restrict');
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
        Schema::drop(config('laravolt.indonesia.table_prefix').'villages');
    }
}
