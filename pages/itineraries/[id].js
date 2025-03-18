"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ItineraryDetails() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`/api/ai/savedIter?id=${id}`);
        const data = await response.json();
        setItinerary(data);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {loading ? (
        <p>Loading itinerary...</p>
      ) : (
        itinerary && (
          <div className="w-full max-w-lg p-6 border rounded">
            <h1 className="text-2xl font-bold">{itinerary.destination}</h1>
            <p className="text-gray-600">{itinerary.days} days</p>
            <p className="mt-4">{itinerary.itinerary}</p>
          </div>
        )
      )}
    </div>
  );
}
