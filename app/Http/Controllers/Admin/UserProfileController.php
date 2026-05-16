<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserProfileRequest;
use App\Models\Level;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Profile/Index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $levels = Level::all();
        return Inertia::render('Admin/Profile/Edit', ['levels' => $levels]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Admin\UserProfileRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(UserProfileRequest $request)
    {
        $idUser = auth()->id();
        $data = $request->except(['password']);
        
        if($gambar = $request->file('gambar')) { 
            $data['gambar'] = str_replace(" ", "", trim($gambar->getClientOriginalName()));
            $gambar->storeAs('img/avatar/'.$idUser, $data['gambar'], 'public');
        }

        if(!empty($request->password)) {
            $data['password'] = Hash::make($request->password);
        }
      
        User::find($idUser)->update($data);
        return back()->with('success', 'Profil berhasil diperbarui!');
    }
}
