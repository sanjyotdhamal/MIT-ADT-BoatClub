const express = require("express");
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const { upload, uploadToCloudinary } = require("../config/cloudinary");
const router = express.Router();

const initialEvents = [
  // Signature Events
  {
    name: "Maharashtra Mini Olympics",
    year: "2025",
    date: "2025",
    venue: "MIT ADT University, Pune",
    description: "MIT-ADT Boat Club proudly hosted the Maharashtra Mini Olympics, a multi-sport event bringing together athletes from across the state. The rowing segment saw participation from over 30 colleges, showcasing top talent in collegiate rowing.",
    image: "/images/hero-bg.jpg",
    type: "Signature",
    stat1Label: "Participants",
    stat1Value: "500+",
    stat2Label: "Clubs",
    stat2Value: "10+",
    stat3Label: "Events",
    stat3Value: "8+",
  },
  {
    name: "6th Indoor National Rowing Championship",
    year: "2024",
    date: "2024",
    venue: "MIT ADT University, Pune",
    description: "Our club had the honor of hosting the 6th Indoor National Rowing Championship, bringing together the best indoor rowing athletes from across India. The event featured intense competition on rowing ergometers with national level officials.",
    image: "/images/hero-bg.jpg",
    type: "Signature",
    stat1Label: "Participants",
    stat1Value: "300+",
    stat2Label: "States",
    stat2Value: "12+",
    stat3Label: "Categories",
    stat3Value: "10+",
  },
  // Vishwanath Sports Meet
  {
    name: "Vishwanath Sports Meet 2026",
    year: "2026",
    date: "January 15, 2026",
    venue: "MIT ADT University, Pune",
    description: "The 2026 edition of Vishwanath Sports Meet saw record participation with rowing as one of the key highlight events. MIT-ADT Boat Club athletes put up a stellar performance winning multiple medals.",
    image: "/images/hero-bg.jpg",
    type: "Vishwanath",
    participants: "400+",
    colleges: "25+",
  },
  {
    name: "Vishwanath Sports Meet 2025",
    year: "2025",
    date: "January 18, 2025",
    venue: "MIT ADT University, Pune",
    description: "Vishwanath Sports Meet 2025 continued the tradition of excellence with strong participation across all rowing categories. The event was a great success with athletes from multiple universities competing.",
    image: "/images/hero-bg.jpg",
    type: "Vishwanath",
    participants: "350+",
    colleges: "22+",
  },
  {
    name: "Vishwanath Sports Meet 2024",
    year: "2024",
    date: "January 20, 2024",
    venue: "MIT ADT University, Pune",
    description: "The 2024 edition featured exciting rowing competitions with MIT-ADT Boat Club showcasing strong home advantage performances across various boat categories.",
    image: "/images/hero-bg.jpg",
    type: "Vishwanath",
    participants: "300+",
    colleges: "20+",
  },
  {
    name: "Vishwanath Sports Meet 2023",
    year: "2023",
    date: "January 22, 2023",
    venue: "MIT ADT University, Pune",
    description: "Vishwanath Sports Meet 2023 marked another successful edition of this annual tradition, bringing together rowing talent from across Maharashtra for a day of intense competition.",
    image: "/images/hero-bg.jpg",
    type: "Vishwanath",
    participants: "280+",
    colleges: "18+",
  },
  // Inter-Collegiate Rowing Championship
  {
    name: "Inter-Collegiate Rowing Championship 2026",
    year: "2026",
    date: "February 20, 2026",
    venue: "MIT ADT University, Pune",
    description: "The Inter-Collegiate Rowing Championship 2026 saw fierce competition between engineering departments, with the Mechanical department securing top honors in multiple categories.",
    image: "/images/hero-bg.jpg",
    type: "Inter-Collegiate",
    participants: "30+",
    department: "Mechanical",
  },
  {
    name: "Inter-Collegiate Rowing Championship 2025",
    year: "2025",
    date: "February 22, 2025",
    venue: "MIT ADT University, Pune",
    description: "The 2025 edition of the championship featured strong participation across all departments with Computer Science students leading the medal tally this year.",
    image: "/images/hero-bg.jpg",
    type: "Inter-Collegiate",
    participants: "180+",
    department: "Computer Science",
  },
  {
    name: "Inter-Collegiate Rowing Championship 2024",
    year: "2024",
    date: "February 25, 2024",
    venue: "MIT ADT University, Pune",
    description: "Inter-Collegiate Rowing Championship 2024 brought together talented rowers from various engineering departments competing for institutional pride.",
    image: "/images/hero-bg.jpg",
    type: "Inter-Collegiate",
    participants: "160+",
    department: "Civil Engineering",
  },
  {
    name: "Inter-Collegiate Rowing Championship 2023",
    year: "2023",
    date: "February 28, 2023",
    venue: "MIT ADT University, Pune",
    description: "The 2023 championship marked a successful year for inter-departmental rowing competition with great enthusiasm from all participating teams.",
    image: "/images/hero-bg.jpg",
    type: "Inter-Collegiate",
    participants: "150+",
    department: "Mechanical",
  },
];

// ─── Get All Events (with auto-seeding if collection is empty) ───────────────
router.get("/", async (req, res) => {
  try {
    let count = await Event.countDocuments();
    if (count === 0) {
      console.log("Seeding initial events...");
      await Event.insertMany(initialEvents);
    }
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("Fetch events error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── Upload Event Image to Cloudinary ──────────────────────────────────────────
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const result = await uploadToCloudinary(req.file.buffer, {
      public_id: `events-${Date.now()}`,
    });
    res.json({ imageUrl: result.secure_url, success: true });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// ─── Add Event (admin only) ──────────────────────────────────────────────────
router.post("/", auth, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── Update Event (admin only) ───────────────────────────────────────────────
router.put("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (err) {
    console.error("Update event error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── Delete Event (admin only) ───────────────────────────────────────────────
router.delete("/:id", auth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete event error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;