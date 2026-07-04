const express = require("express");
const Gallery = require("../models/Gallery");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const photos = await Gallery.find({ featured: true }).sort({ createdAt: -1 }).limit(6);
    res.json(photos);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const photo = new Gallery(req.body);
    await photo.save();
    res.json(photo);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const photo = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(photo);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;