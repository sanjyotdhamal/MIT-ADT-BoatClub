"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, Newspaper, Trophy, Users, 
  CalendarDays, Image, LogOut, Menu, X,
  TrendingUp, Clock
} from "lucide-react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Newspaper, label: "News", href: "/admin/news" },
  { icon: Trophy, label: "Results", href: "/admin/results" },
  { icon: Users, label: "Athletes", href: "/admin/athletes" },
  { icon: CalendarDays, label: "Events", href: "/admin/events" },
  { icon: Image, label: "Gallery", href: "/admin/gallery" },
];

const stats = [
  { label: "News Articles", value: "12", icon: Newspaper, color: "#3b82f6" },
  { label: "Results Added", value: "45", icon: Trophy, color: "#f59e0b" },
  { label: "Athletes", value: "8", icon: Users, color: "#10b981" },
  { label: "Events", value: "6", icon: CalendarDays, color: "#8b5cf6" },
];

const recentActivity = [
  { action: "News article added", item: "MIT-ADT wins Gold at State Championship", time: "2 hours ago" },
  { action: "Result updated", item: "VSM 2026 - Coxless Four", time: "5 hours ago" },
  { action: "Athlete added", item: "Sneha Kulkarni - Lightweight Single", time: "Yesterday" },
  { action: "Event updated", item: "Vishwanath Sports Meet 2026", time: "2 days ago" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("Dashboard");

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (!loggedIn) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>

      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "240px" : "64px",
          background: "#1E3A5F",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          overflow: "hidden",
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: "20px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minHeight: "72px",
          }}
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ width: "36px", height: "36px", objectFit: "contain", flexShrink: 0 }}
          />
          {sidebarOpen && (
            <div>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "16px", color: "#ffffff", letterSpacing: "0.05em", lineHeight: 1.1 }}>
                MIT-ADT
              </div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>Admin Portal</div>
            </div>
          )}
        </div>

        {/* Sidebar Links */}
        <nav style={{ flex: 1, padding: "16px 8px" }}>
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setCurrentPage(link.label)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 12px",
                borderRadius: "8px",
                marginBottom: "4px",
                textDecoration: "none",
                background: currentPage === link.label ? "rgba(255,255,255,0.15)" : "transparent",
                color: currentPage === link.label ? "#ffffff" : "rgba(255,255,255,0.6)",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== link.label)
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                if (currentPage !== link.label)
                  (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <link.icon size={18} style={{ flexShrink: 0 }} />
              {sidebarOpen && (
                <span style={{ fontSize: "14px", fontWeight: 500 }}>{link.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px 8px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 12px",
              borderRadius: "8px",
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.6)",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,0,0,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {sidebarOpen && <span style={{ fontSize: "14px", fontWeight: 500 }}>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: sidebarOpen ? "240px" : "64px", flex: 1, transition: "margin-left 0.3s ease" }}>

        {/* Top Bar */}
        <div
          style={{
            background: "#ffffff",
            padding: "0 32px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e2e8f0",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "24px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
              Dashboard
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "#f1f5f9",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "13px",
                color: "#1E3A5F",
                fontWeight: 600,
              }}
            >
              👋 Welcome, Admin
            </div>
            <Link
              href="/"
              style={{
                fontSize: "13px",
                color: "#6B7280",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              View Website →
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={{ padding: "32px" }}>

          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
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
                  <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "32px", color: "#1E3A5F", letterSpacing: "0.04em", lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions + Recent Activity */}
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <TrendingUp size={18} color="#1E3A5F" />
                <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <Clock size={18} color="#1E3A5F" />
                <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
                  Recent Activity
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderLeft: "3px solid #1E3A5F",
                    }}
                  >
                    <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "2px" }}>
                      {activity.action}
                    </div>
                    <div style={{ fontSize: "13px", color: "#1E3A5F", fontWeight: 600, marginBottom: "4px" }}>
                      {activity.item}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}