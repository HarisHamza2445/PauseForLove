import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="admin-stagger-1" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0, marginBottom: 4 }}>{title}</h1>
        {description && <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
