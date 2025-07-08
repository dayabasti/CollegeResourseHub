const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ✅ Import the correct controller functions
const {
  uploadResource,
  getResources,
} = require("../controllers/resourceController");

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

const upload = multer({ storage });

// ✅ Define routes properly
router.post("/upload", upload.single("file"), uploadResource);
router.get("/", getResources);

module.exports = router;

