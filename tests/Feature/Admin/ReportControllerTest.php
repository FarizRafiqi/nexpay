<?php

namespace Tests\Feature\Admin;

class ReportControllerTest extends AdminTestCase
{
    public function test_can_view_reports_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.reports'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Reports'));
    }
}
