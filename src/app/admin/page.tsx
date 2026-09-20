"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { CalendarDays, Clock, CheckCircle2, DollarSign } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";

interface Booking {
  id: string; full_name: string; email: string; service_type: string;
  preferred_date: string; preferred_time: string; status: string;
}

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === 0) { setDisplay(0); return; }
    const start = performance.now();
    const duration = 800;
    const timer = setTimeout(() => {
      const animate = (now: number) => {
        const elapsed = now - start - delay;
        if (elapsed < 0) { frameRef.current = requestAnimationFrame(animate); return; }
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) frameRef.current = requestAnimationFrame(animate);
      };
      frameRef.current = requestAnimationFrame(animate);
    }, delay);
    return () => { clearTimeout(timer); if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [value, delay]);

  return <>{display}</>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [services, setServices] = useState(0);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const [bookingsRes, servicesRes] = await Promise.all([
          supabase.from("bookings").select("id, status"),
          supabase.from("services").select("id"),
        ]);
        if (!cancelled && bookingsRes.data) {
          setStats({
            total: bookingsRes.data.length,
            pending: bookingsRes.data.filter(b => b.status === "pending").length,
            completed: bookingsRes.data.filter(b => b.status === "confirmed").length,
          });
        }
        if (!cancelled && servicesRes.data) {
          setServices(servicesRes.data.length);
        }
        const { data: recent } = await supabase
          .from("bookings")
          .select("id, full_name, email, service_type, preferred_date, preferred_time, status")
          .order("created_at", { ascending: false })
          .limit(5);
        if (!cancelled && recent) setRecentBookings(recent);
      } catch (e) { console.error(e); }
      finally { if (!cancelled) setIsLoading(false); }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  if (isLoading) {
    return (
      <div>
        <div style={{ marginBottom: 28 }}>
          <div style={{ height: 28, width: 180, borderRadius: 6, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: 8 }} />
          <div style={{ height: 14, width: 260, borderRadius: 6, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
        </div>
      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "clamp(8px, 2vw, 16px)", marginBottom: "clamp(16px, 4vw, 28px)" }}>
          {[1,2,3,4].map(i => (
            <div key={i} className="admin-card" style={{ background: "#FFFFFF", borderRadius: 14, padding: "22px 20px", border: "1px solid #E5EAF2" }}>
              <div style={{ height: 14, width: 80, borderRadius: 4, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: 12 }} />
              <div style={{ height: 28, width: 50, borderRadius: 4, background: "linear-gradient(90deg, #F1F5F9 25%, #E5EAF2 50%, #F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
            </div>
          ))}
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #E5EAF2", padding: 22 }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < 5 ? 14 : 0, alignItems: "center" }}>
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
      <PageHeader title="Dashboard" description="Overview of your practice activity." />

      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 16, marginBottom: 28 }}>
        <div className="admin-stagger-1">
          <StatCard label="Total Bookings" value={<AnimatedNumber value={stats.total} delay={0} />} color="#4A78F6"
            icon={<CalendarDays size={20} color="#4A78F6" />} />
        </div>
        <div className="admin-stagger-2">
          <StatCard label="Pending" value={<AnimatedNumber value={stats.pending} delay={100} />} color="#F59E0B"
            icon={<Clock size={20} color="#F59E0B" />} />
        </div>
        <div className="admin-stagger-3">
          <StatCard label="Confirmed" value={<AnimatedNumber value={stats.completed} delay={200} />} color="#10B981"
            icon={<CheckCircle2 size={20} color="#10B981" />} />
        </div>
        <div className="admin-stagger-4">
          <StatCard label="Services" value={<AnimatedNumber value={services} delay={300} />} color="#8B5CF6"
            icon={<DollarSign size={20} color="#8B5CF6" />} />
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="admin-stagger-5" style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #E5EAF2", overflow: "hidden" }}>
        <div style={{ padding: "clamp(12px, 3vw, 18px) clamp(12px, 3vw, 22px)", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Recent Bookings</h2>
          <a href="/admin/bookings" style={{ fontSize: 12, fontWeight: 500, color: "#4A78F6", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#2B4AC7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#4A78F6"; }}
          >View all →</a>
        </div>
        {recentBookings.length === 0 ? (
          <div style={{ padding: "60px 24px", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <CalendarDays size={24} color="#94A3B8" />
            </div>
            <p style={{ fontSize: 13, color: "#64748B", marginBottom: 4 }}>No bookings yet</p>
            <p style={{ fontSize: 12, color: "#94A3B8" }}>They&apos;ll appear here once clients start booking.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  {["Client", "Service", "Date", "Time", "Status"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b, i) => (
                  <tr key={b.id} className="admin-row" style={{
                    borderBottom: "1px solid #F8FAFC",
                    animation: `fadeInUp 0.3s ease ${i * 0.05}s both`,
                  }}>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{b.full_name}</div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>{b.email}</div>
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748B", textTransform: "capitalize" }}>{b.service_type}</td>
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748B", whiteSpace: "nowrap" }}>{b.preferred_date || "—"}</td>
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748B" }}>{b.preferred_time ? b.preferred_time.substring(0, 5) : "—"}</td>
                    <td style={{ padding: "12px 14px" }}><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
