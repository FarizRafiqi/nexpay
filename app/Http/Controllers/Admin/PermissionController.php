<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Yajra\DataTables\Facades\DataTables;
use Symfony\Component\HttpFoundation\Response;

/**
 * Resource controller untuk model Permission
 */
class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        abort_if(Gate::denies('permission_access'), Response::HTTP_FORBIDDEN, 'Forbidden');

        if($request->ajax() && !$request->header('X-Inertia')){
            $permissions = Permission::all();
            return DataTables::of($permissions)
                    ->addColumn('action', function($permissions){
                        $button = '<a href='. route("admin.permissions.edit", $permissions->id).' class="btn btn-success btn-sm mr-2 btn-edit">edit</a>';
                        $button .= '
                            <form action='.route("admin.permissions.destroy", $permissions->id).' method="POST" class="d-inline-block form-delete">
                                '. csrf_field() .'
                                '. method_field("DELETE") .'
                                <button type="submit" class="btn btn-danger btn-sm btn-delete">delete</button>
                            </form>
                        ';
                        return $button;
                    })
                    ->toJson();
        }
        return Inertia::render('Admin/Permissions/Index', ['permissions' => Permission::paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort_if(Gate::denies('permission_create'), Response::HTTP_FORBIDDEN, 'Forbidden');
        return Inertia::render('Admin/Permissions/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'title.*' => 'required|string|min:3'
            ],
            [
                'title.*.required' => 'Title tidak boleh kosong',
                'title.*.string' => 'Title harus berupa karakter',
                'title.*.min' => 'Title minimal terdiri dari 3 karakter',
            ]
        );
    
        foreach ($request->title as $key => $value) {
            Permission::create(['title' => $value]);
        }
        return redirect()->route('admin.permissions.index')->with('success', 'Data berhasil ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function edit(Permission $permission)
    {
        abort_if(Gate::denies('permission_edit'), Response::HTTP_FORBIDDEN, 'Forbidden');
        return Inertia::render('Admin/Permissions/Edit', ['permission' => $permission]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission)
    {
        abort_if(Gate::denies('permission_update'), Response::HTTP_FORBIDDEN, 'Forbidden');
        $request->validate(
            [
            'title' => 'required|string|min:3'
            ],
            [
                'title.required' => 'Title tidak boleh kosong',
                'title.string' => 'Title harus berupa karakter',
                'title.min' => 'Title minimal terdiri dari 3 karakter',
            ]
        );
        Permission::create($request->all());
        return redirect()->route('admin.permissions.index')->with('success', 'Data berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        abort_if(Gate::denies('permission_delete'), Response::HTTP_FORBIDDEN, 'Forbidden');
        $permission->levels()->detach();
        $permission->delete();
        return redirect()->route('admin.permissions.index')->with('success', 'Data berhasil dihapus!');
    }
}
