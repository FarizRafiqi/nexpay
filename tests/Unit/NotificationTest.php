<?php

namespace Tests\Unit;

use App\Models\Notification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_notification()
    {
        $notification = Notification::create([
            'type' => 'payment_success',
            'title' => 'Pembayaran Berhasil',
            'message' => 'Test message',
            'data' => ['payment_id' => 1],
        ]);

        $this->assertNotNull($notification->id);
        $this->assertEquals('payment_success', $notification->type);
        $this->assertEquals(['payment_id' => 1], $notification->data);
        $this->assertNull($notification->read_at);
    }

    public function test_unread_scope()
    {
        Notification::create(['type' => 'test', 'title' => 'A', 'message' => 'msg']);
        Notification::create(['type' => 'test', 'title' => 'B', 'message' => 'msg', 'read_at' => now()]);

        $unread = Notification::unread()->get();

        $this->assertEquals(1, $unread->count());
        $this->assertEquals('A', $unread->first()->title);
    }

    public function test_mark_as_read()
    {
        $notification = Notification::create([
            'type' => 'test',
            'title' => 'Test',
            'message' => 'msg',
        ]);

        $this->assertFalse($notification->isRead());

        $notification->markAsRead();
        $this->assertTrue($notification->isRead());
        $this->assertNotNull($notification->fresh()->read_at);
    }

    public function test_mark_as_read_is_idempotent()
    {
        $notification = Notification::create([
            'type' => 'test',
            'title' => 'Test',
            'message' => 'msg',
            'read_at' => now(),
        ]);

        $notification->markAsRead();
        $this->assertTrue($notification->isRead());
    }
}
