import cookie from "cookie";

export default async function handler(req,res){
    if(req.method!=="POST"){
        return res.status(405).json({message:"Method Not Allowed"});
    }
    res.setHeader("Set-Cookie",cookie.serialize("token","",{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        expires:new Date(0),
    }));
    return res.status(200).json({message:"Logged out"});
}