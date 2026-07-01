"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [selectedNews, setSelectedNews] = useState<null | typeof news[0]>(null);
  
  
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
          backgroundImage: "radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)",
backgroundSize: "40px 40px",
opacity: 0.2,
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
<div style={{
  background: "#1E3A5F",
margin: "0 -48px",
padding: "10px 30px",
marginBottom: "60px",
textAlign: "center",
width: "100vw",
position: "relative",
left: "50%",
right: "50%",
marginLeft: "-50vw",
marginRight: "-50vw",
}}>
              <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              color: "rgba(255,255,255,0.6)",
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
    fontSize: "70px",
    color: "#ffffff",
    letterSpacing: "0.04em",
    lineHeight: 1,
    marginBottom: "16px",
  }}
>
  Latest{" "}
  <span style={{ color: "#ffffff" }}>News</span>
</motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.7)",
                maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.5,
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
                <button
                  onClick={() => setSelectedNews(item)}
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
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 0 2px 0",
                  }}
                >
                  Read More →
                </button>

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
            href="/news"
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
    {/* Modal Popup */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNews(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}

              className="modal-scroll"
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                overflow: "hidden",
                maxWidth: "700px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {/* Modal Image */}
              <div style={{ height: "320px", overflow: "hidden" }}>
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Modal Content */}
              <div style={{ padding: "36px" }}>
                {/* Category + Date */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <span
                    style={{
                      background: "#EFF6FF",
                      color: "#1E3A5F",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                    }}
                  >
                    {selectedNews.category}
                  </span>
                  <span style={{ color: "#9CA3AF", fontSize: "13px", fontFamily: "Inter, sans-serif" }}>
                    {selectedNews.date}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "36px",
                    color: "#1E3A5F",
                    letterSpacing: "0.03em",
                    lineHeight: 1.2,
                    marginBottom: "16px",
                  }}
                >
                  {selectedNews.title}
                </h2>

                {/* Full Description */}
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    color: "#4B5563",
                    lineHeight: 1.8,
                    marginBottom: "16px",
                  }}
                >
                  {selectedNews.description}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    color: "#4B5563",
                    lineHeight: 1.8,
                    marginBottom: "28px",
                  }}
                >
                  The MIT-ADT Boat Club continues to set new benchmarks in collegiate
                  rowing across Maharashtra. Our athletes train rigorously under
                  experienced coaches and represent the university with pride at every
                  competition. This achievement reflects the dedication and hard work
                  of our entire team.
                </p>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedNews(null)}
                  style={{
                    background: "#1E3A5F",
                    color: "#ffffff",
                    padding: "12px 32px",
                    borderRadius: "8px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}