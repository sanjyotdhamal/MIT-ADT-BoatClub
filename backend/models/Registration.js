const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: "" },
  phone: { type: String, required: true },
  age: { type: Number },
  aadharNo: { type: String, default: "" },
  nsrsId: { type: String, default: "" },
  rfId: { type: String, default: "" },
  birthCertificate: { type: String, required: true },
  domicile: { type: String, default: "" },
  department: { type: String, default: "" },
  year: { type: String, default: "" },
  enrolment_no: { type: String, default: "" },
  experience: { type: String, default: "" },
  reason: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// Index for sorting by newest first
registrationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Registration", registrationSchema);
