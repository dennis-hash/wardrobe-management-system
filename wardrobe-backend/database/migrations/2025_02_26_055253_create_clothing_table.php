<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clothing', function (Blueprint $table) {
            $table->id('clothingId');
            $table->string('name');
            $table->string('description');
            $table->string('image')->nullable();
            $table->string('type')->nullable();
            $table->unsignedBigInteger('categoryId');
            $table->foreign('categoryId')->references('categoryId')->on('categories');
            $table->boolean('isFavorite');
            $table->string('color')->nullable();;
            $table->string('size')->nullable();;
            $table->string('season')->nullable();;
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clothing');
    }
};
