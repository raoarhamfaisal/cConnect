<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_trade', function (Blueprint $table) {

            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('trade_id');
        
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('trade_id')->references('id')->on('trades')->onDelete('cascade');
        
            $table->primary(['post_id', 'trade_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_trade');
    }
};
