import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup(){
    const router=useRouter();
    const [formData,setFormData]=useState({name:"",email:"",password:""});
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await fetch("api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData),
        })
        const data=await res.json();
        if(res.ok){
            router.push("/login");
            
        } else alert(data.error);
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-black text-white p-6 shadow  rounded-lg">
                <h1 className="text-center font-bold mb-2">Sign Up</h1>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} className="border rounded-lg p-2 w-full mb-2" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} className="border rounded-lg p-2 w-full mb-2" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} className="border rounded-lg p-2 w-full mb-2" />
                <button type="submit" className="bg-white text-black px-4 py-2 rounded-lg w-full ">Sign Up</button>
                <p>Already registered?</p>
                <Link href="/login" className="text-blue-500">Login</Link>
            </form>
        </div>
    )
}