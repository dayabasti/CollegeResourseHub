require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ✅ MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  // these two options are now deprecated, so remove them
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/resources", require("./routes/resourceRoutes"));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

