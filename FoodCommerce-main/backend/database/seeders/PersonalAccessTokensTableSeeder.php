<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PersonalAccessTokensTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('personal_access_tokens')->delete();
        
        \DB::table('personal_access_tokens')->insert(array (
            0 => 
            array (
                'id' => 7,
                'tokenable_type' => 'App\\Models\\User',
                'tokenable_id' => 2,
                'name' => 'customer@gmail.com',
                'token' => 'b59f90e2472588e3fb76d97742c5f2d7a770929e5a596ea0d5e7b5098724812c',
                'abilities' => '["server:update"]',
                'last_used_at' => '2022-01-25 14:36:26',
                'created_at' => '2022-01-25 14:33:31',
                'updated_at' => '2022-01-25 14:36:26',
            ),
            1 => 
            array (
                'id' => 8,
                'tokenable_type' => 'App\\Models\\User',
                'tokenable_id' => 1,
                'name' => 'seller@gmail.com',
                'token' => '55dde4da5ad4b4b08c4a9019ce67acbd87586aff3bffa171c70b4d8f0488484e',
                'abilities' => '["server:update"]',
                'last_used_at' => '2022-01-25 14:39:13',
                'created_at' => '2022-01-25 14:36:39',
                'updated_at' => '2022-01-25 14:39:13',
            ),
        ));
        
        
    }
}