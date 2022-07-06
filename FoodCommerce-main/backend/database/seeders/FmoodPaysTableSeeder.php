<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FmoodPaysTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('fmood_pays')->delete();
        
        \DB::table('fmood_pays')->insert(array (
            0 => 
            array (
                'id' => 1,
                'user_id' => 1,
                'balance' => 3450000.0,
                'created_at' => '2022-01-25 10:32:54',
                'updated_at' => '2022-01-25 10:32:54',
            ),
            1 => 
            array (
                'id' => 2,
                'user_id' => 2,
                'balance' => 3450000.0,
                'created_at' => '2022-01-25 11:37:05',
                'updated_at' => '2022-01-25 11:37:05',
            ),
        ));
        
        
    }
}