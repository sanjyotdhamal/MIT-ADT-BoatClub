"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const stats = [
    { value: "50+", label: "Medals Earned" },
    { value: "40+", label: "Active Members" },
    { value: "15+", label: "Years of Excellence" }
  ];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "transparent",        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          padding: "80px 0 0 20px",
        }}
      >
        <div style={{ maxWidth: "650px" }}>

          {/* Top Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              color: "#6B7280",          //Tagline "BEYOND LIMITS...
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Beyond Limits. Beyond Waters.
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "110px",
              color: "#1E3A5F",             ///..."MIT-ADT" heading
              fontWeight: 780,                ///MIT ADT BOAT CLUB ...FONT WIDTH
              lineHeight: 1.05,
              letterSpacing: "0.03em",
              marginBottom: "24px",
              textShadow: "0 2px 20px rgba(255, 255, 255, 0.5)",
            }}
          >
            MIT-ADT
            <span style={{ display: "block", color: "#0F2744" }}>            
              Boat Club
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              color: "#4B5563",     // Body paragraph
              lineHeight: 1.75,
              marginBottom: "36px",
              maxWidth: "520px",
            }}
          >
            Where passion meets perseverance and every stroke reflects
            teamwork, discipline, and excellence. Representing MIT ADT
            University with pride in state, national, and international rowing.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
          >
            <a
              href="join"
              style={{
                background: "#1E3A5F",
                color: "#ffffff",               //Join the Club button
                padding: "14px 36px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                display: "inline-block",
              }}
            >
              Join the Club
            </a>
            <a
              href="/achievements"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                border: "1px solid #1E3A5F",              //Explore Achievements button
                color: "#1E3A5F",
                padding: "14px 36px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                display: "inline-block",
              }}
            >
              Explore Achievements
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "56px",
              flexWrap: "wrap",
            }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "42px",
                    color: "#1E3A5F",                  //Stats numbers
                    letterSpacing: "0.05em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                  color: "#6B7280",           //Stats labels      
                    fontSize: "13px",
                    marginTop: "4px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}