"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, X, Trash2, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";

interface Service {
  id: string; title: string; subtitle: string; price: string;
  price_note: string; features: string[]; is_popular: boolean; is_active: boolean; sort_order: number;
}

type ServiceField = keyof Pick<Service, "title" | "subtitle" | "price" | "price_note">;

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.from("services").select("*").order("sort_order")
      .then(async ({ data }) => {
        if (data) {
          const seen = new Map<string, string>();
          const dupes: string[] = [];
          for (const s of data) {
            const key = s.title.toLowerCase();
            if (seen.has(key)) {
              dupes.push(s.id);
            } else {
              seen.set(key, s.id);
            }
          }
          if (dupes.length > 0) {
            await supabase.from("services").delete().in("id", dupes);
          }
          const unique = data.filter((s: Service) => !dupes.includes(s.id));
          setServices(unique);
        }
        setIsLoading(false);
      });
  }, []);

  const save = async () => {
    if (!editing) return;
    const newErrors: Record<string, string> = {};
    if (!editing.title.trim()) newErrors.title = "Title is required";
    if (!editing.price.trim()) newErrors.price = "Price is required";
    if (!editing.subtitle.trim()) newErrors.subtitle = "Subtitle is required";
    if (isAdding && services.some(s => s.title.toLowerCase() === editing.title.trim().toLowerCase())) {
      newErrors.title = "A service with this title already exists";
    }
    if (Object.keys(newErrors).length > 0) {
      setEditErrors(newErrors);
      return;
    }
    setEditErrors({});
    setSaving(true);
    if (isAdding) {
      const { data, error } = await supabase.from("services").insert({ ...editing, sort_order: services.length, created_at: new Date().toISOString() }).select().single();
      if (!error && data) {
        setServices(prev => [...prev, data]);
        setMsg("Service added!"); setTimeout(() => setMsg(""), 2000);
        setEditing(null);
        setIsAdding(false);
      }
    } else {
      const { error } = await supabase.from("services").update({ ...editing, updated_at: new Date().toISOString() }).eq("id", editing.id);
      if (!error) {
        setServices(prev => prev.map(s => s.id === editing.id ? editing : s));
        setMsg("Saved!"); setTimeout(() => setMsg(""), 2000);
        setEditing(null);
      }
    }
    setSaving(false);
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (!error) { setServices(prev => prev.filter(s => s.id !== id)); setEditing(null); }
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from("services").update({ is_active: !active }).eq("id", id);
    setServices(prev => prev.map(s => s.id === id ? { ...s, is_active: !active } : s));
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditing({ id: "", title: "", subtitle: "", price: "", price_note: "", features: [], is_popular: false, is_active: true, sort_order: services.length });
  };

  const cancelEdit = () => { setEditing(null); setIsAdding(false); setEditErrors({}); };

  if (isLoading) {
    return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ height: 28, width: 160, borderRadius: 6, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: 8 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ background: "#FFFFFF", borderRadius: 14, padding: 22, border: "1px solid #E5EAF2" }}>
              <div style={{ height: 16, width: 140, borderRadius: 4, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: 8 }} />
              <div style={{ height: 12, width: 100, borderRadius: 4, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        .service-card { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .service-card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06); }
        .service-panel { animation: slideInRight 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .service-input { transition: all 0.2s ease; }
        .service-input:hover { border-color: #CBD5E1 !important; }
      `}</style>

      <PageHeader
        title="Services"
        description="Manage your service offerings."
        action={
          <button onClick={startAdd} className="admin-btn" style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", fontSize: 13, fontWeight: 600, color: "#FFF",
            backgroundColor: "#4A78F6", border: "none", borderRadius: 10, cursor: "pointer",
            boxShadow: "0 2px 8px rgba(74, 120, 246, 0.25)",
          }}>
            <Plus size={16} /> Add Service
          </button>
        }
      />

      {msg && (
        <div className="admin-toast" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, fontWeight: 500, color: "#059669", backgroundColor: "#D1FAE5", borderRadius: 10, border: "1px solid #A7F3D0" }}>
          <CheckCircle2 size={16} /> {msg}
        </div>
      )}

      <div className={editing ? "grid grid-cols-1 lg:grid-cols-[1fr_380px]" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"} style={{ gap: 16 }}>
        {services.map((s, i) => (
          <div key={s.id} onClick={() => { setEditing(s); setIsAdding(false); }} className="service-card" style={{
            background: "#FFFFFF", borderRadius: 14, padding: 22, cursor: "pointer",
            border: editing?.id === s.id ? "2px solid #4A78F6" : "1px solid #E5EAF2",
            opacity: s.is_active ? 1 : 0.5,
            animation: `fadeInUp 0.3s ease ${i * 0.05}s both`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>{s.title}</h3>
                  {s.is_popular && <span style={{ fontSize: 9, fontWeight: 600, color: "#4A78F6", backgroundColor: "#EFF6FF", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase" }}>Popular</span>}
                </div>
                <p style={{ fontSize: 12, color: "#64748B", margin: "4px 0 0" }}>{s.subtitle}</p>
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>{s.price}</span>
              <p style={{ fontSize: 11, color: "#94A3B8", margin: "2px 0 0" }}>{s.price_note}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#94A3B8" }}>{s.features?.length || 0} features</span>
              <button onClick={(e) => { e.stopPropagation(); toggleActive(s.id, s.is_active); }}
                className="admin-btn"
                style={{ padding: "3px 8px", fontSize: 10, fontWeight: 600, color: s.is_active ? "#059669" : "#DC2626", backgroundColor: s.is_active ? "#D1FAE5" : "#FEE2E2", border: "none", borderRadius: 4, cursor: "pointer" }}>
                {s.is_active ? "Active" : "Inactive"}
              </button>
            </div>
          </div>
        ))}

        {editing && (
          <div className="service-panel" style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #E5EAF2", overflow: "hidden" }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>{isAdding ? "Add Service" : "Edit Service"}</h3>
              <button onClick={cancelEdit} className="admin-btn" style={{ background: "#F8FAFC", border: "1px solid #E5EAF2", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ padding: 22 }}>
              {[["Title", "title"], ["Subtitle", "subtitle"], ["Price", "price"], ["Price Note", "price_note"]].map(([label, key]) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>{label} {(key === "title" || key === "price" || key === "subtitle") ? "*" : ""}</label>
                  <input type="text" value={(editing[key as ServiceField]) || ""}
                    onChange={e => { setEditing({ ...editing!, [key]: e.target.value }); if (editErrors[key]) setEditErrors(prev => { const n = { ...prev }; delete n[key]; return n; }); }}
                    className="service-input"
                    style={{ width: "100%", padding: "10px 12px", fontSize: 13, color: "#111827",
                      backgroundColor: editErrors[key] ? "#FEF2F2" : "#F8FAFC",
                      border: editErrors[key] ? "2px solid #DC2626" : "1px solid #E5EAF2",
                      borderRadius: 8, outline: "none", boxSizing: "border-box" }} />
                  {editErrors[key] && <p style={{ fontSize: 11, color: "#DC2626", marginTop: 4 }}>{editErrors[key]}</p>}
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Features (one per line)</label>
                <textarea value={editing.features?.join("\n") || ""} rows={5}
                  onChange={e => setEditing({ ...editing!, features: e.target.value.split("\n").filter(f => f.trim()) })}
                  className="service-input"
                  style={{ width: "100%", padding: "10px 12px", fontSize: 13, color: "#111827", backgroundColor: "#F8FAFC", border: "1px solid #E5EAF2", borderRadius: 8, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 20 }}>
                <input type="checkbox" checked={editing.is_popular} onChange={e => setEditing({ ...editing!, is_popular: e.target.checked })} style={{ width: 16, height: 16, accentColor: "#4A78F6" }} />
                <span style={{ fontSize: 13, color: "#374151" }}>Most Popular</span>
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={save} disabled={saving} className="admin-btn" style={{ flex: 1, padding: "10px", fontSize: 13, fontWeight: 600, color: "#FFF", backgroundColor: saving ? "#93C5FD" : "#4A78F6", border: "none", borderRadius: 8, cursor: saving ? "not-allowed" : "pointer" }}>
                  {saving ? "Saving..." : isAdding ? "Add Service" : "Save"}
                </button>
                <button onClick={cancelEdit} className="admin-btn" style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500, color: "#64748B", backgroundColor: "#F8FAFC", border: "1px solid #E5EAF2", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
              </div>
              {!isAdding && (
                <button onClick={() => deleteService(editing.id)} className="admin-btn" style={{ width: "100%", padding: "10px", fontSize: 13, fontWeight: 500, color: "#DC2626", backgroundColor: "#FEE2E2", border: "none", borderRadius: 8, cursor: "pointer", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Trash2 size={14} /> Delete Service
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
