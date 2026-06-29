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
    fullDescription:
      "The MIT-ADT Boat Club had an extraordinary performance at the Maharashtra State Rowing Championship held in Pune. Our athletes competed in 8 categories and clinched gold in 3 of them. The team trained rigorously for 6 months under head coach Rajesh Kumar. This victory marks our 5th consecutive state championship title and is a testament to the dedication and hard work of every member of our club.",
  },
  {
    image: "/images/hero-bg.jpg",
    date: "May 28, 2026",
    category: "Selection",
    title: "Three MIT-ADT Rowers Selected for National Camp",
    description:
      "Three of our talented rowers have been selected to represent Maharashtra at the upcoming National Rowing Camp in Pune.",
    fullDescription:
      "We are proud to announce that three of our athletes — Rahul Sharma, Priya Patil, and Amit Desai — have been selected for the National Rowing Camp to be held in Bhopal. This selection is a result of their outstanding performance at the state level competitions and their consistent training. They will represent Maharashtra and aim to secure a spot in the national team.",
  },
  {
    image: "/images/hero-bg.jpg",
    date: "May 10, 2026",
    category: "Event",
    title: "Annual Rowing Regatta 2026 Held Successfully",
    description:
      "The Annual MIT-ADT Rowing Regatta 2026 was held on the serene waters of Pune with participation from 12 colleges across Maharashtra.",
    fullDescription:
      "The Annual MIT-ADT Rowing Regatta 2026 was a grand success with participation from 12 colleges and over 200 athletes. The event was held over two days on the beautiful waters of Pune. Various categories including single scull, double scull, and coxed four were contested. MIT-ADT Boat Club won the overall championship trophy for the third consecutive year.",
  },
  {
    image: "/images/hero-bg.jpg",
    date: "April 22, 2026",
    category: "Achievement",
    title: "Coach Rajesh Kumar Receives Best Coach Award",
    description:
      "Our head coach Rajesh Kumar has been honored with the Best Rowing Coach award by the Maharashtra Rowing Association.",
    fullDescription:
      "Head Coach Rajesh Kumar has been awarded the Best Rowing Coach of the Year by the Maharashtra Rowing Association. Coach Kumar has been with MIT-ADT Boat Club for 12 years and has produced numerous state and national level athletes. Under his guidance, the club has won over 50 championships. This award is a recognition of his tireless dedication to the sport and his athletes.",
  },
  {
    image: "/images/hero-bg.jpg",
    date: "April 5, 2026",
    category: "Training",
    title: "New Training Equipment Added to Boat Club",
    description:
      "MIT-ADT Boat Club has upgraded its training facilities with state-of-the-art rowing machines and equipment.",
    fullDescription:
      "MIT-ADT Boat Club has invested in upgrading its training infrastructure with 10 new Concept2 rowing machines, video analysis equipment, and strength training gear. The new equipment will help our athletes train more effectively and improve their performance. The upgrade was made possible through generous support from MIT ADT University and our alumni network.",
  },
  {
    image: "/images/hero-bg.jpg",
    date: "March 18, 2026",
    category: "Championship",
    title: "Silver Medal at All India Inter-University Rowing",
    description:
      "Our team brought home a silver medal from the All India Inter-University Rowing Championship held in Bhopal.",
    fullDescription:
      "The MIT-ADT Boat Club team put up a brilliant performance at the All India Inter-University Rowing Championship held in Bhopal. Competing against 45 universities from across India, our team won a silver medal in the coxed four category. The team was led by captain Vikram Singh and showed exceptional teamwork and determination throughout the competition.",
  },
];

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<null | typeof news[0]>(null);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* Header */}
      <div
        style={{
          background: "#1E3A5F",
          padding: "80px 0 16px",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "70px",
            color: "#ffffff",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          Latest <span style={{ color: "#faf9f9" }}>News</span>
        </motion.h1>
      </div>

      {/* News Grid */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dotted Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.5,
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
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
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Category + Date */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
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
                  <span style={{ color: "#9CA3AF", fontSize: "12px", fontFamily: "Inter, sans-serif" }}>
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
      </div>

      {/* Popup Modal */}
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
              {/* Image */}
              <div style={{ height: "320px", overflow: "hidden" }}>
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "36px" }}>
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

                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    color: "#4B5563",
                    lineHeight: 1.8,
                    marginBottom: "28px",
                  }}
                >
                  {selectedNews.fullDescription}
                </p>

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

    </div>
  );
}