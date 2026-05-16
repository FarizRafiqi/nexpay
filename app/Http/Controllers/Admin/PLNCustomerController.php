<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PlnCustomerRequest;
use App\Http\Requests\Admin\MassDestroyPlnCustomerRequest;
use App\Models\IndonesiaProvince;
use App\Models\PlnCustomer;
use App\Models\Tariff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Yajra\DataTables\Facades\DataTables;
use Symfony\Component\HttpFoundation\Response;

class PLNCustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        abort_if(Gate::denies("pln_customer_access"), Response::HTTP_FORBIDDEN, "Forbidden");

        if($request->ajax() && !$request->header('X-Inertia')){   
            $customers = PlnCustomer::with("tariff", "usages")->get();
            return DataTables::of($customers)
                    ->addColumn("action", function($row){
                        $showGate       = 'pln_customer_show';
                        $editGate       = 'pln_customer_edit';
                        $deleteGate     = 'pln_customer_delete';
                        $crudRoutePart  = 'pln-customers';
                        
                        return view('partials.datatables-action', compact(
                            'showGate', 
                            'editGate', 
                            'deleteGate',
                            'crudRoutePart',
                            'row',
                        ));
                    })
                    ->toJson();
        }
        $plnCustomers = PlnCustomer::with('tariff')->paginate(10);
        return Inertia::render('Admin/PlnCustomers/Index', [
            'plnCustomers' => $plnCustomers,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort_if(Gate::denies("pln_customer_create"), Response::HTTP_FORBIDDEN, "Forbidden");
        $tariffs = Tariff::get();
        $provinces = IndonesiaProvince::with('cities')->orderBy('name')->get();
        return Inertia::render('Admin/PlnCustomers/Create', [
            'tariffs' => $tariffs,
            'provinces' => $provinces,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Admin\PlnCustomerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PlnCustomerRequest $request)
    {
        PlnCustomer::create($request->all());
        return redirect()->route("admin.pln-customers.index")->with('success', 'Data berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PlnCustomer  $plnCustomer
     * @return \Illuminate\Http\Response
     */
    public function show(PlnCustomer $plnCustomer)
    {
        abort_if(Gate::denies("pln_customer_show"), Response::HTTP_FORBIDDEN, "Forbidden");
        return Inertia::render('Admin/PlnCustomers/Show', ['plnCustomer' => $plnCustomer->load('tariff')]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\PlnCustomer  $plnCustomer
     * @return \Illuminate\Http\Response
     */
    public function edit(PlnCustomer $plnCustomer)
    {
        abort_if(Gate::denies("pln_customer_edit"), Response::HTTP_FORBIDDEN, "Forbidden");
        $tariffs = Tariff::get();
        $provinces = IndonesiaProvince::with('cities')->orderBy('name')->get();
        return Inertia::render('Admin/PlnCustomers/Edit', [
            'plnCustomer' => $plnCustomer,
            'tariffs' => $tariffs,
            'provinces' => $provinces,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Admin\PlnCustomerRequest  $request
     * @param  \App\Models\PlnCustomer  $plnCustomer
     * @return \Illuminate\Http\Response
     */
    public function update(PlnCustomerRequest $request, PlnCustomer $plnCustomer)
    {
        abort_if(Gate::denies("pln_customer_update"), Response::HTTP_FORBIDDEN, "Forbidden");
        $plnCustomer->update($request->all());
        return redirect()->route('admin.pln-customers.index')->with('success', 'Data Pelanggan Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PlnCustomer  $plnCustomer
     * @return \Illuminate\Http\Response
     */
    public function destroy(PlnCustomer $plnCustomer)
    {
        abort_if(Gate::denies("pln_customer_delete"), Response::HTTP_FORBIDDEN, "Forbidden");
        if($plnCustomer->usages()->count() > 0){
            return back()->with('error', 'Pelanggan tidak bisa dihapus, karena mempunyai relasi dengan data penggunaan');
        }
        
        $plnCustomer->delete();
        return back()->with('success', 'Pelanggan Berhasil Dihapus!');
    }

    public function massDestroy(MassDestroyPlnCustomerRequest $request)
    {
        abort_if(Gate::denies("pln_customer_delete"), Response::HTTP_FORBIDDEN, "Forbidden");
        $customers = PlnCustomer::whereIn('id', request('ids'))->get();
        foreach($customers as $customer){
            if($customer->usages()->count() > 0){
                return back()->with('error', 'Pelanggan tidak bisa dihapus, karena mempunyai relasi dengan data penggunaan');
            }
            $customer->delete();
        }

        return redirect()->route('admin.pln-customers.index')->with('success', 'Data pelanggan PLN berhasil dihapus!');
    }
}
