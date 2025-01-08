<?php

namespace App\Http\Controllers;

use App\Models\Events;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Events::all();

        return Inertia::render('Events/Event', ['events' => $events]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Events/Create', [
            'events' => new Events,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'link' => 'required|string|max:255',
            'start_date' => 'required|array',
            'start_date.0' => 'required|string',
            'start_date.1' => 'required|string',
            'image' => 'nullable',
        ]);

        $startDate = $request->start_date[0];
        $endDate = $request->start_date[1];

        $events = new Events([
            'title' => $request->title,
            'description' => $request->description,
            'link' => $request->link,
            'start_date' => date('Y-m-d', strtotime($startDate)),
            'end_date' => date('Y-m-d', strtotime($endDate)),
            'image' => [],
        ]);

        $events->save();

        return redirect()->route('events.index')->with('success', 'Event created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Events $events)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Events $events)
    {
        return Inertia::render('Events/Edit', [
            'events' => $events,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $events = Events::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $events->update([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->route('events.index')->with('success', 'Event updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $events = Events::findOrFail($id);
        $events->delete();

        return redirect()->route('events.index')->with('success', 'Event deleted successfully!');
    }
}
