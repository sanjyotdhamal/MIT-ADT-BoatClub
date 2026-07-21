 
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, User, BookOpen, Calendar, Target, ChevronDown, ChevronUp } from "lucide-react";
// ============================================================
// EDIT YOUR DATA HERE
// Add/remove entries as needed
// ============================================================

const bestSportsPersonAwards = [
  {
    year: "2026",
    name: "Rahul Sharma",
    department: "B.Tech Computer Science",
    achievement: "Gold Medal - Maharashtra State Championship",
  },
  {
    year: "2025",
    name: "Amit Desai",
    department: "B.Tech Mechanical",
    achievement: "Gold Medal - Inter-Collegiate Championship",
  },
  {
    year: "2024",
    name: "Karan Joshi",
    department: "B.Tech Mechanical",
    achievement: "Gold Medal - Vishwanath Sports Meet",
  },
  {
    year: "2023",
    name: "Vikram Singh",
    department: "MBA",
    achievement: "State Championship Winner",
  },
];

const athletesInService = [
  { name: "ANKIT SHINDE ", service: "SUB LIEUTENANT IN INDIAN NAVY ", description: "MIT SOFT, ROWING PLAYER -2021 " },
  { name: "HARSHITA PATIL ", service: "SUB LIEUTENANT IN INDIAN NAVY ", description: "MIT SOE, ROWING PLAYER -2022" },
  { name: "BHAGYASH BHAGWAT", service: "FLYING OFFICER IN INDIAN AIR FORCE", description: "MIT SOE, ROWING PLAYER -2022" },
  { name: "AHONA MUJUMDAR", service: "SUB LIEUTENANT IN INDIAN NAVY", description: "MIT SBSR ROWING PLAYER -2023" },
  { name: "ANIKET UGALMUGALE", service: "INDIAN ARMY, NURSING ASSISTANT", description: "Dr. Vishwanath Karad MIT Sports Academy, ROWING PLAYER " },
  { name: "VAIBHAV PAWAR", service: "MAHARASHTRA POLICE", description: "Dr. Vishwanath Karad MIT Sports Academy, ROWING PLAYER " },
  { name: "PRATHAMESH KANDE", service: "BEG BOYS SPORTS COMPANY, INDIAN ARMY", description: "Dr. Vishwanath Karad MIT Sports Academy, ROWING PLAYER " },
  { name: "BHAGYASHRI GHULE ", service: "SPORTS AUTHORITY OF INDIA, SAI NCOE, JAGATPURI, ORISA", description: "Dr. Vishwanath Karad MIT Sports Academy, ROWING PLAYER " },
  { name: "ANUSHKA GARJE ", service: "SPORTS AUTHORITY OF INDIA", description: "Dr. Vishwanath Karad MIT Sports Academy, ROWING PLAYER " },
  
];

// ============================================================
// Mission Lakshyavedh Data
// ============================================================
const lakshyavedhCenters = [
  {
    id: "hpc",
    name: "High Performance Center",
    athletes: [
      { name: "Aniket Kolte",description: "National Player" },
      { name: "Yogesh Borole",description: "National Player"},
      { name: "Yashraj Gaikwad",description: "National Player"},
      { name: "Swaraj Aghav",description: "National Player" },
    ]
  },
  {
    id: "dsec",
    name: "Divisional Sports Excellence Center",
    athletes: [
      { name: "Placeholder Athlete 3", description: "Rowing Player" },
    ]
  },
  {
    id: "pvk",
    name: "Pratibha Vikas Kendra",
    athletes: [
      { name: "Placeholder Athlete 4", description: "Rowing Player" },
    ]
  }
];

// ============================================================

export default function AchievementsPage() {
const [activeTab, setActiveTab] = useState<"awards" | "service" | "lakshyavedh">("service");
const [expandedCenter, setExpandedCenter] = useState<string | null>(null);
  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#1E3A5F", padding: "75px 0 8px", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
          Our Pride
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "72px",
            color: "#ffffff",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          Explore <span style={{ opacity: 0.85 }}>Achievements</span>
        </motion.h1>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "50px 48px" }}>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          <button
            onClick={() => setActiveTab("service")}
            style={{
              padding: "12px 32px",
              borderRadius: "8px",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              border: "2px solid #1E3A5F",
              background: activeTab === "service" ? "#1E3A5F" : "transparent",
              color: activeTab === "service" ? "#ffffff" : "#1E3A5F",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <User size={16} />
            Athletes in Service
          </button>
          <button
            onClick={() => setActiveTab("awards")}
            style={{
              padding: "12px 32px",
              borderRadius: "8px",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              border: "2px solid #1E3A5F",
              background: activeTab === "awards" ? "#1E3A5F" : "transparent",
              color: activeTab === "awards" ? "#ffffff" : "#1E3A5F",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Trophy size={16} />
            Best Sports Person Award
          </button>
          <button
            onClick={() => setActiveTab("lakshyavedh")}
            style={{
              padding: "12px 32px",
              borderRadius: "8px",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              border: "2px solid #1E3A5F",
              background: activeTab === "lakshyavedh" ? "#1E3A5F" : "transparent",
              color: activeTab === "lakshyavedh" ? "#ffffff" : "#1E3A5F",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Target size={16} />
            Mission Lakshyavedh
          </button>
        </div>

        {/* Best Sports Person Award Tab */}
        {activeTab === "awards" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "36px",
                color: "#1E3A5F",
                letterSpacing: "0.04em",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              Best Sports Person Award
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "#6B7280",
                textAlign: "center",
                marginBottom: "36px",
              }}
            >
              Awarded annually to the most outstanding athlete of MIT-ADT Boat Club
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {bestSportsPersonAwards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px 32px",
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(30,58,95,0.08)",
                    borderLeft: "4px solid #1E3A5F",
                  }}
                >
                  {/* Year Badge */}
                  <div
                    style={{
                      background: "#1E3A5F",
                      color: "#ffffff",
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "28px",
                      letterSpacing: "0.05em",
                      padding: "7px 20px",
                      borderRadius: "10px",
                      minWidth: "80px",
                      textAlign: "center",
                    }}
                  >
                    {award.year}
                  </div>

                  {/* Trophy Icon */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#f1f5f9",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Trophy size={24} color="#1E3A5F" />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        fontSize: "26px",
                        color: "#1E3A5F",
                        letterSpacing: "0.03em",
                        marginBottom: "6px",
                      }}
                    >
                      {award.name}
                    </div>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#6B7280",
                        }}
                      >
                        <BookOpen size={13} />
                        {award.department}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#6B7280",
                        }}
                      >
                        <Calendar size={13} />
                        {award.achievement}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Athletes in Service Tab */}
        {activeTab === "service" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "36px",
                color: "#1E3A5F",
                letterSpacing: "0.04em",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              Athletes in Service
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "#6B7280",
                textAlign: "center",
                marginBottom: "36px",
              }}
            >
              Our proud alumni who are serving the nation
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {athletesInService.map((athlete, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    padding: "20px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(30,58,95,0.08)",
                    borderLeft: "4px solid #0F2744",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        background: "#f1f5f9",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <User size={20} color="#1E3A5F" />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Bebas Neue, sans-serif",
                          fontSize: "22px",
                          color: "#1E3A5F",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {athlete.name}
                      </div>
                      <div style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#6B7280",
                        marginTop: "4px",
                      }}>
                        {athlete.description}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#1E3A5F",
                      color: "#ffffff",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      padding: "6px 16px",
                      borderRadius: "6px",
                    }}
                  >
                    {athlete.service}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mission Lakshyavedh Tab */}
        {activeTab === "lakshyavedh" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "36px",
                color: "#1E3A5F",
                letterSpacing: "0.04em",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              Mission Lakshyavedh
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "#6B7280",
                textAlign: "center",
                marginBottom: "36px",
              }}
            >
              A Maharashtra Government initiative to develop grassroots talent into champions.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {lakshyavedhCenters.map((center, i) => (
                <div
                  key={center.id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(30,58,95,0.08)",
                  }}
                >
                  <button
                    onClick={() => setExpandedCenter(expandedCenter === center.id ? null : center.id)}
                    style={{
                      width: "100%",
                      padding: "20px 28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        fontSize: "24px",
                        color: "#1E3A5F",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {center.name}
                    </div>
                    <div>
                      {expandedCenter === center.id ? (
                        <ChevronUp size={24} color="#1E3A5F" />
                      ) : (
                        <ChevronDown size={24} color="#1E3A5F" />
                      )}
                    </div>
                  </button>

                  {/* Athletes List */}
                  {expandedCenter === center.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ padding: "0 28px 24px" }}
                    >
                      <div style={{ borderTop: "1px solid rgba(30,58,95,0.08)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        {center.athletes.map((athlete, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                background: "#f1f5f9",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <User size={16} color="#1E3A5F" />
                            </div>
                            <div>
                              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#1E3A5F" }}>
                                {athlete.name}
                              </div>
                              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280" }}>
                                {athlete.description}
                              </div>
                            </div>
                          </div>
                        ))}
                        {center.athletes.length === 0 && (
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280", fontStyle: "italic" }}>
                            No athletes listed yet.
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}