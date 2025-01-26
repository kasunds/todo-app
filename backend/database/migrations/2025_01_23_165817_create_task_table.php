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
        Schema::create('task', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->boolean('completed')->default(false);
        });

        // Insert sample data
        DB::table('task')->insert([
            ['title' => 'Buy groceries', 'description'=> 'Proin facilisis nisl semper erat sagittis hendrerit', 'completed' => FALSE],
            ['title' => 'Clean the house', 'description'=> 'Nunc aliquet dolor et magna viverra fringilla', 'completed' => FALSE],
            ['title' => 'Pay bills', 'description'=> 'Morbi eget mi et neque tincidunt rhoncus pulvinar quis dolor', 'completed' => FALSE],
            ['title' => 'Go to classs', 'description'=> 'Nulla id arcu non ex elementum feugiat vitae non nisl', 'completed' => FALSE],
            ['title' => 'Work out', 'description'=> 'Phasellus posuere erat ullamcorper elit consectetur consequat', 'completed' => FALSE],
            ['title' => 'Car service', 'description'=> 'Aenean faucibus elit vitae ex aliquam pulvinar', 'completed' => FALSE],
            ['title' => 'Change the bulb', 'description'=> 'Fusce at velit consectetur, aliquet enim ac, aliquet orci', 'completed' => FALSE],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task');
    }
};
