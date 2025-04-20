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
        Schema::create('tb_bobot_alternatif', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_kriteria')->constrained('tb_kriteria')->onDelete('cascade');
            $table->string('name_alternatif');
            $table->double('bobot_prioriti_alternatif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_bobot_alternatif');
    }
};
