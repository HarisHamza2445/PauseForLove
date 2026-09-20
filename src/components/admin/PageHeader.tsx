import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="admin-stagger-1" style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 700, color: "#111827", margin: 0, marginBottom: 4, wordBreak: "break-word" }}>{title}</h1>
          {description && <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>{description}</p>}
        </div>
        {action && <div style={{ flexShrink: 0 }}>{action}</div>}
      </div>
    </div>
  );
}
