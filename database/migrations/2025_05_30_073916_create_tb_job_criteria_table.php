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
        Schema::create('tb_job_criteria', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_job')->constrained('tb_job')->onDelete('cascade');
            $table->string('field');
            $table->string('operator');
            $table->string('value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_job_criteria');
    }
};
