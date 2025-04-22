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
        Schema::create('tb_detail_penilaian', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_penilaian')->constrained('tb_penilaian')->onDelete('cascade');
            $table->foreignUuid('id_bobot_kriteria')->constrained('tb_bobot_kriteria')->onDelete('cascade');
            $table->foreignUuid('id_bobot_alternatif')->constrained('tb_bobot_alternatif')->onDelete('cascade');
            $table->text('bobot_prioriti_kriteria');
            $table->text('bobot_prioriti_alternatif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_detail_penilaian');
    }
};
