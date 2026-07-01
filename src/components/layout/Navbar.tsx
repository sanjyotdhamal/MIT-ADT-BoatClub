"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Coaches", href: "/coaches" },
  { name: "Results", href: "/results" },
  { name: "Events", href: "/events" },
  { name: "Latest News", href: "/#news" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(30,58,95,0.10)",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "62px",              //NAVBAR HEIGHT
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", marginLeft: "-16px" }}>
        <img
  src="/images/logo.png"
  alt="MIT Boat Club Logo"
  style={{
    width: "52px",
    height: "52px",
    objectFit: "contain",
  }}
/>
          <div>
            <div
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "22px",
                color: "#1E3A5F",
                letterSpacing: "0.05em",
                lineHeight: 1.1,
              }}
            >
              MIT-ADT Boat Club
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                color: "#6B7280",
                letterSpacing: "0.08em",
              }}
            >
              Pune, India
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#1E3A5F",
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0F2744")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1E3A5F")}
            >
              {link.name}
            </Link>
          ))}

          {/* Join Club Button */}
          <Link
            href="/join"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "#ffffff",
              background: "#1E3A5F",
              padding: "10px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              letterSpacing: "0.03em",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0F2744")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1E3A5F")}
          >
            Join Club
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#1E3A5F",
            padding: "4px",
          }}
          className="mobile-menu-btn"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(255,255,255,0.98)",
              borderTop: "1px solid rgba(30,58,95,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 32px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#1E3A5F",
                    textDecoration: "none",
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#join"
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#ffffff",
                  background: "#1E3A5F",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                Join Club
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}