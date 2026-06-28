"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Calendar, Target, Medal, User } from "lucide-react";

const athletes = [
  {
    id: 1,
    name: "Rahul Sharma",
    event: "Single Scull",
    year: "3rd Year",
    course: "B.Tech CS",
    image: "/images/hero-bg.jpg",
    age: 21,
    experience: "4 Years",
    position: "Captain",
    medals: { gold: 5, silver: 3, bronze: 2 },
    matchesPlayed: 24,
    achievements: [
      "Maharashtra State Champion 2025",
      "National Camp Selection 2024",
      "Best Rower Award 2023",
    ],
  },
  {
    id: 2,
    name: "Priya Patil",
    event: "Double Scull",
    year: "2nd Year",
    course: "B.Tech IT",
    image: "/images/hero-bg.jpg",
    age: 20,
    experience: "3 Years",
    position: "Vice Captain",
    medals: { gold: 3, silver: 4, bronze: 1 },
    matchesPlayed: 18,
    achievements: [
      "State Silver Medalist 2025",
      "National Camp Selection 2025",
      "Best Female Rower 2024",
    ],
  },
  {
    id: 3,
    name: "Amit Desai",
    event: "Coxed Four",
    year: "4th Year",
    course: "B.Tech Mech",
    image: "/images/hero-bg.jpg",
    age: 22,
    experience: "5 Years",
    position: "Senior Rower",
    medals: { gold: 7, silver: 2, bronze: 3 },
    matchesPlayed: 32,
    achievements: [
      "All India Inter-University Silver 2026",
      "Maharashtra Champion 3x",
      "Best Athlete MIT-ADT 2025",
    ],
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    event: "Lightweight Single",
    year: "1st Year",
    course: "B.Tech ENTC",
    image: "/images/hero-bg.jpg",
    age: 19,
    experience: "2 Years",
    position: "Junior Rower",
    medals: { gold: 1, silver: 2, bronze: 2 },
    matchesPlayed: 10,
    achievements: [
      "District Champion 2025",
      "Promising Rower Award 2025",
    ],
  },
  {
    id: 5,
    name: "Vikram Singh",
    event: "Coxed Eight",
    year: "3rd Year",
    course: "MBA",
    image: "/images/hero-bg.jpg",
    age: 23,
    experience: "4 Years",
    position: "Senior Rower",
    medals: { gold: 4, silver: 5, bronze: 1 },
    matchesPlayed: 28,
    achievements: [
      "State Champion 2024 & 2025",
      "National Level Participant 2025",
      "Best Cox Award 2023",
    ],
  },
];

export default function Athletes() {
  const [selectedAthlete, setSelectedAthlete] = useState<null | typeof athletes[0]>(null);

  return (
    <section
      id="athletes"
      style={{
        background: "#ffffff",
        padding: "50px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "32px 32px",
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
            }}
          >
            Athlete{" "}
            <span style={{ color: "#1E3A5F" }}>Profiles</span>
          </h2>
        </div>

        {/* Athletes Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "20px",
            marginBottom: "48px",
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
                border: "2px solid rgba(255,255,255,0.1)",
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

              {/* Name Overlay - Vertical */}
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

        {/* View All Button */}
        <div style={{ textAlign: "center" }}>
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
            }}
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
              className="modal-scroll"
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                overflow: "hidden",
                maxWidth: "780px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {/* Top Image */}
              <div style={{ position: "relative", height: "280px" }}>
                <img
                  src={selectedAthlete.image}
                  alt={selectedAthlete.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                  }}
                />
                {/* Close Button */}
                <button
                  onClick={() => setSelectedAthlete(null)}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(0,0,0,0.5)",
                    border: "none",
                    color: "#ffffff",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={18} />
                </button>

                {/* Name on image */}
                <div style={{ position: "absolute", bottom: "20px", left: "24px" }}>
                  <div
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "40px",
                      color: "#ffffff",
                      letterSpacing: "0.04em",
                      lineHeight: 1,
                    }}
                  >
                    {selectedAthlete.name}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>
                    {selectedAthlete.position} • {selectedAthlete.course} • {selectedAthlete.year}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "32px" }}>

                {/* Stats Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "16px",
                    marginBottom: "28px",
                  }}
                >
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
                        padding: "16px",
                        textAlign: "center",
                        border: "1px solid rgba(30,58,95,0.08)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                        <stat.icon size={20} color="#1E3A5F" />
                      </div>
                      <div
                        style={{
                          fontFamily: "Bebas Neue, sans-serif",
                          fontSize: "24px",
                          color: "#1E3A5F",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {stat.value}
                      </div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B7280" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Medals */}
                <div style={{ marginBottom: "24px" }}>
                  <h4
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "22px",
                      color: "#1E3A5F",
                      letterSpacing: "0.04em",
                      marginBottom: "12px",
                    }}
                  >
                    Medal Tally
                  </h4>
                  <div style={{ display: "flex", gap: "16px" }}>
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
                          padding: "10px 20px",
                          borderRadius: "8px",
                          border: `2px solid ${medal.color}`,
                        }}
                      >
                        <Medal size={18} color={medal.color} />
                        <span style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: medal.color }}>
                          {medal.value}
                        </span>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280" }}>
                          {medal.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "22px",
                      color: "#1E3A5F",
                      letterSpacing: "0.04em",
                      marginBottom: "12px",
                    }}
                  >
                    Key Achievements
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {selectedAthlete.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 16px",
                          background: "#f8fafc",
                          borderRadius: "8px",
                          border: "1px solid rgba(30,58,95,0.08)",
                        }}
                      >
                        <Trophy size={14} color="#f59e0b" />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#4B5563" }}>
                          {achievement}
                        </span>
                      </div>
                    ))}
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