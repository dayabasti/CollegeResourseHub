const Resource = require("../models/Resource");

// Controller to handle resource upload
const uploadResource = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newResource = new Resource({
      title,
      file: file.filename,
    });

    await newResource.save();
    console.log("✅ Resource saved:", newResource);

    res.status(201).json(newResource);
  } catch (error) {
    console.error("❌ Upload failed:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

// Controller to fetch all uploaded resources
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (error) {
    console.error("❌ Fetching resources failed:", error);
    res.status(500).json({ message: "Fetching resources failed" });
  }
};

// Export both controllers
module.exports = {
  uploadResource,
  getResources,
};


