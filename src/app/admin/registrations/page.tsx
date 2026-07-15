"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  Search,
  Trash2,
  X,
  FileText,
  User,
  Phone,
  Mail,
  Loader2,
  Calendar,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("adminToken");

type RegistrationItem = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age?: number;
  aadharNo?: string;
  nsrsId?: string;
  rfId?: string;
  birthCertificate: string;
  domicile?: string;
  department?: string;
  year?: string;
  enrolment_no?: string;
  experience?: string;
  reason?: string;
  createdAt: string;
};

export default function AdminRegistrations() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedReg, setSelectedReg] = useState<RegistrationItem | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) {
      router.push("/admin/login");
      return;
    }
    fetchRegistrations();
  }, [router]);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/registrations`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) setRegistrations(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load registrations. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/registrations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Delete failed.");
        return;
      }
      setRegistrations((prev) => prev.filter((r) => r._id !== id));
      if (selectedReg?._id === id) {
        setSelectedReg(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error. Could not delete registration.");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleDownloadCSV = () => {
    if (registrations.length === 0) {
      alert("No registration records to download.");
      return;
    }

    const headers = [
      "Registration Date",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Age",
      "Aadhar Card No",
      "NSRS ID",
      "RF ID",
      "Birth Certificate URL",
      "Domicile Certificate URL",
      "Department",
      "Year",
      "Enrolment No",
      "Rowing Experience",
      "Reason for Joining"
    ];

    const rows = registrations.map(reg => [
      new Date(reg.createdAt).toLocaleDateString("en-IN"),
      reg.name,
      reg.email || "",
      reg.phone,
      reg.age || "",
      reg.aadharNo || "",
      reg.nsrsId || "",
      reg.rfId || "",
      reg.birthCertificate || "",
      reg.domicile || "",
      reg.department || "",
      reg.year || "",
      reg.enrolment_no || "",
      reg.experience || "",
      reg.reason || ""
    ]);

    const csvContent = "\uFEFF" + [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `MIT-ADT_Boat_Club_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = registrations.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.phone.includes(searchQuery) ||
    (r.department && r.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          background: "#1E3A5F",
          height: "64px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          position: "sticky",
          top: 0,
          zIndex: 200,
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ width: "50px", height: "50px", objectFit: "contain" }}
          />
          <div>
            <div
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "20px",
                color: "#fff",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              MIT-ADT BOAT CLUB
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
              Pune, India
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "20px",
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.06em",
            }}
          >
            Registrations Portal
          </h1>
          <button
            onClick={handleDownloadCSV}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              background: "#fff",
              color: "#1E3A5F",
              padding: "8px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            <Download size={15} /> Export Excel (CSV)
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1 }}>
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div style={{ flex: 1, overflow: "auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              background: "#ffffff",
              padding: "0 28px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Admin</span>
            <span style={{ fontSize: "13px", color: "#9CA3AF", margin: "0 8px" }}>/</span>
            <span style={{ fontSize: "13px", color: "#1E3A5F", fontWeight: 600 }}>
              Registrations
            </span>
          </div>

          <div style={{ padding: "28px 32px" }}>
            {/* Header info */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              gap: "16px"
            }}>
              <div>
                <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "28px", color: "#1E3A5F", letterSpacing: "0.03em" }}>
                  Registered Students ({filtered.length})
                </h2>
                <p style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>
                  View, inspect, and export all submitted student join requests.
                </p>
              </div>

              {/* Search Bar */}
              <div style={{ position: "relative", width: "300px" }}>
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px 10px 36px",
                    borderRadius: "8px",
                    border: "1.5px solid #e2e8f0",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "Inter, sans-serif"
                  }}
                />
                <Search size={15} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "12px" }} />
              </div>
            </div>

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#dc2626", fontSize: "14px" }}>
                ❌ {error}
              </div>
            )}

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", gap: "16px" }}>
                <Loader2 size={36} color="#1E3A5F" style={{ animation: "spin 1s linear infinite" }} />
                <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading registrations...</p>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "60px 20px", textAlign: "center" }}>
                <p style={{ fontSize: "15px", color: "#6B7280" }}>No registrations found.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: selectedReg ? "1.2fr 1fr" : "1fr", gap: "24px", transition: "all 0.3s ease" }}>

                {/* Table List */}
                <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                        <th style={{ padding: "16px", color: "#1E3A5F", fontWeight: 700 }}>Date</th>
                        <th style={{ padding: "16px", color: "#1E3A5F", fontWeight: 700 }}>Student Name</th>
                        <th style={{ padding: "16px", color: "#1E3A5F", fontWeight: 700 }}>Phone</th>
                        <th style={{ padding: "16px", color: "#1E3A5F", fontWeight: 700 }}>Department</th>
                        <th style={{ padding: "16px", color: "#1E3A5F", fontWeight: 700, textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((reg) => (
                        <tr
                          key={reg._id}
                          onClick={() => setSelectedReg(reg)}
                          style={{
                            borderBottom: "1px solid #f1f5f9",
                            cursor: "pointer",
                            background: selectedReg?._id === reg._id ? "#eff6ff" : "transparent",
                            transition: "background 0.2s ease"
                          }}
                          onMouseEnter={(e) => {
                            if (selectedReg?._id !== reg._id) e.currentTarget.style.background = "#f8fafc";
                          }}
                          onMouseLeave={(e) => {
                            if (selectedReg?._id !== reg._id) e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <td style={{ padding: "16px", color: "#6B7280" }}>
                            {new Date(reg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </td>
                          <td style={{ padding: "16px", color: "#1E3A5F", fontWeight: 600 }}>
                            {reg.name}
                          </td>
                          <td style={{ padding: "16px", color: "#1E3A5F" }}>
                            {reg.phone}
                          </td>
                          <td style={{ padding: "16px", color: "#6B7280" }}>
                            {reg.department || "N/A"}
                          </td>
                          <td style={{ padding: "16px", textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setDeleteConfirm(reg._id)}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                color: "#ef4444",
                                padding: "4px 8px",
                                borderRadius: "6px",
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Detail View Sidebar */}
                {selectedReg && (
                  <div style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    padding: "24px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    position: "sticky",
                    top: "80px",
                    height: "fit-content",
                    maxHeight: "calc(100vh - 140px)",
                    overflowY: "auto"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "20px" }}>
                      <div>
                        <span style={{ fontSize: "11px", color: "#9CA3AF", display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                          <Calendar size={12} /> Registered on {new Date(selectedReg.createdAt).toLocaleString("en-IN")}
                        </span>
                        <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "24px", color: "#1E3A5F", letterSpacing: "0.03em" }}>
                          {selectedReg.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedReg(null)}
                        style={{ border: "none", background: "none", cursor: "pointer", color: "#6B7280" }}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Personal Details */}
                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#9CA3AF", letterSpacing: "0.05em", marginBottom: "10px" }}>
                        Personal Details
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#4B5563" }}>
                        <div><strong style={{ color: "#1E3A5F" }}>Phone:</strong> {selectedReg.phone}</div>
                        <div><strong style={{ color: "#1E3A5F" }}>Email:</strong> {selectedReg.email || "N/A"}</div>
                        <div><strong style={{ color: "#1E3A5F" }}>Age:</strong> {selectedReg.age || "N/A"}</div>
                        <div><strong style={{ color: "#1E3A5F" }}>Aadhar Card No:</strong> {selectedReg.aadharNo || "N/A"}</div>
                      </div>
                    </div>

                    {/* Sports IDs */}
                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#9CA3AF", letterSpacing: "0.05em", marginBottom: "10px" }}>
                        Sports IDs
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#4B5563" }}>
                        <div><strong style={{ color: "#1E3A5F" }}>NSRS ID:</strong> {selectedReg.nsrsId || "N/A"}</div>
                        <div><strong style={{ color: "#1E3A5F" }}>RF ID:</strong> {selectedReg.rfId || "N/A"}</div>
                      </div>
                    </div>

                    {/* Academic Details */}
                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#9CA3AF", letterSpacing: "0.05em", marginBottom: "10px" }}>
                        Academic Details
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#4B5563" }}>
                        <div><strong style={{ color: "#1E3A5F" }}>Department:</strong> {selectedReg.department || "N/A"}</div>
                        <div><strong style={{ color: "#1E3A5F" }}>Year:</strong> {selectedReg.year || "N/A"}</div>
                        <div><strong style={{ color: "#1E3A5F" }}>Enrolment No:</strong> {selectedReg.enrolment_no || "N/A"}</div>
                      </div>
                    </div>

                    {/* Rowing Experience */}
                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#9CA3AF", letterSpacing: "0.05em", marginBottom: "10px" }}>
                        Rowing Info
                      </h4>
                      <div style={{ fontSize: "13px", color: "#4B5563" }}>
                        <div style={{ marginBottom: "8px" }}><strong style={{ color: "#1E3A5F" }}>Experience:</strong> {selectedReg.experience || "N/A"}</div>
                        <div><strong style={{ color: "#1E3A5F" }}>Why join:</strong></div>
                        <div style={{ background: "#f8fafc", color: "#4B5563", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", marginTop: "4px", fontStyle: "italic", lineHeight: "1.5" }}>
                          "{selectedReg.reason || "No reason specified"}"
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#9CA3AF", letterSpacing: "0.05em", marginBottom: "10px" }}>
                        Uploaded Documents
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
                        <a
                          href={selectedReg.birthCertificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 12px",
                            background: "#EFF6FF",
                            border: "1px solid #bfdbfe",
                            borderRadius: "8px",
                            color: "#1E3A5F",
                            textDecoration: "none",
                            fontWeight: 600
                          }}
                        >
                          <FileText size={15} /> Birth Certificate ↗
                        </a>

                        {selectedReg.domicile ? (
                          <a
                            href={selectedReg.domicile}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "8px 12px",
                              background: "#F0FDF4",
                              border: "1px solid #bbf7d0",
                              borderRadius: "8px",
                              color: "#166534",
                              textDecoration: "none",
                              fontWeight: 600
                            }}
                          >
                            <FileText size={15} /> Domicile Certificate ↗
                          </a>
                        ) : (
                          <div style={{ padding: "8px 12px", background: "#f1f5f9", borderRadius: "8px", color: "#9CA3AF", fontStyle: "italic" }}>
                            No Domicile Certificate uploaded.
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#ffffff", padding: "24px", borderRadius: "12px", width: "400px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1E3A5F", marginBottom: "8px" }}>Delete Registration</h3>
            <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "20px" }}>
              Are you sure you want to delete this registration? This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "end" }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{ padding: "8px 16px", borderRadius: "6px", border: "none", background: "#f1f5f9", color: "#4B5563", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}
              >
                Cancel
              </button>
              <button
                onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                style={{ padding: "8px 16px", borderRadius: "6px", border: "none", background: "#ef4444", color: "#fff", cursor: "pointer", fontSize: "13px" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
