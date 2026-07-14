const express = require("express");
const News = require("../models/News");
const Result = require("../models/Result");
const Athlete = require("../models/Athlete");
const Event = require("../models/Event");
const Gallery = require("../models/Gallery");
const router = express.Router();

// ─── Dashboard Stats + Recent Activity ────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    // Run all count queries in parallel for speed
    const [newsCount, resultsCount, athletesCount, eventsCount, galleryCount] =
      await Promise.all([
        News.countDocuments(),
        Result.countDocuments(),
        Athlete.countDocuments(),
        Event.countDocuments(),
        Gallery.countDocuments(),
      ]);

    // Fetch recent items from each collection (last 5 each, sorted by createdAt)
    const [recentNews, recentResults, recentAthletes, recentEvents, recentGallery] =
      await Promise.all([
        News.find().sort({ createdAt: -1 }).limit(5).select("title createdAt").lean(),
        Result.find().sort({ createdAt: -1 }).limit(5).select("eventName boatClass medal createdAt").lean(),
        Athlete.find().sort({ createdAt: -1 }).limit(5).select("name event createdAt").lean(),
        Event.find().sort({ createdAt: -1 }).limit(5).select("name createdAt").lean(),
        Gallery.find().sort({ createdAt: -1 }).limit(5).select("title createdAt").lean(),
      ]);

    // Merge all recent items into a single timeline
    const recentActivity = [
      ...recentNews.map((n) => ({
        type: "news",
        action: "News article added",
        item: n.title,
        time: n.createdAt,
      })),
      ...recentResults.map((r) => ({
        type: "result",
        action: "Result added",
        item: `${r.eventName} — ${r.boatClass} (${r.medal})`,
        time: r.createdAt,
      })),
      ...recentAthletes.map((a) => ({
        type: "athlete",
        action: "Athlete added",
        item: `${a.name} — ${a.event}`,
        time: a.createdAt,
      })),
      ...recentEvents.map((e) => ({
        type: "event",
        action: "Event added",
        item: e.name,
        time: e.createdAt,
      })),
      ...recentGallery.map((g) => ({
        type: "gallery",
        action: "Gallery photo uploaded",
        item: g.title,
        time: g.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10); // Top 10 most recent across everything

    res.json({
      stats: {
        news: newsCount,
        results: resultsCount,
        athletes: athletesCount,
        events: eventsCount,
        gallery: galleryCount,
      },
      recentActivity,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
