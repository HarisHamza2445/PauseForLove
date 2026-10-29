"use client";

import { useState } from "react";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";
import type { Testimonial } from "@/lib/site-data";

function Stars({ value, onChange, size = 18 }: { value: number; onChange?: (v: number) => void; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 4 }} role={onChange ? "radiogroup" : undefined} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <svg width={size} height={size} viewBox="0 0 24 24" fill={n <= value ? "#F59E0B" : "none"} stroke={n <= value ? "#F59E0B" : "#CBD5E1"} strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
        return onChange ? (
          <button key={n} type="button" role="radio" aria-checked={n === value} aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => onChange(n)} style={{ background: "none", border: "none", padding: 2, cursor: "pointer", lineHeight: 0 }}>
            {star}
          </button>
        ) : (
          <span key={n} style={{ lineHeight: 0 }}>{star}</span>
        );
      })}
    </div>
  );
}

export default function FeedbackSection({
  c = DEFAULT_CONTENT,
  testimonials = [],
}: {
  c?: SiteContent;
  testimonials?: Testimonial[];
}) {
  const [form, setForm] = useState({ client_name: "", content: "", rating: 5 });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.client_name.trim()) return setError("Please enter your name or initials.");
    if (form.content.trim().length < 10) return setError("Please write a few words about your experience.");
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("done");
      setForm({ client_name: "", content: "", rating: 5 });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("idle");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", fontSize: "14px", color: "#1A1A2E",
    backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "10px",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  };

  return (
    <section style={{ backgroundColor: "#E0F2FE" }}>
      <div className="mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24" style={{ maxWidth: "1200px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vw, 56px)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", backgroundColor: "#EEF2FF", color: "#3B5BDB",
            fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", padding: "8px 16px",
            borderRadius: "9999px", marginBottom: "24px", textTransform: "uppercase",
          }}>
            {c["feedback.badge"]}
          </div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
            lineHeight: 1.15, color: "#1A1A2E", marginBottom: "20px", letterSpacing: "-0.01em",
          }}>
            {c["feedback.heading"]}
          </h2>
          <p style={{ fontSize: "17px", color: "#4B5563", lineHeight: 1.75, maxWidth: "640px", margin: "0 auto" }}>
            {c["feedback.description"]}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5" style={{ gap: "28px", alignItems: "start" }}>
          {/* Testimonials */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2" style={{ gap: "20px" }}>
            {testimonials.length === 0 && (
              <div className="sm:col-span-2" style={{
                padding: "40px 24px", textAlign: "center", color: "#6B7280", fontSize: "15px",
                backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px dashed #CBD5E1",
              }}>
                {c["feedback.empty"]}
              </div>
            )}
            {testimonials.map((t) => (
              <figure key={t.id} style={{
                margin: 0, padding: "24px", backgroundColor: "#FFFFFF", borderRadius: "16px",
                border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                display: "flex", flexDirection: "column", gap: "14px",
              }}>
                <Stars value={t.rating || 5} size={16} />
                <blockquote style={{ margin: 0, fontSize: "14px", color: "#374151", lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-line" }}>
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%", backgroundColor: "#EEF2FF", color: "#3B5BDB",
                    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0,
                  }}>
                    {t.client_name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A2E" }}>{t.client_name}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2" style={{
            backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #E5E7EB",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)", padding: "clamp(20px, 4vw, 32px)",
          }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1A1A2E", marginBottom: "8px" }}>
              {c["feedback.form_heading"]}
            </h3>
            <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.6, marginBottom: "20px" }}>
              {c["feedback.form_note"]}
            </p>

            {status === "done" ? (
              <div style={{ padding: "16px", backgroundColor: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: "10px", color: "#065F46", fontSize: "14px", lineHeight: 1.6 }}>
                {c["feedback.thanks"]}
                <button type="button" onClick={() => setStatus("idle")} style={{
                  display: "block", marginTop: 10, background: "none", border: "none", padding: 0,
                  color: "#3B5BDB", fontWeight: 600, fontSize: 13, cursor: "pointer",
                }}>
                  Write another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Your rating</label>
                  <Stars value={form.rating} onChange={(rating) => setForm({ ...form, rating })} size={24} />
                </div>
                <div>
                  <label htmlFor="fb-name" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Name or initials</label>
                  <input id="fb-name" type="text" maxLength={80} value={form.client_name}
                    onChange={(e) => setForm({ ...form, client_name: e.target.value })} placeholder="e.g. Priya S." style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="fb-msg" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Your feedback</label>
                  <textarea id="fb-msg" rows={5} maxLength={2000} value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="How has therapy helped you?" style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                {error && <p style={{ fontSize: "13px", color: "#DC2626", margin: 0 }}>{error}</p>}
                <button type="submit" disabled={status === "sending"} style={{
                  padding: "14px 24px", fontSize: "14px", fontWeight: 600, color: "#FFFFFF",
                  backgroundColor: status === "sending" ? "#93A9EE" : "#3B5BDB", border: "none", borderRadius: "9999px",
                  cursor: status === "sending" ? "not-allowed" : "pointer", boxShadow: "0 4px 12px rgba(59, 91, 219, 0.25)",
                }}>
                  {status === "sending" ? "Sending..." : c["feedback.submit"]}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
