<?php

namespace Tests\Feature\Admin;

use App\Models\Tariff;

class TariffControllerTest extends AdminTestCase
{
    public function test_can_view_tariffs_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.tariffs.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Tariffs/Index'));
    }

    public function test_can_view_create_tariff_form()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.tariffs.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Tariffs/Create'));
    }

    public function test_can_store_tariff()
    {
        $response = $this->actingAs($this->admin)
            ->post(route('admin.tariffs.store'), [
                'golongan_tarif' => 'R1',
                'daya' => 900,
                'tarif_per_kwh' => 1352.00,
            ]);

        $response->assertRedirect(route('admin.tariffs.index'));
        $this->assertDatabaseHas('tariffs', ['golongan_tarif' => 'R1', 'daya' => 900]);
    }

    public function test_can_view_edit_tariff_form()
    {
        $tariff = Tariff::factory()->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.tariffs.edit', $tariff));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Tariffs/Edit'));
    }

    public function test_can_update_tariff()
    {
        $tariff = Tariff::factory()->create();

        $response = $this->actingAs($this->admin)
            ->put(route('admin.tariffs.update', $tariff), [
                'golongan_tarif' => 'R2',
                'daya' => 1300,
                'tarif_per_kwh' => 1500.00,
            ]);

        $response->assertRedirect(route('admin.tariffs.index'));
        $this->assertDatabaseHas('tariffs', ['id' => $tariff->id, 'golongan_tarif' => 'R2']);
    }

    public function test_can_delete_tariff()
    {
        $tariff = Tariff::factory()->create();

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.tariffs.destroy', $tariff));

        $response->assertRedirect(route('admin.tariffs.index'));
        $this->assertSoftDeleted('tariffs', ['id' => $tariff->id]);
    }
}
