"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Newspaper, Trophy, Users, CalendarDays, TrendingUp, Clock } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

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

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (!loggedIn) router.push("/admin/login");
  }, [router]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>

      {/* Top Navbar */}
      <div style={{ background: "#1E3A5F", height: "64px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#fff", letterSpacing: "0.06em", lineHeight: 1 }}>MIT-ADT BOAT CLUB</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Pune, India</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
<h1 style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:"20px", color:"rgba(255,255,255,0.85)", letterSpacing:"0.06em" }}>            Dashboard
          </h1>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", color: "#ffffff", fontWeight: 600 }}>
            Welcome, Admin
          </div>
          <Link href="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "8px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>
            View Website →
          </Link>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* Shared Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content */}
        <div style={{ flex: 1, overflow: "auto" }}>

          {/* Breadcrumb */}
          <div style={{ background: "#ffffff", padding: "0 28px", height: "48px", display: "flex", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "13px", color: "#1E3A5F", fontWeight: 600 }}>Dashboard</span>
          </div>

          <div style={{ padding: "32px" }}>

            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${stat.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <stat.icon size={22} color={stat.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "32px", color: "#1E3A5F", letterSpacing: "0.04em", lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions + Recent Activity */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

              {/* Quick Actions */}
              <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                  <TrendingUp size={18} color="#1E3A5F" />
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#1E3A5F", letterSpacing: "0.04em" }}>Quick Actions</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { label: "➕ Add News Article", href: "/admin/news" },
                    { label: "➕ Add Result", href: "/admin/results" },
                    { label: "➕ Add Athlete", href: "/admin/athletes" },
                    { label: "➕ Add Event", href: "/admin/events" },
                    { label: "🖼️ Upload Gallery Photo", href: "/admin/gallery" },
                  ].map((action, i) => (
                    <Link key={i} href={action.href}
                      style={{ display: "block", padding: "10px 16px", borderRadius: "8px", background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: "14px", color: "#1E3A5F", fontWeight: 500, textDecoration: "none", transition: "all 0.2s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1E3A5F"; (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8fafc"; (e.currentTarget as HTMLElement).style.color = "#1E3A5F"; }}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                  <Clock size={18} color="#1E3A5F" />
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#1E3A5F", letterSpacing: "0.04em" }}>Recent Activity</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {recentActivity.map((activity, i) => (
                    <div key={i} style={{ padding: "12px 16px", borderRadius: "8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "3px solid #1E3A5F" }}>
                      <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "2px" }}>{activity.action}</div>
                      <div style={{ fontSize: "13px", color: "#1E3A5F", fontWeight: 600, marginBottom: "4px" }}>{activity.item}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}