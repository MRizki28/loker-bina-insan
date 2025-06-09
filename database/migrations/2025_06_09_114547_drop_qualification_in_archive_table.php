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
        Schema::table('tb_archive', function (Blueprint $table) {
            $table->dropColumn("qualification");
            $table->dropColumn("requirement");
            $table->unsignedBigInteger('salary_min')->after('end_date');
            $table->unsignedBigInteger('salary_max')->after('salary_min');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tb_archive', function (Blueprint $table) {
            $table->dropColumn(['qualification', 'requirement']);
            $table->unsignedBigInteger('salary_min')->after('end_date');
            $table->unsignedBigInteger('salary_max')->after('salary_min');
        });
    }
};
