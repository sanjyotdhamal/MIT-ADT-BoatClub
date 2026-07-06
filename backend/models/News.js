const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  image: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Indexes for fast sorted queries
newsSchema.index({ createdAt: -1 });
newsSchema.index({ featured: 1, createdAt: -1 });

module.exports = mongoose.model("News", newsSchema);