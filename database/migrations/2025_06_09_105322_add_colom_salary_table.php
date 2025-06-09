<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tb_job', function (Blueprint $table) {
            $table->unsignedBigInteger('salary_min')->after('category');
            $table->unsignedBigInteger('salary_max')->after('salary_min');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tb_job', function (Blueprint $table) {
            $table->dropColumn(['salary_min', 'salary_max']);
        });
    }
};
