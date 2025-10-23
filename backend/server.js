require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

const app = express();
app.use(cors({
  origin: [
    "https://collegeresoursehub-1.onrender.com",    // Old Render frontend
    "https://collegeresourcehub.netlify.app/"  // <-- ADD YOUR NETLIFY URL HERE
  ],
  credentials: true
}));


const PORT = process.env.PORT || 5000;

// ✅ Middleware

app.use(express.json());

// ✅ Serve static files from /uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);

// ✅ MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
