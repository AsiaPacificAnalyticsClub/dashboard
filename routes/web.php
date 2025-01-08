<?php

use App\Http\Controllers\EventsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Events/Event');
})->middleware(['auth', 'verified'])->name('events.index');

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->middleware(['auth', 'verified'])->name('register');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Events
    Route::prefix('events')->group(function () {
        // Route::get('/', function () {
        //     return Inertia::render('Events/Event');
        // })->name('events.index');
        Route::get('/create', function () {
            return Inertia::render('Events/Create');
        })->name('events.create');

        Route::post('/store', [EventsController::class, 'store'])->name('events.store');
    });

    // Merch
    Route::prefix('merch')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Merch/Index');
        })->name('merch.index');
        Route::get('/create', function () {
            return Inertia::render('Merch/Create');
        })->name('merch.create');
    });
});

require __DIR__.'/auth.php';
