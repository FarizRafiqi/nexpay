<?php

namespace Tests\Feature\Admin;

use App\Models\ActivityLog;

class ActivityLogControllerTest extends AdminTestCase
{
    public function test_can_view_activity_logs_index()
    {
        ActivityLog::create([
            'id_user' => $this->admin->id,
            'tabel_referensi' => 'users',
            'id_referensi' => $this->admin->id,
            'deskripsi' => 'User logged in',
        ]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.activity-logs.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/ActivityLogs'));
    }
}
