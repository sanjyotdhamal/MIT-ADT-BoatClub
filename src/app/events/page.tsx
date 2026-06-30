"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Trophy, Building2 } from "lucide-react";

const signatureEvents = [
  {
    name: "Maharashtra Mini Olympics",
    year: "2025",
    venue: "MIT ADT University, Pune",
    description:
      "MIT-ADT Boat Club proudly hosted the Maharashtra Mini Olympics, a multi-sport event bringing together athletes from across the state. The rowing segment saw participation from over 30 colleges, showcasing top talent in collegiate rowing.",
    image: "/images/hero-bg.jpg",
    stats: [
      { icon: Users, label: "Participants", value: "500+" },
      { icon: Building2, label: "Clubs", value: "10+" },
      { icon: Trophy, label: "Events", value: "8+" },
    ],
  },
  {
    name: "6th Indoor National Rowing Championship",
    year: "2024",
    venue: "MIT ADT University, Pune",
    description:
      "Our club had the honor of hosting the 6th Indoor National Rowing Championship, bringing together the best indoor rowing athletes from across India. The event featured intense competition on rowing ergometers with national level officials.",
    image: "/images/hero-bg.jpg",
    stats: [
      { icon: Users, label: "Participants", value: "300+" },
      { icon: Building2, label: "States", value: "12+" },
      { icon: Trophy, label: "Categories", value: "10+" },
    ],
  },
];
const icrcYears = {
  "2026": {
    date: "February 20, 2026",
    venue: "MIT ADT University, Pune",
    participants: "30+",
    department: "8+",
    host:" SOC",

description:
      "The Inter-Collegiate Rowing Championship 2026 saw fierce competition between engineering departments, with the Mechanical department securing top honors in multiple categories.",
  },
  "2025": {
    date: "February 22, 2025",
    venue: "MIT ADT University, Pune",
    participants: "180+",
    department: "Computer Science",
    description:
      "The 2025 edition of the championship featured strong participation across all departments with Computer Science students leading the medal tally this year.",
  },
  "2024": {
    date: "February 25, 2024",
    venue: "MIT ADT University, Pune",
    participants: "160+",
    department: "Civil Engineering",
    description:
      "Inter-Collegiate Rowing Championship 2024 brought together talented rowers from various engineering departments competing for institutional pride.",
  },
  "2023": {
    date: "February 28, 2023",
    venue: "MIT ADT University, Pune",
    participants: "150+",
    department: "Mechanical",
    description:
      "The 2023 championship marked a successful year for inter-departmental rowing competition with great enthusiasm from all participating teams.",
  },
};

const vishwanathYears = {
  "2026": {
    date: "January 15, 2026",
    venue: "MIT ADT University, Pune",
    participants: "400+",
    colleges: "25+",
    description:
      "The 2026 edition of Vishwanath Sports Meet saw record participation with rowing as one of the key highlight events. MIT-ADT Boat Club athletes put up a stellar performance winning multiple medals.",
  },
  "2025": {
    date: "January 18, 2025",
    venue: "MIT ADT University, Pune",
    participants: "350+",
    colleges: "22+",
    description:
      "Vishwanath Sports Meet 2025 continued the tradition of excellence with strong participation across all rowing categories. The event was a great success with athletes from multiple universities competing.",
  },
  "2024": {
    date: "January 20, 2024",
    venue: "MIT ADT University, Pune",
    participants: "300+",
    colleges: "20+",
    description:
      "The 2024 edition featured exciting rowing competitions with MIT-ADT Boat Club showcasing strong home advantage performances across various boat categories.",
  },
  "2023": {
    date: "January 22, 2023",
    venue: "MIT ADT University, Pune",
    participants: "280+",
    colleges: "18+",
    description:
      "Vishwanath Sports Meet 2023 marked another successful edition of this annual tradition, bringing together rowing talent from across Maharashtra for a day of intense competition.",
  },
};

export default function EventsPage() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedICRCYear, setSelectedICRCYear] = useState("2026");
  const years = ["2026", "2025", "2024", "2023"];
  const currentEvent = vishwanathYears[selectedYear as keyof typeof vishwanathYears];

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#1E3A5F", padding: "75px 0 8px", textAlign: "center" }}>
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
          What We Organize
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
          Events We <span style={{ opacity: 0.85 }}>Host</span>
        </motion.h1>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 48px" }}>

        {/* Signature Events */}
        <div style={{ marginBottom: "72px" }}>
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
              Signature Events
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {signatureEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(30,58,95,0.08)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                {/* Image */}
                <div style={{ height: "100%", minHeight: "320px", overflow: "hidden" }}>
                  <img
                    src={event.image}
                    alt={event.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "40px" }}>
                  <div
                    style={{
                      display: "inline-block",
                      background: "#f1f5f9",
                      color: "#1E3A5F",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "5px 14px",
                      borderRadius: "6px",
                      fontFamily: "Inter, sans-serif",
                      marginBottom: "16px",
                    }}
                  >
                    Hosted {event.year}
                  </div>

                  <h3
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "32px",
                      color: "#1E3A5F",
                      letterSpacing: "0.03em",
                      lineHeight: 1.1,
                      marginBottom: "12px",
                    }}
                  >
                    {event.name}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                    <MapPin size={14} color="#6B7280" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280" }}>
                      {event.venue}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#4B5563",
                      lineHeight: 1.8,
                      marginBottom: "24px",
                    }}
                  >
                    {event.description}
                  </p>

                  {/* Stats */}
                  <div style={{ display: "flex", gap: "16px" }}>
                    {event.stats.map((stat, j) => (
                      <div
                        key={j}
                        style={{
                          background: "#f8fafc",
                          borderRadius: "10px",
                          padding: "12px 16px",
                          textAlign: "center",
                          flex: 1,
                          border: "1px solid rgba(30,58,95,0.08)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>
                          <stat.icon size={16} color="#1E3A5F" />
                        </div>
                        <div
                          style={{
                            fontFamily: "Bebas Neue, sans-serif",
                            fontSize: "20px",
                            color: "#1E3A5F",
                            letterSpacing: "0.03em",
                          }}
                        >
                          {stat.value}
                        </div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B7280" }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vishwanath Sports Meet - Annual Event */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ width: "4px", height: "40px", background: "#1E3A5F", borderRadius: "2px" }} />
            <h2
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "40px",
                color: "#1E3A5F",
                letterSpacing: "0.04em",
              }}
            >
              Vishwanath Sports Meet
            </h2>
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "#6B7280",
              marginBottom: "32px",
              marginLeft: "16px",
            }}
          >
            Our university's annual sports meet, organized every year with rowing as a key event.
          </p>

          {/* Year Tabs */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                style={{
                  padding: "10px 28px",
                  borderRadius: "8px",
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "20px",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  border: "2px solid #1E3A5F",
                  background: selectedYear === year ? "#1E3A5F" : "transparent",
                  color: selectedYear === year ? "#ffffff" : "#1E3A5F",
                  transition: "all 0.2s ease",
                }}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Selected Year Details */}
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              border: "1px solid rgba(30,58,95,0.08)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div style={{ minHeight: "320px", overflow: "hidden" }}>
              <img
                src="/images/hero-bg.jpg"
                alt="Vishwanath Sports Meet"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ padding: "40px" }}>
              <h3
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "32px",
                  color: "#1E3A5F",
                  letterSpacing: "0.03em",
                  marginBottom: "16px",
                }}
              >
                Vishwanath Sports Meet {selectedYear}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Calendar size={14} color="#6B7280" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4B5563" }}>
                    {currentEvent.date}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={14} color="#6B7280" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4B5563" }}>
                    {currentEvent.venue}
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#4B5563",
                  lineHeight: 1.8,
                  marginBottom: "24px",
                }}
              >
                {currentEvent.description}
              </p>

              <div style={{ display: "flex", gap: "16px" }}>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "10px",
                    padding: "12px 20px",
                    flex: 1,
                    textAlign: "center",
                    border: "1px solid rgba(30,58,95,0.08)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>
                    <Users size={16} color="#1E3A5F" />
                  </div>
                  <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F" }}>
                    {currentEvent.participants}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B7280" }}>
                    Participants
                  </div>
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "10px",
                    padding: "12px 20px",
                    flex: 1,
                    textAlign: "center",
                    border: "1px solid rgba(30,58,95,0.08)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>
                    <Building2 size={16} color="#1E3A5F" />
                  </div>
                  <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F" }}>
                    {currentEvent.colleges}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B7280" }}>
                    Colleges
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
       
       </div>

        {/* Inter-Collegiate Rowing Championship - Annual Event */}
        <div style={{ marginTop: "72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ width: "4px", height: "40px", background: "#1E3A5F", borderRadius: "2px" }} />
            <h2
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "40px",
                color: "#1E3A5F",
                letterSpacing: "0.04em",
              }}
            >
              Inter-Collegiate Rowing Championship
            </h2>
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "#6B7280",
              marginBottom: "32px",
              marginLeft: "16px",
            }}
          >
            Annual rowing championship between colleges, organized every year.
          </p>

          {/* Year Tabs */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedICRCYear(year)}
                style={{
                  padding: "10px 28px",
                  borderRadius: "8px",
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "20px",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  border: "2px solid #1E3A5F",
                  background: selectedICRCYear === year ? "#1E3A5F" : "transparent",
                  color: selectedICRCYear === year ? "#ffffff" : "#1E3A5F",
                  transition: "all 0.2s ease",
                }}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Selected Year Card - Clickable */}
          <motion.a
            href="/results"
            key={selectedICRCYear}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              border: "1px solid rgba(30,58,95,0.08)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <div style={{ minHeight: "320px", overflow: "hidden" }}>
              <img
                src="/images/hero-bg.jpg"
                alt="Inter-Collegiate Rowing Championship"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ padding: "40px" }}>
              <h3
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "32px",
                  color: "#1E3A5F",
                  letterSpacing: "0.03em",
                  marginBottom: "16px",
                }}
              >
                Inter-Collegiate Rowing Championship {selectedICRCYear}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Calendar size={14} color="#6B7280" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4B5563" }}>
                    {icrcYears[selectedICRCYear as keyof typeof icrcYears].date}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={14} color="#6B7280" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4B5563" }}>
                    {icrcYears[selectedICRCYear as keyof typeof icrcYears].venue}
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#4B5563",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                }}
              >
                {icrcYears[selectedICRCYear as keyof typeof icrcYears].description}
              </p>

              <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "10px",
                    padding: "12px 20px",
                    flex: 1,
                    textAlign: "center",
                    border: "1px solid rgba(30,58,95,0.08)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>
                    <Users size={16} color="#1E3A5F" />
                  </div>
                  <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F" }}>
                    {icrcYears[selectedICRCYear as keyof typeof icrcYears].participants}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B7280" }}>
                    Participants
                  </div>
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "10px",
                    padding: "12px 20px",
                    flex: 1,
                    textAlign: "center",
                    border: "1px solid rgba(30,58,95,0.08)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>
                    <Building2 size={16} color="#1E3A5F" />
                  </div>
                  <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F" }}>
                    {icrcYears[selectedICRCYear as keyof typeof icrcYears].department}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B7280" }}>
                    Department
                  </div>
                </div>
              </div>

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
                Click to View Results →
              </span>
            </div>
          </motion.a>
        </div>

      </div>
    </div>
  );
}