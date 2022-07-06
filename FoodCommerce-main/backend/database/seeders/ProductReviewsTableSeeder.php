<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ProductReviewsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('product_reviews')->delete();
        
        \DB::table('product_reviews')->insert(array (
            0 => 
            array (
                'id' => 1,
                'product_id' => 1,
                'user_id' => 2,
                'order_id' => 1,
                'rating' => 5,
                'review' => 'Macaroon nya enak banget, banyak pilihan rasa . wajib beli lagi!!',
                'created_at' => '2022-01-25 11:43:10',
                'updated_at' => '2022-01-25 11:43:10',
            ),
        ));
        
        
    }
}