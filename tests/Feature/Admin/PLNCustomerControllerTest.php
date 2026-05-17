<?php

namespace Tests\Feature\Admin;

use App\Models\PlnCustomer;
use App\Models\Tariff;

class PLNCustomerControllerTest extends AdminTestCase
{
    public function test_can_view_pln_customers_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.pln-customers.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/PlnCustomers/Index'));
    }

    public function test_can_view_create_pln_customer_form()
    {
        Tariff::factory()->count(2)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.pln-customers.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/PlnCustomers/Create'));
    }

    public function test_can_store_pln_customer()
    {
        $tariff = Tariff::factory()->create();

        $response = $this->actingAs($this->admin)
            ->post(route('admin.pln-customers.store'), [
                'nama_pelanggan' => 'Test Customer',
                'nomor_meter' => '123456789012',
                'alamat' => 'Test Address',
                'id_tarif' => $tariff->id,
                'id_kota' => '1101',
            ]);

        $response->assertRedirect(route('admin.pln-customers.index'));
        $this->assertDatabaseHas('pln_customers', ['nama_pelanggan' => 'Test Customer']);
    }

    public function test_can_view_pln_customer_show()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.pln-customers.show', $plnCustomer));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/PlnCustomers/Show'));
    }

    public function test_can_view_edit_pln_customer_form()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.pln-customers.edit', $plnCustomer));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/PlnCustomers/Edit'));
    }

    public function test_can_update_pln_customer()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);

        $response = $this->actingAs($this->admin)
            ->put(route('admin.pln-customers.update', $plnCustomer), [
                'nama_pelanggan' => 'Updated Customer',
                'nomor_meter' => '987654321098',
                'alamat' => 'Updated Address',
                'id_tarif' => $tariff->id,
                'id_kota' => '1101',
            ]);

        $response->assertRedirect(route('admin.pln-customers.index'));
        $this->assertDatabaseHas('pln_customers', ['id' => $plnCustomer->id, 'nama_pelanggan' => 'Updated Customer']);
    }

    public function test_can_delete_pln_customer()
    {
        $plnCustomer = PlnCustomer::factory()->create();

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.pln-customers.destroy', $plnCustomer));

        $response->assertRedirect(route('admin.pln-customers.index'));
        $this->assertDatabaseMissing('pln_customers', ['id' => $plnCustomer->id]);
    }
}
