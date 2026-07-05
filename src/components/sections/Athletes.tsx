"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Calendar, Target, Medal, User, ChevronLeft, ChevronRight } from "lucide-react";

// Frontend formats mapped from API
type UI_Athlete = {
  id: string;
  name: string;
  event: string;
  year: string;
  course: string;
  image: string;
  age: number;
  experience: string;
  position: string;
  medals: { gold: number; silver: number; bronze: number };
  matchesPlayed: number;
  achievements: string[];
};

export default function Athletes() {
  const [selectedAthlete, setSelectedAthlete] = useState<null | UI_Athlete>(null);
  const [athletes, setAthletes] = useState<UI_Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag to scroll state variables
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  useEffect(() => {
    async function fetchFeaturedAthletes() {
      try {
        const res = await fetch("http://localhost:5000/api/athletes");
        if (!res.ok) throw new Error("Failed to fetch athletes");
        const data = await res.json();
        
        // Map backend flat array to frontend format
        const formatted: UI_Athlete[] = data.map((item: any) => {
          let achievementsArray: string[] = [];
          if (item.achievements) {
            achievementsArray = item.achievements.split(",").map((s: string) => s.trim()).filter(Boolean);
          }
          return {
            id: item._id,
            name: item.name,
            event: item.event,
            year: item.year || "-",
            course: item.course,
            image: item.image || "/images/hero-bg.jpg",
            age: item.age || 0,
            experience: item.experience || "-",
            position: item.position || "Member",
            medals: {
              gold: item.goldMedals || 0,
              silver: item.silverMedals || 0,
              bronze: item.bronzeMedals || 0,
            },
            matchesPlayed: item.matchesPlayed || 0,
            achievements: achievementsArray,
            featured: item.featured || false,
          };
        });
        
        // Filter to display only featured athletes on the main page
        const featured = formatted.filter((a: any) => a.featured);
        setAthletes(featured);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFeaturedAthletes();
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDown(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    el.scrollLeft = scrollLeftState - walk;
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 240; // Card width + gap
    if (direction === "left") {
      el.scrollTo({ left: el.scrollLeft - scrollAmount, behavior: "smooth" });
    } else {
      el.scrollTo({ left: el.scrollLeft + scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="athletes"
      style={{
        background: "#ffffff",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        @media (max-width: 640px) {
          .header-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
      `}} />

      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              color: "#6B7280",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "12px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Our Champions
          </p>
          <h2
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "72px",
              color: "#1E3A5F",
              letterSpacing: "0.04em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Athlete <span style={{ color: "#1E3A5F" }}>Profiles</span>
          </h2>
        </div>

        {/* Athletes Horizontal Scroll Container */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>
            Loading athletes...
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#ef4444" }}>
            Error: {error}
          </div>
        ) : athletes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6B7280", fontSize: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px dashed #e2e8f0" }}>
            No featured athletes selected. Use the Admin Panel to feature athletes on the home page!
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            {/* Left Scroll Arrow */}
            {athletes.length > 0 && (
              <button
                onClick={() => scroll("left")}
                style={{
                  position: "absolute",
                  left: "-24px",
                  top: "calc(50% - 15px)",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "#ffffff",
                  border: "1.5px solid #e2e8f0",
                  color: "#1E3A5F",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1E3A5F"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#1E3A5F"; }}
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="hide-scrollbar"
              style={{
                display: "flex",
                gap: "20px",
                overflowX: "auto",
                padding: "10px 0 30px",
                cursor: isDown ? "grabbing" : "grab",
                scrollBehavior: isDown ? "auto" : "smooth",
              }}
            >
              {athletes.map((athlete, i) => (
                <motion.div
                  key={athlete.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setSelectedAthlete(athlete)}
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    height: "340px",
                    width: "220px",
                    flexShrink: 0,
                    border: "2px solid rgba(30,58,95,0.1)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  <img
                    src={athlete.image}
                    alt={athlete.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />

                  {/* Name Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
                      padding: "40px 16px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        fontSize: "20px",
                        color: "#ffffff",
                        letterSpacing: "0.08em",
                        lineHeight: 1.2,
                      }}
                    >
                      {athlete.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Scroll Arrow */}
            {athletes.length > 0 && (
              <button
                onClick={() => scroll("right")}
                style={{
                  position: "absolute",
                  right: "-24px",
                  top: "calc(50% - 15px)",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "#ffffff",
                  border: "1.5px solid #e2e8f0",
                  color: "#1E3A5F",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1E3A5F"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#1E3A5F"; }}
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <a
            href="/athletes"
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
              boxShadow: "0 4px 12px rgba(30,58,95,0.2)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            View All Athletes →
          </a>
        </div>

      </div>

      {/* Athlete Profile Modal */}
      <AnimatePresence>
        {selectedAthlete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAthlete(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
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
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-split-container"
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                overflow: "hidden",
                maxWidth: "850px",
                width: "100%",
                height: "580px",
                maxHeight: "90vh",
                display: "flex",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
                position: "relative",
              }}
            >
              <style dangerouslySetInnerHTML={{__html: `
                @media (max-width: 768px) {
                  .modal-split-container {
                    flex-direction: column !important;
                    height: auto !important;
                    max-height: 90vh !important;
                  }
                  .modal-left-image {
                    width: 100% !important;
                    height: 220px !important;
                  }
                  .modal-right-details {
                    width: 100% !important;
                    height: auto !important;
                    overflow-y: visible !important;
                  }
                }
              `}} />

              {/* Left Side: Portrait Image */}
              <div className="modal-left-image" style={{ width: "40%", position: "relative", height: "100%", background: "#000", flexShrink: 0 }}>
                <img
                  src={selectedAthlete.image}
                  alt={selectedAthlete.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Right Side: Details */}
              <div className="modal-right-details" style={{ width: "60%", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
                {/* Header with Close button */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "28px 32px 16px", borderBottom: "1px solid #f1f5f9" }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        fontSize: "36px",
                        color: "#1E3A5F",
                        letterSpacing: "0.04em",
                        lineHeight: 1.1,
                        margin: 0,
                      }}
                    >
                      {selectedAthlete.name}
                    </h3>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280", marginTop: "6px", fontWeight: 500 }}>
                      {selectedAthlete.position} • {selectedAthlete.course} • {selectedAthlete.year}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAthlete(null)}
                    style={{
                      background: "#f1f5f9",
                      border: "none",
                      color: "#6B7280",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#e2e8f0"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#f1f5f9"}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Details Scroll Area */}
                <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px 32px", scrollbarWidth: "thin" }} className="modal-scroll">
                  
                  {/* Grid stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "24px" }}>
                    {[
                      { icon: User, label: "Age", value: `${selectedAthlete.age} Years` },
                      { icon: Calendar, label: "Experience", value: selectedAthlete.experience },
                      { icon: Target, label: "Matches Played", value: selectedAthlete.matchesPlayed },
                      { icon: Trophy, label: "Gold Medals", value: selectedAthlete.medals.gold },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#f8fafc",
                          borderRadius: "12px",
                          padding: "12px 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          border: "1px solid rgba(30,58,95,0.06)",
                        }}
                      >
                        <div style={{ background: "#EFF6FF", padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <stat.icon size={18} color="#1E3A5F" />
                        </div>
                        <div>
                          <div style={{ fontSize: "11px", color: "#6B7280", fontFamily: "Inter, sans-serif" }}>{stat.label}</div>
                          <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#1E3A5F", letterSpacing: "0.03em", lineHeight: 1.1 }}>{stat.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Medal Tally */}
                  <div style={{ marginBottom: "24px" }}>
                    <h4 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#1E3A5F", letterSpacing: "0.04em", marginBottom: "10px" }}>
                      Medal Tally
                    </h4>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {[
                        { label: "Gold", value: selectedAthlete.medals.gold, color: "#f59e0b" },
                        { label: "Silver", value: selectedAthlete.medals.silver, color: "#94a3b8" },
                        { label: "Bronze", value: selectedAthlete.medals.bronze, color: "#cd7c2f" },
                      ].map((medal, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#f8fafc",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: `1.5px solid ${medal.color}`,
                            flex: 1,
                            justifyContent: "center",
                          }}
                        >
                          <Medal size={16} color={medal.color} />
                          <span style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "18px", color: medal.color }}>
                            {medal.value}
                          </span>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B7280" }}>
                            {medal.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#1E3A5F", letterSpacing: "0.04em", marginBottom: "10px" }}>
                      Key Achievements
                    </h4>
                    {selectedAthlete.achievements.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {selectedAthlete.achievements.map((achievement, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "8px 12px",
                              background: "#f8fafc",
                              borderRadius: "8px",
                              border: "1px solid rgba(30,58,95,0.06)",
                            }}
                          >
                            <Trophy size={14} color="#f59e0b" />
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4B5563" }}>
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280", fontStyle: "italic" }}>
                        No key achievements listed.
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}