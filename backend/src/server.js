import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
//Because export default router is used inside auth.route.js, you can import it using any variable name you want — including authRoutes.
dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json());
//why this middleware if the user doing the signup then the signup fields will triggere the datas and data which needs to send back to the client
//for this purpose we suppose need that middleware

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//make ready for deployment

if(process.env.NODE_ENV  === 'production'){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  
  app.get("*", (req, res) => {
    req.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  })
} 

app.listen(PORT, () => {console.log("Server running on port 3000" + PORT)
connectDB();
}
);

