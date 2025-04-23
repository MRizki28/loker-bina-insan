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
        Schema::create('tb_ngaji', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_psikotes')->constrained('tb_psikotes')->onDelete('cascade');
            $table->enum('status_ngaji', ['lolos', 'gagal', 'pending'])->default('pending');
            $table->timestamp('time_test')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_ngaji');
    }
};
