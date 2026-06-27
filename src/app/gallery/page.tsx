"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  {
    image: "/images/hero-bg.jpg",
    title: "State Championship 2026",
    category: "Championship",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "Annual Regatta 2026",
    category: "Events",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "Training Session",
    category: "Training",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "National Camp Selection",
    category: "Achievement",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "Group Photo 2026",
    category: "Team",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "Athlete Profile - Rahul",
    category: "Athletes",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "Athlete Profile - Priya",
    category: "Athletes",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "Silver Medal - Inter University",
    category: "Championship",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "Coach Training Session",
    category: "Training",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "Boat Club Inauguration",
    category: "Events",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "Team Celebration",
    category: "Team",
  },
  {
    image: "/images/hero-bg.jpg",
    title: "Water Training",
    category: "Training",
  },
];

const categories = ["All", "Championship", "Events", "Training", "Team", "Athletes", "Achievement"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<null | typeof photos[0]>(null);

  const filtered =
    selectedCategory === "All"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* Header */}
      <div
        style={{
          background: "#0F2744",
          padding: "85px 0 17px",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Our Moments
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "80px",
            color: "#ffffff",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          Photo <span style={{ color: "#ffffff" }}>Gallery</span>
        </motion.h1>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 48px",
        }}
      >
        {/* Category Filter */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "48px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                border: "2px solid #1E3A5F",
                background: selectedCategory === cat ? "#1E3A5F" : "transparent",
                color: selectedCategory === cat ? "#ffffff" : "#1E3A5F",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {filtered.map((photo, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelectedPhoto(photo)}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                height: "240px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <img
                src={photo.image}
                alt={photo.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              {/* Hover Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "20px",
                }}
              >
                <div>
                  <span
                    style={{
                      background: "#1e324a",
                      color: "#ffffff",
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                      display: "inline-block",
                    }}
                  >
                    {photo.category}
                  </span>
                  <div
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "18px",
                      color: "#ffffff",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {photo.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "800px",
                width: "100%",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                style={{ width: "100%", maxHeight: "80vh", objectFit: "cover" }}
              />
              <div
                style={{
                  background: "#1E3A5F",
                  padding: "20px 28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "24px",
                      color: "#ffffff",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {selectedPhoto.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {selectedPhoto.category}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#ffffff",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}