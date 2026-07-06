"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = "http://localhost:5000/api";

type NewsItem = {
  _id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  fullDescription?: string;
  image?: string;
  featured?: boolean;
};

const FALLBACK: NewsItem[] = [
  {
    _id: "f1",
    image: "/images/hero-bg.jpg",
    date: "June 15, 2026",
    category: "Championship",
    title: "MIT-ADT Boat Club Wins Gold at State Rowing Championship",
    description:
      "Our athletes delivered an outstanding performance at the Maharashtra State Rowing Championship, clinching gold in multiple categories.",
    fullDescription:
      "The MIT-ADT Boat Club had an extraordinary performance at the Maharashtra State Rowing Championship held in Pune. Our athletes competed in 8 categories and clinched gold in 3 of them. The team trained rigorously for 6 months under head coach Rajesh Kumar.",
  },
  {
    _id: "f2",
    image: "/images/hero-bg.jpg",
    date: "May 28, 2026",
    category: "Selection",
    title: "Three MIT-ADT Rowers Selected for National Camp",
    description:
      "Three of our talented rowers have been selected to represent Maharashtra at the upcoming National Rowing Camp.",
    fullDescription:
      "We are proud to announce that three of our athletes have been selected for the National Rowing Camp to be held in Bhopal. This selection is a result of their outstanding performance at the state level competitions.",
  },
  {
    _id: "f3",
    image: "/images/hero-bg.jpg",
    date: "May 10, 2026",
    category: "Event",
    title: "Annual Rowing Regatta 2026 Held Successfully",
    description:
      "The Annual MIT-ADT Rowing Regatta 2026 was held on the serene waters of Pune with participation from 12 colleges across Maharashtra.",
    fullDescription:
      "The Annual MIT-ADT Rowing Regatta 2026 was a grand success with participation from 12 colleges and over 200 athletes. The event was held over two days on the beautiful waters of Pune.",
  },
  {
    _id: "f4",
    image: "/images/hero-bg.jpg",
    date: "April 22, 2026",
    category: "Achievement",
    title: "Coach Rajesh Kumar Receives Best Coach Award",
    description:
      "Our head coach Rajesh Kumar has been honored with the Best Rowing Coach award by the Maharashtra Rowing Association.",
    fullDescription:
      "Head Coach Rajesh Kumar has been awarded the Best Rowing Coach of the Year by the Maharashtra Rowing Association. Coach Kumar has been with MIT-ADT Boat Club for 12 years.",
  },
  {
    _id: "f5",
    image: "/images/hero-bg.jpg",
    date: "April 5, 2026",
    category: "Training",
    title: "New Training Equipment Added to Boat Club",
    description:
      "MIT-ADT Boat Club has upgraded its training facilities with state-of-the-art rowing machines and equipment.",
    fullDescription:
      "MIT-ADT Boat Club has invested in upgrading its training infrastructure with 10 new Concept2 rowing machines, video analysis equipment, and strength training gear.",
  },
  {
    _id: "f6",
    image: "/images/hero-bg.jpg",
    date: "March 18, 2026",
    category: "Championship",
    title: "Silver Medal at All India Inter-University Rowing",
    description:
      "Our team brought home a silver medal from the All India Inter-University Rowing Championship held in Bhopal.",
    fullDescription:
      "The MIT-ADT Boat Club team put up a brilliant performance at the All India Inter-University Rowing Championship held in Bhopal, competing against 45 universities.",
  },
];

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Fetch full article details (including fullDescription) on demand
  const openArticle = async (item: NewsItem) => {
    // If it's a fallback item or already has fullDescription, show directly
    if (item._id.startsWith("f") || item.fullDescription) {
      setSelectedNews(item);
      return;
    }
    setLoadingDetail(true);
    try {
      const res = await fetch(`${API}/news/${item._id}`);
      if (res.ok) {
        const full = await res.json();
        setSelectedNews(full);
      } else {
        setSelectedNews(item);
      }
    } catch {
      setSelectedNews(item);
    }
    setLoadingDetail(false);
  };

  useEffect(() => {
    fetch(`${API}/news`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data: NewsItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setNewsList(data);
        } else {
          setNewsList(FALLBACK);
        }
      })
      .catch(() => {
        setError(true);
        setNewsList(FALLBACK);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#1E3A5F",
          padding: "75px 0 40px",
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
            marginBottom: "16px",
          }}
        >
          Latest <span style={{ color: "#faf9f9" }}>News</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          Stay up to date with the latest achievements, events, and announcements.
        </motion.p>
      </div>

      {/* ── News Grid ────────────────────────────────────────────────────── */}
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
            backgroundImage:
              "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.5,
            zIndex: 0,
          }}
        />

        {/* API error banner */}
        {error && (
          <div
            style={{
              background: "#fffbeb",
              border: "1px solid #fcd34d",
              borderRadius: "10px",
              padding: "12px 16px",
              marginBottom: "28px",
              fontSize: "14px",
              color: "#92400e",
              position: "relative",
              zIndex: 1,
            }}
          >
            ⚠️ Could not reach the backend — showing cached sample articles. Start
            the backend server to see live data.
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "28px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: "#f1f5f9",
                  borderRadius: "16px",
                  height: "360px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "28px",
            }}
          >
            {newsList.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
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
                <div style={{ height: "200px", overflow: "hidden", background: "#e2e8f0" }}>
                  <img
                    src={item.image || "/images/hero-bg.jpg"}
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
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/images/hero-bg.jpg";
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "24px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                    onClick={() => openArticle(item)}
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
        )}
      </div>

      {/* ── Article Popup Modal ──────────────────────────────────────────── */}
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
              <div style={{ height: "320px", overflow: "hidden", background: "#e2e8f0" }}>
                <img
                  src={selectedNews.image || "/images/hero-bg.jpg"}
                  alt={selectedNews.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/hero-bg.jpg";
                  }}
                />
              </div>

              {/* Modal Content */}
              <div style={{ padding: "36px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
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
                      textTransform: "uppercase",
                    }}
                  >
                    {selectedNews.category}
                  </span>
                  <span
                    style={{
                      color: "#9CA3AF",
                      fontSize: "13px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
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
                    marginBottom: "20px",
                  }}
                >
                  {selectedNews.fullDescription || selectedNews.description}
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