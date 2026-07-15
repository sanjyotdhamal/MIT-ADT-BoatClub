"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, BookOpen, Award, ChevronRight, Upload, Shield } from "lucide-react";

export default function JoinPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    aadharNo: "",
    nsrsId: "",
    rfId: "",
    birthCertificate: "",
    domicile: "",
    department: "",
    year: "",
    enrolment_no: "",
    experience: "",
    reason: "",
  });

  const [uploadingBirth, setUploadingBirth] = useState(false);
  const [uploadingDomicile, setUploadingDomicile] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "birthCertificate" | "domicile") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (field === "birthCertificate") setUploadingBirth(true);
    else setUploadingDomicile(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:5000/api/auth/upload-document", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.imageUrl) {
        setForm((f) => ({ ...f, [field]: data.imageUrl }));
        alert(`${field === "birthCertificate" ? "Birth Certificate" : "Domicile Certificate"} uploaded successfully!`);
      } else {
        alert(data.message || "Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload. Check if backend is running.");
    } finally {
      if (field === "birthCertificate") setUploadingBirth(false);
      else setUploadingDomicile(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.age || !form.phone || !form.email || !form.aadharNo) {
      alert("Please fill all mandatory personal details (marked with *)!");
      return;
    }

    if (!form.birthCertificate || !form.domicile) {
      alert("Please upload both Birth and Domicile Certificates (marked with *)!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit registration details to server.");
      }

      alert("Registration submitted successfully! We will review your details and get back to you soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        age: "",
        aadharNo: "",
        nsrsId: "",
        rfId: "",
        birthCertificate: "",
        domicile: "",
        department: "",
        year: "",
        enrolment_no: "",
        experience: "",
        reason: "",
      });
    } catch (err: any) {
      console.error("Submit error:", err);
      alert(err.message || "Something went wrong during submission. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
                <label style={labelStyle}>Age *</label>
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
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>Aadhar Card Number *</label>
                <input
                  type="text"
                  name="aadharNo"
                  value={form.aadharNo}
                  onChange={handleChange}
                  placeholder="Enter your 12-digit Aadhar number"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #e2e8f0", marginBottom: "36px" }} />

          {/* Section 2 — Documents & Sports IDs */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{ background: "#1E3A5F", borderRadius: "10px", padding: "8px", display: "flex" }}>
                <Shield size={18} color="#ffffff" />
              </div>
              <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "24px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
                Documents & Sports IDs
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>NSRS ID</label>
                <input
                  type="text"
                  name="nsrsId"
                  value={form.nsrsId}
                  onChange={handleChange}
                  placeholder="Enter NSRS ID if you have one"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>RF ID</label>
                <input
                  type="text"
                  name="rfId"
                  value={form.rfId}
                  onChange={handleChange}
                  placeholder="Enter RF ID if you have one"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Helper link banner */}
            <div style={{
              background: "#EFF6FF",
              border: "1.5px solid #bfdbfe",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "24px",
              fontSize: "13px",
              color: "#1E3A5F",
              lineHeight: "1.6",
            }}>
              💡 <strong>Don't have NSRS or RF IDs?</strong> Click the links below to generate them:
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "8px" }}>
                <a
                  href="https://account.kheloindia.gov.in/#/registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#2563eb",
                    fontWeight: 600,
                    textDecoration: "underline",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  Register on NSRS Portal ↗
                </a>
                <a
                  href="https://forms.gle/HopBnrzJk4eEV6oJ6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#2563eb",
                    fontWeight: 600,
                    textDecoration: "underline",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  Register on RFI Portal ↗
                </a>
              </div>
            </div>

            {/* Document Upload Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Birth Certificate *</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "12px 16px",
                    background: form.birthCertificate ? "#f0fdf4" : "#f8fafc",
                    border: `1.5px dashed ${form.birthCertificate ? "#22c55e" : "#cbd5e1"}`,
                    borderRadius: "8px",
                    cursor: uploadingBirth ? "not-allowed" : "pointer",
                    fontSize: "13px",
                    color: "#1E3A5F",
                    fontWeight: 600,
                    transition: "all 0.2s ease"
                  }}>
                    <Upload size={16} />
                    {uploadingBirth ? "Uploading..." : form.birthCertificate ? "Birth Certificate Uploaded ✅" : "Upload Document (PDF/Image)"}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      disabled={uploadingBirth}
                      onChange={(e) => handleFileUpload(e, "birthCertificate")}
                      style={{ display: "none" }}
                    />
                  </label>
                  {form.birthCertificate && (
                    <a
                      href={form.birthCertificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "12px", color: "#2563eb", textDecoration: "underline", fontWeight: 500 }}
                    >
                      View Uploaded Document ↗
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Domicile Certificate *</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "12px 16px",
                    background: form.domicile ? "#f0fdf4" : "#f8fafc",
                    border: `1.5px dashed ${form.domicile ? "#22c55e" : "#cbd5e1"}`,
                    borderRadius: "8px",
                    cursor: uploadingDomicile ? "not-allowed" : "pointer",
                    fontSize: "13px",
                    color: "#1E3A5F",
                    fontWeight: 600,
                    transition: "all 0.2s ease"
                  }}>
                    <Upload size={16} />
                    {uploadingDomicile ? "Uploading..." : form.domicile ? "Domicile Uploaded ✅" : "Upload Document (PDF/Image)"}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      disabled={uploadingDomicile}
                      onChange={(e) => handleFileUpload(e, "domicile")}
                      style={{ display: "none" }}
                    />
                  </label>
                  {form.domicile && (
                    <a
                      href={form.domicile}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "12px", color: "#2563eb", textDecoration: "underline", fontWeight: 500 }}
                    >
                      View Uploaded Document ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #e2e8f0", marginBottom: "36px" }} />

          {/* Section 3 — Academic */}
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
                <label style={labelStyle}>Department</label>
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
                  name="enrolment_no"
                  value={form.enrolment_no}
                  onChange={handleChange}
                  placeholder="Your enrolment no"
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
            disabled={submitting || uploadingBirth || uploadingDomicile}
            style={{
              width: "100%",
              background: (submitting || uploadingBirth || uploadingDomicile) ? "#94a3b8" : "#1E3A5F",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "10px",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              border: "none",
              cursor: (submitting || uploadingBirth || uploadingDomicile) ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              letterSpacing: "0.03em",
            }}
          >
            {submitting ? "Submitting Registration..." : "Submit Registration"}
            <ChevronRight size={18} />
          </button>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "#9CA3AF",
              textAlign: "center",
              marginTop: "16px",
              lineHeight: "1.6",
            }}
          >
            For any inquiries or if you face any problems, contact us on <br />
            <a href="https://wa.me/919822232577" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 600 }}>+91 98222 32577</a>
          </p>

        </motion.div>
      </div>
    </div>
  );
}