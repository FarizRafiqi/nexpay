<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Level;
use Illuminate\Database\Seeder;

class PermissionLevelSeeder extends Seeder
{
    public function run()
    {
        $adminPermissions = Permission::all();
        $adminLevel = Level::where('level', 'administrator')->firstOrFail();
        $adminLevel->permissions()->sync($adminPermissions->pluck('id'));

        $bankLevel = Level::where('level', 'bank')->firstOrFail();
        $bankPermissions = $adminPermissions->filter(function ($permission) {
            return substr($permission->title, 0, 5) != 'user_' &&
                substr($permission->title, 0, 6) != 'usage_' &&
                substr($permission->title, 0, 5) != 'bill_' &&
                substr($permission->title, 0, 13) != 'pln_customer_' &&
                substr($permission->title, 0, 6) != 'level_' &&
                substr($permission->title, 0, 11) != 'permission_' &&
                substr($permission->title, 0, 7) != 'tariff_' &&
                substr($permission->title, 0, 15) != 'payment_method_' &&
                substr($permission->title, 0, 13) != 'activity_log_';
        });
        $bankLevel->permissions()->sync($bankPermissions->pluck('id'));
    }
}
