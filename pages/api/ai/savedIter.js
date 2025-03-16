import { connectToDB } from "../../../lib/mongodb";
import {Iter} from "../../../models/iter";

export default async function handler(req, res) {
    if(req.method!=="GET"){
        return res.status(405).json({error:"Method not allowed"});
    }
    try{
        await connectToDB();
        const iters = await Iter.find().sort({createdAt:-1});
        res.status(200).json({iters});
    } catch(error){
        console.log("Error", error);
        res.status(500).json({error:"Failed to catch itineraries"});
    }
}