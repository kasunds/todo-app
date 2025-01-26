<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Todo;
use Tests\TestCase;

class TodoTest extends TestCase
{
    use RefreshDatabase;
    
    /** @test create */
    public function it_creates_a_todo()
    {
        $todo = Todo::create(['title' => 'Test Todo1', 'description' => 'Test description', 'completed' => false]);
        $this->assertDatabaseHas('task', ['title' => 'Test Todo1', 'description' => 'Test description', 'completed' => false]);
    }

    /** @test task complete*/
    public function it_updates_a_todo()
    {
        $todo = Todo::create(['title' => 'Test Todo2', 'description' => 'Test description', 'completed' => false]);
        $todo->update(['completed' => true]);
        $this->assertDatabaseHas('task', ['completed' => true]);
    }

    /** @test delete*/
    public function it_deletes_a_todo()
    {
        $todo = Todo::create(['title' => 'Test Todo3', 'description' => 'Test description', 'completed' => false]);
        $todo->delete();
        $this->assertDatabaseMissing('task', ['title' => 'Test Todo3', 'description' => 'Test description', 'completed' => false]);
    }
}
