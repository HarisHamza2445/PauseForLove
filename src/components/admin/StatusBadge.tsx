interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, { bg: string; color: string; dot: string }> = {
  pending: { bg: "#FEF3C7", color: "#D97706", dot: "#F59E0B" },
  confirmed: { bg: "#D1FAE5", color: "#059669", dot: "#10B981" },
  completed: { bg: "#DBEAFE", color: "#2563EB", dot: "#3B82F6" },
  cancelled: { bg: "#FEE2E2", color: "#DC2626", dot: "#EF4444" },
  active: { bg: "#D1FAE5", color: "#059669", dot: "#10B981" },
  inactive: { bg: "#F3F4F6", color: "#6B7280", dot: "#9CA3AF" },
  unread: { bg: "#FEF3C7", color: "#D97706", dot: "#F59E0B" },
  read: { bg: "#D1FAE5", color: "#059669", dot: "#10B981" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status] || { bg: "#F3F4F6", color: "#6B7280", dot: "#9CA3AF" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", fontSize: 12, fontWeight: 600, borderRadius: 6,
      backgroundColor: style.bg, color: style.color,
      textTransform: "capitalize", whiteSpace: "nowrap",
      transition: "all 0.2s ease",
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        backgroundColor: style.dot,
        flexShrink: 0,
      }} />
      {status}
    </span>
  );
}
