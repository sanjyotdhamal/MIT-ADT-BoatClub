"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, BookOpen, Award, ChevronRight } from "lucide-react";

export default function JoinPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    department: "",
    year: "",
    enrolment_no: "",
    experience: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.department) {
      alert("Please fill Name, Phone and Course at minimum!");
      return;
    }

    const message = `
*MIT-ADT Boat Club — Join Request*

*Personal Details*
• Name: ${form.name}
• Email: ${form.email}
• Phone: ${form.phone}
• Age: ${form.age}

*Academic Details*
• Department: ${form.department}
• Year: ${form.year}
• Roll No: ${form.enrolment_no}

*Rowing Experience*
• Level: ${form.experience}

*Why I want to join*
${form.reason}

_Sent via MIT-ADT Boat Club Website_
    `.trim();

    const whatsappNumber = "919822232577"; // Replace with actual WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1.5px solid #e2e8f0",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    color: "#1E3A5F",
    outline: "none",
    background: "#f8fafc",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontFamily: "Inter, sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    color: "#1E3A5F",
    marginBottom: "6px",
    display: "block",
    letterSpacing: "0.03em",
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header */}
      <div
        style={{
          background: "#1E3A5F",
          padding: "80px 0 10px",
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
          Become a Member
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "72px",
            color: "#ffffff",
            letterSpacing: "0.04em",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          Join <span style={{ color: "#ffffff" }}>MIT-ADT Boat Club</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            color: "rgba(255,255,255,0.75)",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
        Become part of a passionate rowing community dedicated to excellence, teamwork, and personal growth.
          Complete the form below to begin your journey with MIT-ADT Boat Club.
        </motion.p>
      </div>

      {/* Form */}
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "60px 24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "48px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(30,58,95,0.08)",
          }}
        >

          {/* Section 1 — Personal */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{ background: "#1E3A5F", borderRadius: "10px", padding: "8px", display: "flex" }}>
                <User size={18} color="#ffffff" />
              </div>
              <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "24px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
                Personal Details
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Age</label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Your age"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #e2e8f0", marginBottom: "36px" }} />

          {/* Section 2 — Academic */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{ background: "#1E3A5F", borderRadius: "10px", padding: "8px", display: "flex" }}>
                <BookOpen size={18} color="#ffffff" />
              </div>
              <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "24px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
                Academic Details
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Department *</label>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech CS"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Year</label>
                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="PG">PG</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Enrolment Number</label>
                <input
                  type="text"
                  name="rollNo"
                  value={form.enrolment_no}
                  onChange={handleChange}
                  placeholder="Your roll no"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #e2e8f0", marginBottom: "36px" }} />

          {/* Section 3 — Experience */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{ background: "#1E3A5F", borderRadius: "10px", padding: "8px", display: "flex" }}>
                <Award size={18} color="#ffffff" />
              </div>
              <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "24px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
                Rowing Experience
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Experience Level</label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="">Select your level</option>
                  <option value="Complete Beginner">Complete Beginner — Never rowed before</option>
                  <option value="Beginner">Beginner — Tried rowing 1-2 times</option>
                  <option value="Intermediate">Intermediate — Rowed regularly</option>
                  <option value="Advanced">Advanced — Competitive rower</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Why do you want to join MIT-ADT Boat Club?</label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Tell us why you want to join..."
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: "none",
                    lineHeight: 1.6,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              background: "#1E3A5F",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "10px",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              letterSpacing: "0.03em",
            }}
          >
            <Phone size={18} />
            Submit via WhatsApp
            <ChevronRight size={18} />
          </button>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "#9CA3AF",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            Clicking submit will open WhatsApp with your details pre-filled. Our team will get back to you shortly!
          </p>

        </motion.div>
      </div>
    </div>
  );
}