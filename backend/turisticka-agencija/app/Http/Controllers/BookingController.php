<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::with('accommodation', 'user')->get();
        return $bookings;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'number_of_persons' => 'required|numeric|min:1',
            'date_from' => 'required|date|after:tomorrow',
            'date_to' => 'required|date|after:date_from',
            'price' => 'required|numeric|min:0'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        $booking = Booking::create([
            'number_of_persons' => $request->number_of_persons,
            'date_from' => $request->date_from,
            'date_to' => $request->date_to,
            'price' => $request->price,
            'user_id' => $request->user_id,
            'accommodation_id' => $request->accommodation_id
        ]);

        return response()->json($booking);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $booking = Booking::find($id);
        if (is_null($booking))
            return response()->json('Data not found', 404);
        return response()->json($booking);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $booking = Booking::find($id);

        $booking->number_of_persons = $request->number_of_persons;
        $booking->date_from = $request->date_from;
        $booking->date_to = $request->date_to;
        $booking->price = $request->price;
        $booking->user_id = $request->user_id;
        $booking->accommodation_id = $request->accommodation_id;

        $booking->save();

        return Booking::with('accommodation', 'user')->find($id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getByUser(string $id) {
        $bookings = Booking::with('accommodation', 'user')->where('user_id', $id)->get();

        return $bookings;
    }
}
