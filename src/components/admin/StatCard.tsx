import { type ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number | ReactNode;
  icon: ReactNode;
  color: string;
  subtitle?: string;
}

export default function StatCard({ label, value, icon, color, subtitle }: StatCardProps) {
  return (
    <div className="admin-card" style={{
      background: "#FFFFFF",
      borderRadius: 14,
      padding: "clamp(14px, 3vw, 22px) clamp(12px, 3vw, 20px)",
      border: "1px solid #E5EAF2",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      minWidth: 0,
    }}>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#64748B", marginBottom: 6, fontWeight: 500 }}>{label}</p>
        <p style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 700, color: "#111827", lineHeight: 1, margin: 0 }}>{value}</p>
        {subtitle && <p style={{ fontSize: 11, color: "#94A3B8", margin: "6px 0 0" }}>{subtitle}</p>}
      </div>
      <div style={{
        width: "clamp(36px, 8vw, 44px)", height: "clamp(36px, 8vw, 44px)", borderRadius: 12,
        backgroundColor: `${color}12`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {icon}
      </div>
    </div>
  );
}
