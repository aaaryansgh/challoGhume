import DestinationSearch from "./destinationSearch";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
export default function Hero(){
    const {user}=useContext(AuthContext);
    return(
        <div className="h-[90vh] flex flex-col justify-center items-center bg-black text-white text-center font-mono">
           <h1 className="text-4xl font-bold">
                Welcome {user ? user.name : "Traveler"}! ✈️
            </h1>
            <p className="mt-4 mb-4 text-lg">Plan your dream trips effortlessly.</p>
           <Link href="/itinerary"><button className="bg-black border text-white px-6 py-2 rounded-lg hover:bg-gray-300 hover:text-black  mb-6">Get Started</button></Link> 
           
        </div>
    )
}