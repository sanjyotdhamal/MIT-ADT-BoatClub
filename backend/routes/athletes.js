const express = require("express");
const Athlete = require("../models/Athlete");
const auth = require("../middleware/auth");
const router = express.Router();
const { upload, uploadToCloudinary } = require("../config/cloudinary");

router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const result = await uploadToCloudinary(req.file.buffer, {
      public_id: `athlete-${Date.now()}`,
    });
    res.json({ imageUrl: result.secure_url, success: true });
  } catch (err) {
    console.error("Athlete upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const athletes = await Athlete.find().sort({ createdAt: 1 });
    res.json(athletes);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const athlete = new Athlete(req.body);
    await athlete.save();
    res.json(athlete);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const athlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(athlete);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Athlete.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;