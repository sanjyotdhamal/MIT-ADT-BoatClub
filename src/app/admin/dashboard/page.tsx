"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Newspaper,
  Trophy,
  Users,
  CalendarDays,
  Image as ImageIcon,
  TrendingUp,
  Clock,
  RefreshCw,
  Loader2,
  ClipboardList,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const API = "http://localhost:5000/api";

type DashboardStats = {
  news: number;
  results: number;
  athletes: number;
  events: number;
  gallery: number;
  registrations: number;
};

type ActivityItem = {
  type: string;
  action: string;
  item: string;
  time: string;
};

const statConfig = [
  { key: "news" as const, label: "News Articles", icon: Newspaper, color: "#3b82f6" },
  { key: "results" as const, label: "Results Added", icon: Trophy, color: "#f59e0b" },
  { key: "athletes" as const, label: "Athletes", icon: Users, color: "#10b981" },
  { key: "events" as const, label: "Events", icon: CalendarDays, color: "#8b5cf6" },
  { key: "gallery" as const, label: "Gallery Photos", icon: ImageIcon, color: "#ec4899" },
  { key: "registrations" as const, label: "Registrations", icon: ClipboardList, color: "#06b6d4" },
];

// ── Relative time helper ────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now.getTime() - then.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay} days ago`;
  return then.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Activity type colors / emoji ────────────────────────────────────────────
const activityMeta: Record<string, { color: string; emoji: string }> = {
  news: { color: "#3b82f6", emoji: "📰" },
  result: { color: "#f59e0b", emoji: "🏆" },
  athlete: { color: "#10b981", emoji: "🏅" },
  event: { color: "#8b5cf6", emoji: "📅" },
  gallery: { color: "#ec4899", emoji: "🖼️" },
  registration: { color: "#06b6d4", emoji: "🎽" },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (!loggedIn) {
      router.push("/admin/login");
      return;
    }
    fetchDashboard();
  }, [router]);

  const fetchDashboard = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/dashboard`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStats(data.stats);
      setActivity(data.recentActivity || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard. Is the backend running?");
    }
    setLoading(false);
    setRefreshing(false);
  };

  const totalItems =
    stats ? stats.news + stats.results + stats.athletes + stats.events + stats.gallery : 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── Top Navbar ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#1E3A5F",
          height: "64px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          position: "sticky",
          top: 0,
          zIndex: 200,
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ width: "50px", height: "50px", objectFit: "contain" }}
          />
          <div>
            <div
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "20px",
                color: "#fff",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              MIT-ADT BOAT CLUB
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Pune, India</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "13px",
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            Welcome, Admin
          </div>
          <Link
            href="/"
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.8)",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            View Website →
          </Link>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flex: 1 }}>
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div style={{ flex: 1, overflow: "auto" }}>
          {/* Breadcrumb + Refresh */}
          <div
            style={{
              background: "#ffffff",
              padding: "0 28px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <span style={{ fontSize: "13px", color: "#1E3A5F", fontWeight: 600 }}>Dashboard</span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {lastUpdated && (
                <span style={{ fontSize: "11px", color: "#9CA3AF" }}>
                  Last updated: {lastUpdated.toLocaleTimeString("en-IN")}
                </span>
              )}
              <button
                onClick={() => fetchDashboard(true)}
                disabled={refreshing}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "5px 12px",
                  fontSize: "12px",
                  color: "#6B7280",
                  cursor: refreshing ? "not-allowed" : "pointer",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <RefreshCw
                  size={13}
                  style={{
                    animation: refreshing ? "spin 1s linear infinite" : "none",
                  }}
                />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          <div style={{ padding: "32px" }}>
            {/* ── Error ─────────────────────────────────────────────── */}
            {error && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fca5a5",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "20px",
                  fontSize: "14px",
                  color: "#dc2626",
                }}
              >
                ❌ {error}
              </div>
            )}

            {/* ── Loading Skeleton ──────────────────────────────────── */}
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", gap: "16px" }}>
                <Loader2 size={36} color="#1E3A5F" style={{ animation: "spin 1s linear infinite" }} />
                <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading dashboard data...</p>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : (
              <>
                {/* ── Stats Grid ────────────────────────────────────── */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "16px",
                    marginBottom: "24px",
                  }}
                >
                  {statConfig.map((stat) => (
                    <div
                      key={stat.key}
                      style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "22px 20px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 6px 20px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 2px 8px rgba(0,0,0,0.06)";
                      }}
                    >
                      <div
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "12px",
                          background: `${stat.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <stat.icon size={22} color={stat.color} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "Bebas Neue, sans-serif",
                            fontSize: "30px",
                            color: "#1E3A5F",
                            letterSpacing: "0.04em",
                            lineHeight: 1,
                          }}
                        >
                          {stats ? stats[stat.key] : 0}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "3px" }}>
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Total Items Banner ─────────────────────────────── */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #1E3A5F 0%, #2563eb 100%)",
                    borderRadius: "12px",
                    padding: "16px 24px",
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                      Total Content Items
                    </div>
                    <div
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        fontSize: "28px",
                        color: "#fff",
                        letterSpacing: "0.04em",
                        lineHeight: 1.1,
                      }}
                    >
                      {totalItems}
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                    Across all sections
                  </div>
                </div>

                {/* ── Quick Actions + Recent Activity ───────────────── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  {/* Quick Actions */}
                  <div
                    style={{
                      background: "#ffffff",
                      borderRadius: "16px",
                      padding: "24px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "20px",
                      }}
                    >
                      <TrendingUp size={18} color="#1E3A5F" />
                      <h3
                        style={{
                          fontFamily: "Bebas Neue, sans-serif",
                          fontSize: "20px",
                          color: "#1E3A5F",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Quick Actions
                      </h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        { label: "➕ Add News Article", href: "/admin/news" },
                        { label: "➕ Add Result", href: "/admin/results" },
                        { label: "➕ Add Athlete", href: "/admin/athletes" },
                        { label: "➕ Add Event", href: "/admin/events" },
                        { label: "🖼️ Upload Gallery Photo", href: "/admin/gallery" },
                      ].map((action, i) => (
                        <Link
                          key={i}
                          href={action.href}
                          style={{
                            display: "block",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            fontSize: "14px",
                            color: "#1E3A5F",
                            fontWeight: 500,
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "#1E3A5F";
                            (e.currentTarget as HTMLElement).style.color = "#ffffff";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "#f8fafc";
                            (e.currentTarget as HTMLElement).style.color = "#1E3A5F";
                          }}
                        >
                          {action.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div
                    style={{
                      background: "#ffffff",
                      borderRadius: "16px",
                      padding: "24px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "20px",
                      }}
                    >
                      <Clock size={18} color="#1E3A5F" />
                      <h3
                        style={{
                          fontFamily: "Bebas Neue, sans-serif",
                          fontSize: "20px",
                          color: "#1E3A5F",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Recent Activity
                      </h3>
                    </div>

                    {activity.length === 0 ? (
                      <div
                        style={{
                          padding: "32px 16px",
                          textAlign: "center",
                          color: "#9CA3AF",
                          fontSize: "14px",
                        }}
                      >
                        No recent activity found.
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          maxHeight: "360px",
                          overflowY: "auto",
                        }}
                      >
                        {activity.map((item, i) => {
                          const meta = activityMeta[item.type] || {
                            color: "#6B7280",
                            emoji: "📋",
                          };
                          return (
                            <div
                              key={i}
                              style={{
                                padding: "12px 16px",
                                borderRadius: "8px",
                                background: "#f8fafc",
                                border: "1px solid #e2e8f0",
                                borderLeft: `3px solid ${meta.color}`,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginBottom: "2px",
                                }}
                              >
                                <div style={{ fontSize: "12px", color: "#6B7280" }}>
                                  {meta.emoji} {item.action}
                                </div>
                                <div style={{ fontSize: "11px", color: "#9CA3AF", flexShrink: 0 }}>
                                  {timeAgo(item.time)}
                                </div>
                              </div>
                              <div
                                style={{
                                  fontSize: "13px",
                                  color: "#1E3A5F",
                                  fontWeight: 600,
                                  lineHeight: 1.3,
                                }}
                              >
                                {item.item}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Global keyframes for spinner */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}