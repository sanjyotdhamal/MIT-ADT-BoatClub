"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, X, Star } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("adminToken");

const categories = ["Championship", "Events", "Training", "Team", "Athletes", "Achievement"];
const emptyForm = { title: "", description: "", category: "Championship", image: "", featured: false };

type GalleryPhoto = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  image: string;
  featured: boolean;
  createdAt?: string;
};

export default function AdminGallery() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) router.push("/admin/login");
    fetchGallery();
  }, [router]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/gallery`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) setGallery(data);
    } catch (err) {
      console.error("Gallery fetch error:", err);
      setError("Failed to load gallery. Is the backend running?");
    }
    setLoading(false);
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
    const target = e.target as HTMLInputElement;
    setForm(f => ({ ...f, [target.name]: target.type === "checkbox" ? target.checked : target.value }));
  };

  // ── Upload Image to Cloudinary ───────────────────────────────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API}/gallery/upload`, {
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
      setPreview(data.imageUrl);
      setForm(f => ({ ...f, image: data.imageUrl }));
      showSuccess("Image uploaded to Cloudinary!");
    } catch (err) {
      console.error("Upload error:", err);
      showError("Image upload failed. Check if backend is running.");
    }
    setUploading(false);
    e.target.value = "";
  };

  // ── Save Photo ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.title || !form.category) {
      showError("Please fill Title and Category!");
      return;
    }
    if (!form.image) {
      showError("Please upload an image!");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API}/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        showError(data.message || "Save failed.");
        setSaving(false);
        return;
      }

      // Update state locally
      setGallery(prev => [data, ...prev]);
      setShowForm(false);
      setForm(emptyForm);
      setPreview("");
      showSuccess("Photo saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      showError("Network error. Check if backend is running.");
    }
    setSaving(false);
  };

  // ── Delete Photo ─────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) {
        showError("Delete failed.");
        return;
      }
      // Update state locally
      setGallery(prev => prev.filter(p => p._id !== id));
      showSuccess("Photo deleted.");
    } catch (err) {
      console.error("Delete error:", err);
      showError("Network error.");
    }
    setDeleteConfirm(null);
  };

  // ── Toggle Featured ──────────────────────────────────────────────────────
  const toggleFeatured = async (item: GalleryPhoto) => {
    const willEnable = !item.featured;
    try {
      const res = await fetch(`${API}/gallery/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ ...item, featured: willEnable }),
      });
      if (!res.ok) {
        showError("Failed to update featured status.");
        return;
      }
      // Update state locally
      setGallery(prev => prev.map(p => p._id === item._id ? { ...p, featured: willEnable } : p));
      showSuccess(willEnable ? "⭐ Added to featured!" : "Removed from featured.");
    } catch (err) {
      console.error("Toggle featured error:", err);
      showError("Network error.");
    }
  };

  const filtered = filterCategory === "All" ? gallery : gallery.filter(g => g.category === filterCategory);

  const inp: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1.5px solid #e2e8f0", fontFamily: "Inter, sans-serif",
    fontSize: "14px", color: "#1E3A5F", outline: "none",
    background: "#f8fafc", boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>

      {/* Top Navbar */}
      <div style={{ background: "#1E3A5F", height: "64px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#fff", letterSpacing: "0.06em", lineHeight: 1 }}>MIT-ADT BOAT CLUB</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Pune, India</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em" }}>Gallery Management</h1>
          <button onClick={() => setShowForm(true)} style={{ display: "flex", alignItems: "center", gap: "7px", background: "#fff", color: "#1E3A5F", padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 700 }}>
            <Plus size={15} /> Upload Photo
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1 }}>
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div style={{ flex: 1, overflow: "auto" }}>
          <div style={{ background: "#ffffff", padding: "0 28px", height: "48px", display: "flex", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Admin</span>
            <span style={{ fontSize: "13px", color: "#9CA3AF", margin: "0 8px" }}>/</span>
            <span style={{ fontSize: "13px", color: "#1E3A5F", fontWeight: 600 }}>Gallery</span>
          </div>

          <div style={{ padding: "28px 32px" }}>

            {/* Toast Notifications */}
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "14px", color: "#dc2626", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                ❌ {error}
                <button onClick={() => setError("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}><X size={16} /></button>
              </div>
            )}
            {success && (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "14px", color: "#16a34a" }}>
                ✅ {success}
              </div>
            )}

            {/* Upload Form */}
            {showForm && (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", marginBottom: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F", letterSpacing: "0.04em" }}>Upload New Photo</h3>
                  <button onClick={() => { setShowForm(false); setPreview(""); setForm(emptyForm); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Photo Title *</label>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. State Championship 2026" style={inp} />
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Category *</label>
                    <select name="category" value={form.category} onChange={handleChange} style={inp}>
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the activity in this photo..." rows={2} style={{ ...inp, resize: "none" }} />
                </div>

                {/* Featured Toggle */}
                <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <input type="checkbox" name="featured" id="featured" checked={form.featured} onChange={handleChange} style={{ width: "16px", height: "16px", cursor: "pointer" }} />
                  <label htmlFor="featured" style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Star size={14} color="#f59e0b" /> Show in Home Slideshow (Featured)
                  </label>
                </div>

                {/* Image Upload — Cloudinary */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "8px", display: "block" }}>Upload Image</label>
                  <div style={{ border: "2px dashed #e2e8f0", borderRadius: "12px", padding: "24px", textAlign: "center", background: "#f8fafc" }}>
                    {preview ? (
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <img src={preview} alt="Preview" style={{ width: "200px", height: "140px", objectFit: "cover", borderRadius: "8px" }} />
                        <button onClick={() => { setPreview(""); setForm(f => ({ ...f, image: "" })); }}
                          style={{ position: "absolute", top: "-8px", right: "-8px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: "32px", marginBottom: "8px" }}>🖼️</div>
                        <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "12px" }}>
                          {uploading ? "⏳ Uploading to Cloudinary..." : "Click to upload photo to Cloudinary"}
                        </p>
                        <label style={{ background: uploading ? "#94a3b8" : "#1E3A5F", color: "#fff", padding: "8px 20px", borderRadius: "8px", cursor: uploading ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: 600 }}>
                          {uploading ? "Uploading..." : "📷 Choose File"}
                          <input type="file" accept="image/*" disabled={uploading} onChange={handleImageUpload} style={{ display: "none" }} />
                        </label>
                        <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "8px" }}>
                          Max 10 MB. Images are stored on Cloudinary (not MongoDB).
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={handleSave} disabled={saving} style={{ background: saving ? "#94a3b8" : "#1E3A5F", color: "#fff", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: saving ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 700 }}>
                    {saving ? "Saving..." : "Save Photo"}
                  </button>
                  <button onClick={() => { setShowForm(false); setPreview(""); setForm(emptyForm); }} style={{ background: "#f1f5f9", color: "#6B7280", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600 }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Stats + Filter */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ background: "#fff", borderRadius: "10px", padding: "10px 16px", border: "1px solid #e2e8f0", fontSize: "13px", color: "#1E3A5F", fontWeight: 600 }}>
                Total: {gallery.length} photos
              </div>
              <div style={{ background: "#fef3c7", borderRadius: "10px", padding: "10px 16px", border: "1px solid #f59e0b", fontSize: "13px", color: "#92400e", fontWeight: 600 }}>
                ⭐ Featured: {gallery.filter(g => g.featured).length} photos
              </div>
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
                style={{ ...inp, width: "auto", padding: "8px 14px" }}>
                <option value="All">All Categories</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Note */}
            <div style={{ background: "#EFF6FF", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "12px 16px", marginBottom: "24px", fontSize: "13px", color: "#1E3A5F" }}>
              ⭐ <strong>Featured photos</strong> appear in the home page slideshow. Click the star icon on any photo to toggle featured status. Images are stored on Cloudinary.
            </div>

            {/* Gallery Grid */}
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#9CA3AF", fontSize: "14px", background: "#fff", borderRadius: "12px", border: "1px dashed #e2e8f0" }}>
                Loading gallery...
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                {filtered.map(item => (
                  <div key={item._id} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: `1px solid ${item.featured ? "#f59e0b" : "#e2e8f0"}` }}>
                    <div style={{ height: "160px", overflow: "hidden", position: "relative" }}>
                      <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { (e.target as HTMLImageElement).src = "/images/hero-bg.jpg"; }} />
                      <div style={{ position: "absolute", top: "8px", left: "8px", background: "#1E3A5F", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px", textTransform: "uppercase" }}>
                        {item.category}
                      </div>
                      {item.featured && (
                        <div style={{ position: "absolute", top: "8px", right: "8px", background: "#f59e0b", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}>
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1E3A5F", fontWeight: 600, marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.title}
                      </div>
                      {item.description && (
                        <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.description}
                        </div>
                      )}
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => toggleFeatured(item)}
                          title={item.featured ? "Remove from slideshow" : "Add to slideshow"}
                          style={{ flex: 1, background: item.featured ? "#fef3c7" : "#f1f5f9", color: item.featured ? "#92400e" : "#6B7280", padding: "6px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
                          {item.featured ? "⭐ Featured" : "☆ Feature"}
                        </button>
                        {deleteConfirm === item._id ? (
                          <div style={{ display: "flex", gap: "4px" }}>
                            <button onClick={() => handleDelete(item._id)} style={{ background: "#dc2626", color: "#fff", padding: "6px 10px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>Yes</button>
                            <button onClick={() => setDeleteConfirm(null)} style={{ background: "#f1f5f9", color: "#6B7280", padding: "6px 10px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px" }}>No</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(item._id)} style={{ background: "#fef2f2", color: "#dc2626", padding: "6px 10px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 20px", color: "#9CA3AF", fontSize: "14px", background: "#fff", borderRadius: "12px", border: "1px dashed #e2e8f0" }}>
                    No photos found. Click &quot;Upload Photo&quot; to add one!
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