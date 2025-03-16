import { useEffect,useState } from "react";

export default function savedItinerary() {
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchItineraries = async () => {
            try {
              const response = await fetch("/api/ai/savedIter");
              const data = await response.json();
              setItinerary(data.iters);
            } catch (error) {
              console.error("Error fetching itineraries:", error);
            } finally {
              setLoading(false);
            }
          };
          fetchItineraries();
    },[]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Saved Itineraries</h1>
    
          {loading ? (
            <p>Loading itineraries...</p>
          ) : (
            <div className="w-full max-w-2xl">
              {itinerary.map((iter) => (
                <div key={iter._id} className="border p-4 mb-4 rounded">
                  <h2 className="text-xl font-semibold">{iter.destination}</h2>
                  <p>{iter.days} days</p>
                  <p className="text-sm text-gray-500">{new Date(iter.createdAt).toLocaleDateString()}</p>
                  <p className="mt-2">{iter.itinerary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
}