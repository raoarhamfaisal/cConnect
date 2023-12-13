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
            $table->unsignedBigInteger('original_post_id')->nullable();
            $table->unsignedBigInteger('original_user_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('region_id')->default(1);;
            $table->boolean('view')->default(1);
            $table->string('title')->nullable();
            $table->text('image')->nullable();
            $table->longText('body1')->nullable();
            $table->text('body2')->nullable();

            $table->boolean('is_body_bold')->default(0);
            $table->unsignedBigInteger('post_text_color_id')->nullable();
            $table->unsignedBigInteger('post_background_color_id')->nullable();
            $table->string('font_size')->nullable();
            $table->string('text_alignment')->default('left');
            $table->string('title_text_alignment')->default('left')->nullable();
            $table->unsignedBigInteger('title_text_color_id')->nullable();
            $table->unsignedBigInteger('title_background_color_id')->nullable();

            $table->unsignedBigInteger('likes')->default(0);
            $table->unsignedBigInteger('repost')->default(0);
            $table->unsignedBigInteger('shares')->default(0);


            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('original_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('region_id')->references('id')->on('regions');
            $table->foreign('post_text_color_id')->references('id')->on('post_colors');
            $table->foreign('post_background_color_id')->references('id')->on('post_colors');

            $table->foreign('original_post_id')->references('id')->on('posts')->onDelete('cascade');


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
