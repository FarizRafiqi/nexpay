<?php

namespace Tests\Feature\Admin;

use App\Models\TaxRate;
use App\Models\TaxType;

class TaxTypeControllerTest extends AdminTestCase
{
    public function test_can_view_tax_types_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.tax-types.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/TaxTypes/Index'));
    }

    public function test_can_delete_tax_type()
    {
        $taxType = TaxType::factory()->create();

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.tax-types.destroy', $taxType));

        $response->assertRedirect(route('admin.tax-types.index'));
        $this->assertDatabaseMissing('tax_types', ['id' => $taxType->id]);
    }

    public function test_cannot_delete_tax_type_with_rates()
    {
        $taxType = TaxType::factory()->has(TaxRate::factory(), 'taxRates')->create();

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.tax-types.destroy', $taxType));

        $response->assertRedirect();
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('tax_types', ['id' => $taxType->id]);
    }
}
