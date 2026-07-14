const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/news", require("./routes/news"));
app.use("/api/results", require("./routes/results"));
app.use("/api/athletes", require("./routes/athletes"));
app.use("/api/events", require("./routes/events"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/registrations", require("./routes/registrations"));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "MIT-ADT Boat Club API is running!" });
});

// Connect to MongoDB
console.log("Connecting to:", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected!");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });