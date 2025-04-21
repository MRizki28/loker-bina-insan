<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'adminsit@sit.com',
            'phone' => '08000000000',
            'role' => 'superadmin',
            'password' => Hash::make('123456'),
        ]);

        $this->call([
            KriteriaSeeder::class,
            AlternatifSeeder::class,
        ]);
    }
}
