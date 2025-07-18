const Resource = require("../models/Resource");

// Controller to handle resource upload
// Controller to handle resource upload
const uploadResource = async (req, res) => {
  try {
    const file = req.file;
    const { title, tags, section} = req.body;
    console.log("📦 Upload request body:", req.body);
    console.log("📂 Uploaded file:", req.file);
    console.log("👤 User:", req.user);
    console.log("📄 Saved file name:", file.filename);
    

    if (!file || !title || !section) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const tagArray = tags
      ? tags.split(",").map((tag) => tag.trim().toLowerCase())
      : [];

    const newResource = new Resource({
      title,
      file: file.filename,
      size: file.size,
      tags: tagArray,
      section,
    });
    newResource.uploadedBy = req.user.email;


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

const getResourcesBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const resources = await Resource.find({ section }).sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (error) {
    console.error("❌ Fetching section failed:", error);
    res.status(500).json({ message: "Failed to fetch resources" });
  }
};


// Export both controllers
module.exports = {
  uploadResource,
  getResources,
  getResourcesBySection,
};


