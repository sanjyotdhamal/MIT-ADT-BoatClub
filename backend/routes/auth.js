const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { upload, uploadToCloudinary } = require("../config/cloudinary");
const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Setup admin (run once)
router.post("/setup", async (req, res) => {
  try {
    const existing = await Admin.findOne({ username: "admin" });
    if (existing) return res.json({ message: "Admin already exists" });
    const admin = new Admin({
      username: "admin",
      password: "mitboatclub@2026"
    });
    await admin.save();
    res.json({ message: "Admin created successfully!" });
  } catch (err) {
    console.log("SETUP ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Public Document Upload (for registration)
router.post("/upload-document", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    // For PDFs, we want raw/auto upload and no image resizing transformations
    const isPdf = req.file.mimetype === "application/pdf";
    const uploadOptions = {
      public_id: `doc-${Date.now()}`,
      resource_type: "auto",
    };
    if (isPdf) {
      uploadOptions.transformation = [];
    }
    
    const result = await uploadToCloudinary(req.file.buffer, uploadOptions);
    res.json({ imageUrl: result.secure_url, success: true });
  } catch (err) {
    console.error("Public upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

module.exports = router;