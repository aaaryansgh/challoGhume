"use client"; // If using App Router

import { useState } from "react";

export default function ItineraryPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [interests, setInterest] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateItinerary = async () => {
    setLoading(true);
    setItinerary("");

    const response = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, days , interests}),
    });

    const data = await response.json();
    setItinerary(data.itinerary);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">AI Travel Itinerary Generator</h1>
      <input
        type="text"
        placeholder="Enter Destination"
        className="border p-2 mt-4"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Days"
        className="border p-2 mt-2"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />
      <input
        type="String"
        placeholder="Interests"
        className="border p-2 mt-2"
        value={interests}
        onChange={(e) => setInterest(e.target.value)}
      />
      <button 
        onClick={generateItinerary} 
        className="mt-4 bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Itinerary"}
      </button>

      {itinerary && (
        <div className="mt-4 p-4 border">
          <h2 className="text-xl font-semibold">Your Itinerary</h2>
          <p>{itinerary}</p>
        </div>
      )}
    </div>
  );
}
