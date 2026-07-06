"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

type EventItem = {
  id: number;
  name: string; date: string; venue: string;
  participants: string; colleges: string;
  description: string; type: string;
};

const initialEvents: EventItem[] = [
  { id: 1, name: "Vishwanath Sports Meet 2026", date: "January 15, 2026", venue: "MIT ADT University, Pune", participants: "400+", colleges: "25+", description: "Annual sports meet organized by MIT ADT University.", type: "Annual" },
  { id: 2, name: "Inter-Collegiate Rowing Championship", date: "February 20, 2026", venue: "Mumbai, Maharashtra", participants: "200+", colleges: "15+", description: "Inter-collegiate rowing championship between engineering colleges.", type: "Championship" },
];

const eventTypes = ["Annual", "Championship", "Signature", "Friendly", "Training"];
const emptyForm  = { name: "", date: "", venue: "", participants: "", colleges: "", description: "", type: "Annual" };

export default function AdminEvents() {
  const router = useRouter();
  const [sidebarOpen,   setSidebarOpen]   = useState(true);
  const [events,        setEvents]        = useState<EventItem[]>(initialEvents);
  const [showForm,      setShowForm]      = useState(false);
  const [editingEvent,  setEditingEvent]  = useState<EventItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) router.push("/admin/login");
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const openAdd = () => { setForm(emptyForm); setEditingEvent(null); setShowForm(true); };

  const openEdit = (item: EventItem) => {
    setForm({ name: item.name, date: item.date, venue: item.venue,
              participants: item.participants, colleges: item.colleges,
              description: item.description, type: item.type });
    setEditingEvent(item); setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.date || !form.venue) { alert("Please fill Name, Date and Venue!"); return; }
    if (editingEvent) {
      setEvents(es => es.map(e => e.id === editingEvent.id ? { ...editingEvent, ...form } : e));
    } else {
      setEvents(es => [{ id: Date.now(), ...form }, ...es]);
    }
    setShowForm(false); setEditingEvent(null);
  };

  const handleDelete = (id: number) => { setEvents(es => es.filter(e => e.id !== id)); setDeleteConfirm(null); };

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

            {/* Form */}
            {showForm && (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", marginBottom: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", color: "#1E3A5F", letterSpacing: "0.04em" }}>
                    {editingEvent ? "Edit Event" : "Add New Event"}
                  </h3>
                  <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  {[
                    { label: "Event Name *", name: "name",         ph: "Event name" },
                    { label: "Date *",       name: "date",         ph: "e.g. Jan 15, 2026" },
                    { label: "Venue *",      name: "venue",        ph: "e.g. Pune, Maharashtra" },
                    { label: "Participants", name: "participants", ph: "e.g. 400+" },
                    { label: "Colleges",     name: "colleges",     ph: "e.g. 25+" },
                  ].map(({ label, name, ph }) => (
                    <div key={name}>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>{label}</label>
                      <input name={name} value={(form as any)[name]} onChange={handleChange} placeholder={ph} style={inp} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Event Type</label>
                    <select name="type" value={form.type} onChange={handleChange} style={inp}>
                      {eventTypes.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1E3A5F", marginBottom: "6px", display: "block" }}>Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Event description" rows={3} style={{ ...inp, resize: "none" }} />
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={handleSave} style={{ background: "#1E3A5F", color: "#fff", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 700 }}>
                    {editingEvent ? "Update Event" : "Save Event"}
                  </button>
                  <button onClick={() => setShowForm(false)} style={{ background: "#f1f5f9", color: "#6B7280", padding: "10px 28px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600 }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Events list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {events.map(item => (
                <div key={item.id} style={{ background: "#fff", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", borderLeft: "4px solid #1E3A5F" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ background: "#EFF6FF", color: "#1E3A5F", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", textTransform: "uppercase" }}>{item.type}</span>
                      <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{item.date}</span>
                    </div>
                    <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", color: "#1E3A5F", letterSpacing: "0.03em", marginBottom: "4px" }}>{item.name}</div>
                    <div style={{ fontSize: "13px", color: "#6B7280" }}>{item.venue} • {item.participants} Participants • {item.colleges} Colleges</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginLeft: "16px", flexShrink: 0 }}>
                    <button onClick={() => openEdit(item)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f1f5f9", color: "#1E3A5F", padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                      <Edit2 size={14} /> Edit
                    </button>
                    {deleteConfirm === item.id ? (
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={() => handleDelete(item.id)} style={{ background: "#dc2626", color: "#fff", padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>Confirm</button>
                        <button onClick={() => setDeleteConfirm(null)} style={{ background: "#f1f5f9", color: "#6B7280", padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(item.id)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fef2f2", color: "#dc2626", padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}