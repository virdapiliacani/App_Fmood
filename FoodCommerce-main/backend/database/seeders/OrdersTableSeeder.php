<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('orders')->delete();
        
        \DB::table('orders')->insert(array (
            0 => 
            array (
                'id' => 1,
                'user_id' => 2,
                'store_id' => 1,
                'total_cost' => 222800.0,
                'shipment_cost' => 43000.0,
                'product_cost' => 179800.0,
                'payment_id' => 0,
                'shipment_service' => 'REG',
                'shipment_code' => 'JP9903341',
                'user_address' => 'customer<br/>628237865331 <br/>Jl. Dr moh hatta no 45B, kec pauh , kel kapalo koto<br/>Tanah Datar,62881<br/>Sumatera Barat',
                'status' => 'reviewed',
                'required_date' => NULL,
                'shipped_date' => NULL,
                'created_at' => '2022-01-25 11:41:18',
                'updated_at' => '2022-01-25 14:35:54',
            ),
        ));
        
        
    }
}