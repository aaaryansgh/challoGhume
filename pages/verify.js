import { useState,useEffect } from "react";
import { useSearchParams,useRouter } from "next/navigation";
export default function verifyEmail(){
    const [status,setStatus]=useState("Verifying");
    const searchParams=useSearchParams();
    const router=useRouter();
    useEffect(()=>{
        const token=searchParams.get("token");
        if(!token){
            return setStatus("Invalid token");
        }
        fetch("/api/auth/verify-email",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({token})
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.success){
                setStatus("Success");
                setTimeout(()=>router.push("/login"),2000);
            }
            else{
                setStatus("Invalid token");
            }
        }).catch(()=>setStatus("An error occurred"));
    },[]);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {status==="Verifying"&&(
                <div>
                    <h2 className="text-xl font-bold">Verifying your email...</h2>
                    <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mt-3"></div>
                </div>
            )}
            {status==="Success"&&(
                <div className="text-center text-green-500">
                    <h2 className="text-xl font-bold">Email Verified</h2>
                    <p>Redirecting to login...</p>
                </div>
            )}
            {status==="Invalid token"&&(
                <div className="text-center text-red-500">
                    <h2 className="text-xl font-semibold">Invalid token</h2>
                    <p>Redirecting to login...</p>
                    <button onClick={()=>router.push("/login")} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">Login</button>
                </div>
            )}
        </div>
    )
}