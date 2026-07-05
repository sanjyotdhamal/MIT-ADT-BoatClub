"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X, RefreshCw } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("adminToken");

const categories    = ["International", "National", "State", "AIU", "Intercollegiate", "VSM"];
const subCategories = ["Senior", "U23", "Challenger", "Sub-Junior", "Junior", "N/A"];
const years         = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011","2010"];
const medals        = ["Gold", "Silver", "Bronze", "Participate"];

const medalColors: Record<string, string> = {
  Gold: "#f59e0b", Silver: "#94a3b8", Bronze: "#cd7c2f", Participate: "#64748b"
};

type ResultItem = {
  _id?: string;
  category: string;
  subCategory: string;
  year: string;
  eventName: string;
  date: string;
  venue: string;
  boatClass: string;
  medal: string;
  position: string;
  athletes: string[];
};

const emptyForm: Omit<ResultItem, "_id"> = {
  category: "State",
  subCategory: "Senior",
  year: "2026",
  eventName: "",
  date: "",
  venue: "",
  boatClass: "",
  medal: "Gold",
  position: "1st Place",
  athletes: [],
};

export default function AdminResults() {
  const router = useRouter();
  const [sidebarOpen,   setSidebarOpen]   = useState(true);
  const [results,       setResults]       = useState<ResultItem[]>([]);
  const [showForm,      setShowForm]      = useState(false);
  const [editingResult, setEditingResult] = useState<ResultItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filterCat,     setFilterCat]     = useState("All");
  const [filterYear,    setFilterYear]    = useState("All");
  const [athleteInput,  setAthleteInput]  = useState("");
  const [form,          setForm]          = useState<Omit<ResultItem, "_id">>(emptyForm);
  const [loading,       setLoading]       = useState(true);
  const [saving,        setSaving]        = useState(false);
  const [error,         setError]         = useState("");
  const [success,       setSuccess]       = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) {
      router.push("/admin/login");
      return;
    }
    fetchResults();
  }, [router]);

  // ── API helpers ────────────────────────────────────────────────────────────
  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/results`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) setResults(data);
    } catch (err) {
      console.error(err);
      showError("Failed to load results. Is the backend running?");
    }
    setLoading(false);
  };

  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };
  const showError   = (msg: string) => { setError(msg);   setTimeout(() => setError(""),   4000); };

  // ── Form helpers ───────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const addAthlete = () => {
    if (athleteInput.trim()) {
      setForm(f => ({ ...f, athletes: [...f.athletes, athleteInput.trim()] }));
      setAthleteInput("");
    }
  };
  const removeAthlete = (i: number) =>
    setForm(f => ({ ...f, athletes: f.athletes.filter((_, j) => j !== i) }));

  const openAdd = () => {
    setForm(emptyForm);
    setEditingResult(null);
    setAthleteInput("");
    setShowForm(true);
  };
  const openEdit = (item: ResultItem) => {
    setForm({
      category: item.category, subCategory: item.subCategory, year: item.year,
      eventName: item.eventName, date: item.date, venue: item.venue,
      boatClass: item.boatClass, medal: item.medal, position: item.position,
      athletes: [...item.athletes],
    });
    setEditingResult(item);
    setAthleteInput("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.eventName || !form.date || !form.venue || !form.boatClass) {
      showError("Please fill all required fields!"); return;
    }
    
    // Auto-add any pending athlete input
    const finalAthletes = [...form.athletes];
    if (athleteInput.trim()) {
      finalAthletes.push(athleteInput.trim());
      setAthleteInput("");
    }
    
    const payload = { ...form, athletes: finalAthletes };

    setSaving(true);
    try {
      const isEdit  = !!editingResult?._id;
      const url     = isEdit ? `${API}/results/${editingResult!._id}` : `${API}/results`;
      const method  = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { showError(data.message || "Save failed"); setSaving(false); return; }

      if (isEdit) {
        setResults(rs => rs.map(r => r._id === editingResult!._id ? data : r));
        showSuccess("Result updated successfully!");
      } else {
        setResults(rs => [data, ...rs]);
        showSuccess("Result added successfully!");
      }
      setShowForm(false);
      setEditingResult(null);
    } catch (err) {
      console.error(err);
      showError("Network error. Check backend connection.");
    }
    setSaving(false);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/results/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) { const d = await res.json(); showError(d.message || "Delete failed"); return; }
      setResults(rs => rs.filter(r => r._id !== id));
      setDeleteConfirm(null);
      showSuccess("Result deleted.");
    } catch (err) {
      console.error(err);
      showError("Network error during delete.");
    }
  };

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = results.filter(r =>
    (filterCat  === "All" || r.category === filterCat) &&
    (filterYear === "All" || r.year     === filterYear)
  );

  // ── Shared input style ─────────────────────────────────────────────────────
  const inp: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1.5px solid #e2e8f0", fontFamily: "Inter, sans-serif",
    fontSize: "14px", color: "#1E3A5F", outline: "none",
    background: "#f8fafc", boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>

      {/* ── Top Navbar ─────────────────────────────────────────────────── */}
      <div style={{ background: "#1E3A5F", height: "64px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#fff", letterSpacing: "0.06em", lineHeight: 1 }}>MIT-ADT BOAT CLUB</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Pune, India</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em" }}>Results Management</h1>
          <button onClick={fetchResults} title="Refresh" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.12)", color: "#fff", padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px" }}>
            <RefreshCw size={14} />
          </button>
          <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: "7px", background: "#fff", color: "#1E3A5F", padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 700 }}>
            <Plus size={15} /> Add Result
          </button>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* Shared Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content */}
        <div style={{ flex: 1, overflow: "auto" }}>

          {/* Breadcrumb */}
          <div style={{ background: "#ffffff", padding: "0 28px", height: "48px", display: "flex", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Admin</span>
            <span style={{ fontSize: "13px", color: "#9CA3AF", margin: "0 8px" }}>/</span>
            <span style={{ fontSize: "13px", color: "#1E3A5F", fontWeight: 600 }}>Results</span>
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

            {/* ── Add / Edit Form ─────────────────────────────────────────── */}
            {showForm && (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", marginBottom: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
                    {editingResult ? "Edit Result" : "Add New Result"}
                  </h3>
                  <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  {/* Dropdowns */}
                  {[
                    { label: "Category *",    name: "category",    opts: categories },
                    { label: "Sub-Category",  name: "subCategory", opts: subCategories },
                    { label: "Year *",        name: "year",        opts: years },
                  ].map(({ label, name, opts }) => (
                    <div key={name}>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>{label}</label>
                      <select name={name} value={(form as Record<string, unknown>)[name] as string} onChange={handleChange} style={inp}>
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  {/* Text inputs */}
                  {[
                    { label: "Event Name *", name: "eventName", ph: "e.g. VSM 2026" },
                    { label: "Date *",       name: "date",      ph: "e.g. Jan 15, 2026" },
                    { label: "Venue *",      name: "venue",     ph: "e.g. Pune, Maharashtra" },
                    { label: "Boat Class *", name: "boatClass", ph: "e.g. Coxless Four" },
                    { label: "Position",     name: "position",  ph: "e.g. 1st Place" },
                  ].map(({ label, name, ph }) => (
                    <div key={name}>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>{label}</label>
                      <input name={name} value={(form as Record<string, unknown>)[name] as string} onChange={handleChange} placeholder={ph} style={inp} />
                    </div>
                  ))}
                  {/* Medal */}
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Medal</label>
                    <select name="medal" value={form.medal} onChange={handleChange} style={inp}>
                      {medals.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                </div>

                {/* Athletes */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "8px", display: "block" }}>Athletes</label>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                    <input
                      value={athleteInput}
                      onChange={e => setAthleteInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addAthlete()}
                      placeholder="Type athlete name and press Enter or Add"
                      style={{ ...inp, flex: 1 }}
                    />
                    <button onClick={addAthlete} style={{ background: "#1E3A5F", color: "#fff", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
                      + Add
                    </button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {form.athletes.map((a, i) => (
                      <div key={i} style={{ background: "#EFF6FF", color: "#1E3A5F", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                        {a}
                        <button onClick={() => removeAthlete(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", padding: 0, fontSize: "16px", lineHeight: 1 }}>×</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{ background: saving ? "#94a3b8" : "#1E3A5F", color: "#fff", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: saving ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 700 }}
                  >
                    {saving ? "Saving…" : editingResult ? "Update Result" : "Save Result"}
                  </button>
                  <button onClick={() => setShowForm(false)} style={{ background: "#f1f5f9", color: "#6B7280", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600 }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* ── Filters ─────────────────────────────────────────────────── */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
              <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ ...inp, width: "auto", padding: "8px 14px" }}>
                <option value="All">All Categories</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={filterYear} onChange={e => setFilterYear(e.target.value)} style={{ ...inp, width: "auto", padding: "8px 14px" }}>
                <option value="All">All Years</option>
                {years.map(y => <option key={y}>{y}</option>)}
              </select>
              <span style={{ fontSize: "13px", color: "#9CA3AF" }}>
                Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* ── Results List ─────────────────────────────────────────────── */}
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#9CA3AF", fontSize: "14px" }}>
                Loading results…
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {filtered.map(item => (
                  <div
                    key={item._id}
                    style={{ background: "#fff", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", borderLeft: `4px solid ${medalColors[item.medal] || "#1E3A5F"}` }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                        <span style={{ background: "#EFF6FF", color: "#1E3A5F", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", textTransform: "uppercase" }}>{item.category}</span>
                        {item.subCategory !== "N/A" && <span style={{ background: "#f1f5f9", color: "#475569", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "4px" }}>{item.subCategory}</span>}
                        <span style={{ background: "#f1f5f9", color: "#475569", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "4px" }}>{item.year}</span>
                        <span style={{ fontSize: "16px" }}>{item.medal === "Gold" ? "🥇" : item.medal === "Silver" ? "🥈" : "🥉"}</span>
                      </div>
                      <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "18px", color: "#1E3A5F", letterSpacing: "0.03em", marginBottom: "4px" }}>
                        {item.eventName} — {item.boatClass}
                      </div>
                      <div style={{ fontSize: "13px", color: "#6B7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.date} • {item.venue} • {item.athletes.join(", ")}
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
                {filtered.length === 0 && !loading && (
                  <div style={{ textAlign: "center", padding: "60px 20px", color: "#9CA3AF", fontSize: "14px", background: "#fff", borderRadius: "12px", border: "1px dashed #e2e8f0" }}>
                    No results found. Click &quot;Add Result&quot; to create one!
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