import { hash, compare } from "bcryptjs";
import { User } from "../../../models/user";
import { connectToDB } from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req,res){
    if(req.method !=="POST"){
        return res.status(405).json({message:"Method Not Allowed"});
    }
    try{
        await connectToDB();
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user || !(await compare(password,user.password))){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
     //set cookie
        res.setHeader("Set-Cookie",cookie.serialize("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*24*60*60,
        path:"/"
        }));
        return res.status(200).json({message:"Logged in"});
    } catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }   
    
}