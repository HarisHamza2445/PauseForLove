"use client";

import { Menu, X } from "lucide-react";

interface MobileHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileHeader({ isOpen, onToggle }: MobileHeaderProps) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: 60,
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid #E5EAF2",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      zIndex: 40,
    }}>
      <button
        onClick={onToggle}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 40, height: 40, backgroundColor: "#F8FAFC",
          border: "1px solid #E5EAF2", borderRadius: 10, cursor: "pointer", color: "#64748B",
          transition: "all 0.2s ease",
        }}
      >
        <div style={{ position: "relative", width: 20, height: 20 }}>
          <Menu
            size={20}
            style={{
              position: "absolute", inset: 0,
              transition: "all 0.3s ease",
              opacity: isOpen ? 0 : 1,
              transform: isOpen ? "rotate(90deg) scale(0.5)" : "rotate(0) scale(1)",
            }}
          />
          <X
            size={20}
            style={{
              position: "absolute", inset: 0,
              transition: "all 0.3s ease",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "rotate(0) scale(1)" : "rotate(-90deg) scale(0.5)",
            }}
          />
        </div>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #4A78F6 0%, #6366F1 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "#FFF", fontWeight: 700, fontSize: 14 }}>P</span>
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Pause for Love</span>
      </div>
      <div style={{ width: 40 }} />
    </div>
  );
}
