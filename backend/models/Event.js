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
  year: { type: String },
  department: { type: String },
  stat1Label: { type: String },
  stat1Value: { type: String },
  stat2Label: { type: String },
  stat2Value: { type: String },
  stat3Label: { type: String },
  stat3Value: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);