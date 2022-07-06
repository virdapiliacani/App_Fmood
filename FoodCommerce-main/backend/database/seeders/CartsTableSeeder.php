<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CartsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('carts')->delete();
        
        \DB::table('carts')->insert(array (
            0 => 
            array (
                'id' => 1,
                'user_id' => 2,
                'product_id' => 1,
                'quantity' => 2,
                'note' => NULL,
                'sell_price' => 89900.0,
                'created_at' => '2022-01-25 11:39:47',
                'updated_at' => '2022-01-25 11:39:47',
            ),
        ));
        
        
    }
}