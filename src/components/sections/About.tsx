"use client";
import { motion } from "framer-motion";

export default function About() {
  const values = [
    {
      title: "Excellence",
      description: "We push our athletes to achieve their best in every race and training session.",
      icon: "🏆",
    },
    {
      title: "Discipline",
      description: "Rowing demands focus and dedication. We build champions through consistent hard work.",
      icon: "⚓",
    },
    {
      title: "Teamwork",
      description: "Every stroke is synchronized. We win together and grow together as one team.",
      icon: "🚣",
    },
    {
      title: "Legacy",
      description: "30+ years of producing state, national and international level rowing athletes.",
      icon: "🎖️",
    },
  ];

  return (
    <section
      id="about"
      style={{
        background: "#f8fafc",
        padding: "100px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* Top Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            color: "#6B7280",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Who We Are
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "64px",
            color: "#1E3A5F",
            letterSpacing: "0.04em",
            lineHeight: 1,
            marginBottom: "24px",
          }}
        >
          About MIT-ADT
          <span style={{ display: "block", color: "#0F2744" }}>
            Boat Club
          </span>
        </motion.h2>

        {/* Two Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            marginBottom: "80px",
          }}
        >
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                color: "#4B5563",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              MIT-ADT Boat Club is one of Pune's most prestigious collegiate rowing
              clubs, established under MIT ADT University. We have been nurturing
              rowing talent since our founding, producing athletes who have gone on
              to represent Maharashtra and India at the highest levels of competition.
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                color: "#4B5563",
                lineHeight: 1.9,
                marginBottom: "32px",
              }}
            >
              Our club operates on the serene waters of Pune, providing world-class
              training facilities, experienced coaches, and a supportive community
              for rowers of all skill levels — from complete beginners to elite
              competitive athletes.
            </p>

            <a
              href="#join"
              style={{
                background: "#1E3A5F",
                color: "#ffffff",
                padding: "14px 36px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                display: "inline-block",
              }}
            >
              Join Our Club
            </a>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              height: "420px",
              background: "#e2e8f0",
            }}
          >
            <img
              src="/images/hero-bg.jpg"
              alt="MIT Boat Club"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "32px 24px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                border: "1px solid rgba(30,58,95,0.08)",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>
                {value.icon}
              </div>
              <div
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "24px",
                  color: "#1E3A5F",
                  letterSpacing: "0.04em",
                  marginBottom: "10px",
                }}
              >
                {value.title}
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: 1.7,
                }}
              >
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}