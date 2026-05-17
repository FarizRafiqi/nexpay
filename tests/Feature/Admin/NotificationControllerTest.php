<?php

namespace Tests\Feature\Admin;

use App\Models\Notification;
use App\Services\NotificationService;

class NotificationControllerTest extends AdminTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Notification::truncate();
    }

    public function test_unread_returns_only_unread_notifications()
    {
        Notification::create(['type' => 'test', 'title' => 'Unread 1', 'message' => 'msg']);
        Notification::create(['type' => 'test', 'title' => 'Unread 2', 'message' => 'msg']);
        Notification::create(['type' => 'test', 'title' => 'Read', 'message' => 'msg', 'read_at' => now()]);

        $response = $this->actingAs($this->admin)
            ->getJson(route('admin.notifications.unread'));

        $response->assertStatus(200);
        $response->assertJsonCount(2);
    }

    public function test_mark_as_read()
    {
        $notification = Notification::create([
            'type' => 'payment_success',
            'title' => 'Test',
            'message' => 'msg',
        ]);

        $response = $this->actingAs($this->admin)
            ->postJson(route('admin.notifications.read', $notification));

        $response->assertStatus(200);
        $this->assertNotNull($notification->fresh()->read_at);
    }

    public function test_mark_all_as_read()
    {
        Notification::create(['type' => 'test', 'title' => 'A', 'message' => 'msg']);
        Notification::create(['type' => 'test', 'title' => 'B', 'message' => 'msg']);
        Notification::create(['type' => 'test', 'title' => 'C', 'message' => 'msg']);

        $this->actingAs($this->admin)
            ->postJson(route('admin.notifications.read-all'));

        $this->assertEquals(0, Notification::unread()->count());
    }

    public function test_notification_service_creates_notification()
    {
        $notification = NotificationService::create(
            'payment_success',
            'Pembayaran Berhasil',
            'Test payment',
            ['payment_id' => 123]
        );

        $this->assertDatabaseHas('notifications', [
            'id' => $notification->id,
            'type' => 'payment_success',
        ]);
    }

    public function test_unauthenticated_user_cannot_access_notifications()
    {
        $response = $this->getJson(route('admin.notifications.unread'));
        $response->assertUnauthorized();
    }
}
