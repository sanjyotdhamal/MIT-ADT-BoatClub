"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Globe, Users, ExternalLink, Share2 } from "lucide-react";

export default function Footer() {
  const address = "MIT ADT University, Loni Kalbhor, Pune - Solapur Road, Pune, Maharashtra 412201";
const googleMapsUrl = "https://maps.app.goo.gl/PG42wfADzUDuUCXx7";
  return (
    <footer style={{ background: "#0a0f1e", color: "#ffffff" }}>

      {/* Main Footer */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "25px 48px 18px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: "60px",
          }}
        >

          {/* Column 1 — About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <img
                src="/images/logo.png"
                alt="MIT Boat Club Logo"
                style={{ width: "48px", height: "48px", objectFit: "contain" }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "20px",
                    color: "#ffffff",
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
                  }}
                >
                  Pune, India
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "#94a3b8",
                lineHeight: 1.8,
                marginBottom: "24px",
                maxWidth: "300px",
              }}
            >
              Pune's premier collegiate rowing club under MIT ADT University.
              Building champions through discipline, teamwork and excellence
              since our founding.
            </p>

            {/* Social Media */}
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  color: "#6B7280",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  fontWeight: 600,
                }}
              >
                Follow Us
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  { icon: Globe, href: "https://www.instagram.com/mit_adt_boatclub/", label: "Instagram" },
                  { icon: Users, href: "https://www.facebook.com/mitboatclub/", label: "Facebook" },
                  { icon: ExternalLink, href: "https://youtube.com", label: "YouTube" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94a3b8",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1E3A5F";
                      e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "#94a3b8";
                    }}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "20px",
                color: "#ffffff",
                letterSpacing: "0.05em",
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Results", href: "/results" },
                { name: "Coaches", href: "/coaches" },
                { name: "Events", href: "/events" },
                { name: "Photo Gallery", href: "/gallery" },
                { name: "Latest News", href: "/news" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#94a3b8",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  › {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 3 — Club Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "20px",
                color: "#ffffff",
                letterSpacing: "0.05em",
                marginBottom: "20px",
              }}
            >
              Club Info
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Clock size={16} style={{ color: "#ffffff", marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#ffffff", fontWeight: 600, marginBottom: "2px" }}>
                    Training Hours
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#94a3b8" }}>
                    Mon - Sat: 6:00 AM - 7:30 AM
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#94a3b8" }}>
                    Evening: 5:00 PM - 7:00 PM
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Phone size={16} style={{ color: "#ffffff", marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#ffffff", fontWeight: 600, marginBottom: "2px" }}>
                    Contact
                  </div>
                  <a
                    href="tel:+912030283000"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}
                  >
                    +91 9822232577
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Mail size={16} style={{ color: "#ffffff", marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#ffffff", fontWeight: 600, marginBottom: "2px" }}>
                    Email
                  </div>
                  <a
                    href="mailto:boatclub@mituniversity.edu.in"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}
                  >
                    boatclub@mituniversity.edu.in
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 4 — Address + Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "20px",
                color: "#ffffff",
                letterSpacing: "0.05em",
                marginBottom: "20px",
              }}
            >
              Find Us
            </h4>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "20px" }}>
              <MapPin size={16} style={{ color: "#ffffff", marginTop: "2px", flexShrink: 0 }} />
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#94a3b8",
                  lineHeight: 1.7,
                }}
              >
                MIT ADT Boat Club,
                MIT ADT University, Loni Kalbhor,
                Pune - Solapur Road,
                Pune, Maharashtra 412201
              </p>
            </div>

            {/* Google Maps Click */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid rgba(45, 17, 123, 0.98)",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5!2d73.9!3d18.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sMIT%20ADT%20University!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="160"
                  style={{ border: 0, display: "block", pointerEvents: "none" }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(39, 64, 97, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(51, 86, 132, 0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0)")}
                >
                  
                </div>
              </div>
            </a>
          </motion.div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: "#6B7280",
          }}
        >
          © 2026 MIT-ADT Boat Club. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: "#6B7280",
          }}
        >
        </p>
      </div>

    </footer>
  );
}