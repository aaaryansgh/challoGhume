import mongoose from "mongoose";

const iterSchema=new mongoose.Schema(
    {
      
        destination:String,
        days:Number,
        interests:String,
        itinerary:String,
        createdAt: { type: Date, default: Date.now },
    }
)

export const Iter=mongoose.models.Iter||mongoose.model("Iter",iterSchema);