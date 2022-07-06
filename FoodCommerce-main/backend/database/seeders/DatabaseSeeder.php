<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(UsersTableSeeder::class);
        $this->call(UserProfilesTableSeeder::class);
        $this->call(UserAddressesTableSeeder::class);
        $this->call(StoreProfilesTableSeeder::class);
        $this->call(ProductsTableSeeder::class);
        $this->call(ProductReviewsTableSeeder::class);
        $this->call(PersonalAccessTokensTableSeeder::class);
        $this->call(OrdersTableSeeder::class);
        $this->call(OrderItemsTableSeeder::class);
        $this->call(FmoodPaysTableSeeder::class);
        $this->call(CartsTableSeeder::class);
    }
}
