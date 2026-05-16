<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\TaxRateDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MassDestroyTaxRateRequest;
use App\Models\TaxRate;
use App\Models\TaxType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class TaxRateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(TaxRateDataTable $dataTable)
    {
        abort_if(Gate::denies("tax_access"), Response::HTTP_FORBIDDEN, "Forbidden");
        return Inertia::render('Admin/TaxRates/Index', ['taxRates' => TaxRate::with('taxType')->get()]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TaxRate  $taxRate
     * @return \Illuminate\Http\Response
     */
    public function edit(TaxRate $taxRate)
    {
        abort_if(Gate::denies("tax_access"), Response::HTTP_FORBIDDEN, "Forbidden");
        return back()->with('warning', 'Edit tarif pajak belum tersedia');
    }

    public function update(Request $request, TaxRate $taxRate)
    {
        abort_if(Gate::denies("tax_access"), Response::HTTP_FORBIDDEN, "Forbidden");
        return back()->with('warning', 'Update tarif pajak belum tersedia');
    }

    public function destroy(TaxRate $taxRate)
    {
        $taxRate->delete();
        return redirect()->route('admin.tax-rates.index')->with('success', 'Data presentase pajak berhasil dihapus!');
    }

    public function massDestroy(MassDestroyTaxRateRequest $request)
    {
        $taxRates = TaxRate::whereIn('id', request('ids'))->get();
        foreach($taxRates as $taxRate) {
            $taxRate->delete();
        }

        return redirect()->route('admin.tax-rates.index')->with('success', 'Data tax rate(s) berhasil dihapus!');
    }
}
