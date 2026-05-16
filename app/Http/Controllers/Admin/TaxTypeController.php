<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\TaxTypeDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MassDestroyTaxTypeRequest;
use App\Models\TaxType;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class TaxTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(TaxTypeDataTable $dataTable)
    {
        abort_if(Gate::denies("tax_access"), Response::HTTP_FORBIDDEN, "Forbidden");
        return Inertia::render('Admin/TaxTypes/Index', ['taxTypes' => TaxType::withCount('taxRates')->get()]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TaxType  $taxType
     * @return \Illuminate\Http\Response
     */
    public function edit(TaxType $taxType)
    {
        abort_if(Gate::denies("tax_access"), Response::HTTP_FORBIDDEN, "Forbidden");
        return back()->with('warning', 'Edit tipe pajak belum tersedia');
    }

    public function update(Request $request, TaxType $taxType)
    {
        abort_if(Gate::denies("tax_access"), Response::HTTP_FORBIDDEN, "Forbidden");
        return back()->with('warning', 'Update tipe pajak belum tersedia');
    }

    public function destroy(TaxType $taxType)
    {
        if($taxType->taxRates->count() > 0) {
            return back()->with('error', 'Tipe pajak ini tidak dapat dihapus, karena mempunyai relasi dengan data presentase pajak');
        }
        $taxType->delete();
        return redirect()->route('admin.tax-types.index')->with('success', 'Data tipe pajak berhasil dihapus!');
    }

    public function massDestroy(MassDestroyTaxTypeRequest $request)
    {
        $taxTypes = TaxType::whereIn('id', request('ids'))->get();
        foreach($taxTypes as $taxType) {
            if($taxType->taxRates->count() > 0) {
                return back()->with('error', 'Salah satu tipe pajak ini tidak dapat dihapus, karena mempunyai relasi dengan data presentase pajak');
                return;
            }
            $taxType->delete();
        }

        return redirect()->route('admin.tax-types.index')->with('success', 'Data tax type(s) berhasil dihapus!');
    }
}
