"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError("");

    // Temporary frontend-only login (replace with real API later)
    setTimeout(() => {
      if (username === "admin" && password === "mitboatclub@2026") {
        localStorage.setItem("adminLoggedIn", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password!");
        setLoading(false);
      }
    }, 800);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px 12px 44px",
    borderRadius: "8px",
    border: "1.5px solid #e2e8f0",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    color: "#1E3A5F",
    outline: "none",
    background: "#f8fafc",
    boxSizing: "border-box" as const,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "94px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "48px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
          border: "1px solid rgba(30,58,95,0.08)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img
            src="/images/logo.png"
            alt="MIT Boat Club"
            style={{ width: "90px", height: "90px", objectFit: "contain", marginBottom: "16px", display: "block", margin: "0 auto 0px" }}
          />
          <h1
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "28px",
              color: "#1E3A5F",
              letterSpacing: "0.05em",
              marginBottom: "2px",
            }}
          >
            MIT-ADT Boat Club
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "#6B7280",
            }}
          >
            Admin Portal
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              color: "#dc2626",
              padding: "10px 16px",
              borderRadius: "8px",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {/* Username */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#1E3A5F",
              marginBottom: "6px",
              display: "block",
            }}
          >
            Username
          </label>
          <div style={{ position: "relative" }}>
            <User
              size={16}
              color="#94a3b8"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={inputStyle}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#1E3A5F",
              marginBottom: "6px",
              display: "block",
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <Lock
              size={16}
              color="#94a3b8"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={inputStyle}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#94a3b8",
                padding: 0,
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#94a3b8" : "#1E3A5F",
            color: "#ffffff",
            padding: "14px",
            borderRadius: "8px",
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s ease",
          }}
        >
          {loading ? "Logging in..." : "Login to Dashboard"}
        </button>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: "#9CA3AF",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Restricted access — authorized personnel only
        </p>
      </motion.div>
    </div>
  );
}