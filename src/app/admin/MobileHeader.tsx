"use client";

interface MobileHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileHeader({ onToggle }: MobileHeaderProps) {
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 60,
      background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #E2E8F0", display: "flex",
      alignItems: "center", justifyContent: "space-between",
      padding: "0 16px", zIndex: 45,
    }}>
      <button onClick={onToggle} style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 36, height: 36, backgroundColor: "#F1F5F9",
        border: "1px solid #E2E8F0", borderRadius: 8, cursor: "pointer", color: "#64748B",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "#FFF", fontWeight: 700, fontSize: 12 }}>P</span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>Admin</span>
      </div>
      <div style={{ width: 36 }} />
    </header>
  );
}
