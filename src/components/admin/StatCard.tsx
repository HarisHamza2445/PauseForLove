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
      padding: "22px 20px",
      border: "1px solid #E5EAF2",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
    }}>
      <div>
        <p style={{ fontSize: 13, color: "#64748B", marginBottom: 8, fontWeight: 500 }}>{label}</p>
        <p style={{ fontSize: 30, fontWeight: 700, color: "#111827", lineHeight: 1, margin: 0 }}>{value}</p>
        {subtitle && <p style={{ fontSize: 11, color: "#94A3B8", margin: "6px 0 0" }}>{subtitle}</p>}
      </div>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        backgroundColor: `${color}12`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform 0.2s ease",
      }}>
        {icon}
      </div>
    </div>
  );
}
