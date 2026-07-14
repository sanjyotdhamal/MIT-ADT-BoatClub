"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Newspaper, Trophy, Users,
  CalendarDays, Image, LogOut, ChevronLeft, ChevronRight, ClipboardList,
} from "lucide-react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: ClipboardList,   label: "Registrations", href: "/admin/registrations" },
  { icon: Newspaper,       label: "News",      href: "/admin/news"      },
  { icon: Trophy,          label: "Results",   href: "/admin/results"   },
  { icon: Users,           label: "Athletes",  href: "/admin/athletes"  },
  { icon: CalendarDays,    label: "Events",    href: "/admin/events"    },
  { icon: Image,           label: "Gallery",   href: "/admin/gallery"   },
];

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  return (
    <div style={{ position: "relative", flexShrink: 0, width: isOpen ? "220px" : "60px", transition: "width 0.25s ease" }}>

      {/* Sidebar Panel */}
      <div style={{
        position: "sticky", top: "64px",
        height: "calc(100vh - 64px)",
        overflowY: "auto", overflowX: "hidden",
        background: "#1E3A5F",
        display: "flex", flexDirection: "column",
      }}>

{/* Logo + Toggle */}
<div style={{
  padding: "8px 12px",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "48px",
  gap: "10px",
}}>
  {isOpen && (
    <div style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Bebas Neue, sans-serif",
      fontSize: "20px",
      color: "#ffffff",
      letterSpacing: "0.08em",
      whiteSpace: "nowrap",
    }}>
      Admin Portal
    </div>
  )}

  <button
    onClick={() => setIsOpen(!isOpen)}
    style={{
      width: "28px", height: "28px", borderRadius: "6px",
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.2)",
      cursor: "pointer", display: "flex", alignItems: "center",
      justifyContent: "center", color: "#ffffff",
      flexShrink: 0,
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
  >
    {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
  </button>
</div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: "16px 8px" }}>
          {sidebarLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                title={!isOpen ? link.label : undefined}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "10px 12px", borderRadius: "8px", marginBottom: "2px",
                  textDecoration: "none", whiteSpace: "nowrap", overflow: "hidden",
                  background: active ? "rgba(255,255,255,0.15)" : "transparent",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.6)",
                  fontWeight: active ? 700 : 500,
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <link.icon size={18} style={{ flexShrink: 0, color: active ? "#ffffff" : "rgba(255,255,255,0.6)" }} />
                {isOpen && <span style={{ fontSize: "14px" }}>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px 8px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "10px 12px", borderRadius: "8px", width: "100%",
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap", overflow: "hidden",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,0,0,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {isOpen && <span style={{ fontSize: "14px", fontWeight: 500 }}>Logout</span>}
          </button>
        </div>
      </div>

    </div>
  );
}           