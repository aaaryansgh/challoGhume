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
    <div className="min-h-screen flex flex-col items-center bg-black py-30">
      <h1 className="text-2xl font-bold text-white font-mono mb-6">AI Travel Itinerary Generator</h1>
      <form  className="bg-white-300 p-6 shadow-lg rounded-lg w-full max-w-md text-white border">
      <input
        type="text"
        placeholder="Enter Destination"
        className="w-full mb-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Days"
       className="w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />
      <input
        type="String"
        placeholder="Interests"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
        value={interests}
        onChange={(e) => setInterest(e.target.value)}
      />
      <button 
        onClick={generateItinerary} 
        className="mt-4 bg-black border text-white p-2 rounded"
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
      </form>
      
    </div>
  );
}
