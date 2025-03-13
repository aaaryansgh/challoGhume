"use client";
import { useState } from "react"

export default function DestinationSearch(){
    const [search,setSearch]=useState('')
    const handleSearch=(e)=>{
        alert(`search ${search}`)
    }
    const handleChange=(e)=>{
        setSearch(e.target.value)
    }
    return (
        <div className="px-6 text-center">
            <h2 className="text-3xl mb-4 font-mono">Where do you want to go?</h2>
            <input type="text" placeholder="Where you want to go" onChange={handleChange} className="p-2 rounded border "></input>
            <button onClick={handleSearch} className="ml-4 bg-black rounded-lg text-white px-4 py-2">Search</button>
        </div>
    )
}