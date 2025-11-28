import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// Load environment variables from .env
dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// -------------------- API ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// -------------------- FRONTEND SERVING --------------------
const __dirname = path.resolve();

// Production: serve React frontend
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");

  // Serve static files from the frontend build folder
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Serve index.html for all other routes (for React Router)
  app.get("*", (__, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} else {
  // Development: simple root route
  console.log("Running in development mode");
  app.get("/", (req, res) => {
    res.send("API running in development mode");
  });
}

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
