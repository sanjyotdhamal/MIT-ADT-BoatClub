"use client";
import { motion } from "framer-motion";

const news = [
  {
    image: "/images/hero-bg.jpg",
    date: "June 15, 2026",
    category: "Championship",
    title: "MIT-ADT Boat Club Wins Gold at State Rowing Championship",
    description:
      "Our athletes delivered an outstanding performance at the Maharashtra State Rowing Championship, clinching gold in multiple categories.",
  },
  {
    image: "/images/hero-bg.jpg",
    date: "May 28, 2026",
    category: "Selection",
    title: "Three MIT-ADT Rowers Selected for National Camp",
    description:
      "Three of our talented rowers have been selected to represent Maharashtra at the upcoming National Rowing Camp in Pune.",
  },
  {
    image: "/images/hero-bg.jpg",
    date: "May 10, 2026",
    category: "Event",
    title: "Annual Rowing Regatta 2026 Held Successfully",
    description:
      "The Annual MIT-ADT Rowing Regatta 2026 was held on the serene waters of Pune with participation from 12 colleges across Maharashtra.",
  },
  {
    image: "/images/hero-bg.jpg",
    date: "April 22, 2026",
    category: "Achievement",
    title: "Coach Rajesh Kumar Receives Best Coach Award",
    description:
      "Our head coach Rajesh Kumar has been honored with the Best Rowing Coach award by the Maharashtra Rowing Association.",
  },
  {
    image: "/images/hero-bg.jpg",
    date: "April 5, 2026",
    category: "Training",
    title: "New Training Equipment Added to Boat Club",
    description:
      "MIT-ADT Boat Club has upgraded its training facilities with state-of-the-art rowing machines and equipment for better athlete performance.",
  },
  {
    image: "/images/hero-bg.jpg",
    date: "March 18, 2026",
    category: "Championship",
    title: "Silver Medal at All India Inter-University Rowing",
    description:
      "Our team brought home a silver medal from the All India Inter-University Rowing Championship held in Bhopal.",
  },
];

export default function LatestNews() {
  return (
    <section
      id="news"
      style={{
        background: "#ffffff",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dotted Background Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              color: "#6B7280",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "12px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Stay Updated
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "64px",
              color: "#1E3A5F",
              letterSpacing: "0.04em",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            Latest{" "}
            <span style={{ color: "#0F2744" }}>News</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "#6B7280",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Stay up to date with the latest achievements, events, and
            announcements from MIT-ADT Boat Club.
          </motion.p>
        </div>

        {/* News Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            marginBottom: "56px",
          }}
        >
          {news.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                border: "1px solid rgba(30,58,95,0.08)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {/* Content */}
              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Category + Date */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      background: "#EFF6FF",
                      color: "#1E3A5F",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "22px",
                    color: "#1E3A5F",
                    letterSpacing: "0.03em",
                    lineHeight: 1.3,
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                    flex: 1,
                  }}
                >
                  {item.description}
                </p>

                {/* Read More Button */}
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#1E3A5F",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                    borderBottom: "2px solid #1E3A5F",
                    paddingBottom: "2px",
                    width: "fit-content",
                  }}
                >
                  Read More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center" }}
        >
          <a
            href="#"
            style={{
              display: "inline-block",
              background: "#1E3A5F",
              color: "#ffffff",
              padding: "14px 48px",
              borderRadius: "8px",
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
          >
            View More News →
          </a>
        </motion.div>

      </div>
    </section>
  );
}