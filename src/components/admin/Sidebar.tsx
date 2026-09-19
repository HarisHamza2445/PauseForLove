"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, DollarSign, Settings, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Services", href: "/admin/services", icon: DollarSign },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside style={{
      width: 272,
      minWidth: 272,
      height: "100vh",
      background: "#FFFFFF",
      borderRight: "1px solid #E5EAF2",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 50,
    }}>
      <style>{`
        .sidebar-brand-icon {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
        }
        .sidebar-brand:hover .sidebar-brand-icon {
          transform: scale(1.08) rotate(-3deg);
          box-shadow: 0 6px 20px rgba(74, 120, 246, 0.4) !important;
        }
        .sidebar-nav-item {
          position: relative;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar-nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 3px;
          height: 0;
          border-radius: 0 3px 3px 0;
          background: linear-gradient(180deg, #4A78F6, #6366F1);
          transition: transform 0.2s ease, height 0.2s ease;
        }
        .sidebar-nav-item.active::before {
          transform: translateY(-50%) scaleY(1);
          height: 20px;
        }
        .sidebar-nav-item:hover {
          background-color: #F1F5F9 !important;
        }
        .sidebar-nav-item.active {
          background-color: #EFF6FF !important;
        }
        .sidebar-logout:hover {
          background-color: #FEF2F2 !important;
          color: #DC2626 !important;
        }
      `}</style>

      {/* Branding */}
      <div className="sidebar-brand" style={{ padding: "24px 24px 20px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="sidebar-brand-icon" style={{
            width: 48, height: 48, borderRadius: 14,
            background: "linear-gradient(135deg, #4A78F6 0%, #6366F1 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(74, 120, 246, 0.3)",
          }}>
            <span style={{ color: "#FFF", fontWeight: 700, fontSize: 22 }}>P</span>
          </div>
          <div>
            <h1 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>Pause for Love</h1>
            <p style={{ fontSize: 12, color: "#94A3B8", margin: 0, marginTop: 2 }}>Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "4px 12px", overflowY: "auto" }}>
        <div style={{ marginBottom: 8, paddingLeft: 12, fontSize: 11, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Menu
        </div>
        {navItems.map((item, i) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={onClose}
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                marginBottom: 2,
                color: isActive ? "#4A78F6" : hoveredItem === item.href ? "#334155" : "#64748B",
                backgroundColor: isActive ? "#EFF6FF" : "transparent",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                animation: `fadeInUp 0.2s ease ${i * 0.05}s both`,
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} style={{ transition: "stroke-width 0.2s ease" }} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div style={{ padding: "12px", borderTop: "1px solid #F1F5F9" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "10px 14px", marginBottom: 4,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #4A78F6 0%, #6366F1 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ color: "#FFF", fontWeight: 600, fontSize: 14 }}>N</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>Neha</p>
            <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>Admin</p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("admin_auth");
            window.location.href = "/admin/login";
          }}
          className="sidebar-logout"
          style={{
            display: "flex", alignItems: "center", gap: 10,
            width: "100%", padding: "10px 14px",
            color: "#64748B", backgroundColor: "transparent",
            border: "none", borderRadius: 10, cursor: "pointer",
            fontSize: 13, fontWeight: 500,
            transition: "all 0.2s ease",
          }}
        >
          <LogOut size={18} strokeWidth={1.8} />
          Logout
        </button>
      </div>
    </aside>
  );
}
