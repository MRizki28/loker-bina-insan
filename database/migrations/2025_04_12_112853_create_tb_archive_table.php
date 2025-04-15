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
        Schema::create('tb_archive', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_pelamar')->constrained('users');
            $table->uuid('id_file');
            $table->string('file');
            $table->text('reason');
            $table->text('reason_reject')->nullable();
            $table->uuid('id_job');
            $table->string('name');
            $table->text('description');
            $table->json('qualification');
            $table->json('requirement');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('job_type', ['fulltime', 'parttime', 'internship']);
            $table->enum('category', ['guru','staff','lainnya']);
            $table->enum('status', ['pending', 'approved', 'rejected']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_archive');
    }
};
