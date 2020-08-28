<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeedFundos extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sql = base_path('database\seeds\sql\fundos.sql');

        DB::unprepared(file_get_contents($sql));
    }
}
