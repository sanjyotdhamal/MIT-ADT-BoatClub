const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  event: { type: String, required: true },
  year: { type: String },
  course: { type: String, required: true },
  age: { type: Number },
  experience: { type: String },
  position: { type: String },
  goldMedals: { type: Number, default: 0 },
  silverMedals: { type: Number, default: 0 },
  bronzeMedals: { type: Number, default: 0 },
  matchesPlayed: { type: Number, default: 0 },
  achievements: { type: String },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Athlete", athleteSchema);