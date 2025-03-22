import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:String,
    email: {type:String, required:true, unique:true},
    password:String,
    verified: { type: Boolean, default: false },
    itineraries: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Iter", // Link to itineraries
        },
      ],
})

export const User=mongoose.models.User||mongoose.model("User",UserSchema);