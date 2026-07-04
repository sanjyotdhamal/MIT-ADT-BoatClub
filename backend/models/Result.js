const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subCategory: { type: String, default: "N/A" },
  year: { type: String, required: true },
  eventName: { type: String, required: true },
  date: { type: String, required: true },
  venue: { type: String, required: true },
  boatClass: { type: String, required: true },
  medal: { type: String, required: true },
  position: { type: String, default: "" },
  athletes: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);