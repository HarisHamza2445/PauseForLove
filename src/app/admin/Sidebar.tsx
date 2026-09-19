"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  onClose?: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg> },
  { label: "Bookings", href: "/admin/bookings", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: "Services", href: "/admin/services", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { label: "Settings", href: "/admin/settings", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 272, height: "100vh", background: "#FFFFFF",
      borderRight: "1px solid #E2E8F0", display: "flex",
      flexDirection: "column", position: "fixed", top: 0, left: 0, zIndex: 50,
    }}>
      <div style={{ padding: "20px 16px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ color: "#FFF", fontWeight: 700, fontSize: 15 }}>P</span>
        </div>
        <div>
          <h1 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: 0 }}>Pause for Love</h1>
          <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>Admin Panel</p>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 14px", color: isActive ? "#3B82F6" : "#64748B",
                backgroundColor: isActive ? "#EFF6FF" : "transparent",
                borderRadius: "10px", marginBottom: "2px", textDecoration: "none",
                fontSize: "13px", fontWeight: isActive ? 600 : 400,
              }}
            >
              <span style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "12px 8px", borderTop: "1px solid #F1F5F9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ color: "#FFF", fontWeight: 600, fontSize: 13 }}>N</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#0F172A", margin: 0 }}>Neha</p>
            <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
