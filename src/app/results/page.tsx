"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, MapPin, Calendar, Users, ChevronRight, ArrowLeft, Medal } from "lucide-react";

/* ============================================================
   DATA STRUCTURE GUIDE
   ============================================================
   Each category (international, national, state, aiu, intercollegiate, vsm)
   contains data organized by YEAR.
   For categories WITH sub-categories (national, state) the structure is:
     categoryData[year][subCategory] = [ events array ]
   For categories WITHOUT sub-categories (international, aiu, intercollegiate, vsm):
     categoryData[year] = [ events array ]

   Every YEAR does not need to have the same number of events —
   just add/remove objects inside the events array for that year.
   If a year has NO events for a category, simply omit that year key
   or leave the array empty: "2023": []
============================================================ */

type ResultItem = {
  category: string;
  medal: string;
  position: string;
  athletes: string[];
};

type EventItem = {
  eventName: string;
  date: string;
  venue: string;
  results: ResultItem[];
};

// ---------- INTERNATIONAL ----------
const internationalData: Record<string, EventItem[]> = {
  "2026": [],
  "2025": [
    {
      eventName: "Asian Rowing Championship",
      date: "October 12, 2025",
      venue: "Chiang Mai, Thailand",
      results: [
        {
          category: "Single Scull (Open)",
          medal: "Bronze",
          position: "3rd Place",
          athletes: ["Rahul Sharma"],
        },
      ],
    },
  ],
  "2024": [],
  "2023": [],
};

// ---------- NATIONAL (with sub-categories) ----------
const nationalData: Record<string, Record<string, EventItem[]>> = {
  "2026": {
    Senior: [
      {
        eventName: "Senior National Rowing Championship",
        date: "April 5, 2026",
        venue: "Bhopal, MP",
        results: [
          {
            category: "Coxless Four (Senior)",
            medal: "Silver",
            position: "2nd Place",
            athletes: ["Rahul Sharma", "Amit Desai", "Vikram Singh", "Karan Joshi"],
          },
        ],
      },
    ],
    U23: [
      {
        eventName: "U23 Nationals",
        date: "April 5, 2026",
        venue: "Bhopal, MP",
        results: [
          {
            category: "Single Scull (U23)",
            medal: "Bronze",
            position: "3rd Place",
            athletes: ["Rohan Mehta"],
          },
        ],
      },
    ],
    Challenger: [],
    "Sub-Junior": [],
    Junior: [],
  },
  "2025": {
    Senior: [],
    U23: [
      {
        eventName: "U23 Nationals",
        date: "April 10, 2025",
        venue: "Delhi",
        results: [
          {
            category: "Double Scull (U23)",
            medal: "Bronze",
            position: "3rd Place",
            athletes: ["Priya Patil", "Anjali Nair"],
          },
        ],
      },
    ],
    Challenger: [],
    "Sub-Junior": [],
    Junior: [],
  },
  "2024": {
    Senior: [],
    U23: [
      {
        eventName: "U23 Nationals",
        date: "April 8, 2024",
        venue: "Hyderabad",
        results: [
          {
            category: "Coxed Eight (U23)",
            medal: "Bronze",
            position: "3rd Place",
            athletes: ["Rahul Sharma", "Amit Desai", "Vikram Singh", "Karan Joshi", "Rohan Mehta", "Priya Patil", "Anjali Nair", "Sneha Kulkarni"],
          },
        ],
      },
    ],
    Challenger: [],
    "Sub-Junior": [],
    Junior: [],
  },
  "2023": {
    Senior: [],
    U23: [],
    Challenger: [],
    "Sub-Junior": [],
    Junior: [],
  },
};

// ---------- STATE (with sub-categories) ----------
const stateData: Record<string, Record<string, EventItem[]>> = {
  "2026": {
    Senior: [
      {
        eventName: "Maharashtra State Rowing Championship",
        date: "March 15, 2026",
        venue: "Pune, Maharashtra",
        results: [
          {
            category: "Single Scull (Senior)",
            medal: "Gold",
            position: "1st Place",
            athletes: ["Rahul Sharma"],
          },
        ],
      },
    ],
    U23: [
      {
        eventName: "U23 State Championship",
        date: "March 10, 2026",
        venue: "Nashik, Maharashtra",
        results: [
          {
            category: "Single Scull (U23)",
            medal: "Silver",
            position: "2nd Place",
            athletes: ["Rohan Mehta"],
          },
          {
            category: "Double Scull (U23)",
            medal: "Gold",
            position: "1st Place",
            athletes: ["Priya Patil", "Anjali Nair"],
          },
        ],
      },
    ],
    Challenger: [],
    "Sub-Junior": [],
    Junior: [],
  },
  "2025": {
    Senior: [],
    U23: [
      {
        eventName: "U23 State Championship",
        date: "March 15, 2025",
        venue: "Aurangabad, Maharashtra",
        results: [
          {
            category: "Single Scull (U23)",
            medal: "Gold",
            position: "1st Place",
            athletes: ["Rohan Mehta"],
          },
        ],
      },
    ],
    Challenger: [],
    "Sub-Junior": [],
    Junior: [],
  },
  "2024": {
    Senior: [],
    U23: [],
    Challenger: [],
    "Sub-Junior": [],
    Junior: [],
  },
  "2023": {
    Senior: [],
    U23: [],
    Challenger: [],
    "Sub-Junior": [],
    Junior: [],
  },
};

// ---------- AIU (All India Inter-University) ----------
const aiuData: Record<string, EventItem[]> = {
  "2026": [
    {
      eventName: "All India Inter-University Rowing",
      date: "February 10, 2026",
      venue: "Bhopal, MP",
      results: [
        {
          category: "Coxed Four",
          medal: "Silver",
          position: "2nd Place",
          athletes: ["Amit Desai", "Vikram Singh", "Karan Joshi", "Rohan Mehta"],
        },
      ],
    },
  ],
  "2025": [],
  "2024": [
    {
      eventName: "All India Inter-University Rowing",
      date: "February 8, 2024",
      venue: "Hyderabad",
      results: [
        {
          category: "Coxed Eight",
          medal: "Bronze",
          position: "3rd Place",
          athletes: ["Rahul Sharma", "Amit Desai", "Vikram Singh", "Karan Joshi", "Rohan Mehta", "Priya Patil", "Anjali Nair", "Sneha Kulkarni"],
        },
      ],
    },
  ],
  "2023": [],
};

// ---------- INTERCOLLEGIATE ----------
const intercollegiateData: Record<string, EventItem[]> = {
  "2026": [
    {
      eventName: "Inter-Collegiate Rowing Championship",
      date: "February 20, 2026",
      venue: "Mumbai, Maharashtra",
      results: [
        {
          category: "Coxed Eight (Open)",
          medal: "Gold",
          position: "1st Place",
          athletes: ["Rahul Sharma", "Amit Desai", "Vikram Singh", "Karan Joshi", "Rohan Mehta", "Priya Patil", "Anjali Nair", "Sneha Kulkarni"],
        },
        {
          category: "Single Scull (Open)",
          medal: "Gold",
          position: "1st Place",
          athletes: ["Rahul Sharma"],
        },
        {
          category: "Double Scull (U23)",
          medal: "Bronze",
          position: "3rd Place",
          athletes: ["Rohan Mehta", "Karan Joshi"],
        },
      ],
    },
  ],
  "2025": [
    {
      eventName: "Inter-Collegiate Rowing Championship",
      date: "February 22, 2025",
      venue: "Pune, Maharashtra",
      results: [
        {
          category: "Double Scull (Open)",
          medal: "Gold",
          position: "1st Place",
          athletes: ["Priya Patil", "Anjali Nair"],
        },
        {
          category: "Coxed Eight (Open)",
          medal: "Silver",
          position: "2nd Place",
          athletes: ["Rahul Sharma", "Amit Desai", "Vikram Singh", "Karan Joshi", "Rohan Mehta", "Priya Patil", "Anjali Nair", "Sneha Kulkarni"],
        },
      ],
    },
  ],
  "2024": [
    {
      eventName: "Inter-Collegiate Rowing Championship",
      date: "February 25, 2024",
      venue: "Mumbai, Maharashtra",
      results: [
        {
          category: "Single Scull (Open)",
          medal: "Gold",
          position: "1st Place",
          athletes: ["Amit Desai"],
        },
        {
          category: "Double Scull (Open)",
          medal: "Bronze",
          position: "3rd Place",
          athletes: ["Vikram Singh", "Karan Joshi"],
        },
      ],
    },
  ],
  "2023": [
    {
      eventName: "Inter-Collegiate Rowing Championship",
      date: "February 28, 2023",
      venue: "Pune, Maharashtra",
      results: [
        {
          category: "Double Scull (Open)",
          medal: "Silver",
          position: "2nd Place",
          athletes: ["Karan Joshi", "Amit Desai"],
        },
      ],
    },
  ],
};

// ---------- VSM (Vishwanath Sports Meet) ----------
const vsmData: Record<string, EventItem[]> = {
  "2026": [
    {
      eventName: "Vishwanath Sports Meet",
      date: "January 15, 2026",
      venue: "Pune, Maharashtra",
      results: [
        {
          category: "Coxless Four (Open)",
          medal: "Gold",
          position: "1st Place",
          athletes: ["Rahul Sharma", "Amit Desai", "Vikram Singh", "Karan Joshi"],
        },
        {
          category: "Double Scull (U23)",
          medal: "Silver",
          position: "2nd Place",
          athletes: ["Priya Patil", "Anjali Nair"],
        },
        {
          category: "Single Scull (Lightweight)",
          medal: "Bronze",
          position: "3rd Place",
          athletes: ["Sneha Kulkarni"],
        },
      ],
    },
  ],
  "2025": [
    {
      eventName: "Vishwanath Sports Meet",
      date: "January 18, 2025",
      venue: "Pune, Maharashtra",
      results: [
        {
          category: "Coxless Four (Open)",
          medal: "Gold",
          position: "1st Place",
          athletes: ["Amit Desai", "Vikram Singh", "Karan Joshi", "Rahul Sharma"],
        },
        {
          category: "Single Scull (Open)",
          medal: "Bronze",
          position: "3rd Place",
          athletes: ["Rahul Sharma"],
        },
      ],
    },
  ],
  "2024": [
    {
      eventName: "Vishwanath Sports Meet",
      date: "January 20, 2024",
      venue: "Pune, Maharashtra",
      results: [
        {
          category: "Coxless Four (Open)",
          medal: "Silver",
          position: "2nd Place",
          athletes: ["Amit Desai", "Vikram Singh", "Karan Joshi", "Rahul Sharma"],
        },
      ],
    },
  ],
  "2023": [
    {
      eventName: "Vishwanath Sports Meet",
      date: "January 22, 2023",
      venue: "Pune, Maharashtra",
      results: [
        {
          category: "Coxless Four (Open)",
          medal: "Gold",
          position: "1st Place",
          athletes: ["Karan Joshi", "Amit Desai", "Vikram Singh", "Rahul Sharma"],
        },
        {
          category: "Single Scull (Open)",
          medal: "Gold",
          position: "1st Place",
          athletes: ["Amit Desai"],
        },
      ],
    },
  ],
};

const medalColors = {
  Gold: { bg: "#fef3c7", border: "#f59e0b", text: "#92400e", dot: "#f59e0b" },
  Silver: { bg: "#f1f5f9", border: "#94a3b8", text: "#475569", dot: "#94a3b8" },
  Bronze: { bg: "#fdf4ec", border: "#cd7c2f", text: "#7c3d12", dot: "#cd7c2f" },
};

const years = ["2026", "2025", "2024", "2023"];

const categoryTabs = [
  { key: "international", label: "International", hasSub: false },
  { key: "national", label: "National", hasSub: true },
  { key: "state", label: "State", hasSub: true },
  { key: "aiu", label: "AIU", hasSub: false },
  { key: "intercollegiate", label: "Intercollegiate", hasSub: false },
  { key: "vsm", label: "VSM", hasSub: false },
];

const subCategories = ["Senior", "U23", "Challenger", "Sub-Junior", "Junior"];

export default function ResultsPage() {
  const [selectedCategory, setSelectedCategory] = useState("state");
  const [selectedSub, setSelectedSub] = useState("Senior");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const currentTab = categoryTabs.find((c) => c.key === selectedCategory)!;

  // Get the events array based on category/sub-category/year
  const getCurrentEvents = (): EventItem[] => {
    if (selectedCategory === "national") {
      return nationalData[selectedYear]?.[selectedSub] || [];
    }
    if (selectedCategory === "state") {
      return stateData[selectedYear]?.[selectedSub] || [];
    }
    if (selectedCategory === "international") return internationalData[selectedYear] || [];
    if (selectedCategory === "aiu") return aiuData[selectedYear] || [];
    if (selectedCategory === "intercollegiate") return intercollegiateData[selectedYear] || [];
    if (selectedCategory === "vsm") return vsmData[selectedYear] || [];
    return [];
  };

  const currentEvents = getCurrentEvents();

  const handleCategoryChange = (catKey: string) => {
    setSelectedCategory(catKey);
    setSelectedEvent(null);
    const cat = categoryTabs.find((c) => c.key === catKey);
    if (cat?.hasSub) setSelectedSub("Senior");
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#1E3A5F", padding: "75px 0 8px", textAlign: "center" }}>
        <p
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
          Our Achievements
        </p>
        <h1
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "72px",
            color: "#ffffff",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          Competition Results
        </h1>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 48px" }}>

        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          {categoryTabs.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              style={{
                padding: "10px 22px",
                borderRadius: "8px",
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                cursor: "pointer",
                border: "2px solid #1E3A5F",
                background: selectedCategory === cat.key ? "#1E3A5F" : "transparent",
                color: selectedCategory === cat.key ? "#ffffff" : "#1E3A5F",
                transition: "all 0.2s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub-category Tabs (only for National & State) */}
        {currentTab.hasSub && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            {subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => { setSelectedSub(sub); setSelectedEvent(null); }}
                style={{
                  padding: "7px 18px",
                  borderRadius: "999px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1.5px solid #94a3b8",
                  background: selectedSub === sub ? "#0F2744" : "transparent",
                  color: selectedSub === sub ? "#ffffff" : "#695b47",
                  borderColor: selectedSub === sub ? "#0F2744" : "#cbd5e1",
                  transition: "all 0.2s ease",
                }}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Year Filter */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px" }}>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => { setSelectedYear(year); setSelectedEvent(null); }}
              style={{
                padding: "8px 26px",
                borderRadius: "8px",
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "19px",
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

        <AnimatePresence mode="wait">

          {/* Event List */}
          {!selectedEvent && (
            <motion.div
              key={`events-${selectedCategory}-${selectedSub}-${selectedYear}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentEvents.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px dashed rgba(30,58,95,0.2)",
                  }}
                >
                  <Trophy size={32} color="#cbd5e1" style={{ marginBottom: "12px" }} />
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#9CA3AF" }}>
                    No events recorded for this selection yet.
                  </p>
                </div>
              ) : (
                <>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: "#6B7280",
                      textAlign: "center",
                      marginBottom: "24px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    SELECT AN EVENT TO VIEW RESULTS
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {currentEvents.map((event, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.08 }}
                        onClick={() => setSelectedEvent(event)}
                        style={{
                          background: "#ffffff",
                          borderRadius: "16px",
                          padding: "24px 32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                          border: "1px solid rgba(30,58,95,0.08)",
                          borderLeft: "4px solid #1E3A5F",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translateX(6px)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.12)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)";
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                          <div
                            style={{
                              width: "52px",
                              height: "52px",
                              background: "#f1f5f9",
                              borderRadius: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Trophy size={24} color="#1E3A5F" />
                          </div>
                          <div>
                            <h3
                              style={{
                                fontFamily: "Bebas Neue, sans-serif",
                                fontSize: "24px",
                                color: "#1E3A5F",
                                letterSpacing: "0.03em",
                                marginBottom: "6px",
                              }}
                            >
                              {event.eventName}
                            </h3>
                            <div style={{ display: "flex", gap: "16px" }}>
                              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280" }}>
                                <Calendar size={12} /> {event.date}
                              </span>
                              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280" }}>
                                <MapPin size={12} /> {event.venue}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span
                            style={{
                              background: "#f1f5f9",
                              color: "#1E3A5F",
                              fontSize: "11px",
                              fontWeight: 700,
                              padding: "4px 12px",
                              borderRadius: "4px",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {event.results.length} Categories
                          </span>
                          <ChevronRight size={20} color="#1E3A5F" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Event Results */}
          {selectedEvent && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1E3A5F",
                  marginBottom: "24px",
                  padding: 0,
                }}
              >
                <ArrowLeft size={18} />
                Back to Events
              </button>

              {/* Event Header */}
              <div
                style={{
                  background: "#1E3A5F",
                  borderRadius: "16px",
                  padding: "32px 40px",
                  marginBottom: "32px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "40px",
                    color: "#ffffff",
                    letterSpacing: "0.04em",
                    marginBottom: "12px",
                  }}
                >
                  {selectedEvent.eventName}
                </h2>
                <div style={{ display: "flex", gap: "24px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                    <Calendar size={14} /> {selectedEvent.date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                    <MapPin size={14} /> {selectedEvent.venue}
                  </span>
                </div>
              </div>

              {/* Results Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {selectedEvent.results.map((result, i) => {
                  const medal = medalColors[result.medal as keyof typeof medalColors];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "28px 32px",
                        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                        border: "1px solid rgba(30,58,95,0.08)",
                        borderLeft: `5px solid ${medal.dot}`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                        <div>
                          <h3
                            style={{
                              fontFamily: "Bebas Neue, sans-serif",
                              fontSize: "26px",
                              color: "#1E3A5F",
                              letterSpacing: "0.03em",
                              marginBottom: "8px",
                            }}
                          >
                            {result.category}
                          </h3>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              background: medal.bg,
                              border: `1.5px solid ${medal.border}`,
                              color: medal.text,
                              fontSize: "13px",
                              fontWeight: 700,
                              padding: "6px 16px",
                              borderRadius: "6px",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            <Medal size={14} color={medal.dot} />
                            {result.medal} Medal — {result.position}
                          </div>
                        </div>
                        <div
                          style={{
                            fontFamily: "Bebas Neue, sans-serif",
                            fontSize: "48px",
                            color: medal.dot,
                            letterSpacing: "0.05em",
                            lineHeight: 1,
                          }}
                        >
                          {result.medal === "Gold" ? "🥇" : result.medal === "Silver" ? "🥈" : "🥉"}
                        </div>
                      </div>

                      {/* Athletes */}
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                          <Users size={16} color="#6B7280" />
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#6B7280",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            Athletes
                          </span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                          {result.athletes.map((athlete, j) => (
                            <div
                              key={j}
                              style={{
                                background: "#f1f5f9",
                                color: "#1E3A5F",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                fontFamily: "Inter, sans-serif",
                                fontSize: "14px",
                                fontWeight: 600,
                                border: "1px solid rgba(30,58,95,0.1)",
                              }}
                            >
                              {athlete}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}