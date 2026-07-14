"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
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
  images?: string[];
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
  images: [] as string[],
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

/* ── small inline slideshow for admin list ── */
function MiniSlideshow({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((i) => (i + 1) % images.length);
  };
  return (
    <div style={{ position: "relative", width: "90px", height: "60px", flexShrink: 0 }}>
      <img
        src={images[idx]}
        alt="event"
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px", border: "1px solid #e2e8f0" }}
      />
      {images.length > 1 && (
        <>
          <button onClick={prev} style={arrowBtnStyle("left")}>‹</button>
          <button onClick={next} style={arrowBtnStyle("right")}>›</button>
          <div style={{ position: "absolute", bottom: "3px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "3px" }}>
            {images.map((_, i) => (
              <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: i === idx ? "#fff" : "rgba(255,255,255,0.5)" }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const arrowBtnStyle = (side: "left" | "right"): React.CSSProperties => ({
  position: "absolute",
  top: "50%",
  [side]: "2px",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  borderRadius: "3px",
  width: "16px",
  height: "16px",
  cursor: "pointer",
  fontSize: "11px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  lineHeight: 1,
});

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
      if (name === "year") {
        if (updated.type === "Vishwanath") updated.name = `Vishwanath Sports Meet ${value}`;
        else if (updated.type === "Inter-Collegiate") updated.name = `Inter-Collegiate Rowing Championship ${value}`;
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
      images: item.images || [],
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
    if (form.type === "Signature" && !form.name.trim()) {
      showError("Event Name is required for Signature events.");
      return;
    }
    if (!form.year.trim()) { showError("Year is required."); return; }
    if (!form.venue.trim()) { showError("Venue is required."); return; }

    setSaving(true);
    setError("");

    let nameToSave = form.name.trim();
    let dateToSave = form.date.trim();
    if (form.type === "Vishwanath") nameToSave = `Vishwanath Sports Meet ${form.year}`;
    else if (form.type === "Inter-Collegiate") nameToSave = `Inter-Collegiate Rowing Championship ${form.year}`;
    if (!dateToSave) dateToSave = form.year;

    const payload = {
      name: nameToSave,
      type: form.type,
      year: form.year.trim(),
      date: dateToSave,
      venue: form.venue.trim(),
      images: form.images,
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
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API}/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) { showError(data.message || "Save failed."); setSaving(false); return; }

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
      if (!res.ok) { const data = await res.json(); showError(data.message || "Delete failed."); return; }
      setEvents(prev => prev.filter(e => e._id !== id));
      showSuccess("Event deleted successfully.");
    } catch { showError("Network error."); }
    setDeleteConfirm(null);
  };



  // ── Image resize helper ──
  const TARGET_WIDTH = 800; // desired gallery width
  const TARGET_HEIGHT = 600; // desired gallery height

  // Resize the image using canvas, preserving aspect ratio
  const resizeImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        // calculate target dimensions while preserving aspect ratio
        const ratio = Math.min(TARGET_WIDTH / img.width, TARGET_HEIGHT / img.height, 1);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Resize failed"));
        }, file.type);
        URL.revokeObjectURL(url);
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });
  };

  // ── Multi‑image upload (max 5) with resizing ──
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = 5 - form.images.length;
    if (remaining <= 0) {
      showError("Maximum 5 images allowed per event.");
      e.target.value = "";
      return;
    }

    const toUpload = files.slice(0, remaining);
    if (files.length > remaining) showError(`Only ${remaining} more image(s) can be added. Uploading first ${remaining}.`);

    setUploading(true);
    setError("");

    const uploaded: string[] = [];
    for (const file of toUpload) {
      try {
        const resizedBlob = await resizeImage(file);
        const uploadFile = new File([resizedBlob], file.name, { type: file.type });
        const formData = new FormData();
        formData.append("image", uploadFile);
        const res = await fetch(`${API}/events/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${getToken()}` },
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.imageUrl) uploaded.push(data.imageUrl);
        else showError(data.message || "One image upload failed.");
      } catch (err) {
        showError("Upload error for one image.");
      }
    }

    if (uploaded.length > 0) {
      setForm((f) => ({ ...f, images: [...f.images, ...uploaded] }));
      showSuccess(`${uploaded.length} image(s) uploaded!`);
    }
    setUploading(false);
    e.target.value = "";
  };

  const removeImage = (idx: number) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
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

            {/* ── FORM ── */}
            {showForm && (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", marginBottom: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
                    {editingEvent ? "Edit Event" : "Add New Event"}
                  </h3>
                  <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
                </div>

                {/* Row 1 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Event Type *</label>
                    <select name="type" value={form.type} onChange={handleTypeChange} style={inp}>
                      {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Year *</label>
                    <input name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2026" style={inp} />
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Venue *</label>
                    <input name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. MIT ADT University, Pune" style={inp} />
                  </div>
                </div>

                {/* Row 2: type-specific */}
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

                {/* Signature stats */}
                {form.type === "Signature" && (
                  <div style={{ border: "1px solid #e2e8f0", padding: "16px", borderRadius: "10px", background: "#f8fafc", marginBottom: "16px" }}>
                    <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#1E3A5F", marginTop: 0, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.03em" }}>Signature Event Stats</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                      {[1, 2, 3].map(n => (
                        <div key={n}>
                          <label style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px", display: "block" }}>Stat {n} Label / Value</label>
                          <input name={`stat${n}Label`} value={(form as any)[`stat${n}Label`]} onChange={handleChange} placeholder="Label" style={{ ...inp, marginBottom: "8px", background: "#fff" }} />
                          <input name={`stat${n}Value`} value={(form as any)[`stat${n}Value`]} onChange={handleChange} placeholder="Value" style={{ ...inp, background: "#fff" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {form.type === "Vishwanath" && (
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Colleges Count</label>
                    <input name="colleges" value={form.colleges} onChange={handleChange} placeholder="e.g. 25+" style={inp} />
                  </div>
                )}

                {form.type === "Inter-Collegiate" && (
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Department / Winning College</label>
                    <input name="department" value={form.department} onChange={handleChange} placeholder="e.g. Mechanical" style={inp} />
                  </div>
                )}

                {/* Description */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Event description..." rows={3} style={{ ...inp, resize: "vertical" }} />
                </div>

                {/* ── Multi-Image Upload (max 5) via Cloudinary ── */}
                <div style={{ marginBottom: "24px", border: "1.5px solid #e2e8f0", borderRadius: "12px", padding: "16px", background: "#f8fafc" }}>
                  {/* Header row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#1E3A5F" }}>Event Photos</span>
                      {/* Cloudinary badge */}
                      <span style={{ background: "#3448c5", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", letterSpacing: "0.03em" }}>
                        ☁ Cloudinary
                      </span>
                      <span style={{ color: "#6B7280", fontSize: "12px" }}>(up to 5 photos for slideshow)</span>
                    </div>
                    <span style={{
                      fontSize: "12px", fontWeight: 700,
                      color: form.images.length >= 5 ? "#dc2626" : form.images.length > 0 ? "#16a34a" : "#6B7280",
                      background: form.images.length >= 5 ? "#fef2f2" : form.images.length > 0 ? "#f0fdf4" : "#f1f5f9",
                      padding: "3px 10px", borderRadius: "12px"
                    }}>
                      {form.images.length} / 5 uploaded
                    </span>
                  </div>

                  {/* Uploaded images grid with visible Cloudinary URLs */}
                  {form.images.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
                      {form.images.map((url, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", borderRadius: "8px", padding: "8px 12px", border: "1px solid #e2e8f0" }}>
                          {/* Thumbnail */}
                          <div style={{ position: "relative", flexShrink: 0 }}>
                            <img
                              src={url}
                              alt={`photo-${idx + 1}`}
                              onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='56' viewBox='0 0 80 56'%3E%3Crect width='80' height='56' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' fill='%239CA3AF' font-size='10' text-anchor='middle' dy='.3em'%3ENo preview%3C/text%3E%3C/svg%3E"; }}
                              style={{ width: "80px", height: "56px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e2e8f0", display: "block" }}
                            />
                            <div style={{ position: "absolute", top: "3px", left: "3px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "9px", borderRadius: "3px", padding: "1px 5px", fontWeight: 700 }}>
                              #{idx + 1}
                            </div>
                          </div>

                          {/* URL info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                              ☁ Cloudinary URL
                            </div>
                            <div style={{
                              fontSize: "11px", color: "#3448c5", fontFamily: "monospace",
                              background: "#eff3ff", padding: "4px 8px", borderRadius: "4px",
                              wordBreak: "break-all", lineHeight: 1.5,
                              border: "1px solid #c7d2fe"
                            }}>
                              {url}
                            </div>
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => removeImage(idx)}
                            title="Remove this photo"
                            style={{ flexShrink: 0, background: "#fef2f2", color: "#dc2626", border: "1px solid #fca5a5", borderRadius: "6px", padding: "6px 10px", cursor: "pointer", fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}
                          >
                            ✕ Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload button + status */}
                  {form.images.length < 5 ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <label style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        background: uploading ? "#94a3b8" : "#1E3A5F",
                        color: "#fff", padding: "10px 22px", borderRadius: "8px",
                        cursor: uploading ? "not-allowed" : "pointer",
                        fontSize: "13px", fontWeight: 700, flexShrink: 0,
                        boxShadow: uploading ? "none" : "0 2px 8px rgba(30,58,95,0.25)"
                      }}>
                        {uploading
                          ? <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <span style={{ display: "inline-block", width: "12px", height: "12px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                              Uploading to Cloudinary...
                            </span>
                          : <>📷 Upload Photos ({5 - form.images.length} slot{5 - form.images.length !== 1 ? "s" : ""} remaining)</>
                        }
                        <input type="file" accept="image/*" multiple disabled={uploading} onChange={handleImageUpload} style={{ display: "none" }} />
                      </label>
                      {form.images.length === 0 && !uploading && (
                        <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
                          Select up to {5 - form.images.length} photos — they will be stored on Cloudinary
                        </span>
                      )}
                    </div>
                  ) : (
                    <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                      ⚠ Maximum 5 photos reached. Remove a photo to upload another.
                    </div>
                  )}
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>


                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={handleSave} disabled={saving} style={{ background: "#1E3A5F", color: "#fff", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 700 }}>
                    {saving ? "⏳ Saving..." : editingEvent ? "Update Event" : "Save Event"}
                  </button>
                  <button onClick={() => setShowForm(false)} style={{ background: "#f1f5f9", color: "#6B7280", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600 }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Loading */}
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
                      <MiniSlideshow images={item.images || []} />
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                          <span style={{ background: "#EFF6FF", color: "#1E3A5F", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", textTransform: "uppercase" }}>{item.type}</span>
                          <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{item.date}</span>
                          {item.images && item.images.length > 0 && (
                            <span style={{ fontSize: "11px", color: "#6B7280", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px" }}>
                              📷 {item.images.length} photo{item.images.length > 1 ? "s" : ""}
                            </span>
                          )}
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