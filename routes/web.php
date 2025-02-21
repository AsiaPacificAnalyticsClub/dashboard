<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [EventsController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('home');

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->middleware(['auth', 'verified'])->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('register.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Events
    Route::prefix('events')->group(function () {
        Route::get('/create', function () {
            return Inertia::render('Events/Create');
        })->name('events.create');

        Route::get('/', [EventsController::class, 'index'])->name('events.index');
        Route::post('/store', [EventsController::class, 'store'])->name('events.store');
        Route::get('/{id}', [EventsController::class, 'show'])->name('events.show');
        Route::get('/{id}/edit', [EventsController::class, 'edit'])->name('events.edit');
        Route::patch('/{id}', [EventsController::class, 'update'])->name('events.update');
        Route::delete('/{id}', [EventsController::class, 'destroy'])->name('events.destroy');
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

    // Users
    Route::prefix('auth')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('auth.index');
        Route::patch('/{id}', [UsersController::class, 'update'])->name('auth.update');
        Route::delete('/{id}', [UsersController::class, 'destroy'])->name('auth.destroy');
    });
});

require __DIR__.'/auth.php';
