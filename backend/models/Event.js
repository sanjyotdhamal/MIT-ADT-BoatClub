const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  venue: { type: String, required: true },
  participants: { type: String },
  colleges: { type: String },
  description: { type: String },
  type: { type: String, default: "Annual" },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);