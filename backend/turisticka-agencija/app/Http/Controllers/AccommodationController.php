<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AccommodationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accommodations = Accommodation::all();

        $accommodations_with_photos = $accommodations->map(function ($accommodation) {
            $base64 = null;
            if ($accommodation->photo != null) {
                $photo = Storage::get($accommodation->photo);
                $base64 = base64_encode($photo);
            }
            return [
                'id' => $accommodation->id,
                'name' => $accommodation->name,
                'location' => $accommodation->location,
                'type' => $accommodation->type,
                'capacity' => $accommodation->capacity,
                'price_per_person' => $accommodation->price_per_person,
                'photo' => $base64
            ];
        });
        return $accommodations_with_photos;
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
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required',
            'capacity' => 'required|numeric|min:1',
            'price_per_person' => 'required|numeric|min:0'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        $photo = Storage::get($request->photo);

        if ($photo == null) {
            Storage::disk('local')->put($request->photo, file_get_contents($request->file('file')));
        }

        $accommodation = Accommodation::create([
            'name' => $request->name,
            'location' => $request->location,
            'type' => $request->type,
            'capacity' => $request->capacity,
            'price_per_person' => $request->price_per_person,
            'photo' => $request->photo
        ]);

        return response()->json($accommodation);

        // return response()->json(['Accommodation is created successfully.', new PostResource($post)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $accommodation = Accommodation::find($id);
        if (is_null($accommodation))
            return response()->json('Data not found', 404);
        return response()->json($accommodation);
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
        $accommodation = Accommodation::find($id);

        $accommodation->name = $request->name;
        $accommodation->location = $request->location;
        $accommodation->type = $request->type;
        $accommodation->capacity = $request->capacity;
        $accommodation->price_per_person = $request->price_per_person;
       

        $accommodation->save();

        return $accommodation;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Accommodation::destroy($id);

        return response()->json('Accommodation is deleted successfully.');
    }
}
