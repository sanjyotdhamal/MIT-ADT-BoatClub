"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const categories    = ["International","National","State","AIU","Intercollegiate","VSM"];
const subCategories = ["Senior","U23","Challenger","Sub-Junior","Junior","N/A"];
const years         = ["2026","2025","2024","2023"];
const medals        = ["Gold","Silver","Bronze"];

const medalColors: Record<string,string> = {
  Gold: "#f59e0b", Silver: "#94a3b8", Bronze: "#cd7c2f",
};

type ResultItem = {
  id: number;
  category: string; subCategory: string; year: string;
  eventName: string; date: string; venue: string; boatClass: string;
  medal: string; position: string; athletes: string[];
};

const initialResults: ResultItem[] = [
  { id:1, category:"State", subCategory:"Senior", year:"2026",
    eventName:"Maharashtra State Rowing Championship", date:"March 15, 2026",
    venue:"Pune, Maharashtra", boatClass:"Single Scull",
    medal:"Gold", position:"1st Place", athletes:["Rahul Sharma"] },
  { id:2, category:"VSM", subCategory:"N/A", year:"2026",
    eventName:"Vishwanath Sports Meet", date:"January 15, 2026",
    venue:"Pune, Maharashtra", boatClass:"Coxless Four",
    medal:"Gold", position:"1st Place",
    athletes:["Rahul Sharma","Amit Desai","Vikram Singh","Karan Joshi"] },
];

const emptyForm = {
  category:"State", subCategory:"Senior", year:"2026",
  eventName:"", date:"", venue:"", boatClass:"",
  medal:"Gold", position:"1st Place", athletes:[] as string[],
};

export default function AdminResults() {
  const router = useRouter();
  const [sidebarOpen,   setSidebarOpen]   = useState(true);
  const [results,       setResults]       = useState<ResultItem[]>(initialResults);
  const [showForm,      setShowForm]      = useState(false);
  const [editingResult, setEditingResult] = useState<ResultItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [filterCat,     setFilterCat]     = useState("All");
  const [filterYear,    setFilterYear]    = useState("All");
  const [athleteInput,  setAthleteInput]  = useState("");
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) router.push("/admin/login");
  }, [router]);

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

  const openAdd = () => { setForm(emptyForm); setEditingResult(null); setAthleteInput(""); setShowForm(true); };

  const openEdit = (item: ResultItem) => {
    setForm({ category:item.category, subCategory:item.subCategory, year:item.year,
      eventName:item.eventName, date:item.date, venue:item.venue, boatClass:item.boatClass,
      medal:item.medal, position:item.position, athletes:[...item.athletes] });
    setEditingResult(item); setAthleteInput(""); setShowForm(true);
  };

  const handleSave = () => {
    if (!form.eventName || !form.date || !form.venue || !form.boatClass) {
      alert("Please fill all required fields!"); return;
    }
    if (editingResult) {
      setResults(rs => rs.map(r => r.id === editingResult.id ? { ...editingResult, ...form } : r));
    } else {
      setResults(rs => [{ id: Date.now(), ...form }, ...rs]);
    }
    setShowForm(false); setEditingResult(null);
  };

  const handleDelete = (id: number) => { setResults(rs => rs.filter(r => r.id !== id)); setDeleteConfirm(null); };

  const filtered = results.filter(r =>
    (filterCat  === "All" || r.category === filterCat) &&
    (filterYear === "All" || r.year     === filterYear)
  );

  const inp: React.CSSProperties = {
    width:"100%", padding:"10px 14px", borderRadius:"8px",
    border:"1.5px solid #e2e8f0", fontFamily:"Inter, sans-serif",
    fontSize:"14px", color:"#1E3A5F", outline:"none",
    background:"#f8fafc", boxSizing:"border-box",
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh", background:"#f8fafc", fontFamily:"Inter, sans-serif" }}>

      {/* Top Navbar */}
       <div style={{ background: "#1E3A5F", height: "64px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
          <div>
             <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#fff", letterSpacing: "0.06em", lineHeight: 1 }}>MIT-ADT BOAT CLUB</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Pune, India</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <h1 style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:"20px", color:"rgba(255,255,255,0.85)", letterSpacing:"0.06em" }}>Results Management</h1>
          <button onClick={openAdd} style={{ display:"flex", alignItems:"center", gap:"7px", background:"#fff", color:"#1E3A5F", padding:"8px 18px", borderRadius:"8px", border:"none", cursor:"pointer", fontFamily:"Inter, sans-serif", fontSize:"13px", fontWeight:700 }}>
            <Plus size={15}/> Add Result
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display:"flex", flex:1 }}>

        {/* Shared Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content */}
        <div style={{ flex:1, overflow:"auto" }}>

          {/* Breadcrumb */}
          <div style={{ background:"#ffffff", padding:"0 28px", height:"48px", display:"flex", alignItems:"center", borderBottom:"1px solid #e2e8f0" }}>
            <span style={{ fontSize:"13px", color:"#9CA3AF" }}>Admin</span>
            <span style={{ fontSize:"13px", color:"#9CA3AF", margin:"0 8px" }}>/</span>
            <span style={{ fontSize:"13px", color:"#1E3A5F", fontWeight:600 }}>Results</span>
          </div>

          <div style={{ padding:"28px 32px" }}>

            {/* Form */}
            {showForm && (
              <div style={{ background:"#fff", borderRadius:"16px", padding:"28px", marginBottom:"28px", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", border:"1px solid #e2e8f0" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
                  <h3 style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:"22px", color:"#1E3A5F", letterSpacing:"0.04em" }}>
                    {editingResult ? "Edit Result" : "Add New Result"}
                  </h3>
                  <button onClick={() => setShowForm(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"#6B7280" }}><X size={20}/></button>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"16px", marginBottom:"16px" }}>
                  {[
                    { label:"Category *", name:"category", opts:categories },
                    { label:"Sub-Category", name:"subCategory", opts:subCategories },
                    { label:"Year *", name:"year", opts:years },
                  ].map(({ label, name, opts }) => (
                    <div key={name}>
                      <label style={{ fontSize:"13px", fontWeight:600, color:"#1E3A5F", marginBottom:"6px", display:"block" }}>{label}</label>
                      <select name={name} value={(form as any)[name]} onChange={handleChange} style={inp}>
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  {[
                    { label:"Event Name *", name:"eventName", ph:"e.g. VSM 2026" },
                    { label:"Date *", name:"date", ph:"e.g. Jan 15, 2026" },
                    { label:"Venue *", name:"venue", ph:"e.g. Pune, Maharashtra" },
                    { label:"Boat Class *", name:"boatClass", ph:"e.g. Coxless Four" },
                    { label:"Position", name:"position", ph:"e.g. 1st Place" },
                  ].map(({ label, name, ph }) => (
                    <div key={name}>
                      <label style={{ fontSize:"13px", fontWeight:600, color:"#1E3A5F", marginBottom:"6px", display:"block" }}>{label}</label>
                      <input name={name} value={(form as any)[name]} onChange={handleChange} placeholder={ph} style={inp}/>
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize:"13px", fontWeight:600, color:"#1E3A5F", marginBottom:"6px", display:"block" }}>Medal</label>
                    <select name="medal" value={form.medal} onChange={handleChange} style={inp}>
                      {medals.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                </div>

                {/* Athletes */}
                <div style={{ marginBottom:"20px" }}>
                  <label style={{ fontSize:"13px", fontWeight:600, color:"#1E3A5F", marginBottom:"8px", display:"block" }}>Athletes</label>
                  <div style={{ display:"flex", gap:"8px", marginBottom:"10px" }}>
                    <input value={athleteInput} onChange={e => setAthleteInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addAthlete()} placeholder="Type athlete name and press Enter or Add" style={{ ...inp, flex:1 }}/>
                    <button onClick={addAthlete} style={{ background:"#1E3A5F", color:"#fff", padding:"10px 20px", borderRadius:"8px", border:"none", cursor:"pointer", fontFamily:"Inter, sans-serif", fontSize:"14px", fontWeight:600, whiteSpace:"nowrap" }}>+ Add</button>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                    {form.athletes.map((a, i) => (
                      <div key={i} style={{ background:"#EFF6FF", color:"#1E3A5F", padding:"6px 12px", borderRadius:"6px", fontSize:"13px", fontWeight:600, display:"flex", alignItems:"center", gap:"6px" }}>
                        {a}
                        <button onClick={() => removeAthlete(i)} style={{ background:"none", border:"none", cursor:"pointer", color:"#dc2626", padding:0, fontSize:"16px", lineHeight:1 }}>×</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display:"flex", gap:"12px" }}>
                  <button onClick={handleSave} style={{ background:"#1E3A5F", color:"#fff", padding:"10px 28px", borderRadius:"8px", border:"none", cursor:"pointer", fontFamily:"Inter, sans-serif", fontSize:"14px", fontWeight:700 }}>
                    {editingResult ? "Update Result" : "Save Result"}
                  </button>
                  <button onClick={() => setShowForm(false)} style={{ background:"#f1f5f9", color:"#6B7280", padding:"10px 28px", borderRadius:"8px", border:"none", cursor:"pointer", fontFamily:"Inter, sans-serif", fontSize:"14px", fontWeight:600 }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Filters */}
            <div style={{ display:"flex", gap:"12px", marginBottom:"24px", flexWrap:"wrap", alignItems:"center" }}>
              <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ ...inp, width:"auto", padding:"8px 14px" }}>
                <option value="All">All Categories</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={filterYear} onChange={e => setFilterYear(e.target.value)} style={{ ...inp, width:"auto", padding:"8px 14px" }}>
                <option value="All">All Years</option>
                {years.map(y => <option key={y}>{y}</option>)}
              </select>
              <span style={{ fontSize:"13px", color:"#9CA3AF" }}>Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            </div>

            {/* Results List */}
            <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              {filtered.map(item => (
                <div key={item.id} style={{ background:"#fff", borderRadius:"12px", padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 8px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", borderLeft:`4px solid ${medalColors[item.medal] || "#1E3A5F"}` }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"6px", flexWrap:"wrap" }}>
                      <span style={{ background:"#EFF6FF", color:"#1E3A5F", fontSize:"11px", fontWeight:700, padding:"3px 10px", borderRadius:"4px", textTransform:"uppercase" }}>{item.category}</span>
                      {item.subCategory !== "N/A" && <span style={{ background:"#f1f5f9", color:"#475569", fontSize:"11px", fontWeight:600, padding:"3px 10px", borderRadius:"4px" }}>{item.subCategory}</span>}
                      <span style={{ background:"#f1f5f9", color:"#475569", fontSize:"11px", fontWeight:600, padding:"3px 10px", borderRadius:"4px" }}>{item.year}</span>
                      <span style={{ fontSize:"16px" }}>{item.medal === "Gold" ? "🥇" : item.medal === "Silver" ? "🥈" : "🥉"}</span>
                    </div>
                    <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:"18px", color:"#1E3A5F", letterSpacing:"0.03em", marginBottom:"4px" }}>{item.eventName} — {item.boatClass}</div>
                    <div style={{ fontSize:"13px", color:"#6B7280", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.date} • {item.venue} • {item.athletes.join(", ")}</div>
                  </div>
                  <div style={{ display:"flex", gap:"8px", marginLeft:"16px", flexShrink:0 }}>
                    <button onClick={() => openEdit(item)} style={{ display:"flex", alignItems:"center", gap:"6px", background:"#f1f5f9", color:"#1E3A5F", padding:"8px 14px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"13px", fontWeight:600 }}>
                      <Edit2 size={14}/> Edit
                    </button>
                    {deleteConfirm === item.id ? (
                      <div style={{ display:"flex", gap:"6px" }}>
                        <button onClick={() => handleDelete(item.id)} style={{ background:"#dc2626", color:"#fff", padding:"8px 14px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"13px", fontWeight:600 }}>Confirm</button>
                        <button onClick={() => setDeleteConfirm(null)} style={{ background:"#f1f5f9", color:"#6B7280", padding:"8px 14px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"13px" }}>Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(item.id)} style={{ display:"flex", alignItems:"center", gap:"6px", background:"#fef2f2", color:"#dc2626", padding:"8px 14px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"13px", fontWeight:600 }}>
                        <Trash2 size={14}/> Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ textAlign:"center", padding:"60px 20px", color:"#9CA3AF", fontSize:"14px", background:"#fff", borderRadius:"12px", border:"1px dashed #e2e8f0" }}>
                  No results found. Click "Add Result" to create one!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}