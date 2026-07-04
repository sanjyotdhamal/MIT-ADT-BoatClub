const express = require("express");
const News = require("../models/News");
const auth = require("../middleware/auth");
const router = express.Router();

// Get all news (public)
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Add news (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.json(news);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Update news (admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(news);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete news (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;