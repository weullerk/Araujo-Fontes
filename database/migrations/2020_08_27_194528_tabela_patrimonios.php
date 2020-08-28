<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TabelaPatrimonios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patrimonios', function (Blueprint $table) {
            $table->integerIncrements('id');
            $table->dateTime('date');
            $table->unsignedInteger('fundo_id');
            $table->decimal('value', 15);
            $table->timestamps(0);

            $table->foreign('fundo_id')
                ->references('id')
                ->on('fundos')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('patrimonios');
    }
}
