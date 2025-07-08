const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    file: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);

