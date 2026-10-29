"use client";

import { useEffect, useMemo, useState } from "react";
import { Save, ChevronDown, RotateCcw, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import PageHeader from "@/components/admin/PageHeader";
import SearchBar from "@/components/admin/SearchBar";
import { CONTENT_SCHEMA, DEFAULT_CONTENT, SITE_CONTENT_KEY, parseContent, type SiteContent } from "@/lib/content";

export default function ContentPage() {
  const [values, setValues] = useState<SiteContent>({ ...DEFAULT_CONTENT });
  const [saved, setSaved] = useState<SiteContent>({ ...DEFAULT_CONTENT });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [open, setOpen] = useState<string | null>(CONTENT_SCHEMA[0].id);
  const [query, setQuery] = useState("");

  useEffect(() => {
    supabase.from("settings").select("setting_value").eq("setting_key", SITE_CONTENT_KEY).maybeSingle()
      .then(({ data }) => {
        const c = parseContent(data?.setting_value);
        setValues(c);
        setSaved(c);
        setLoading(false);
      });
  }, []);

  const dirty = useMemo(() => Object.keys(values).some((k) => values[k] !== saved[k]), [values, saved]);

  // Warn before leaving with unsaved edits
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const save = async () => {
    setSaving(true);
    setMsg(null);
    // Only store values that differ from the defaults
    const changed: SiteContent = {};
    for (const [k, v] of Object.entries(values)) if (v !== DEFAULT_CONTENT[k]) changed[k] = v;
    const { error } = await supabase.from("settings").upsert(
      { setting_key: SITE_CONTENT_KEY, setting_value: JSON.stringify(changed), category: "content", updated_at: new Date().toISOString() },
      { onConflict: "setting_key" }
    );
    setSaving(false);
    if (error) {
      setMsg({ ok: false, text: `Could not save: ${error.message}` });
    } else {
      setSaved({ ...values });
      setMsg({ ok: true, text: "Saved! Changes are live on the website." });
      setTimeout(() => setMsg(null), 3000);
    }
  };

  const q = query.trim().toLowerCase();
  const sections = CONTENT_SCHEMA.map((s) => ({
    ...s,
    fields: q
      ? s.fields.filter((f) => f.label.toLowerCase().includes(q) || (values[f.key] || "").toLowerCase().includes(q) || s.title.toLowerCase().includes(q))
      : s.fields,
  })).filter((s) => s.fields.length > 0);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", fontSize: 13, color: "#111827",
    backgroundColor: "#F8FAFC", border: "1px solid #E5EAF2", borderRadius: 8,
    outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.5,
  };

  if (loading) {
    return <div style={{ padding: 40, textAlign: "center", color: "#94A3B8", fontSize: 14 }}>Loading content…</div>;
  }

  return (
    <div>
      <PageHeader
        title="Website Content"
        description="Edit every heading, paragraph and button on the website. Click Save to publish."
        action={
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <a href="/" target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", fontSize: 13, fontWeight: 500,
              color: "#475569", background: "#FFF", border: "1px solid #E5EAF2", borderRadius: 10, textDecoration: "none",
            }}>
              <ExternalLink size={14} /> View site
            </a>
            <button onClick={save} disabled={saving || !dirty} className="admin-btn" style={{
              display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", fontSize: 13, fontWeight: 600, color: "#FFF",
              background: saving || !dirty ? "#93C5FD" : "linear-gradient(135deg, #4A78F6, #6366F1)", border: "none", borderRadius: 10,
              cursor: saving || !dirty ? "not-allowed" : "pointer",
            }}>
              <Save size={14} /> {saving ? "Saving..." : dirty ? "Save Changes" : "Saved"}
            </button>
          </div>
        }
      />

      {msg && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, fontWeight: 500,
          color: msg.ok ? "#059669" : "#DC2626", backgroundColor: msg.ok ? "#D1FAE5" : "#FEF2F2",
          borderRadius: 10, border: `1px solid ${msg.ok ? "#A7F3D0" : "#FECACA"}`,
        }}>
          {msg.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />} {msg.text}
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <SearchBar value={query} onChange={setQuery} placeholder="Search any text on the site…" />
      </div>

      {sections.map((s) => {
        const isOpen = q !== "" || open === s.id;
        const changedCount = s.fields.filter((f) => values[f.key] !== saved[f.key]).length;
        return (
          <div key={s.id} style={{ background: "#FFF", borderRadius: 14, border: "1px solid #E5EAF2", marginBottom: 12, overflow: "hidden" }}>
            <button onClick={() => setOpen(isOpen && q === "" ? null : s.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "16px 20px",
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>{s.title}</h2>
                  {changedCount > 0 && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#B45309", background: "#FEF3C7", padding: "2px 8px", borderRadius: 999 }}>
                      {changedCount} unsaved
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 12, color: "#64748B", margin: "2px 0 0" }}>{s.description}</p>
              </div>
              <ChevronDown size={18} color="#94A3B8" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>

            {isOpen && (
              <div style={{ padding: "4px 20px 20px", borderTop: "1px solid #F1F5F9", display: "grid", gap: 16, paddingTop: 16 }}>
                {s.fields.map((f) => {
                  const isDefault = values[f.key] === DEFAULT_CONTENT[f.key];
                  const multiline = f.type === "textarea" || f.type === "list";
                  return (
                    <div key={f.key}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, gap: 8 }}>
                        <label htmlFor={f.key} style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
                          {f.label}
                          {f.type === "list" && <span style={{ color: "#94A3B8", fontWeight: 400 }}> — one per line</span>}
                        </label>
                        {!isDefault && (
                          <button type="button" onClick={() => setValues((v) => ({ ...v, [f.key]: DEFAULT_CONTENT[f.key] }))}
                            title="Restore original text" style={{
                              display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#64748B",
                              background: "none", border: "none", cursor: "pointer", padding: 0,
                            }}>
                            <RotateCcw size={12} /> Reset
                          </button>
                        )}
                      </div>
                      {multiline ? (
                        <textarea id={f.key} className="admin-input" value={values[f.key]}
                          rows={f.type === "list" ? Math.min(10, Math.max(3, values[f.key].split("\n").length + 1)) : 3}
                          onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                          style={{ ...inputStyle, resize: "vertical" }} />
                      ) : (
                        <input id={f.key} type="text" className="admin-input" value={values[f.key]}
                          onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} style={inputStyle} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      {sections.length === 0 && (
        <p style={{ textAlign: "center", color: "#94A3B8", fontSize: 14, padding: 24 }}>No text matches “{query}”.</p>
      )}
    </div>
  );
}
