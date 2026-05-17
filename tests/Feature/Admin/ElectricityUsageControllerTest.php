<?php

namespace Tests\Feature\Admin;

use App\Models\PlnCustomer;
use App\Models\Tariff;
use App\Models\Usage;

class ElectricityUsageControllerTest extends AdminTestCase
{
    public function test_can_view_usages_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.usages.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Usages/Index'));
    }

    public function test_can_view_create_usage_form()
    {
        $tariff = Tariff::factory()->create();
        PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.usages.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Usages/Create'));
    }

    public function test_can_store_usage()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);

        $response = $this->actingAs($this->admin)
            ->post(route('admin.usages.store'), [
                'id_pelanggan_pln' => $plnCustomer->id,
                'bulan' => 5,
                'tahun' => 2026,
                'meter_awal' => 10000000,
                'meter_akhir' => 10000100,
            ]);

        $response->assertRedirect(route('admin.usages.index'));
        $this->assertDatabaseHas('usages', ['id_pelanggan_pln' => $plnCustomer->id, 'bulan' => 5]);
    }

    public function test_can_view_usage_show()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);
        $usage = Usage::factory()->create(['id_pelanggan_pln' => $plnCustomer->id]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.usages.show', $usage));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Usages/Show'));
    }

    public function test_can_view_edit_usage_form()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);
        $usage = Usage::factory()->create(['id_pelanggan_pln' => $plnCustomer->id]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.usages.edit', $usage));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Usages/Edit'));
    }

    public function test_can_update_usage()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);
        $usage = Usage::factory()->create(['id_pelanggan_pln' => $plnCustomer->id]);

        $response = $this->actingAs($this->admin)
            ->put(route('admin.usages.update', $usage), [
                'id_pelanggan_pln' => $plnCustomer->id,
                'bulan' => date('n'),
                'tahun' => date('Y'),
                'meter_awal' => 10000100,
                'meter_akhir' => 10000200,
            ]);

        $response->assertRedirect(route('admin.usages.index'));
        $this->assertDatabaseHas('usages', ['id' => $usage->id, 'bulan' => date('n')]);
    }

    public function test_can_delete_usage()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);
        $usage = Usage::factory()->create(['id_pelanggan_pln' => $plnCustomer->id]);

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.usages.destroy', $usage));

        $response->assertRedirect(route('admin.usages.index'));
        $this->assertSoftDeleted('usages', ['id' => $usage->id]);
    }
}
