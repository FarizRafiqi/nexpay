<?php

namespace Tests\Feature\Admin;

use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\PlnCustomer;
use App\Models\Tariff;
use App\Models\User;

class PaymentControllerTest extends AdminTestCase
{
    public function test_can_view_payments_index()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.payments.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Payments/Index'));
    }

    public function test_can_view_payment_show()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);
        $paymentMethod = PaymentMethod::factory()->create();
        $customer = User::factory()->create();

        $payment = Payment::create([
            'id_customer' => $customer->id,
            'id_pelanggan_pln' => $plnCustomer->id,
            'tanggal_bayar' => now(),
            'biaya_admin' => 2500,
            'total_bayar' => 100000,
            'id_metode_pembayaran' => $paymentMethod->id,
            'status' => 'pending',
            'bukti_bayar' => 'n/a',
        ]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.payments.show', $payment));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Payments/Show'));
    }

    public function test_can_view_payment_edit()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);
        $paymentMethod = PaymentMethod::factory()->create();
        $customer = User::factory()->create();

        $payment = Payment::create([
            'id_customer' => $customer->id,
            'id_pelanggan_pln' => $plnCustomer->id,
            'tanggal_bayar' => now(),
            'biaya_admin' => 2500,
            'total_bayar' => 100000,
            'id_metode_pembayaran' => $paymentMethod->id,
            'status' => 'pending',
            'bukti_bayar' => 'n/a',
        ]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.payments.edit', $payment));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/Payments/Edit'));
    }

    public function test_can_update_payment_status()
    {
        $tariff = Tariff::factory()->create();
        $plnCustomer = PlnCustomer::factory()->create(['id_tarif' => $tariff->id]);
        $paymentMethod = PaymentMethod::factory()->create();
        $customer = User::factory()->create();

        $payment = Payment::create([
            'id_customer' => $customer->id,
            'id_pelanggan_pln' => $plnCustomer->id,
            'tanggal_bayar' => now(),
            'biaya_admin' => 2500,
            'total_bayar' => 100000,
            'id_metode_pembayaran' => $paymentMethod->id,
            'status' => 'pending',
            'bukti_bayar' => 'n/a',
        ]);

        $response = $this->actingAs($this->admin)
            ->put(route('admin.payments.update', $payment), [
                'status' => 'success',
            ]);

        $response->assertRedirect(route('admin.payments.index'));
        $this->assertDatabaseHas('payments', ['id' => $payment->id, 'status' => 'success']);
    }
}
