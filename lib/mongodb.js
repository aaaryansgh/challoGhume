import mongoose from "mongoose";

const MONGODB_URL = "mongodb://127.0.0.1:27017/travel";

if(!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL environment variable inside .env.local");
}

let cached= global.mongoose||{conn:null, promise:null};

export async function connectToDB(){
    if(cached.conn) return cached.conn;
    if(!cached.promise){
        cached.promise=mongoose.connect(MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    }
    cached.conn=await cached.promise;
    return cached.conn;
}