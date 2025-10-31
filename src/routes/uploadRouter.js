const express = require("express");
const uploadRouter = express.Router();
const upload = require("../middleware/upload");

// Upload single photo
uploadRouter.post("/upload", upload.single("photo"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Return the URL path to access the file
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      message: "File uploaded successfully",
      url: fileUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

module.exports = {uploadRouter};