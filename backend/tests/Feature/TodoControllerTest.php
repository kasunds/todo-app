<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Todo;

class TodoControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test todo creation API endpoint.
     */
    
    public function test_it_can_list_todos(): void
    {
        Todo::factory()->count(3)->create();

        $response = $this->getJson('/api/todos');

        $response->assertStatus(200);
    }

    public function test_it_can_create_a_todo()
    {
        $data = ['title' => 'New Todo', 'description' => 'Test description', 'completed' => false];

        $response = $this->postJson('/api/todos', $data);
        $response->assertStatus(201)
                 ->assertJsonFragment($data);

        $this->assertDatabaseHas('task', $data);
    }

    public function test_it_can_complete_a_todo()
    {
        $todo = Todo::factory()->create();
        $data = ['completed' => true];

        $response = $this->patchJson("/api/todos/{$todo->id}", $data);
        
        $response->assertStatus(200)
                 ->assertJsonFragment($data);

        $this->assertDatabaseHas('task', $data);
    }

    public function test_it_can_delete_a_todo()
    {
        $todo = Todo::factory()->create();

        $response = $this->deleteJson("/api/todos/{$todo->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['status' => 'success']);

        $this->assertDatabaseMissing('task', ['id' => $todo->id]);
    }
}
