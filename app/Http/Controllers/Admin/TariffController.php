<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TariffRequest;
use App\Models\Tariff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Yajra\DataTables\Facades\DataTables;
use Symfony\Component\HttpFoundation\Response;

/**
 * Resource controller untuk model Tariff
 */
class TariffController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        abort_if(Gate::denies("tariff_access"), Response::HTTP_FORBIDDEN, "Forbidden");

        if($request->ajax() && !$request->header('X-Inertia')){
            $tariffs = Tariff::with("plnCustomers")->get();
            return DataTables::of($tariffs)
                    ->addColumn("action", function($tariffs){
                        $button = '<a href='. route("admin.tariffs.edit", $tariffs->id).' class="btn btn-success btn-sm mr-2">edit</a>';
                        $button .= '
                            <form action='.route("admin.tariffs.destroy", $tariffs->id).' method="POST" class="d-inline-block form-delete">
                                '. csrf_field() .'
                                '. method_field("DELETE") .'
                                <button type="submit" class="btn btn-danger btn-sm btn-delete">delete</button>
                            </form>
                        ';
                        return $button;
                    })
                    ->toJson();
        }
        return Inertia::render('Admin/Tariffs/Index', ['tariffs' => Tariff::withCount('plnCustomers')->get()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort_if(Gate::denies("tariff_create"), Response::HTTP_FORBIDDEN, "Forbidden");
        return Inertia::render('Admin/Tariffs/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TariffRequest $request)
    {
        Tariff::create($request->all());
        return redirect()->route("admin.tariffs.index")->with('success', "Tarif berhasil ditambahkan!");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tariff  $tariff
     * @return \Illuminate\Http\Response
     */
    public function show(Tariff $tariff)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tariff  $tariff
     * @return \Illuminate\Http\Response
     */
    public function edit(Tariff $tariff)
    {
        abort_if(Gate::denies("tariff_edit"), Response::HTTP_FORBIDDEN, "Forbidden");
        return Inertia::render('Admin/Tariffs/Edit', ['tariff' => $tariff]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\TariffRequest  $request
     * @param  \App\Models\Tariff  $tariff
     * @return \Illuminate\Http\Response
     */
    public function update(TariffRequest $request, Tariff $tariff)
    {
        abort_if(Gate::denies("tariff_update"), Response::HTTP_FORBIDDEN, "Forbidden");
        $tariff->update($request->validated());
        return redirect()->route("admin.tariffs.index")->with('success', "Tarif berhasil diubah!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tariff  $tariff
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tariff $tariff)
    {
        abort_if(Gate::denies("tariff_delete"), Response::HTTP_FORBIDDEN, "Forbidden");
        if($tariff->plnCustomers()->count() > 0){
            return back()->with('error', "Tarif tidak bisa dihapus, karena mempunyai relasi dengan data pelanggan");
        }
        
        $tariff->delete();
        return redirect()->route("admin.tariffs.index")->with('success', "Tarif berhasil dihapus!");
    }
}
