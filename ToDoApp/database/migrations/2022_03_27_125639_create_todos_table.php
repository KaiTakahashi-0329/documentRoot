<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->constrained('users');
            $table->string('title', 50);
            $table->text('text')->nullable();
            $table->foreignId('important_id')->constrained('levels');
            $table->foreignId('urgent_id')->constrained('levels');
            $table->foreignId('status_id')->constrained('statuses');
            $table->dateTime('deadline')->nullable();

            /**
             * user_id
             * title
             * text
             * Important 重要度
             * urgent 緊急度
             * status ステータス
             * deadline 期限
             */
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todos');
    }
}
