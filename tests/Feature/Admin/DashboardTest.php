<?php

namespace Tests\Feature\Admin;

use App\Models\User;

class DashboardTest extends AdminTestCase
{
    public function test_admin_dashboard_loads()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Dashboard'));
    }

    public function test_unauthenticated_user_cannot_access_dashboard()
    {
        $response = $this->get(route('admin.dashboard'));

        $response->assertRedirect(route('login'));
    }
}
