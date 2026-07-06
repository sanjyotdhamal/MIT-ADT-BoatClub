"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X, Search, RefreshCw, Star } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("adminToken");

type Athlete = {
  _id?: string;
  name: string;
  event: string;
  year: string;
  course: string;
  age: number;
  experience: string;
  position: string;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  matchesPlayed: number;
  achievements: string;
  image: string;
  featured: boolean;
};

const emptyForm: Omit<Athlete, "_id"> = {
  name: "",
  event: "",
  year: "",
  course: "",
  age: 18,
  experience: "",
  position: "",
  goldMedals: 0,
  silverMedals: 0,
  bronzeMedals: 0,
  matchesPlayed: 0,
  achievements: "",
  image: "",
  featured: false,
};

const yearOptions     = ["1st Year", "2nd Year", "3rd Year", "4th Year", "PG"];
const positionOptions = ["Captain", "Vice Captain", "Senior Rower", "Junior Rower"];

export default function AdminAthletes() {
  const router = useRouter();
  const [sidebarOpen,     setSidebarOpen]     = useState(true);
  const [athletes,        setAthletes]        = useState<Athlete[]>([]);
  const [showForm,        setShowForm]        = useState(false);
  const [editingAthlete,  setEditingAthlete]  = useState<Athlete | null>(null);
  const [deleteConfirm,   setDeleteConfirm]   = useState<string | null>(null);
  const [searchQuery,     setSearchQuery]     = useState("");
  const [form,            setForm]            = useState<Omit<Athlete, "_id">>(emptyForm);
  const [loading,         setLoading]         = useState(true);
  const [saving,          setSaving]          = useState(false);
  const [uploading,       setUploading]       = useState(false);
  const [error,           setError]           = useState("");
  const [success,         setSuccess]         = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) {
      router.push("/admin/login");
      return;
    }
    fetchAthletes();
  }, [router]);

  const fetchAthletes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/athletes`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) setAthletes(data);
    } catch (err) {
      console.error(err);
      showError("Failed to load athletes. Is the backend running?");
    }
    setLoading(false);
  };

  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };
  const showError   = (msg: string) => { setError(msg);   setTimeout(() => setError(""),   4000); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value)
    }));
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingAthlete(null);
    setShowForm(true);
  };

  const openEdit = (item: Athlete) => {
    setForm({
      name: item.name,
      event: item.event,
      year: item.year,
      course: item.course,
      age: item.age,
      experience: item.experience,
      position: item.position,
      goldMedals: item.goldMedals,
      silverMedals: item.silverMedals,
      bronzeMedals: item.bronzeMedals,
      matchesPlayed: item.matchesPlayed,
      achievements: item.achievements,
      image: item.image || "",
      featured: item.featured || false,
    });
    setEditingAthlete(item);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.event || !form.course) {
      showError("Please fill Name, Event and Course!");
      return;
    }
    setSaving(true);
    try {
      const isEdit = !!editingAthlete?._id;
      const url = isEdit ? `${API}/athletes/${editingAthlete!._id}` : `${API}/athletes`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        showError(data.message || "Save failed");
        setSaving(false);
        return;
      }

      if (isEdit) {
        setAthletes(as => as.map(a => a._id === editingAthlete!._id ? data : a));
        showSuccess("Athlete updated successfully!");
      } else {
        setAthletes(as => [...as, data]);
        showSuccess("Athlete added successfully!");
      }

      setShowForm(false);
      setEditingAthlete(null);
    } catch (err) {
      console.error(err);
      showError("Network error. Check backend connection.");
    }
    setSaving(false);
  };

  const toggleFeatured = async (item: Athlete) => {
    const willEnable = !item.featured;
    try {
      const res = await fetch(`${API}/athletes/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ ...item, featured: willEnable }),
      });
      const data = await res.json();
      if (!res.ok) {
        showError(data.message || "Failed to update featured status.");
        return;
      }
      setAthletes(as => as.map(a => a._id === item._id ? data : a));
      showSuccess(willEnable ? "⭐ Athlete featured on home page!" : "Athlete removed from featured.");
    } catch (err) {
      console.error("Toggle featured error:", err);
      showError("Network error.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API}/athletes/upload`, {
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
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/athletes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) {
        const d = await res.json();
        showError(d.message || "Delete failed");
        return;
      }
      setAthletes(as => as.filter(a => a._id !== id));
      setDeleteConfirm(null);
      showSuccess("Athlete deleted.");
    } catch (err) {
      console.error(err);
      showError("Network error during delete.");
    }
  };

  const filtered = athletes.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const inp: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1.5px solid #e2e8f0", fontFamily: "Inter, sans-serif",
    fontSize: "14px", color: "#1E3A5F", outline: "none",
    background: "#f8fafc", boxSizing: "border-box",
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
          <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em" }}>Athletes Management</h1>
          <button onClick={fetchAthletes} title="Refresh" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.12)", color: "#fff", padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px" }}>
            <RefreshCw size={14} />
          </button>
          <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: "7px", background: "#fff", color: "#1E3A5F", padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 700 }}>
            <Plus size={15} /> Add Athlete
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
            <span style={{ fontSize: "13px", color: "#1E3A5F", fontWeight: 600 }}>Athletes</span>
          </div>

          <div style={{ padding: "28px 32px" }}>
            
            {/* ── Toast Messages ──────────────────────────────────────────── */}
            {success && (
              <div style={{ background: "#d1fae5", border: "1px solid #6ee7b7", color: "#065f46", padding: "12px 20px", borderRadius: "10px", marginBottom: "20px", fontSize: "14px", fontWeight: 600 }}>
                ✅ {success}
              </div>
            )}
            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b", padding: "12px 20px", borderRadius: "10px", marginBottom: "20px", fontSize: "14px", fontWeight: 600 }}>
                ❌ {error}
              </div>
            )}

            {/* Form */}
            {showForm && (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", marginBottom: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
                    {editingAthlete ? "Edit Athlete" : "Add New Athlete"}
                  </h3>
                  <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  {[
                    { label: "Full Name *",    name: "name",          ph: "Athlete name" },
                    { label: "Event",          name: "event",         ph: "e.g. Single Scull" },
                    { label: "Course *",       name: "course",        ph: "e.g. B.Tech CS" },
                    { label: "Experience",     name: "experience",    ph: "e.g. 3 Years" },
                    { label: "Age",            name: "age",           ph: "Age",    type: "number" },
                    { label: "Matches Played", name: "matchesPlayed", ph: "0",      type: "number" },
                    { label: "Gold Medals",    name: "goldMedals",    ph: "0",      type: "number" },
                    { label: "Silver Medals",  name: "silverMedals",  ph: "0",      type: "number" },
                    { label: "Bronze Medals",  name: "bronzeMedals",  ph: "0",      type: "number" },
                  ].map(({ label, name, ph, type }) => (
                    <div key={name}>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>{label}</label>
                      <input type={type || "text"} name={name} value={(form as Record<string, unknown>)[name] as string | number} onChange={handleChange} placeholder={ph} style={inp} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Year</label>
                    <select name="year" value={form.year} onChange={handleChange} style={inp}>
                      <option value="">Select Year</option>
                      {yearOptions.map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Position</label>
                    <select name="position" value={form.position} onChange={handleChange} style={inp}>
                      <option value="">Select Position</option>
                      {positionOptions.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Key Achievements</label>
                  <textarea name="achievements" value={form.achievements} onChange={handleChange} placeholder="List achievements separated by commas" rows={3} style={{ ...inp, resize: "none" }} />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "8px", display: "block" }}>Athlete Image</label>
                  
                  {/* Preview */}
                  {form.image && (
                    <div style={{ marginBottom: "12px", position: "relative", display: "inline-block" }}>
                      <img
                        src={form.image}
                        alt="Preview"
                        style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setForm(f => ({ ...f, image: "" }))}
                        style={{ position: "absolute", top: "-8px", right: "-8px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <label
                      style={{
                        background: uploading ? "#94a3b8" : "#1E3A5F",
                        color: "#fff",
                        padding: "8px 20px",
                        borderRadius: "8px",
                        cursor: uploading ? "not-allowed" : "pointer",
                        fontSize: "13px",
                        fontWeight: 600,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {uploading ? "⏳ Uploading..." : "📷 Upload to Cloudinary"}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </label>

                    <span style={{ fontSize: "13px", color: "#9CA3AF", flexShrink: 0 }}>OR</span>

                    <input
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="Paste image URL directly"
                      style={{ ...inp, flex: 1 }}
                    />
                  </div>
                  <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "6px" }}>
                    Max 10 MB. Accepted: JPG, PNG, WebP. Image will be stored on Cloudinary.
                  </p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Featured on Home Page</label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "10px 14px", background: form.featured ? "#fef3c7" : "#f8fafc", border: `1.5px solid ${form.featured ? "#fbbf24" : "#e2e8f0"}`, borderRadius: "8px" }}>
                    <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} style={{ width: "16px", height: "16px", cursor: "pointer" }} />
                    <span style={{ fontSize: "14px", color: "#1E3A5F", fontWeight: 600 }}>
                      {form.featured ? "⭐ Will appear on home page" : "☆ Not featured"}
                    </span>
                  </label>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button 
                    onClick={handleSave} 
                    disabled={saving || uploading}
                    style={{ background: saving || uploading ? "#94a3b8" : "#1E3A5F", color: "#fff", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: saving || uploading ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 700 }}
                  >
                    {uploading ? "Uploading Image…" : saving ? "Saving…" : editingAthlete ? "Update Athlete" : "Save Athlete"}
                  </button>
                  <button onClick={() => setShowForm(false)} style={{ background: "#f1f5f9", color: "#6B7280", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600 }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Search */}
            <div style={{ position: "relative", marginBottom: "24px", maxWidth: "400px" }}>
              <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search athletes..." style={{ ...inp, paddingLeft: "40px" }} />
            </div>

            {/* List */}
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#9CA3AF", fontSize: "14px" }}>
                Loading athletes…
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {filtered.map(item => (
                  <div key={item._id} style={{ background: "#fff", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", borderLeft: "4px solid #1E3A5F" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                      <img
                        src={item.image || "/images/hero-bg.jpg"}
                        alt={item.name}
                        style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0", flexShrink: 0 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                          <span style={{ background: "#EFF6FF", color: "#1E3A5F", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", textTransform: "uppercase" }}>{item.position || "Member"}</span>
                          <span style={{ background: "#f1f5f9", color: "#475569", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "4px" }}>{item.year || "-"}</span>
                          <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{item.event}</span>
                        </div>
                        <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#1E3A5F", letterSpacing: "0.03em", marginBottom: "4px" }}>{item.name}</div>
                        <div style={{ fontSize: "13px", color: "#6B7280" }}>
                          {item.course} • {item.experience || "0 Yrs"} • 🥇 {item.goldMedals} 🥈 {item.silverMedals} 🥉 {item.bronzeMedals} • {item.matchesPlayed} matches
                          {item.featured && <span style={{ marginLeft: "8px", background: "#fef3c7", color: "#b45309", fontSize: "11px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px" }}>⭐ Featured</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginLeft: "16px", flexShrink: 0 }}>
                      <button onClick={() => toggleFeatured(item)} title={item.featured ? "Unfeature Athlete" : "Feature Athlete"} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: item.featured ? "#fef3c7" : "#f1f5f9", color: item.featured ? "#b45309" : "#6b7280", padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer" }}>
                        <Star size={16} fill={item.featured ? "#b45309" : "none"} />
                      </button>
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
                {filtered.length === 0 && !loading && (
                  <div style={{ textAlign: "center", padding: "60px 20px", color: "#9CA3AF", fontSize: "14px", background: "#fff", borderRadius: "12px", border: "1px dashed #e2e8f0" }}>
                    No athletes found. Click &quot;Add Athlete&quot; to create one!
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