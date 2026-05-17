<?php

namespace Tests\Feature\Admin;

use App\Models\Level;
use App\Models\Permission;

class LevelControllerTest extends AdminTestCase
{
    public function test_can_view_levels_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.levels.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Levels/Index'));
    }

    public function test_can_view_create_level_form()
    {
        Permission::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.levels.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Levels/Create'));
    }

    public function test_can_store_level_with_permissions()
    {
        $permissions = Permission::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)
            ->post(route('admin.levels.store'), [
                'level' => 'manager',
                'permissions' => $permissions->pluck('id')->toArray(),
            ]);

        $response->assertRedirect(route('admin.levels.index'));
        $this->assertDatabaseHas('levels', ['level' => 'manager']);

        $level = Level::where('level', 'manager')->first();
        $this->assertCount(3, $level->permissions);
    }

    public function test_can_view_edit_level_form()
    {
        $level = Level::factory()->create();
        Permission::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.levels.edit', $level));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Levels/Edit'));
    }

    public function test_can_update_level_with_permissions()
    {
        $level = Level::factory()->create();
        $permissions = Permission::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)
            ->put(route('admin.levels.update', $level), [
                'level' => 'supervisor',
                'permissions' => $permissions->pluck('id')->toArray(),
            ]);

        $response->assertRedirect(route('admin.levels.index'));
        $this->assertDatabaseHas('levels', ['id' => $level->id, 'level' => 'supervisor']);
    }

    public function test_can_delete_level()
    {
        $level = Level::factory()->create();

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.levels.destroy', $level));

        $response->assertRedirect(route('admin.levels.index'));
        $this->assertSoftDeleted('levels', ['id' => $level->id]);
    }
}
