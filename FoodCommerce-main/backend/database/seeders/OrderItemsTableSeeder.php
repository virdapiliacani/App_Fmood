<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class OrderItemsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('order_items')->delete();
        
        \DB::table('order_items')->insert(array (
            0 => 
            array (
                'id' => 1,
                'order_id' => 1,
                'product_id' => 1,
                'quantity' => 2,
                'created_at' => '2022-01-25 11:41:18',
                'updated_at' => '2022-01-25 11:41:18',
            ),
        ));
        
        
    }
}