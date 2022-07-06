<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserProfilesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('user_profiles')->delete();
        
        \DB::table('user_profiles')->insert(array (
            0 => 
            array (
                'user_id' => 1,
                'dob' => NULL,
                'gender' => NULL,
                'phone_number' => NULL,
                'profile_picture' => 'profile-pictures/0/user-default.png',
                'created_at' => '2022-01-25 10:32:54',
                'updated_at' => '2022-01-25 10:32:54',
            ),
            1 => 
            array (
                'user_id' => 2,
                'dob' => NULL,
                'gender' => NULL,
                'phone_number' => NULL,
                'profile_picture' => 'profile-pictures/0/user-default.png',
                'created_at' => '2022-01-25 11:37:05',
                'updated_at' => '2022-01-25 11:37:05',
            ),
        ));
        
        
    }
}