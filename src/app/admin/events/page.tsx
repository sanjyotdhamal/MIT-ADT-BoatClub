"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X, AlertTriangle } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("adminToken");

type EventItem = {
  _id?: string;
  name: string;
  date: string;
  venue: string;
  participants?: string;
  colleges?: string;
  description: string;
  type: string;
  image?: string;
  year?: string;
  department?: string;
  stat1Label?: string;
  stat1Value?: string;
  stat2Label?: string;
  stat2Value?: string;
  stat3Label?: string;
  stat3Value?: string;
};

const eventTypes = ["Signature", "Vishwanath", "Inter-Collegiate"];

const emptyForm = {
  name: "",
  type: "Signature",
  year: "",
  date: "",
  venue: "MIT ADT University, Pune",
  image: "",
  description: "",
  participants: "",
  colleges: "",
  department: "",
  stat1Label: "Participants",
  stat1Value: "",
  stat2Label: "",
  stat2Value: "",
  stat3Label: "",
  stat3Value: "",
};

export default function AdminEvents() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) {
      router.push("/admin/login");
      return;
    }
    fetchEvents();
  }, [router]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/events`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) setEvents(data);
    } catch (err) {
      console.error("Fetch events error:", err);
      showError("Failed to load events. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(""), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => {
      const updated = { ...f, [name]: value };
      
      // Auto-set labels or names if typing year
      if (name === "year") {
        if (updated.type === "Vishwanath") {
          updated.name = `Vishwanath Sports Meet ${value}`;
        } else if (updated.type === "Inter-Collegiate") {
          updated.name = `Inter-Collegiate Rowing Championship ${value}`;
        }
      }
      return updated;
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setForm(f => {
      const updated = { ...f, type: newType };
      if (newType === "Signature") {
        updated.name = "";
        updated.stat1Label = "Participants";
        updated.stat2Label = "Clubs";
        updated.stat3Label = "Events";
      } else if (newType === "Vishwanath") {
        updated.name = `Vishwanath Sports Meet ${f.year}`;
        updated.stat1Label = "";
        updated.stat2Label = "";
        updated.stat3Label = "";
      } else if (newType === "Inter-Collegiate") {
        updated.name = `Inter-Collegiate Rowing Championship ${f.year}`;
        updated.stat1Label = "";
        updated.stat2Label = "";
        updated.stat3Label = "";
      }
      return updated;
    });
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingEvent(null);
    setShowForm(true);
    setError("");
  };

  const openEdit = (item: EventItem) => {
    setForm({
      name: item.name,
      type: item.type || "Signature",
      year: item.year || "",
      date: item.date || "",
      venue: item.venue || "MIT ADT University, Pune",
      image: item.image || "",
      description: item.description || "",
      participants: item.participants || "",
      colleges: item.colleges || "",
      department: item.department || "",
      stat1Label: item.stat1Label || "",
      stat1Value: item.stat1Value || "",
      stat2Label: item.stat2Label || "",
      stat2Value: item.stat2Value || "",
      stat3Label: item.stat3Label || "",
      stat3Value: item.stat3Value || "",
    });
    setEditingEvent(item);
    setShowForm(true);
    setError("");
  };

  const handleSave = async () => {
    // Basic validation
    if (form.type === "Signature" && !form.name.trim()) {
      showError("Event Name is required for Signature events.");
      return;
    }
    if (!form.year.trim()) {
      showError("Year is required.");
      return;
    }
    if (!form.venue.trim()) {
      showError("Venue is required.");
      return;
    }

    setSaving(true);
    setError("");

    // Prepare payload
    let nameToSave = form.name.trim();
    let dateToSave = form.date.trim();
    if (form.type === "Vishwanath") {
      nameToSave = `Vishwanath Sports Meet ${form.year}`;
    } else if (form.type === "Inter-Collegiate") {
      nameToSave = `Inter-Collegiate Rowing Championship ${form.year}`;
    }
    if (!dateToSave) {
      dateToSave = form.year;
    }

    const payload: Partial<EventItem> = {
      name: nameToSave,
      type: form.type,
      year: form.year.trim(),
      date: dateToSave,
      venue: form.venue.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      participants: form.participants.trim(),
      colleges: form.colleges.trim(),
      department: form.department.trim(),
      stat1Label: form.stat1Label.trim(),
      stat1Value: form.stat1Value.trim(),
      stat2Label: form.stat2Label.trim(),
      stat2Value: form.stat2Value.trim(),
      stat3Label: form.stat3Label.trim(),
      stat3Value: form.stat3Value.trim(),
    };

    try {
      let res: Response;
      if (editingEvent && editingEvent._id) {
        res = await fetch(`${API}/events/${editingEvent._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API}/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        showError(data.message || "Save failed.");
        setSaving(false);
        return;
      }

      if (editingEvent) {
        setEvents(prev => prev.map(e => e._id === editingEvent._id ? data : e));
      } else {
        setEvents(prev => [data, ...prev]);
      }
      setShowForm(false);
      setEditingEvent(null);
      setForm(emptyForm);
      showSuccess(editingEvent ? "Event updated successfully!" : "Event created successfully!");
    } catch (err) {
      console.error("Save error:", err);
      showError("Network error. Check if backend is running.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) {
        const data = await res.json();
        showError(data.message || "Delete failed.");
        return;
      }
      setEvents(prev => prev.filter(e => e._id !== id));
      showSuccess("Event deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      showError("Network error.");
    }
    setDeleteConfirm(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API}/events/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        showError(data.message || "Image upload failed.");
        setUploading(false);
        return;
      }
      if (!data.imageUrl) {
        showError("Upload succeeded but no URL returned.");
        setUploading(false);
        return;
      }
      setForm(f => ({ ...f, image: data.imageUrl }));
      showSuccess("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      showError("Image upload failed. Check if backend is running.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const inp: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1.5px solid #e2e8f0",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    color: "#1E3A5F",
    outline: "none",
    background: "#f8fafc",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {/* Navbar */}
      <div style={{ background: "#1E3A5F", height: "64px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#fff", letterSpacing: "0.06em", lineHeight: 1 }}>MIT-ADT BOAT CLUB</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Pune, India</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em" }}>Events Management</h1>
          <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: "7px", background: "#fff", color: "#1E3A5F", padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 700 }}>
            <Plus size={15} /> Add Event
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1 }}>
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div style={{ flex: 1, overflow: "auto" }}>
          {/* Breadcrumb */}
          <div style={{ background: "#ffffff", padding: "0 28px", height: "48px", display: "flex", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Admin</span>
            <span style={{ fontSize: "13px", color: "#9CA3AF", margin: "0 8px" }}>/</span>
            <span style={{ fontSize: "13px", color: "#1E3A5F", fontWeight: 600 }}>Events</span>
          </div>

          <div style={{ padding: "28px 32px" }}>
            {/* Toast Notifications */}
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "14px", color: "#dc2626", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>❌ {error}</span>
                <button onClick={() => setError("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}><X size={16} /></button>
              </div>
            )}
            {success && (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "14px", color: "#16a34a" }}>
                ✅ {success}
              </div>
            )}

            {/* Form */}
            {showForm && (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", marginBottom: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
                    {editingEvent ? "Edit Event" : "Add New Event"}
                  </h3>
                  <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
                </div>

                {/* Grid 1: Basic type, Year, Venue */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Event Type *</label>
                    <select name="type" value={form.type} onChange={handleTypeChange} style={inp}>
                      {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Year (Tab identifier) *</label>
                    <input name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2026" style={inp} />
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Venue *</label>
                    <input name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. MIT ADT University, Pune" style={inp} />
                  </div>
                </div>

                {/* Grid 2: Type Specific fields */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  {form.type === "Signature" ? (
                    <>
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Event Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Maharashtra Mini Olympics" style={inp} />
                      </div>
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Display Date (Optional)</label>
                        <input name="date" value={form.date} onChange={handleChange} placeholder="e.g. Year 2025" style={inp} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Event Date *</label>
                        <input name="date" value={form.date} onChange={handleChange} placeholder="e.g. January 15, 2026" style={inp} />
                      </div>
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Participants Count</label>
                        <input name="participants" value={form.participants} onChange={handleChange} placeholder="e.g. 400+" style={inp} />
                      </div>
                    </>
                  )}
                </div>

                {/* Grid 3: Specific Stats based on type */}
                {form.type === "Signature" && (
                  <div style={{ border: "1px solid #e2e8f0", padding: "16px", borderRadius: "10px", background: "#f8fafc", marginBottom: "16px" }}>
                    <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#1E3A5F", marginTop: 0, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.03em" }}>Signature Event Stats</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px", display: "block" }}>Stat 1 Label / Value</label>
                        <input name="stat1Label" value={form.stat1Label} onChange={handleChange} placeholder="Label e.g. Participants" style={{ ...inp, marginBottom: "8px", background: "#fff" }} />
                        <input name="stat1Value" value={form.stat1Value} onChange={handleChange} placeholder="Value e.g. 500+" style={{ ...inp, background: "#fff" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px", display: "block" }}>Stat 2 Label / Value</label>
                        <input name="stat2Label" value={form.stat2Label} onChange={handleChange} placeholder="Label e.g. Clubs" style={{ ...inp, marginBottom: "8px", background: "#fff" }} />
                        <input name="stat2Value" value={form.stat2Value} onChange={handleChange} placeholder="Value e.g. 10+" style={{ ...inp, background: "#fff" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px", display: "block" }}>Stat 3 Label / Value</label>
                        <input name="stat3Label" value={form.stat3Label} onChange={handleChange} placeholder="Label e.g. Events" style={{ ...inp, marginBottom: "8px", background: "#fff" }} />
                        <input name="stat3Value" value={form.stat3Value} onChange={handleChange} placeholder="Value e.g. 8+" style={{ ...inp, background: "#fff" }} />
                      </div>
                    </div>
                  </div>
                )}

                {form.type === "Vishwanath" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Colleges Count</label>
                      <input name="colleges" value={form.colleges} onChange={handleChange} placeholder="e.g. 25+" style={inp} />
                    </div>
                  </div>
                )}

                {form.type === "Inter-Collegiate" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Department / Winning College</label>
                      <input name="department" value={form.department} onChange={handleChange} placeholder="e.g. Mechanical" style={inp} />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Event description..." rows={3} style={{ ...inp, resize: "vertical" }} />
                </div>

                {/* Cloudinary Image Upload Section */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "8px", display: "block" }}>Event Image</label>
                  {form.image && (
                    <div style={{ marginBottom: "12px", position: "relative", display: "inline-block" }}>
                      <img src={form.image} alt="Preview" style={{ width: "220px", height: "140px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                      <button onClick={() => setForm(f => ({ ...f, image: "" }))} style={{ position: "absolute", top: "-8px", right: "-8px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <label style={{ background: uploading ? "#94a3b8" : "#1E3A5F", color: "#fff", padding: "8px 20px", borderRadius: "8px", cursor: uploading ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: 600, flexShrink: 0, whiteSpace: "nowrap" }}>
                      {uploading ? "⏳ Uploading..." : "📷 Upload to Cloudinary"}
                      <input type="file" accept="image/*" disabled={uploading} onChange={handleImageUpload} style={{ display: "none" }} />
                    </label>
                    <span style={{ fontSize: "13px", color: "#9CA3AF", flexShrink: 0 }}>OR</span>
                    <input name="image" value={form.image} onChange={handleChange} placeholder="Paste image URL directly" style={{ ...inp, flex: 1 }} />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={handleSave} disabled={saving} style={{ background: "#1E3A5F", color: "#fff", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 700 }}>
                    {saving ? "⏳ Saving..." : editingEvent ? "Update Event" : "Save Event"}
                  </button>
                  <button onClick={() => setShowForm(false)} style={{ background: "#f1f5f9", color: "#6B7280", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600 }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#9CA3AF", fontSize: "14px", background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                Loading events from database...
              </div>
            )}

            {/* Events list */}
            {!loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {events.map(item => (
                  <div key={item._id} style={{ background: "#fff", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", borderLeft: "4px solid #1E3A5F" }}>
                    <div style={{ display: "flex", gap: "16px", alignItems: "center", flex: 1 }}>
                      {item.image && (
                        <img src={item.image} alt={item.name} style={{ width: "80px", height: "55px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e2e8f0" }} />
                      )}
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                          <span style={{ background: "#EFF6FF", color: "#1E3A5F", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", textTransform: "uppercase" }}>{item.type}</span>
                          <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{item.date}</span>
                        </div>
                        <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#1E3A5F", letterSpacing: "0.03em" }}>{item.name}</div>
                        <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>
                          {item.venue}
                          {item.participants && ` • ${item.participants} Participants`}
                          {item.colleges && ` • ${item.colleges} Colleges`}
                          {item.department && ` • ${item.department} Department`}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginLeft: "16px", flexShrink: 0 }}>
                      <button onClick={() => openEdit(item)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f1f5f9", color: "#1E3A5F", padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                        <Edit2 size={14} /> Edit
                      </button>
                      {deleteConfirm === item._id ? (
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button onClick={() => handleDelete(item._id!)} style={{ background: "#dc2626", color: "#fff", padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} style={{ background: "#f1f5f9", color: "#6B7280", padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(item._id!)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fef2f2", color: "#dc2626", padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                          <Trash2 size={14} /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <div style={{ textAlign: "center", padding: "60px 20px", color: "#9CA3AF", fontSize: "14px", background: "#fff", borderRadius: "12px", border: "1px dashed #e2e8f0" }}>
                    No events found. Click "Add Event" to create one!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}