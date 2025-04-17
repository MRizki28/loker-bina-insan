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
        Schema::create('tb_interview', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_berkas')->constrained('tb_file')->onDelete('cascade');
            $table->timestamp('time_interview')->nullable();
            $table->text('link')->nullable();
            $table->enum('status_interview', ['lolos', 'gagal', 'pending'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_interview');
    }
};
