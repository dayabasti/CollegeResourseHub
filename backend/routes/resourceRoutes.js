const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const multer = require("multer");
const path = require("path");
const fs = require("fs");





// ✅ Import the correct controller functions
const {
  uploadResource,
  getResources,
  getResourcesBySection,
} = require("../controllers/resourceController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ✅ Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
// File filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only PDF, JPEG, and PNG files are allowed."), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

// ✅ Define routes properly
router.post("/upload", verifyToken, upload.single("file"), uploadResource);
router.get("/", getResources);
router.get("/section/:section", getResourcesBySection);


// ✅ Add DELETE route
router.delete("/:id", async (req, res) => {
  try {
    const Resource = require("../models/Resource");
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Delete file from uploads folder
    const filePath = path.join(__dirname, "../../uploads", resource.file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await resource.deleteOne();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
});
// POST /api/resources/view/:id
router.post("/view/:id", async (req, res) => {
  try {
    await Resource.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json({ message: "View counted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to count view" });
  }
});
// Rate a resource (⭐️)
router.post("/:id/rate", async (req, res) => {
  try {
    const { rating } = req.body;
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const totalScore = resource.averageRating * resource.totalRatings;
    resource.totalRatings += 1;
    resource.averageRating = (totalScore + rating) / resource.totalRatings;

    await resource.save();
    res.json({ message: "Rated successfully", averageRating: resource.averageRating });
  } catch (err) {
    console.error("Rating error:", err);
    res.status(500).json({ message: "Failed to rate resource" });
  }
});



module.exports = router;

