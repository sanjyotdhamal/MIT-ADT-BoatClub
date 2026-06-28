 
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
  {
    id: 6,
    name: "Rohan Mehta",
    event: "Double Scull",
    year: "2nd Year",
    course: "B.Tech Civil",
    image: "/images/hero-bg.jpg",
    age: 20,
    experience: "2 Years",
    position: "Junior Rower",
    medals: { gold: 2, silver: 1, bronze: 3 },
    matchesPlayed: 14,
    achievements: [
      "District Level Gold 2025",
      "Best Newcomer Award 2024",
    ],
  },
  {
    id: 7,
    name: "Anjali Nair",
    event: "Lightweight Double",
    year: "3rd Year",
    course: "B.Tech CS",
    image: "/images/hero-bg.jpg",
    age: 21,
    experience: "3 Years",
    position: "Senior Rower",
    medals: { gold: 3, silver: 2, bronze: 2 },
    matchesPlayed: 20,
    achievements: [
      "State Bronze Medalist 2025",
      "National Camp Selection 2024",
    ],
  },
  {
    id: 8,
    name: "Karan Joshi",
    event: "Coxed Four",
    year: "4th Year",
    course: "B.Tech Mech",
    image: "/images/hero-bg.jpg",
    age: 22,
    experience: "5 Years",
    position: "Senior Rower",
    medals: { gold: 6, silver: 3, bronze: 1 },
    matchesPlayed: 30,
    achievements: [
      "All India Participant 2025",
      "State Champion 2024",
      "Best Oarsman Award 2023",
    ],
  },
];

export default function AthletesPage() {
  const [selectedAthlete, setSelectedAthlete] = useState<null | typeof athletes[0]>(null);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* Header */}
      <div
        style={{
          background: "#1E3A5F",
          padding: "80px 0 40px",
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
          Our Champions
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "72px",
            color: "#ffffff",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          All <span style={{ color: "#ffffff" }}>Athletes</span>
        </motion.h1>
      </div>

      {/* Athletes Grid */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 48px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {athletes.map((athlete, i) => (
            <motion.div
              key={athlete.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setSelectedAthlete(athlete)}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                height: "320px",
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
                    fontSize: "22px",
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                  }}
                >
                  {athlete.name}
                </div>
              </div>
            </motion.div>
          ))}
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "16px",
                    marginBottom: "28px",
                  }}
                >
                  {[
                    { icon: User, label: "Age", value: `${selectedAthlete.age} Yrs` },
                    { icon: Calendar, label: "Experience", value: selectedAthlete.experience },
                    { icon: Target, label: "Matches", value: selectedAthlete.matchesPlayed },
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
                      <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "24px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
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
                  <h4 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F", letterSpacing: "0.04em", marginBottom: "12px" }}>
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
                  <h4 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F", letterSpacing: "0.04em", marginBottom: "12px" }}>
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

    </div>
  );
}