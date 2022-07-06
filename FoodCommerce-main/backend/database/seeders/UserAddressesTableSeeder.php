<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserAddressesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('user_addresses')->delete();
        
        \DB::table('user_addresses')->insert(array (
            0 => 
            array (
                'id' => 1,
                'user_id' => 2,
                'province' => 'Sumatera Barat',
                'province_id' => 32,
                'city_id' => 453,
                'city' => 'Tanah Datar',
                'zip_code' => 62881,
                'address' => 'Jl. Dr moh hatta no 45B, kec pauh , kel kapalo koto',
                'active' => 1,
                'receiver' => 'customer',
                'phone_number' => 628237865331,
                'lable' => 'kantor',
                'created_at' => '2022-01-25 11:40:59',
                'updated_at' => '2022-01-25 11:40:59',
            ),
        ));
        
        
    }
}