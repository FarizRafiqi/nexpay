<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Jenssegers\Agent\Facades\Agent;

class HomeController extends Controller
{
    /**
     * Untuk menampilkan halaman home
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Welcome');
    }

    /**
     * Untuk menampilkan halaman about us
     *
     */
    public function aboutUs()
    {
        return Inertia::render('AboutUs');
    }

    /**
     * Halaman Frequently Ask Question
     */
    public function faq()
    {
        return Inertia::render('FAQ');
    }

    /**
     * Halaman How To Pay
     */
    public function howToPay()
    {
        return Inertia::render('HowToPay');
    }
}
