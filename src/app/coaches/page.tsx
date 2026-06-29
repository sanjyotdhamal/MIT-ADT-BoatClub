"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Clock, Target, Users } from "lucide-react";

const coaches = [
  {
    id: 1,
    name: "Sandeep Bhapkar",
    designation: "Head Coach",
    experience: "15 Years",
    specialization: "Rowing Technique & Strategy",
    image: "/images/hero-bg.jpg",
    bio: "Coach Sandeep Bhapkar is the head coach of MIT-ADT Boat Club with over 15 years of experience in collegiate rowing. Under his guidance, the club has won numerous state and national level championships.",
    achievements: [
      "Best Coach Award — Maharashtra Rowing Association 2025",
      "Produced 10+ National Level Athletes",
      "Led team to 5 consecutive State Championships",
      "National Camp Coach 2024",
    ],
    philosophy: "Discipline on the water reflects discipline in life.",
    athletesTrained: "50+",
    type: "coach",
  },
  {
    id: 2,
    name: "Suhas Kamble",
    designation: "Assistant Coach",
    experience: "8 Years",
    specialization: "Fitness & Endurance Training",
    image: "/images/hero-bg.jpg",
    bio: "Coach Suhas Kamble specializes in fitness and endurance training. He works closely with athletes to improve their physical conditioning and rowing performance.",
    achievements: [
      "Certified Rowing Coach — Rowing Federation of India",
      "Fitness Specialist for U23 Athletes",
      "Produced 3 National Camp Selectees",
    ],
    philosophy: "Every stroke counts. Train hard, race harder.",
    athletesTrained: "30+",
    type: "coach",
  },
];

const boatmen = [
  {
    id: 3,
    name: "Pankaj Gaikwad",
    designation: "Senior Boatman",
    experience: "12 Years",
    image: "/images/hero-bg.jpg",
    bio: "Pankaj Gaikwad is our senior boatman with 12 years of experience. He is responsible for the maintenance and upkeep of all boats and equipment at MIT-ADT Boat Club.",
    responsibilities: [
      "Maintenance of all rowing boats and equipment",
      "Boat safety checks before training sessions",
      "Equipment inventory management",
      "Training support during water sessions",
    ],
    type: "boatman",
  },
  {
    id: 4,
    name: "Pravin Ghule",
    designation: "Boatman",
    experience: "7 Years",
    image: "/images/hero-bg.jpg",
    bio: "Pravin Ghule has been serving as a boatman at MIT-ADT Boat Club for 7 years. He assists in boat operations and ensures smooth training sessions for all athletes.",
    responsibilities: [
      "Boat launching and docking assistance",
      "Equipment cleaning and storage",
      "Safety monitoring during training",
      "Boat repair and maintenance support",
    ],
    type: "boatman",
  },
];

export default function CoachesPage() {
  const [selected, setSelected] = useState<null | typeof coaches[0] | typeof boatmen[0]>(null);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#1E3A5F", padding: "80px 0 10px", textAlign: "center" }}>
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
          Meet The Team
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
          Our <span style={{ opacity: 0.85 }}>Coaches & Staff</span>
        </motion.h1>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 48px" }}>

        {/* Coaches Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ width: "4px", height: "40px", background: "#1E3A5F", borderRadius: "2px" }} />
            <h2
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "40px",
                color: "#1E3A5F",
                letterSpacing: "0.04em",
              }}
            >
              Coach
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
            {coaches.map((coach, i) => (
              <motion.div
                key={coach.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelected(coach)}
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(30,58,95,0.08)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
                }}
              >
                {/* Image */}
                <div style={{ height: "280px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={coach.image}
                    alt={coach.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: "#1E3A5F",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {coach.designation}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "24px" }}>
                  <h3
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "28px",
                      color: "#1E3A5F",
                      letterSpacing: "0.04em",
                      marginBottom: "8px",
                    }}
                  >
                    {coach.name}
                  </h3>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280" }}>
                      <Clock size={14} /> {coach.experience}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280" }}>
                      <Target size={14} /> {coach.specialization}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#4B5563",
                      lineHeight: 1.7,
                      marginBottom: "16px",
                    }}
                  >
                    {coach.bio.substring(0, 120)}...
                  </p>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1E3A5F",
                      borderBottom: "2px solid #1E3A5F",
                      paddingBottom: "2px",
                    }}
                  >
                    View Full Profile →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Boatmen Section */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ width: "4px", height: "40px", background: "#1E3A5F", borderRadius: "2px" }} />
            <h2
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "40px",
                color: "#1E3A5F",
                letterSpacing: "0.04em",
              }}
            >
              Boatmen
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
            {boatmen.map((boatman, i) => (
              <motion.div
                key={boatman.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelected(boatman)}
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(30,58,95,0.08)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
                }}
              >
                {/* Image */}
                <div style={{ height: "240px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={boatman.image}
                    alt={boatman.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: "#0F2744",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {boatman.designation}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "24px" }}>
                  <h3
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "28px",
                      color: "#1E3A5F",
                      letterSpacing: "0.04em",
                      marginBottom: "8px",
                    }}
                  >
                    {boatman.name}
                  </h3>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280", marginBottom: "16px" }}>
                    <Clock size={14} /> {boatman.experience} of Experience
                  </span>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#4B5563",
                      lineHeight: 1.7,
                      marginBottom: "16px",
                    }}
                  >
                    {boatman.bio.substring(0, 120)}...
                  </p>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1E3A5F",
                      borderBottom: "2px solid #1E3A5F",
                      paddingBottom: "2px",
                    }}
                  >
                    View Full Profile →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
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
                maxWidth: "700px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "280px" }}>
                <img
                  src={selected.image}
                  alt={selected.name}
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
                  onClick={() => setSelected(null)}
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
                      background: "#1E3A5F",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      display: "inline-block",
                    }}
                  >
                    {selected.designation}
                  </div>
                  <div
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "36px",
                      color: "#ffffff",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {selected.name}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "32px" }}>

                {/* Stats */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                    marginBottom: "28px",
                  }}
                >
                  {[
                    { icon: Clock, label: "Experience", value: selected.experience },
                    { icon: Users, label: "Athletes Trained", value: (selected as typeof coaches[0]).athletesTrained || "N/A" },
                    { icon: Target, label: "Specialization", value: (selected as typeof coaches[0]).specialization || "Boat Operations" },
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
                          fontSize: "18px",
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

                {/* Bio */}
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
                    About
                  </h4>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      color: "#4B5563",
                      lineHeight: 1.8,
                    }}
                  >
                    {selected.bio}
                  </p>
                </div>

                {/* Achievements or Responsibilities */}
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
                    {selected.type === "coach" ? "Achievements" : "Responsibilities"}
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {(selected.type === "coach"
                      ? (selected as typeof coaches[0]).achievements
                      : (selected as typeof boatmen[0]).responsibilities
                    ).map((item, i) => (
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
                        <Award size={14} color="#1E3A5F" />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#4B5563" }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Philosophy (coaches only) */}
                {selected.type === "coach" && (selected as typeof coaches[0]).philosophy && (
                  <div
                    style={{
                      marginTop: "24px",
                      background: "#1E3A5F",
                      borderRadius: "12px",
                      padding: "20px 24px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "16px",
                        color: "#ffffff",
                        fontStyle: "italic",
                        textAlign: "center",
                        lineHeight: 1.6,
                      }}
                    >
                      "{(selected as typeof coaches[0]).philosophy}"
                    </p>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}