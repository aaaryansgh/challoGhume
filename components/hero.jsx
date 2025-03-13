import DestinationSearch from "./destinationSearch";

export default function Hero(){
    return(
        <div className="h-[90vh] flex flex-col justify-center items-center bg-gradient-to-r from-gray-500 to black-700 text-black text-center font-mono">
            <h1 className="font-bold text-4xl mb-4">Plan your next adventure with CHALOGHUME!</h1>
            <p className="mb-6 text-lg" >Discover the best destinations with AI recommendations</p>
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-300 hover:text-black  mb-6">Get Started</button>
            <DestinationSearch />
        </div>
    )
}