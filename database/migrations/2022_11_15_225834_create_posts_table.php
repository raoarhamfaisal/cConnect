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
        Schema::create('posts', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('region_id');
            $table->boolean('view')->default(1);
            $table->string('title')->nullable();
            $table->string('image')->nullable();
            $table->text('body1')->nullable();
            $table->text('body2')->nullable();
            $table->boolean('body1Bold')->default(1);
            $table->smallInteger('body1ColorId')->default(1);
            $table->smallInteger('likes')->default(0);
            $table->smallInteger('repost')->default(0);
            $table->smallInteger('shares')->default(0);

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('region_id')->references('id')->on('regions');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
