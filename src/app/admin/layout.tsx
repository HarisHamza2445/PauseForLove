"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import MobileHeader from "@/components/admin/MobileHeader";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateCredentials: (newUser: string, newPass: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  updateCredentials: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("admin_auth") === "true";
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const login = (username: string, password: string): boolean => {
    const savedUser = typeof window !== "undefined" ? localStorage.getItem("admin_username") : null;
    const savedPass = typeof window !== "undefined" ? localStorage.getItem("admin_password") : null;
    const adminUser = savedUser || process.env.NEXT_PUBLIC_ADMIN_USERNAME || "PFL";
    const adminPassword = savedPass || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "pass123";
    if (username === adminUser && password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      return true;
    }
    return false;
  };

  const updateCredentials = (newUser: string, newPass: string) => {
    localStorage.setItem("admin_username", newUser);
    localStorage.setItem("admin_password", newPass);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, updateCredentials }}>
        {children}
      </AuthContext.Provider>
    );
  }

  if (!isAuthenticated) {
    if (typeof window !== "undefined") router.push("/admin/login");
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, updateCredentials }}>
      <style>{`
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #4A78F6 !important;
          box-shadow: 0 0 0 3px rgba(74, 120, 246, 0.1) !important;
        }
        .admin-input {
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.15s ease;
        }
        .admin-input:hover {
          border-color: #CBD5E1 !important;
        }
      `}</style>

      {/* Desktop */}
      {!isMobile && (
        <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
          <Sidebar />
          <main style={{ flex: 1, marginLeft: 272 }}>
            <div className="admin-page" style={{ padding: "32px", maxWidth: 1200 }}>
              {children}
            </div>
          </main>
        </div>
      )}

      {/* Mobile */}
      {isMobile && (
        <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
          <MobileHeader isOpen={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} />

          {/* Overlay with blur */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(15, 23, 42, 0.3)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 45,
              opacity: mobileOpen ? 1 : 0,
              pointerEvents: mobileOpen ? "auto" : "none",
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Drawer */}
          <div style={{
            position: "fixed", top: 0, left: 0, height: "100vh", width: 280,
            transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 50,
            boxShadow: mobileOpen ? "4px 0 24px rgba(0, 0, 0, 0.1)" : "none",
          }}>
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>

          <div className="admin-page" style={{ padding: "76px 16px 24px" }}>
            {children}
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
