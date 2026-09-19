"use client";

import { useState } from "react";
import Link from "next/link";
import SafetyBanner from "@/components/SafetyBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FreeCallPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", preferred_time: "", concern: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,5}[-\s\.]?[0-9]{3,5}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone: form.phone || null,
          service_type: "discovery",
          format: "online",
          preferred_time: form.preferred_time || null,
          notes: form.concern || null,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <SafetyBanner />
      <Navbar />

      <div className="mx-auto px-6 py-16 lg:px-12 lg:py-20" style={{ maxWidth: "700px" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px",
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-heading" style={{ fontSize: "28px", fontWeight: 700, color: "#1A1A2E", marginBottom: "12px" }}>
              Request Received!
            </h1>
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.7, marginBottom: "32px" }}>
              Thank you for reaching out. Neha will contact you within 24 hours to confirm your free 15-minute discovery call.
            </p>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "12px 28px", fontSize: "14px", fontWeight: 600,
              color: "#3B5BDB", border: "2px solid #3B5BDB", borderRadius: "9999px", textDecoration: "none",
            }}>
              ← Back to Home
            </Link>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{
                display: "inline-block", fontSize: "12px", fontWeight: 600, color: "#3B5BDB",
                backgroundColor: "#EEF2FF", padding: "6px 16px", borderRadius: "9999px",
                letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "16px",
              }}>
                Free Discovery Call
              </div>
              <h1 className="font-heading" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, color: "#1A1A2E", lineHeight: 1.2, marginBottom: "12px" }}>
                15-Minute Free Consultation
              </h1>
              <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto" }}>
                Not sure if therapy is right for you? Book a complimentary 15-minute call to discuss your needs and see if we are a good fit.
              </p>
            </div>

            <div style={{
              backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "36px 32px",
              border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
            }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Full Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors(prev => { const n = { ...prev }; delete n.name; return n; }); }}
                      placeholder="Your name"
                      style={{
                        width: "100%", padding: "10px 14px", fontSize: "14px", color: "#1A1A2E",
                        backgroundColor: errors.name ? "#FEF2F2" : "#F9FAFB",
                        border: errors.name ? "2px solid #DC2626" : "1px solid #E5E7EB", borderRadius: "10px",
                        outline: "none", boxSizing: "border-box",
                      }}
                    />
                    {errors.name && <p style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors(prev => { const n = { ...prev }; delete n.email; return n; }); }}
                      placeholder="your@email.com"
                      style={{
                        width: "100%", padding: "10px 14px", fontSize: "14px", color: "#1A1A2E",
                        backgroundColor: errors.email ? "#FEF2F2" : "#F9FAFB",
                        border: errors.email ? "2px solid #DC2626" : "1px solid #E5E7EB", borderRadius: "10px",
                        outline: "none", boxSizing: "border-box",
                      }}
                    />
                    {errors.email && <p style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>{errors.email}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: e.target.value }); if (errors.phone) setErrors(prev => { const n = { ...prev }; delete n.phone; return n; }); }}
                    placeholder="+91 XXXXX XXXXX"
                    style={{
                      width: "100%", padding: "10px 14px", fontSize: "14px", color: "#1A1A2E",
                      backgroundColor: errors.phone ? "#FEF2F2" : "#F9FAFB",
                      border: errors.phone ? "2px solid #DC2626" : "1px solid #E5E7EB", borderRadius: "10px",
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                  {errors.phone && <p style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>{errors.phone}</p>}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Preferred Time</label>
                  <select
                    value={form.preferred_time}
                    onChange={(e) => setForm({ ...form, preferred_time: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px", fontSize: "14px", color: "#1A1A2E",
                      backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "10px",
                      outline: "none", boxSizing: "border-box",
                    }}
                  >
                    <option value="">Select a time slot</option>
                    <option value="10:00 AM">Morning (9 AM - 12 PM)</option>
                    <option value="1:00 PM">Afternoon (12 PM - 3 PM)</option>
                    <option value="4:00 PM">Evening (3 PM - 5 PM)</option>
                  </select>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Briefly describe what brings you here</label>
                  <textarea
                    value={form.concern}
                    onChange={(e) => setForm({ ...form, concern: e.target.value })}
                    rows={3}
                    placeholder="Optional — share as much or as little as you'd like"
                    style={{
                      width: "100%", padding: "10px 14px", fontSize: "14px", color: "#1A1A2E",
                      backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "10px",
                      outline: "none", resize: "vertical", boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "14px 24px" }}
                >
                  {loading ? "Submitting..." : "Request Free Call"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
