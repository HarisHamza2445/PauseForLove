"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { X, Trash2, Phone, MessageCircle } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import SearchBar from "@/components/admin/SearchBar";
import StatusBadge from "@/components/admin/StatusBadge";

interface Booking {
  id: string; full_name: string; email: string; phone: string;
  service_type: string; format: string; preferred_date: string;
  preferred_time: string; status: string; notes: string; created_at: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase.from("bookings")
      .select("id, full_name, email, phone, service_type, format, preferred_date, preferred_time, status, notes, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (!cancelled) { if (data) setBookings(data); setIsLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  const updateStatus = useCallback(async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (!error) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      if (selected?.id === id) setSelected({ ...selected, status });
      try {
        await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: status, booking: selected }),
        });
      } catch (e) { console.error("Notification failed:", e); }
    }
  }, [selected]);

  const deleteBooking = useCallback(async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (!error) { setBookings(prev => prev.filter(b => b.id !== id)); setSelected(null); }
  }, []);

  const filtered = useMemo(() => {
    let result = filter === "all" ? bookings : bookings.filter(b => b.status === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b => b.full_name.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.service_type.toLowerCase().includes(q));
    }
    return result;
  }, [bookings, filter, search]);

  const counts = useMemo(() => ({
    all: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  }), [bookings]);

  if (isLoading) {
    return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ height: 28, width: 160, borderRadius: 6, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: 8 }} />
          <div style={{ height: 14, width: 240, borderRadius: 6, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #E5EAF2", overflow: "hidden" }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "14px 22px", borderBottom: "1px solid #F8FAFC" }}>
              <div style={{ flex: 1, height: 14, borderRadius: 4, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
              <div style={{ width: 100, height: 14, borderRadius: 4, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
              <div style={{ width: 80, height: 14, borderRadius: 4, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Bookings" description="Manage client appointment requests." />

      <style>{`
        .booking-filter-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .booking-filter-btn:hover:not(.active) {
          background-color: #F1F5F9 !important;
          border-color: #CBD5E1 !important;
        }
        .booking-filter-btn.active {
          box-shadow: 0 2px 8px rgba(74, 120, 246, 0.25);
        }
        .booking-action-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .booking-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .booking-action-btn:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>

      {/* Filters */}
      <div className="admin-stagger-1" style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 200, maxWidth: 320 }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, service..." />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["all", "pending", "confirmed", "cancelled"] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`booking-filter-btn ${filter === s ? "active" : ""}`}
              style={{
                display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", fontSize: 12, fontWeight: 500,
                color: filter === s ? "#FFFFFF" : "#64748B",
                backgroundColor: filter === s ? "#4A78F6" : "#FFFFFF",
                border: `1px solid ${filter === s ? "#4A78F6" : "#E5EAF2"}`,
                borderRadius: 8, cursor: "pointer", textTransform: "capitalize", whiteSpace: "nowrap",
              }}
            >
              {s}
              <span style={{ padding: "1px 6px", fontSize: 10, fontWeight: 600, borderRadius: 4, backgroundColor: filter === s ? "rgba(255,255,255,0.2)" : "#F1F5F9", transition: "background-color 0.2s" }}>{counts[s]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="admin-stagger-2" style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #E5EAF2", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "60px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#94A3B8" }}>No bookings found</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  {["Client", "Service", "Price", "Date", "Time", "Status"].map(h => (
                    <th key={h} style={{ padding: "12px 22px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b.id} onClick={() => setSelected(b)} className="admin-row" style={{
                    borderBottom: "1px solid #F8FAFC", cursor: "pointer",
                    backgroundColor: selected?.id === b.id ? "#EFF6FF" : "transparent",
                    animation: `fadeInUp 0.2s ease ${i * 0.03}s both`,
                  }}>
                    <td style={{ padding: "14px 22px" }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{b.full_name}</div>
                      <div style={{ fontSize: 12, color: "#94A3B8" }}>{b.email}</div>
                    </td>
                    <td style={{ padding: "14px 22px", fontSize: 13, color: "#64748B", textTransform: "capitalize" }}>{b.service_type}</td>
                    <td style={{ padding: "14px 22px", fontSize: 13, fontWeight: 600, color: b.service_type === "discovery" ? "#059669" : "#111827" }}>{b.service_type === "discovery" ? "FREE" : b.service_type === "couple" ? "₹3,200" : "₹2,200"}</td>
                    <td style={{ padding: "14px 22px", fontSize: 13, color: "#64748B" }}>{b.preferred_date || "—"}</td>
                    <td style={{ padding: "14px 22px", fontSize: 13, color: "#64748B" }}>{b.preferred_time ? b.preferred_time.substring(0, 5) : "—"}</td>
                    <td style={{ padding: "14px 22px" }}><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selected && (
        <>
          <div onClick={() => setSelected(null)} style={{
            position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.2)",
            backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)",
            zIndex: 55, animation: "fadeIn 0.2s ease",
          }} />
          <div className="admin-panel-slide" style={{
            position: "fixed", top: 0, right: 0, width: "100%", maxWidth: 400, height: "100vh",
            background: "#FFFFFF", borderLeft: "1px solid #E5EAF2",
            zIndex: 60, display: "flex", flexDirection: "column",
            boxShadow: "-8px 0 30px rgba(0,0,0,0.1)",
          }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: 0 }}>Booking Details</h3>
              <button onClick={() => setSelected(null)} className="admin-btn" style={{ background: "#F8FAFC", border: "1px solid #E5EAF2", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
              {/* Client */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #4A78F6, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#FFF", fontWeight: 600, fontSize: 16 }}>{selected.full_name.charAt(0)}</span>
                </div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>{selected.full_name}</h4>
                  <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>{selected.email}</p>
                </div>
              </div>

              {/* Details */}
              <div style={{ marginBottom: 20 }}>
                {[
                  ["Service", selected.service_type === "discovery" ? "Discovery Call" : selected.service_type === "individual" ? "Individual Therapy" : selected.service_type === "couple" ? "Couple & Family" : selected.service_type],
                  ["Amount", selected.service_type === "discovery" ? "FREE" : selected.service_type === "couple" ? "₹3,200" : "₹2,200"],
                  ["Format", selected.format],
                  ["Date", selected.preferred_date || "—"],
                  ["Time", selected.preferred_time ? selected.preferred_time.substring(0, 5) : "—"],
                  ["Phone", selected.phone || "—"],
                  ["Notes", selected.notes || "—"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F1F5F9", transition: "background-color 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ fontSize: 13, color: "#64748B" }}>{k}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#111827", textTransform: k === "Format" ? "capitalize" : undefined, maxWidth: "60%", textAlign: "right", wordBreak: "break-word" }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#64748B", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</p>
                <StatusBadge status={selected.status} />
              </div>

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {selected.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(selected.id, "confirmed")} className="booking-action-btn" style={{ width: "100%", padding: "11px", fontSize: 13, fontWeight: 600, color: "#FFF", backgroundColor: "#10B981", border: "none", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>Confirm Booking</button>
                    <button onClick={() => updateStatus(selected.id, "cancelled")} className="booking-action-btn" style={{ width: "100%", padding: "11px", fontSize: 13, fontWeight: 500, color: "#DC2626", backgroundColor: "#FEE2E2", border: "1px solid #FECACA", borderRadius: 10, cursor: "pointer" }}>Cancel Booking</button>
                  </>
                )}
                {selected.status === "confirmed" && (() => {
                  const phoneClean = (selected.phone || "").replace(/[^0-9]/g, "");
                  const phoneNum = phoneClean.startsWith("91") ? phoneClean : phoneClean ? `91${phoneClean}` : "";
                  const fmtDate = selected.preferred_date ? new Date(selected.preferred_date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "TBD";
                  const fmtTime = selected.preferred_time ? (() => { const [h, m] = selected.preferred_time.split(":"); const hr = parseInt(h); return hr > 12 ? `${hr - 12}:${m} PM` : hr === 0 ? `12:${m} AM` : `${hr}:${m} AM`; })() : "TBD";
                  const fmtFormat = selected.format === "in-person" ? "In-Person (Gurgaon Clinic)" : "Online (Zoom)";
                  const svc = selected.service_type;
                  let msg = "";
                  if (svc === "discovery") {
                    msg = `Hello ${selected.full_name},\n\nThank you for reaching out to *Pause for Love*! 🙏\n\nI'd love to connect with you for a *free 15-minute discovery call* to understand how I can support you.\n\nNo pressure, no commitment — just a safe space to talk.\n\nPlease let me know a convenient time, or feel free to call me directly.\n\nWarm regards,\nNeha\nM.A. Psychology | Counselling Therapist\nPause for Love`;
                  } else if (svc === "couple") {
                    msg = `Hello ${selected.full_name},\n\nYour *Couple & Family Therapy* session with *Pause for Love* has been confirmed!\n\n*Session Details*\nDate: ${fmtDate}\nTime: ${fmtTime}\nDuration: 60 minutes\nFormat: ${fmtFormat}\nAmount: ₹3,200\n\nLooking forward to working with you and your partner/family.\n\nWarm regards,\nNeha\nM.A. Psychology | Counselling Therapist\nPause for Love`;
                  } else {
                    msg = `Hello ${selected.full_name},\n\nYour *Individual Therapy* session with *Pause for Love* has been confirmed!\n\n*Session Details*\nDate: ${fmtDate}\nTime: ${fmtTime}\nDuration: 60 minutes\nFormat: ${fmtFormat}\nAmount: ₹2,200\n\nLooking forward to our session together.\n\nWarm regards,\nNeha\nM.A. Psychology | Counselling Therapist\nPause for Love`;
                  }
                  const whatsappUrl = phoneNum ? `https://wa.me/${phoneNum}?text=${encodeURIComponent(msg)}` : null;

                  return whatsappUrl ? (
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="booking-action-btn" style={{
                      width: "100%", padding: "11px", fontSize: 13, fontWeight: 600,
                      color: "#FFF", backgroundColor: "#25D366", border: "none", borderRadius: 10,
                      cursor: "pointer", textAlign: "center", textDecoration: "none",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    }}>
                      <MessageCircle size={16} /> Send on WhatsApp
                    </a>
                  ) : (
                    <div style={{ width: "100%", padding: "11px", fontSize: 12, color: "#9CA3AF", backgroundColor: "#F9FAFB", border: "1px dashed #E5E7EB", borderRadius: 10, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <Phone size={14} /> No phone number available
                    </div>
                  );
                })()}
                <button onClick={() => deleteBooking(selected.id)} className="booking-action-btn" style={{ width: "100%", padding: "11px", fontSize: 13, fontWeight: 500, color: "#64748B", backgroundColor: "#F8FAFC", border: "1px solid #E5EAF2", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
