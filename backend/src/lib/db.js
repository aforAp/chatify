import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
    dotenv.config();
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED:", conn.connection.host);

    } catch(err) {
    console.log("Error connection to MONGODB", err);
    process.exit(1); // 12 status code measn failed 0 means passed    
}


};
