<?php

namespace Tests\Feature\Admin;

use App\Models\TaxRate;
use App\Models\TaxType;

class TaxRateControllerTest extends AdminTestCase
{
    public function test_can_view_tax_rates_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.tax-rates.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/TaxRates/Index'));
    }

    public function test_can_delete_tax_rate()
    {
        $taxType = TaxType::factory()->create();
        $taxRate = TaxRate::factory()->create(['tax_type_id' => $taxType->id]);

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.tax-rates.destroy', $taxRate));

        $response->assertRedirect(route('admin.tax-rates.index'));
        $this->assertDatabaseMissing('tax_rates', ['id' => $taxRate->id]);
    }
}
