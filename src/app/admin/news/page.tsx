"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X, Search, Star } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("adminToken");

const categories = ["Championship", "Selection", "Event", "Achievement", "Training"];

type NewsItem = {
  _id?: string;
  title: string;
  category: string;
  date: string;
  description: string;
  fullDescription: string;
  image?: string;
  featured?: boolean;
};

const emptyForm = {
  title: "",
  category: "Championship",
  date: "",
  description: "",
  fullDescription: "",
  image: "",
  featured: false,
};

export default function AdminNews() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // ── Cache helpers (stale-while-revalidate) ──────────────────────────────
  const CACHE_KEY = "admin_news_cache";

  const getCachedNews = (): NewsItem[] | null => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch { /* ignore corrupt cache */ }
    return null;
  };

  const setCachedNews = (data: NewsItem[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch { /* quota exceeded — silently ignore */ }
  };

  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) {
      router.push("/admin/login");
      return;
    }

    // 1) Show cached data instantly (no loading spinner)
    const cached = getCachedNews();
    if (cached && cached.length > 0) {
      setNews(cached);
      setLoading(false);       // instant render with stale data
      fetchNews(true);         // silently refresh in background
    } else {
      fetchNews(false);        // no cache → show loading spinner
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const fetchNews = async (background = false) => {
    if (!background) setLoading(true);
    try {
      const res = await fetch(`${API}/news`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setNews(data);
        setCachedNews(data);   // update cache for next visit
      }
    } catch (err) {
      console.error("Fetch error:", err);
      if (!background) setError("Failed to load news. Is the backend running?");
    }
    if (!background) setLoading(false);
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(""), 4000);
  };

  // ── Toggle Featured ──────────────────────────────────────────────────────
  const toggleFeatured = async (item: NewsItem) => {
    const willEnable = !item.featured;
    const featuredCount = news.filter((n) => n.featured).length;
    if (willEnable && featuredCount >= 6) {
      showError("Maximum 6 featured articles allowed. Remove one first.");
      return;
    }
    try {
      const res = await fetch(`${API}/news/${item._id}`, {
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
      // Update state + cache locally instead of refetching
      setNews((prev) => {
        const updated = prev.map((n) => (n._id === item._id ? { ...n, featured: willEnable } : n));
        setCachedNews(updated);
        return updated;
      });
      showSuccess(willEnable ? "⭐ Added to featured!" : "Removed from featured.");
    } catch (err) {
      console.error("Toggle featured error:", err);
      showError("Network error. Check if backend is running.");
    }
  };

  // ── Handle Input Change ──────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingNews(null);
    setShowForm(true);
    setError("");
  };

  const openEdit = (item: NewsItem) => {
    setForm({
      title: item.title,
      category: item.category,
      date: item.date,
      description: item.description,
      fullDescription: item.fullDescription || "",
      image: item.image || "",
      featured: item.featured || false,
    });
    setEditingNews(item);
    setShowForm(true);
    setError("");
  };

  // ── Save (Create / Update) ───────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim() || !form.date.trim() || !form.description.trim()) {
      showError("Please fill Title, Date and Description!");
      return;
    }

    const featuredCount = news.filter((n) => n.featured).length;
    if (form.featured && !editingNews?.featured && featuredCount >= 6) {
      showError("Maximum 6 featured articles allowed. Remove one first.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload: Partial<NewsItem> = {
        title: form.title.trim(),
        category: form.category,
        date: form.date.trim(),
        description: form.description.trim(),
        fullDescription: form.fullDescription.trim(),
        image: form.image.trim(),
        featured: form.featured,
      };

      let res: Response;
      if (editingNews) {
        res = await fetch(`${API}/news/${editingNews._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API}/news`, {
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

      // Update state + cache locally instead of refetching
      if (editingNews) {
        setNews((prev) => {
          const updated = prev.map((n) => (n._id === editingNews._id ? data : n));
          setCachedNews(updated);
          return updated;
        });
      } else {
        setNews((prev) => {
          const updated = [data, ...prev];
          setCachedNews(updated);
          return updated;
        });
      }
      setShowForm(false);
      setEditingNews(null);
      setForm(emptyForm);
      showSuccess(editingNews ? "News updated successfully!" : "News created successfully!");
    } catch (err) {
      console.error("Save error:", err);
      showError("Network error. Check if backend is running on port 5000.");
    }
    setSaving(false);
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) {
        const data = await res.json();
        showError(data.message || "Delete failed.");
        return;
      }
      // Update state + cache locally instead of refetching
      setNews((prev) => {
        const updated = prev.filter((n) => n._id !== id);
        setCachedNews(updated);
        return updated;
      });
      showSuccess("News deleted.");
    } catch (err) {
      console.error("Delete error:", err);
      showError("Network error.");
    }
    setDeleteConfirm(null);
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

      const res = await fetch(`${API}/news/upload`, {
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
      setForm((f) => ({ ...f, image: data.imageUrl }));
      showSuccess("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      showError("Image upload failed. Check if backend is running.");
    }
    setUploading(false);
    // Reset the file input
    e.target.value = "";
  };

  const filtered = news.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const featuredCount = news.filter((n) => n.featured).length;

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
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
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
            News Management
          </h1>
          <button
            onClick={openAdd}
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
            <Plus size={15} /> Add News
          </button>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
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
              News
            </span>
          </div>

          <div style={{ padding: "28px 32px" }}>

            {/* ── Toast Notifications ────────────────────────────────── */}
            {error && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fca5a5",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "16px",
                  fontSize: "14px",
                  color: "#dc2626",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                ❌ {error}
                <button
                  onClick={() => setError("")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}
                >
                  <X size={16} />
                </button>
              </div>
            )}
            {success && (
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #86efac",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "16px",
                  fontSize: "14px",
                  color: "#16a34a",
                }}
              >
                ✅ {success}
              </div>
            )}

            {/* ── Featured Counter ───────────────────────────────────── */}
            <div
              style={{
                background: "#EFF6FF",
                border: "1px solid #bfdbfe",
                borderRadius: "10px",
                padding: "12px 16px",
                marginBottom: "20px",
                fontSize: "13px",
                color: "#1E3A5F",
              }}
            >
              ⭐ <strong>Featured news</strong> (max 6) appear on the home page. Click
              the star button to toggle. Currently featured:{" "}
              <strong
                style={{ color: featuredCount >= 6 ? "#dc2626" : "#1E3A5F" }}
              >
                {featuredCount}
              </strong>{" "}
              / 6
            </div>

            {/* ── Add / Edit Form ────────────────────────────────────── */}
            {showForm && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "28px",
                  marginBottom: "28px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "22px",
                      color: "#1E3A5F",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {editingNews ? "Edit News Article" : "Add New Article"}
                  </h3>
                  <button
                    onClick={() => { setShowForm(false); setError(""); }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6B7280",
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Row 1: Title + Category */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#1E3A5F",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      Title *
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="News title"
                      style={inp}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#1E3A5F",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      Category
                    </label>
                    <select name="category" value={form.category} onChange={handleChange} style={inp}>
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: Date + Featured */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#1E3A5F",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      Date *
                    </label>
                    <input
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      placeholder="e.g. June 15, 2026"
                      style={inp}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#1E3A5F",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      Featured on Home Page
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "10px 14px",
                        background: form.featured ? "#fef3c7" : "#f8fafc",
                        border: `1.5px solid ${form.featured ? "#fbbf24" : "#e2e8f0"}`,
                        borderRadius: "8px",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="featured"
                        checked={form.featured}
                        onChange={handleChange}
                        style={{ width: "16px", height: "16px", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "14px", color: "#1E3A5F", fontWeight: 600 }}>
                        {form.featured ? "⭐ Will appear on home page" : "☆ Not featured"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Short Description */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1E3A5F",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Short Description * <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(shown on cards)</span>
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Brief summary shown on news cards..."
                    rows={3}
                    style={{ ...inp, resize: "vertical" }}
                  />
                </div>

                {/* Full Description */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1E3A5F",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Full Description <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(shown in popup modal)</span>
                  </label>
                  <textarea
                    name="fullDescription"
                    value={form.fullDescription}
                    onChange={handleChange}
                    placeholder="Full article content shown when user clicks Read More..."
                    rows={5}
                    style={{ ...inp, resize: "vertical" }}
                  />
                </div>

                {/* Image Upload Section */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1E3A5F",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    News Image
                  </label>

                  {/* Preview */}
                  {form.image && (
                    <div
                      style={{
                        marginBottom: "12px",
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={form.image}
                        alt="Preview"
                        style={{
                          width: "200px",
                          height: "130px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <button
                        onClick={() => setForm((f) => ({ ...f, image: "" }))}
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          cursor: "pointer",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    {/* Upload Button */}
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

                    <span style={{ fontSize: "13px", color: "#9CA3AF", flexShrink: 0 }}>
                      OR
                    </span>

                    {/* URL Input */}
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

                {/* Form Action Buttons */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => { setShowForm(false); setError(""); }}
                    style={{
                      background: "#f1f5f9",
                      color: "#6B7280",
                      padding: "10px 24px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      background: saving ? "#94a3b8" : "#1E3A5F",
                      color: "#fff",
                      padding: "10px 28px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: saving ? "not-allowed" : "pointer",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    {saving ? "Saving..." : editingNews ? "Update News" : "Save News"}
                  </button>
                </div>
              </div>
            )}

            {/* ── Search Bar ────────────────────────────────────────── */}
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9CA3AF",
                }}
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news by title..."
                style={{ ...inp, paddingLeft: "36px" }}
              />
            </div>

            {/* ── News List ──────────────────────────────────────────── */}
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#9CA3AF",
                  fontSize: "14px",
                  background: "#fff",
                  borderRadius: "12px",
                  border: "1px dashed #e2e8f0",
                }}
              >
                Loading news...
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {filtered.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      background: "#fff",
                      borderRadius: "12px",
                      padding: "20px 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      border: "1px solid #e2e8f0",
                      borderLeft: `4px solid ${item.featured ? "#f59e0b" : "#1E3A5F"}`,
                    }}
                  >
                    {/* Thumbnail */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          width: "72px",
                          height: "52px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          marginRight: "16px",
                          flexShrink: 0,
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "6px",
                        }}
                      >
                        <span
                          style={{
                            background: "#EFF6FF",
                            color: "#1E3A5F",
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.category}
                        </span>
                        <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
                          {item.date}
                        </span>
                        {item.featured && (
                          <span
                            style={{
                              background: "#fef3c7",
                              color: "#92400e",
                              fontSize: "11px",
                              fontWeight: 700,
                              padding: "3px 10px",
                              borderRadius: "4px",
                            }}
                          >
                            ⭐ FEATURED
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontFamily: "Bebas Neue, sans-serif",
                          fontSize: "18px",
                          color: "#1E3A5F",
                          letterSpacing: "0.03em",
                          marginBottom: "4px",
                        }}
                      >
                        {item.title}
                      </div>
                      <div style={{ fontSize: "13px", color: "#6B7280" }}>
                        {item.description.substring(0, 100)}
                        {item.description.length > 100 ? "..." : ""}
                      </div>
                    </div>

                    {/* Actions */}
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginLeft: "16px",
                        flexShrink: 0,
                      }}
                    >
                      <button
                        onClick={() => openEdit(item)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          background: "#f1f5f9",
                          color: "#1E3A5F",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        <Edit2 size={14} /> Edit
                      </button>

                      <button
                        onClick={() => toggleFeatured(item)}
                        title={item.featured ? "Remove from home page" : "Show on home page"}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          background: item.featured ? "#fef3c7" : "#f1f5f9",
                          color: item.featured ? "#92400e" : "#6B7280",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        <Star size={14} fill={item.featured ? "#f59e0b" : "none"} />
                        {item.featured ? "Featured" : "Feature"}
                      </button>

                      {deleteConfirm === item._id ? (
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button
                            onClick={() => handleDelete(item._id!)}
                            style={{
                              background: "#dc2626",
                              color: "#fff",
                              padding: "8px 14px",
                              borderRadius: "8px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "13px",
                              fontWeight: 600,
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            style={{
                              background: "#f1f5f9",
                              color: "#6B7280",
                              padding: "8px 14px",
                              borderRadius: "8px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "13px",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(item._id!)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            background: "#fef2f2",
                            color: "#dc2626",
                            padding: "8px 14px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {filtered.length === 0 && !loading && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "60px 20px",
                      color: "#9CA3AF",
                      fontSize: "14px",
                      background: "#fff",
                      borderRadius: "12px",
                      border: "1px dashed #e2e8f0",
                    }}
                  >
                    {searchQuery
                      ? `No news matching "${searchQuery}".`
                      : 'No news yet. Click "Add News" to create one!'}
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