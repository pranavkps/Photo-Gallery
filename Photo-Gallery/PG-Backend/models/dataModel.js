const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    file : String, 
    tags : String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("UploadModel", uploadSchema);