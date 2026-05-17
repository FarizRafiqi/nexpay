<?php

namespace Tests\Feature\Admin;

use App\Models\IndonesiaCity;
use App\Models\IndonesiaProvince;
use App\Models\Level;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\CreatesApplication;

abstract class AdminTestCase extends BaseTestCase
{
    use CreatesApplication, RefreshDatabase;

    protected $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seedIndonesiaData();
        $this->createAdminWithAllPermissions();
    }

    protected function seedIndonesiaData()
    {
        $province = IndonesiaProvince::forceCreate([
            'code' => '11',
            'name' => 'ACEH',
        ]);

        IndonesiaCity::forceCreate([
            'code' => '1101',
            'province_code' => '11',
            'name' => 'KABUPATEN ACEH SELATAN',
        ]);
    }

    protected function createAdminWithAllPermissions()
    {
        $adminLevel = Level::firstOrCreate(['id' => 1], ['level' => 'administrator']);

        $permissions = [
            'user_access', 'user_create', 'user_show', 'user_edit', 'user_update', 'user_delete',
            'level_access', 'level_create', 'level_edit', 'level_update', 'level_delete',
            'permission_access', 'permission_create', 'permission_edit', 'permission_update', 'permission_delete',
            'tariff_access', 'tariff_create', 'tariff_edit', 'tariff_update', 'tariff_delete',
            'pln_customer_access', 'pln_customer_create', 'pln_customer_show', 'pln_customer_edit', 'pln_customer_update', 'pln_customer_delete',
            'usage_access', 'usage_create', 'usage_show', 'usage_edit', 'usage_update', 'usage_delete',
            'bill_access', 'bill_show',
            'payment_access', 'payment_show', 'payment_edit', 'payment_update',
            'payment_method_access', 'payment_method_create', 'payment_method_show', 'payment_method_edit', 'payment_method_update', 'payment_method_delete',
            'activity_log_access',
            'report_create',
            'tax_access',
        ];

        foreach ($permissions as $title) {
            Permission::firstOrCreate(['title' => $title]);
        }

        $adminLevel->permissions()->sync(Permission::pluck('id')->toArray());

        $this->admin = User::factory()->create([
            'id_level' => 1,
            'nama' => 'Admin Test',
            'username' => 'admintest',
            'email' => 'admin@test.com',
        ]);
    }
}
