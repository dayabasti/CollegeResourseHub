const mongoose = require("mongoose");



const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    file: { type: String, required: true },
    size: { type: Number },
    tags: [{ type: String }],
    section: {
      type: String,
      enum: ["notes", "pyqs", "interview"],
      required: true,
    },
    views: { type: Number, default: 0 },

    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    uploadedBy: { type: String }, // or ObjectId with ref: 'User' if using user model




  },
  { timestamps: true }
);


module.exports = mongoose.model("Resource", resourceSchema);

