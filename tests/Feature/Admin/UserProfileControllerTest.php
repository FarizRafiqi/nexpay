<?php

namespace Tests\Feature\Admin;

class UserProfileControllerTest extends AdminTestCase
{
    public function test_can_view_profile_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.profile.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Profile/Index'));
    }

    public function test_can_view_profile_edit()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.profile.edit'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Profile/Edit'));
    }

    public function test_can_update_profile()
    {
        $response = $this->actingAs($this->admin)
            ->put(route('admin.profile.update', $this->admin->id), [
                'nama' => 'Updated Admin Name',
                'username' => 'updatedadmin',
                'email' => 'updatedadmin@example.com',
                'id_level' => $this->admin->id_level,
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', ['id' => $this->admin->id, 'nama' => 'Updated Admin Name']);
    }
}
