<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use App\Models\Payment;
use App\Models\PaymentHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class DashboardController extends Controller
{
    /**
     * Method ini digunakan untuk menampilkan halaman dashboard admin
     */
    public function index(Request $request)
    {
        // Hitung total pendapatan
        $paymentsCount = Payment::where('status', 'success')->count();
        $totalPendapatanRaw = Payment::where('status', 'success')->sum('total_bayar');
        $totalPendapatanFormatted = 'Rp ' . number_format($totalPendapatanRaw, 2, ',', '.');

        // Bills stats
        $totalBills = Bill::count();
        $unpaidBills = Bill::where('status', 'unpaid')->count();

        // Chart Data
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        $chartData = [];
        foreach ($months as $index => $month) {
            $earnings = Payment::where('status', 'success')
                                ->whereYear('created_at', now()->year)
                                ->whereMonth('created_at', $index + 1)
                                ->sum('total_bayar');
            
            $chartData[] = [
                'name' => $month,
                'total' => (int) $earnings
            ];
        }

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalPendapatan' => $totalPendapatanFormatted,
                'totalPendapatanRaw' => $totalPendapatanRaw,
                'totalPayments' => $paymentsCount,
                'totalBills' => $totalBills,
                'unpaidBills' => $unpaidBills,
            ],
            'monthly_revenue' => $chartData,
            'year' => now()->year
        ]);
    }

    public function settings(Request $request)
    {
        return Inertia::render('Admin/Settings');
    }
}
