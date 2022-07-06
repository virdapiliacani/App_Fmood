<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoreProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_profiles', function (Blueprint $table) {
            $table->bigInteger('user_id');
            $table->string('name');
            $table->string('city',50);;
            $table->string('province',50);
            $table->integer('city_id');
            $table->integer('province_id');
            $table->text('description')->nullable();
            $table->text('address')->nullable();
            $table->bigInteger('phone_number')->nullable();
            $table->text('img_store')->nullable();
            $table->integer('zip_code')->nullable();
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
        Schema::dropIfExists('store_profiles');
    }
}
