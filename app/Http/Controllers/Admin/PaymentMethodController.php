<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;
use Symfony\Component\HttpFoundation\Response;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        abort_if(Gate::denies("payment_method_access"), Response::HTTP_FORBIDDEN, "Forbidden");

        if($request->ajax() && !$request->header('X-Inertia')){
            $paymentMethods = PaymentMethod::all();
            return DataTables::of($paymentMethods)
                                ->addColumn("action", function($row){
                                    $showGate       = 'payment_method_show';
                                    $editGate       = 'payment_method_edit';
                                    $deleteGate     = 'payment_method_delete';
                                    $crudRoutePart  = 'payment-methods';
                                    
                                    return view('partials.datatables-action', compact(
                                        'showGate', 
                                        'editGate', 
                                        'deleteGate',
                                        'crudRoutePart',
                                        'row',
                                    ));
                                })
                                ->editColumn('gambar', function($row){
                                    return "<img src='" . Storage::url($row->gambar) . "' width='100px'>";
                                })
                                ->rawColumns(['gambar', 'action'])
                                ->toJson();
        }
        return Inertia::render('Admin/PaymentMethods/Index', ['paymentMethods' => PaymentMethod::paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort_if(Gate::denies("payment_method_create"), Response::HTTP_FORBIDDEN, "Forbidden");
        return Inertia::render('Admin/PaymentMethods/Create');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PaymentMethod  $paymentMethod
     * @return \Illuminate\Http\Response
     */
    public function show(PaymentMethod $paymentMethod)
    {
        abort_if(Gate::denies("payment_method_show"), Response::HTTP_FORBIDDEN, "Forbidden");
        return Inertia::render('Admin/PaymentMethods/Show', ['paymentMethod' => $paymentMethod]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PaymentMethod  $paymentMethod
     * @return \Illuminate\Http\Response
     */
    public function edit(PaymentMethod $paymentMethod)
    {
        abort_if(Gate::denies("payment_method_edit"), Response::HTTP_FORBIDDEN, "Forbidden");
        return Inertia::render('Admin/PaymentMethods/Edit', ['paymentMethod' => $paymentMethod]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\PaymentMethod  $paymentMethod
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PaymentMethod $paymentMethod)
    {
        abort_if(Gate::denies("payment_method_update"), Response::HTTP_FORBIDDEN, "Forbidden");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PaymentMethod  $paymentMethod
     * @return \Illuminate\Http\Response
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        abort_if(Gate::denies("payment_method_delete"), Response::HTTP_FORBIDDEN, "Forbidden");
        if($paymentMethod->payments()->count() > 0){
            return back()->with('error', "Data tidak bisa dihapus karena mempunyai relasi dengan pembayaran.");
        }
        $paymentMethod->delete();
        return redirect()->route('admin.payment-methods.index')->with('success', "Data berhasil dihapus!");
    }
}
