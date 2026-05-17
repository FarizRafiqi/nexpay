<?php

namespace Tests\Feature\Admin;

use App\Models\PaymentMethod;

class PaymentMethodControllerTest extends AdminTestCase
{
    public function test_can_view_payment_methods_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.payment-methods.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/PaymentMethods/Index'));
    }

    public function test_can_view_create_payment_method_form()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.payment-methods.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/PaymentMethods/Create'));
    }

    public function test_can_store_payment_method()
    {
        $response = $this->actingAs($this->admin)
            ->post(route('admin.payment-methods.store'), [
                'nama' => 'Bank Test',
                'slug' => 'bank-test',
                'deskripsi' => 'Test bank description',
            ]);

        $response->assertRedirect(route('admin.payment-methods.index'));
        $this->assertDatabaseHas('payment_methods', ['nama' => 'Bank Test', 'slug' => 'bank-test']);
    }

    public function test_can_view_payment_method_show()
    {
        $paymentMethod = PaymentMethod::factory()->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.payment-methods.show', $paymentMethod));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/PaymentMethods/Show'));
    }

    public function test_can_view_edit_payment_method_form()
    {
        $paymentMethod = PaymentMethod::factory()->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.payment-methods.edit', $paymentMethod));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/PaymentMethods/Edit'));
    }

    public function test_can_update_payment_method()
    {
        $paymentMethod = PaymentMethod::factory()->create();

        $response = $this->actingAs($this->admin)
            ->put(route('admin.payment-methods.update', $paymentMethod), [
                'nama' => 'Updated Bank',
                'slug' => 'updated-bank',
                'deskripsi' => 'Updated description',
            ]);

        $response->assertRedirect(route('admin.payment-methods.index'));
        $this->assertDatabaseHas('payment_methods', ['id' => $paymentMethod->id, 'nama' => 'Updated Bank']);
    }

    public function test_can_delete_payment_method()
    {
        $paymentMethod = PaymentMethod::factory()->create();

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.payment-methods.destroy', $paymentMethod));

        $response->assertRedirect(route('admin.payment-methods.index'));
        $this->assertDatabaseMissing('payment_methods', ['id' => $paymentMethod->id]);
    }
}
