<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

abstract class Controller
{
    public function __construct()
    {
        Inertia::share([
            'flash' => session('flash'),
        ]);
    }
}
