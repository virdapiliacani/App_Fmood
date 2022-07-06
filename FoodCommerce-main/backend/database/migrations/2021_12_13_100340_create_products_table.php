<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('name');
            $table->double('price');
            $table->integer('weight');
            $table->integer('stock');
            $table->longText('description');
            $table->string('img_main');
            $table->string('img_top')->nullable();
            $table->string('img_side')->nullable();
            $table->string('img_front')->nullable();
            $table->string('img_other')->nullable();  
            $table->string('video')->nullable(); 
            $table->string('main_category',30);
            $table->text('sub_category',200)->nullable();
            $table->string('reg_code')->nullable();
            $table->date('expired')->nullable();
            $table->integer('durability')->nullable();
            $table->boolean('preorder')->nullable();
            $table->boolean('discount')->nullable();
            $table->double('discount_price')->nullable();
            $table->boolean('hide')->nullable();
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
        Schema::dropIfExists('products');
    }
}
