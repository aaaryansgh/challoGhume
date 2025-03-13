import jwt from 'jsonwebtoken';

export function verifyToken(req,res) {
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        return jwt.verify(token,process.env.JWT_SECRET);

    } catch(error){
        return res.status(401).json({error:"Invalid token"});
    }
}

//middleware for protecting routes.