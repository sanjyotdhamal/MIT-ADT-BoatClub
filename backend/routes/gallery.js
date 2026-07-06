const express = require("express");
const Gallery = require("../models/Gallery");
const auth = require("../middleware/auth");
const router = express.Router();
const { upload, uploadToCloudinary } = require("../config/cloudinary");

// ─── Upload Image to Cloudinary ───────────────────────────────────────────────
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const result = await uploadToCloudinary(req.file.buffer, {
      public_id: `gallery-${Date.now()}`,
    });
    res.json({ imageUrl: result.secure_url, success: true });
  } catch (err) {
    console.error("Gallery upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// ─── Get All Photos ───────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 }).lean();
    res.json(photos);
  } catch (err) {
    console.error("Gallery fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Get Featured Photos (for home slideshow) ────────────────────────────────
router.get("/featured", async (req, res) => {
  try {
    const photos = await Gallery.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    res.json(photos);
  } catch (err) {
    console.error("Gallery featured fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Add Photo (admin only) ──────────────────────────────────────────────────
router.post("/", auth, async (req, res) => {
  try {
    const photo = new Gallery(req.body);
    await photo.save();
    res.json(photo);
  } catch (err) {
    console.error("Gallery create error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Update Photo (admin only) ───────────────────────────────────────────────
router.put("/:id", auth, async (req, res) => {
  try {
    const photo = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!photo) return res.status(404).json({ message: "Photo not found" });
    res.json(photo);
  } catch (err) {
    console.error("Gallery update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Delete Photo (admin only) ───────────────────────────────────────────────
router.delete("/:id", auth, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Gallery delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;