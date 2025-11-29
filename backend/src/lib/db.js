import mongoose from "mongoose";
import dotenv from "dotenv";
import { ENV } from "./env.js";
export const connectDB = async () => {
    dotenv.config();
    try {
        const {MONGO_URI} = ENV;
        if(!MONGO_URI) throw new Error("MONGO_URI is not set");
        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log("MONGODB CONNECTED:", conn.connection.host);

    } catch(err) {
    console.log("Error connection to MONGODB", err);
    process.exit(1); // 12 status code measn failed 0 means passed    
}


};
