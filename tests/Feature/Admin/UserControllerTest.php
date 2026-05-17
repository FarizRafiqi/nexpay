<?php

namespace Tests\Feature\Admin;

use App\Models\Level;
use App\Models\User;

class UserControllerTest extends AdminTestCase
{
    public function test_can_view_users_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.users.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Users/Index'));
    }

    public function test_can_view_create_user_form()
    {
        Level::factory()->count(2)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.users.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Users/Create'));
    }

    public function test_can_store_user()
    {
        $level = Level::factory()->create();

        $response = $this->actingAs($this->admin)
            ->post(route('admin.users.store'), [
                'nama' => 'Test User',
                'username' => 'testuser',
                'email' => 'test@example.com',
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'id_level' => $level->id,
            ]);

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseHas('users', ['nama' => 'Test User', 'username' => 'testuser']);
    }

    public function test_can_view_user_show()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.users.show', $user));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Users/Show'));
    }

    public function test_can_view_edit_user_form()
    {
        $user = User::factory()->create();
        Level::factory()->count(2)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.users.edit', $user));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Users/Edit'));
    }

    public function test_can_update_user()
    {
        $user = User::factory()->create();
        $level = Level::factory()->create();

        $response = $this->actingAs($this->admin)
            ->put(route('admin.users.update', $user), [
                'nama' => 'Updated Name',
                'username' => 'updateduser',
                'email' => 'updated@example.com',
                'password' => 'newpassword',
                'password_confirmation' => 'newpassword',
                'id_level' => $level->id,
            ]);

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseHas('users', ['id' => $user->id, 'nama' => 'Updated Name']);
    }

    public function test_can_delete_user()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.users.destroy', $user));

        $response->assertRedirect(route('admin.users.index'));
        $this->assertSoftDeleted('users', ['id' => $user->id]);
    }
}
