<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class StoreProfilesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('store_profiles')->delete();
        
        \DB::table('store_profiles')->insert(array (
            0 => 
            array (
                'user_id' => 1,
                'name' => 'Arung Cakes',
                'city' => 'Jakarta Timur',
                'province' => 'DKI Jakarta',
                'city_id' => 154,
                'province_id' => 6,
                'description' => 'Arung Cakes menjual berbagai macam kue.
Catatan :
Semua order akan di kirim H+1 setelah order.',
                'address' => 'Jl. Tadika trate center tanah abang',
                'phone_number' => 8123477651,
                'img_store' => 'store-default.png',
                'zip_code' => 10021,
                'created_at' => '2022-01-25 10:34:54',
                'updated_at' => '2022-01-25 10:34:54',
            ),
        ));
        
        
    }
}