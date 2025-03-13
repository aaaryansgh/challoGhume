import { verifyToken } from "../../lib/auth";

export default async function handler(req,res){
    const user=verifyToken(req,res);
    if(!user) return;
    res.status(200).json({message:"You are authorized"});
}

