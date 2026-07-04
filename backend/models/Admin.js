const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

adminSchema.methods.comparePassword = function (password) {
  return this.password === password;
};

module.exports = mongoose.model("Admin", adminSchema);