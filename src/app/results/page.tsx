"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, MapPin, Calendar, Users, ChevronRight, ArrowLeft, Medal } from "lucide-react";

/* ============================================================
   DATA STRUCTURE
   Results are fetched from the backend and grouped into the
   same nested structure the UI uses:

   For categories WITHOUT sub-categories (international, aiu, intercollegiate, vsm):
     categoryData[year] = [ events array ]

   For categories WITH sub-categories (national, state):
     categoryData[year][subCategory] = [ events array ]

   Each "event" groups all rows that share the same
   (category, subCategory, year, eventName, date, venue).
   Each event has a `results[]` array of individual boat class results.
============================================================ */

const API = "http://localhost:5000/api";

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

/* Raw row from the API */
type ApiResult = {
  _id: string;
  category: string;
  subCategory: string;
  year: string;
  eventName: string;
  date: string;
  venue: string;
  boatClass: string;
  medal: string;
  position: string;
  athletes: string[];
};

/* ── Grouping helper ──────────────────────────────────────────────────────── */
/**
 * Groups flat API rows into the nested structure:
 *   simpleCategories: { [year]: EventItem[] }
 *   subCategories:    { [year]: { [sub]: EventItem[] } }
 */
function groupResults(rows: ApiResult[]) {
  const international: Record<string, EventItem[]> = {};
  const national: Record<string, Record<string, EventItem[]>> = {};
  const state: Record<string, Record<string, EventItem[]>> = {};
  const aiu: Record<string, EventItem[]> = {};
  const intercollegiate: Record<string, EventItem[]> = {};
  const vsm: Record<string, EventItem[]> = {};

  const addToSimple = (
    bucket: Record<string, EventItem[]>,
    row: ApiResult
  ) => {
    if (!bucket[row.year]) bucket[row.year] = [];
    const existing = bucket[row.year].find(
      e => e.eventName === row.eventName && e.date === row.date && e.venue === row.venue
    );
    const resultEntry: ResultItem = {
      category: row.boatClass,
      medal: row.medal,
      position: row.position,
      athletes: Array.isArray(row.athletes) ? row.athletes : [],
    };
    if (existing) {
      existing.results.push(resultEntry);
    } else {
      bucket[row.year].push({
        eventName: row.eventName,
        date: row.date,
        venue: row.venue,
        results: [resultEntry],
      });
    }
  };

  const addToNested = (
    bucket: Record<string, Record<string, EventItem[]>>,
    row: ApiResult
  ) => {
    if (!bucket[row.year]) bucket[row.year] = {};
    const sub = row.subCategory || "Senior";
    if (!bucket[row.year][sub]) bucket[row.year][sub] = [];
    const existing = bucket[row.year][sub].find(
      e => e.eventName === row.eventName && e.date === row.date && e.venue === row.venue
    );
    const resultEntry: ResultItem = {
      category: row.boatClass,
      medal: row.medal,
      position: row.position,
      athletes: Array.isArray(row.athletes) ? row.athletes : [],
    };
    if (existing) {
      existing.results.push(resultEntry);
    } else {
      bucket[row.year][sub].push({
        eventName: row.eventName,
        date: row.date,
        venue: row.venue,
        results: [resultEntry],
      });
    }
  };

  rows.forEach(row => {
    const cat = row.category?.toLowerCase();
    if (cat === "international") addToSimple(international, row);
    else if (cat === "national") addToNested(national, row);
    else if (cat === "state") addToNested(state, row);
    else if (cat === "aiu") addToSimple(aiu, row);
    else if (cat === "intercollegiate") addToSimple(intercollegiate, row);
    else if (cat === "vsm") addToSimple(vsm, row);
  });

  return { international, national, state, aiu, intercollegiate, vsm };
}

/* ── Constants ──────────────────────────────────────────────────────────────*/
const medalColors = {
  Gold: { bg: "#fef3c7", border: "#f59e0b", text: "#92400e", dot: "#f59e0b" },
  Silver: { bg: "#f1f5f9", border: "#94a3b8", text: "#475569", dot: "#94a3b8" },
  Bronze: { bg: "#fdf4ec", border: "#cd7c2f", text: "#7c3d12", dot: "#cd7c2f" },
  Participate: { bg: "#f8fafc", border: "#cbd5e1", text: "#475569", dot: "#64748b" },
};

const categoryTabs = [
  { key: "international", label: "International", hasSub: false },
  { key: "national", label: "National", hasSub: true },
  { key: "state", label: "State", hasSub: true },
  { key: "aiu", label: "AIU", hasSub: false },
  { key: "intercollegiate", label: "Intercollegiate", hasSub: false },
  { key: "vsm", label: "VSM", hasSub: false },
];

const subCategories = ["Senior", "U23", "Challenger", "Sub-Junior", "Junior"];

/* ── Component ──────────────────────────────────────────────────────────────*/
export default function ResultsPage() {
  const [selectedCategory, setSelectedCategory] = useState("state");
  const [selectedSub, setSelectedSub] = useState("Senior");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState<string[]>([]);

  /* Grouped data from API */
  const [data, setData] = useState<{
    international: Record<string, EventItem[]>;
    national: Record<string, Record<string, EventItem[]>>;
    state: Record<string, Record<string, EventItem[]>>;
    aiu: Record<string, EventItem[]>;
    intercollegiate: Record<string, EventItem[]>;
    vsm: Record<string, EventItem[]>;
  }>({
    international: {}, national: {}, state: {},
    aiu: {}, intercollegiate: {}, vsm: {},
  });

  /* ── Fetch ────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/results`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const rows: ApiResult[] = await res.json();

        const grouped = groupResults(rows);
        setData(grouped);

        /* Build unique sorted years descending from all rows */
        const allYears = [...new Set(rows.map(r => r.year))].sort((a, b) =>
          parseInt(b) - parseInt(a)
        );
        setYears(allYears.length ? allYears : ["2026"]);

        let categoryParam = null;
        let yearParam = null;
        if (typeof window !== "undefined") {
          const searchParams = new URLSearchParams(window.location.search);
          categoryParam = searchParams.get("category");
          yearParam = searchParams.get("year");
        }

        if (categoryParam) {
          setSelectedCategory(categoryParam);
          const cat = categoryTabs.find(c => c.key === categoryParam);
          if (cat?.hasSub) {
            setSelectedSub("Senior");
          }
        }

        if (yearParam) {
          setSelectedYear(yearParam);
        } else {
          setSelectedYear(allYears[0] || "2026");
        }
      } catch (err) {
        console.error("Results fetch error:", err);
        setYears(["2026"]);
        
        let categoryParam = null;
        let yearParam = null;
        if (typeof window !== "undefined") {
          const searchParams = new URLSearchParams(window.location.search);
          categoryParam = searchParams.get("category");
          yearParam = searchParams.get("year");
        }
        if (categoryParam) {
          setSelectedCategory(categoryParam);
        }
        setSelectedYear(yearParam || "2026");
      }
      setLoading(false);
    };
    load();
  }, []);

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  const currentTab = categoryTabs.find(c => c.key === selectedCategory)!;

  const getCurrentEvents = (): EventItem[] => {
    if (selectedCategory === "national") return (data.national[selectedYear] ?? {})[selectedSub] ?? [];
    if (selectedCategory === "state") return (data.state[selectedYear] ?? {})[selectedSub] ?? [];
    if (selectedCategory === "international") return data.international[selectedYear] ?? [];
    if (selectedCategory === "aiu") return data.aiu[selectedYear] ?? [];
    if (selectedCategory === "intercollegiate") return data.intercollegiate[selectedYear] ?? [];
    if (selectedCategory === "vsm") return data.vsm[selectedYear] ?? [];
    return [];
  };

  const currentEvents = getCurrentEvents();

  const handleCategoryChange = (catKey: string) => {
    setSelectedCategory(catKey);
    setSelectedEvent(null);
    const cat = categoryTabs.find(c => c.key === catKey);
    if (cat?.hasSub) setSelectedSub("Senior");
  };

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#1E3A5F", padding: "75px 0 8px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "Inter, sans-serif" }}>
          Our Achievements
        </p>
        <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "72px", color: "#ffffff", letterSpacing: "0.04em", lineHeight: 1 }}>
          Competition Results
        </h1>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 48px" }}>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9CA3AF", fontSize: "15px", fontFamily: "Inter, sans-serif" }}>
            Loading results…
          </div>
        )}

        {!loading && (
          <>
            {/* Category Tabs */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
              {categoryTabs.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  style={{
                    padding: "10px 22px", borderRadius: "8px",
                    fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 700,
                    letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer",
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

            {/* Sub-category Tabs (National & State only) */}
            {currentTab.hasSub && (
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
                {subCategories.map(sub => (
                  <button
                    key={sub}
                    onClick={() => { setSelectedSub(sub); setSelectedEvent(null); }}
                    style={{
                      padding: "7px 18px", borderRadius: "999px",
                      fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600,
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
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => { setSelectedYear(year); setSelectedEvent(null); }}
                  style={{
                    padding: "8px 26px", borderRadius: "8px",
                    fontFamily: "Bebas Neue, sans-serif", fontSize: "19px",
                    letterSpacing: "0.05em", cursor: "pointer",
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
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                >
                  {currentEvents.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 20px", background: "#ffffff", borderRadius: "16px", border: "1px dashed rgba(30,58,95,0.2)" }}>
                      <Trophy size={32} color="#cbd5e1" style={{ marginBottom: "12px" }} />
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#9CA3AF" }}>
                        No events recorded for this selection yet.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280", textAlign: "center", marginBottom: "24px", letterSpacing: "0.05em" }}>
                        SELECT AN EVENT TO VIEW RESULTS
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {currentEvents.map((event, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.08 }}
                            onClick={() => setSelectedEvent(event)}
                            style={{
                              background: "#ffffff", borderRadius: "16px", padding: "24px 32px",
                              display: "flex", alignItems: "center", justifyContent: "space-between",
                              cursor: "pointer", boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                              border: "1px solid rgba(30,58,95,0.08)", borderLeft: "4px solid #1E3A5F",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.transform = "translateX(6px)";
                              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.12)";
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)";
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                              <div style={{ width: "52px", height: "52px", background: "#f1f5f9", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Trophy size={24} color="#1E3A5F" />
                              </div>
                              <div>
                                <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "24px", color: "#1E3A5F", letterSpacing: "0.03em", marginBottom: "6px" }}>
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
                              <span style={{ background: "#f1f5f9", color: "#1E3A5F", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "4px", fontFamily: "Inter, sans-serif" }}>
                                {event.results.length} {event.results.length === 1 ? "Category" : "Categories"}
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

              {/* Event Results Detail */}
              {selectedEvent && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                >
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1E3A5F", marginBottom: "24px", padding: 0 }}
                  >
                    <ArrowLeft size={18} /> Back to Events
                  </button>

                  {/* Event Header */}
                  <div style={{ background: "#1E3A5F", borderRadius: "16px", padding: "32px 40px", marginBottom: "32px" }}>
                    <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "40px", color: "#ffffff", letterSpacing: "0.04em", marginBottom: "12px" }}>
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
                      const medal = medalColors[result.medal as keyof typeof medalColors] ?? medalColors.Bronze;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          style={{ background: "#ffffff", borderRadius: "16px", padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(30,58,95,0.08)", borderLeft: `5px solid ${medal.dot}` }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                            <div>
                              <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "26px", color: "#1E3A5F", letterSpacing: "0.03em", marginBottom: "8px" }}>
                                {result.category}
                              </h3>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: medal.bg, border: `1.5px solid ${medal.border}`, color: medal.text, fontSize: "13px", fontWeight: 700, padding: "6px 16px", borderRadius: "6px", fontFamily: "Inter, sans-serif" }}>
                                {result.medal !== "Participate" && <Medal size={14} color={medal.dot} />}
                                {result.medal === "Participate" ? `Participate — ${result.position}` : `${result.medal} Medal — ${result.position}`}
                              </div>
                            </div>

                          </div>

                          {/* Athletes */}
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                              <Users size={16} color="#6B7280" />
                              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                Athletes
                              </span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                              {result.athletes.map((athlete, j) => (
                                <div
                                  key={j}
                                  style={{ background: "#f1f5f9", color: "#1E3A5F", padding: "8px 16px", borderRadius: "8px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, border: "1px solid rgba(30,58,95,0.1)" }}
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
          </>
        )}
      </div>
    </div>
  );
}