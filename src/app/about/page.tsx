"use client";
import { motion } from "framer-motion";
import { Trophy, Anchor, Users, Medal, Target, Heart, Star, MapPin } from "lucide-react";

const values = [
  {
    title: "Excellence",
    description: "We push our athletes to achieve their best in every race and training session.",
    icon: Trophy,
  },
  {
    title: "Discipline",
    description: "Rowing demands focus and dedication. We build champions through consistent hard work.",
    icon: Anchor,
  },
  {
    title: "Teamwork",
    description: "Every stroke is synchronized. We win together and grow together as one team.",
    icon: Users,
  },
  {
    title: "Legacy",
    description: "30+ years of producing state, national and international level rowing athletes.",
    icon: Medal,
  },
];

const stats = [
  { value: "50+", label: "Championships Won" },
  { value: "40+", label: "Active Members" },
  { value: "15+", label: "Years of Legacy" },
  { value: "4", label: "Coaches & Staff" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* Header */}
      <div
        style={{
          background: "#1E3A5F",
          padding: "80px 0 8px",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
          Who We Are ABOUT
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "80px",
            color: "#ffffff",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#ffffff" }}>MIT-ADT Boat Club</span>
        </motion.h1>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 48px" }}>

        {/* Two Column */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            marginBottom: "80px",
          }}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
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
              Our Story
            </p>
            <h2
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "52px",
                color: "#1E3A5F",
                letterSpacing: "0.04em",
                lineHeight: 1,
                marginBottom: "24px",
              }}
            >
              Building Champions
              <span style={{ display: "block", color: "#0F2744" }}>
                Since Our Founding
              </span>
            </h2>
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
              href="/join"
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
            }}
          >
            <img
              src="/images/hero-bg.jpg"
              alt="MIT Boat Club"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div
          style={{
            background: "#1E3A5F",
            borderRadius: "20px",
            padding: "48px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
            marginBottom: "80px",
            textAlign: "center",
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "56px",
                  color: "#ffffff",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  marginTop: "8px",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
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
            What We Stand For
          </p>
          <h2
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "52px",
              color: "#1E3A5F",
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            Our Core Values
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            marginBottom: "80px",
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
                background: "#f8fafc",
                borderRadius: "16px",
                padding: "32px 24px",
                border: "1px solid rgba(30,58,95,0.08)",
                textAlign: "center",
              }}
            >
              <div style={{
  width: "64px",
  height: "64px",
  background: "#ffffff",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
}}>
  <value.icon size={28} color="#1E3A5F" />
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
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: "#f8fafc",
            borderRadius: "20px",
            padding: "60px",
            textAlign: "center",
            border: "1px solid rgba(30,58,95,0.08)",
          }}
        >
          <p
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
            Our Mission
          </p>
          <h2
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "48px",
              color: "#1E3A5F",
              letterSpacing: "0.04em",
              marginBottom: "20px",
            }}
          >
            Rowing Beyond Boundaries
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              color: "#4B5563",
              lineHeight: 1.8,
              maxWidth: "700px",
              margin: "0 auto 32px",
            }}
          >
            To nurture rowing talent at MIT ADT University by providing world-class
            training, fostering teamwork and discipline, and producing athletes who
            represent Maharashtra and India with pride at every level of competition.
          </p>
          <a
            href="/join"
            style={{
              background: "#1E3A5F",
              color: "#ffffff",
              padding: "14px 40px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              display: "inline-block",
            }}
          >
            Be Part of Our Story
          </a>
        </motion.div>

      </div>
    </div>
  );
}