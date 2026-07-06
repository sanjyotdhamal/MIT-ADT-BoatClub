const express = require("express");
const News = require("../models/News");
const auth = require("../middleware/auth");
const router = express.Router();
const { upload, uploadToCloudinary } = require("../config/cloudinary");

// ─── Upload Image to Cloudinary ───────────────────────────────────────────────
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // With memoryStorage, the file is in req.file.buffer
    const result = await uploadToCloudinary(req.file.buffer, {
      public_id: `news-${Date.now()}`,
    });
    res.json({ imageUrl: result.secure_url, success: true });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// ─── Get Featured News (max 6) ─────────────────────────────────────────────
// IMPORTANT: This must be defined BEFORE the /:id route to avoid conflict
router.get("/featured", async (req, res) => {
  try {
    const news = await News.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    res.json(news);
  } catch (err) {
    console.error("Featured fetch error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── Get All News (public, lightweight — excludes fullDescription) ──────────
router.get("/", async (req, res) => {
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .select("-fullDescription")
      .lean();
    res.json(news);
  } catch (err) {
    console.error("Fetch all error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── Get Single News by ID (includes fullDescription) ──────────────────────
router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id).lean();
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    console.error("Fetch single error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── Add News (admin only) ─────────────────────────────────────────────────
router.post("/", auth, async (req, res) => {
  try {
    const { title, category, date, description, fullDescription, image, featured } = req.body;

    if (!title || !category || !date || !description) {
      return res.status(400).json({ message: "title, category, date, and description are required" });
    }

    // Enforce max 6 featured articles
    if (featured) {
      const featuredCount = await News.countDocuments({ featured: true });
      if (featuredCount >= 6) {
        return res.status(400).json({ message: "Maximum 6 featured articles allowed. Please un-feature one first." });
      }
    }

    const news = new News({ title, category, date, description, fullDescription, image, featured: !!featured });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    console.error("Create news error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── Update News (admin only) ──────────────────────────────────────────────
router.put("/:id", auth, async (req, res) => {
  try {
    const { featured } = req.body;

    // Enforce max 6 featured articles when toggling on
    if (featured) {
      const existing = await News.findById(req.params.id);
      if (existing && !existing.featured) {
        const featuredCount = await News.countDocuments({ featured: true });
        if (featuredCount >= 6) {
          return res.status(400).json({ message: "Maximum 6 featured articles allowed. Please un-feature one first." });
        }
      }
    }

    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    console.error("Update news error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── Delete News (admin only) ──────────────────────────────────────────────
router.delete("/:id", auth, async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete news error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;