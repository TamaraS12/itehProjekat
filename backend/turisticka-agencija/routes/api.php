<?php

use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/accommodations', [AccommodationController::class, 'index'])->name('accommodations.index');
Route::get('/accommodations/{id}', [AccommodationController::class, 'show'])->name('accommodations.show');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/bookings/statistics', [BookingController::class, 'getBookingCountPerAccommodation'])->name('bookings.statistics');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    Route::post('/accommodations/add', [AccommodationController::class, 'store'])->name('accommodations.store');
    Route::delete('/accommodations/delete/{id}', [AccommodationController::class, 'destroy'])->name('accommodations.destroy');
    Route::put('/accommodations/update/{id}', [AccommodationController::class, 'update'])->name('accommodations.update');

    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/user/{id}', [BookingController::class, 'getByUser'])->name('bookings.user');
    Route::get('/bookings/{id}', [BookingController::class, 'show'])->name('bookings.show');
    Route::post('/bookings/add', [BookingController::class, 'store'])->name('bookings.store');
    Route::put('/bookings/update/{id}', [BookingController::class, 'update'])->name('bookings.update');

    Route::post('/logout', [AuthController::class, 'logout']);
});