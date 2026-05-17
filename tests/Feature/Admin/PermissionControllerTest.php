<?php

namespace Tests\Feature\Admin;

use App\Models\Permission;

class PermissionControllerTest extends AdminTestCase
{
    public function test_can_view_permissions_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.permissions.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Permissions/Index'));
    }

    public function test_can_view_create_permission_form()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.permissions.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Permissions/Create'));
    }

    public function test_can_store_permission()
    {
        $response = $this->actingAs($this->admin)
            ->post(route('admin.permissions.store'), [
                'title' => ['test_permission', 'another_permission'],
            ]);

        $response->assertRedirect(route('admin.permissions.index'));
        $this->assertDatabaseHas('permissions', ['title' => 'test_permission']);
        $this->assertDatabaseHas('permissions', ['title' => 'another_permission']);
    }

    public function test_can_view_edit_permission_form()
    {
        $permission = Permission::factory()->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.permissions.edit', $permission));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Permissions/Edit'));
    }

    public function test_can_update_permission()
    {
        $permission = Permission::factory()->create();

        $response = $this->actingAs($this->admin)
            ->put(route('admin.permissions.update', $permission), [
                'title' => 'updated_permission',
            ]);

        $response->assertRedirect(route('admin.permissions.index'));
        $this->assertDatabaseHas('permissions', ['title' => 'updated_permission']);
    }

    public function test_can_delete_permission()
    {
        $permission = Permission::factory()->create();

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.permissions.destroy', $permission));

        $response->assertRedirect(route('admin.permissions.index'));
        $this->assertDatabaseMissing('permissions', ['id' => $permission->id]);
    }
}
