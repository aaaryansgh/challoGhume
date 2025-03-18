import Link from "next/link";
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export default function Navbar(){
    const {user,logout}=useContext(AuthContext);
    return(
        <nav className="bg-black text-white flex justify-between p-4">
            <Link href="/" className="font-bold font-mono border p-1 text-2xl">ChalloGhume</Link>
            <div>
                {user?(
                    <>
                       <Link href="/itineraries" className="mr-2 font-bold">saved Itinerary</Link>
                        <button onClick={()=>logout()} className="bg-red-500 hover:bg-red-700 text-white  py-1 px-2 rounded">Logout</button>
                        
                    </>
                ):(
                    <>
                        <Link href="/login" className="mr-4">Login</Link>
                        <Link href="/signup">Signup</Link>
                        
                    </>
                )}
                
            </div>
        </nav>
    )
}