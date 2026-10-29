"use client";

import { useEffect, useState } from "react";
import { Check, EyeOff, Pencil, Trash2, Plus, X, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import PageHeader from "@/components/admin/PageHeader";
import type { Testimonial } from "@/lib/site-data";

type Filter = "pending" | "published" | "all";
type Draft = { id: string; client_name: string; content: string; rating: number; is_visible: boolean };

export default function FeedbackAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("pending");
  const [editing, setEditing] = useState<Draft | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.from("testimonials").select("*").order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        setItems(data || []);
        // Open on "All" if nothing is waiting for review
        if (!(data || []).some((i: Testimonial) => !i.is_visible)) setFilter("all");
        setLoading(false);
      });
  }, []);

  const setVisible = async (id: string, is_visible: boolean) => {
    const { error } = await supabase.from("testimonials").update({ is_visible }).eq("id", id);
    if (error) return setError(error.message);
    setItems((p) => p.map((i) => (i.id === id ? { ...i, is_visible } : i)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this feedback permanently?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return setError(error.message);
    setItems((p) => p.filter((i) => i.id !== id));
  };

  const saveEdit = async () => {
    if (!editing) return;
    if (!editing.client_name.trim() || !editing.content.trim()) return setError("Name and feedback are required.");
    setError("");
    const row = {
      client_name: editing.client_name.trim(),
      content: editing.content.trim(),
      rating: editing.rating,
      is_visible: editing.is_visible,
    };
    if (editing.id) {
      const { error } = await supabase.from("testimonials").update(row).eq("id", editing.id);
      if (error) return setError(error.message);
      setItems((p) => p.map((i) => (i.id === editing.id ? { ...i, ...row } : i)));
    } else {
      const { data, error } = await supabase.from("testimonials").insert(row).select().single();
      if (error) return setError(error.message);
      setItems((p) => [data, ...p]);
    }
    setEditing(null);
  };

  const pendingCount = items.filter((i) => !i.is_visible).length;
  const shown = items.filter((i) => (filter === "all" ? true : filter === "pending" ? !i.is_visible : i.is_visible));

  const btn = (bg: string, color: string): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", fontSize: 12, fontWeight: 600,
    color, backgroundColor: bg, border: "none", borderRadius: 8, cursor: "pointer",
  });
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", fontSize: 13, color: "#111827", backgroundColor: "#F8FAFC",
    border: "1px solid #E5EAF2", borderRadius: 8, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  };

  return (
    <div>
      <PageHeader
        title="Client Feedback"
        description="Approve feedback to show it on the website, edit wording, or add feedback yourself."
        action={
          <button onClick={() => setEditing({ id: "", client_name: "", content: "", rating: 5, is_visible: true })} className="admin-btn" style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", fontSize: 13, fontWeight: 600, color: "#FFF",
            background: "linear-gradient(135deg, #4A78F6, #6366F1)", border: "none", borderRadius: 10, cursor: "pointer",
          }}>
            <Plus size={14} /> Add Feedback
          </button>
        }
      />

      {error && (
        <div style={{ padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#DC2626", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10 }}>
          {error}
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {([["pending", `Awaiting review (${pendingCount})`], ["published", `Published (${items.length - pendingCount})`], ["all", `All (${items.length})`]] as const).map(([k, label]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: "8px 14px", fontSize: 13, fontWeight: filter === k ? 600 : 500, borderRadius: 999, cursor: "pointer",
            color: filter === k ? "#4A78F6" : "#64748B", backgroundColor: filter === k ? "#EFF6FF" : "#FFF",
            border: `1px solid ${filter === k ? "#BFDBFE" : "#E5EAF2"}`,
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Editor */}
      {editing && (
        <div style={{ background: "#FFF", borderRadius: 14, border: "1px solid #BFDBFE", padding: 20, marginBottom: 16, boxShadow: "0 4px 16px rgba(74,120,246,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>{editing.id ? "Edit feedback" : "Add feedback"}</h2>
            <button onClick={() => setEditing(null)} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><X size={18} /></button>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Client name</label>
              <input className="admin-input" value={editing.client_name} onChange={(e) => setEditing({ ...editing, client_name: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Feedback</label>
              <textarea className="admin-input" rows={4} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginRight: 6 }}>Rating</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setEditing({ ...editing, rating: n })} aria-label={`${n} stars`} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", lineHeight: 0 }}>
                    <Star size={18} color="#F59E0B" fill={n <= editing.rating ? "#F59E0B" : "none"} />
                  </button>
                ))}
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151", cursor: "pointer" }}>
                <input type="checkbox" checked={editing.is_visible} onChange={(e) => setEditing({ ...editing, is_visible: e.target.checked })} />
                Show on website
              </label>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={saveEdit} style={btn("#4A78F6", "#FFF")}><Check size={14} /> Save</button>
              <button onClick={() => setEditing(null)} style={btn("#F1F5F9", "#475569")}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p style={{ textAlign: "center", color: "#94A3B8", fontSize: 14, padding: 40 }}>Loading feedback…</p>
      ) : shown.length === 0 ? (
        <div style={{ textAlign: "center", color: "#94A3B8", fontSize: 14, padding: 40, background: "#FFF", borderRadius: 14, border: "1px dashed #E5EAF2" }}>
          {filter === "pending" ? "No new feedback waiting for review." : "No feedback yet."}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {shown.map((t) => (
            <div key={t.id} style={{ background: "#FFF", borderRadius: 14, border: "1px solid #E5EAF2", padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{t.client_name}</span>
                    <span style={{ display: "inline-flex", gap: 1 }}>
                      {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={13} color="#F59E0B" fill={n <= (t.rating || 5) ? "#F59E0B" : "none"} />)}
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999,
                      color: t.is_visible ? "#059669" : "#B45309", background: t.is_visible ? "#D1FAE5" : "#FEF3C7",
                    }}>
                      {t.is_visible ? "Published" : "Awaiting review"}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: "#94A3B8" }}>
                    {new Date(t.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {t.is_visible ? (
                    <button onClick={() => setVisible(t.id, false)} style={btn("#F1F5F9", "#475569")}><EyeOff size={13} /> Hide</button>
                  ) : (
                    <button onClick={() => setVisible(t.id, true)} style={btn("#D1FAE5", "#047857")}><Check size={13} /> Approve</button>
                  )}
                  <button onClick={() => setEditing({ id: t.id, client_name: t.client_name, content: t.content, rating: t.rating || 5, is_visible: t.is_visible })} style={btn("#EFF6FF", "#4A78F6")}><Pencil size={13} /> Edit</button>
                  <button onClick={() => remove(t.id)} style={btn("#FEF2F2", "#DC2626")}><Trash2 size={13} /> Delete</button>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>{t.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
