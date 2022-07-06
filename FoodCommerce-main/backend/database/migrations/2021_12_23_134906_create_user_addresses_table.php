<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("user_id");
            $table->string('province',50);
            $table->integer('province_id');
            $table->integer('city_id');
            $table->string('city',50);
            $table->integer('zip_code');
            $table->text('address');
            $table->boolean('active');
            $table->string('receiver',100);
            $table->bigInteger("phone_number");
            $table->string('lable',10);
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
        Schema::dropIfExists('user_addresses');
    }
}
