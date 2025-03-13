import jwt from "jsonwebtoken";
import { connectToDB } from "../../../lib/mongodb";
import { User } from "../../../models/user";
import cookie from "cookie";

export default async function handler(req,res){
    if(req.method!=="GET"){
        return res.status(405).json({message:"Method Not Allowed"});
    }
    try{
        const {token}=cookie.parse(req.headers.cookie||" ");
        if(!token){
            return res.status(401).json({message:"Not Authorized"});
        } 
        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //find user
        await connectToDB();
        const user=await User.findById(decoded.userId).select("-password");  
        if(!user){
            return res.status(401).json({message:"Not Authorized"});
        }
        return res.status(200).json({user});
    } catch(error){
        return res.status(401).json({message:"Invalid token"});
    }
}