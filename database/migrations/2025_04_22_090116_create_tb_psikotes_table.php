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
        Schema::create('tb_psikotes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_interview')->constrained('tb_interview')->onDelete('cascade');
            $table->enum('status_psikotes', ['lolos', 'gagal', 'pending'])->default('pending');
            $table->timestamp('time_test')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_psikotes');
    }
};
