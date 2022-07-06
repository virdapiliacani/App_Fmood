<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('users')->delete();
        
        \DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Arungs',
                'email' => 'seller@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$9HyEUG2/D.YVAao.9IQefOVW2hScx9O8syjW.UIiMxKRfRPMTndyu',
                'remember_token' => NULL,
                'created_at' => '2022-01-25 10:32:54',
                'updated_at' => '2022-01-25 14:36:55',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'customer',
                'email' => 'customer@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$afCBqt5zAJEnH8oS0uSTqePAeG5QkUf0QMfx8fhnNRBPDtI2ML9ci',
                'remember_token' => NULL,
                'created_at' => '2022-01-25 11:37:05',
                'updated_at' => '2022-01-25 11:37:05',
            ),
        ));
        
        
    }
}