<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LevelRequest;
use App\Http\Requests\Admin\MassDestroyLevelRequest;
use App\Models\Level;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;
use Yajra\DataTables\Facades\DataTables;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        abort_if(Gate::denies('level_access'), Response::HTTP_FORBIDDEN, 'Forbidden');

        if($request->ajax() && !$request->header('X-Inertia')){   
            $levels = Level::get();
            return DataTables::of($levels)
                    ->addColumn('action', function($row){
                        $showGate       = '';
                        $editGate       = 'level_edit';
                        $deleteGate     = 'level_delete';
                        $crudRoutePart  = 'levels';
                        
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

        return Inertia::render('Admin/Levels/Index', ['levels' => Level::get()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort_if(Gate::denies('level_create'), Response::HTTP_FORBIDDEN, 'Forbidden');
        $permissions = Permission::all();
        return Inertia::render('Admin/Levels/Create', ['permissions' => $permissions]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Admin\LevelRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(LevelRequest $request)
    {
        $level = Level::create(['level'=>strtolower($request->level)]);
        $level->permissions()->sync($request->input('permissions', []));

        return redirect()->route('admin.levels.index')->with('success', 'Level berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Level  $level
     * @return \Illuminate\Http\Response
     */
    public function show(Level $level)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Level  $level
     * @return \Illuminate\Http\Response
     */
    public function edit(Level $level)
    {
        abort_if(Gate::denies('level_edit'), Response::HTTP_FORBIDDEN, 'Forbidden');
        $permissions = Permission::all();
        return Inertia::render('Admin/Levels/Edit', ['level' => $level, 'permissions' => $permissions]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Admin\LevelRequest  $request
     * @param  \App\Models\Level  $level
     * @return \Illuminate\Http\Response
     */
    public function update(LevelRequest $request, Level $level)
    {
        $level->update(['level' => strtolower($request->level)]);
        $level->permissions()->sync($request->input('permissions', []));

        return redirect()->route('admin.levels.index')->with('success', 'Level berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Level  $level
     * @return \Illuminate\Http\Response
     */
    public function destroy(Level $level)
    {
        abort_if(Gate::denies('level_delete'), Response::HTTP_FORBIDDEN, 'Forbidden');
        $level->delete();
        return redirect()->route('admin.levels.index')->with('success', 'Level berhasil dihapus!');
    }

    public function massDestroy(MassDestroyLevelRequest $request)
    {
        abort_if(Gate::denies('level_delete'), Response::HTTP_FORBIDDEN, 'Forbidden');
        $levels = Level::whereIn('id', request('ids'))->get();
        foreach($levels as $level){
            if($level-> id === 1){
                return back()->with('error', 'Admin tidak dapat dihapus!');
                return;
            }
            $level->delete();
        }

        return redirect()->route('admin.levels.index')->with('success', 'Data level(s) berhasil dihapus!');
    }
}
