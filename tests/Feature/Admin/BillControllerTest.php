<?php

namespace Tests\Feature\Admin;

use App\Models\Bill;
use App\Models\Usage;

class BillControllerTest extends AdminTestCase
{
    public function test_can_view_bills_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.bills.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Bills/Index'));
    }

}
