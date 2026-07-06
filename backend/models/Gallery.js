const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Indexes for fast sorted queries
gallerySchema.index({ createdAt: -1 });
gallerySchema.index({ featured: 1, createdAt: -1 });

module.exports = mongoose.model("Gallery", gallerySchema);