"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../layout";
import { User, Lock, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 400));
    if (await login(username, password)) {
      router.push("/admin");
    } else {
      setError("Invalid username or password");
      setIsLoading(false);
    }
  }, [username, password, login, router]);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%)", padding: 24,
    }}>
      <style>{`
        @keyframes loginFadeIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .login-card { animation: loginFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .login-logo { animation: logoFloat 3s ease-in-out infinite; }
        .login-error { animation: errorShake 0.4s ease; }
        .login-input {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .login-input:focus {
          outline: none;
          border-color: #4A78F6 !important;
          box-shadow: 0 0 0 3px rgba(74, 120, 246, 0.12) !important;
          background-color: #FFFFFF !important;
        }
        .login-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .login-btn:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(74, 120, 246, 0.4);
        }
        .login-btn:not(:disabled):active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>

      <div className="login-card" style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="login-logo" style={{
            width: 72, height: 72, borderRadius: 18,
            background: "linear-gradient(135deg, #4A78F6 0%, #6366F1 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(74, 120, 246, 0.3)",
          }}>
            <span style={{ color: "#FFF", fontWeight: 700, fontSize: 32 }}>P</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Pause for Love</h1>
          <p style={{ fontSize: 13, color: "#64748B" }}>Admin Dashboard</p>
        </div>

        {/* Card */}
        <div style={{
          background: "#FFFFFF", borderRadius: 16, padding: "36px 32px",
          border: "1px solid #E5EAF2",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 30px -5px rgba(0, 0, 0, 0.08)",
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#111827", marginBottom: 24 }}>Welcome back</h2>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 8 }}>Username</label>
              <div style={{ position: "relative" }}>
                <User size={16} color="#94A3B8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", transition: "color 0.2s" }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoFocus
                  className="login-input"
                  style={{
                    width: "100%", padding: "12px 16px 12px 40px", fontSize: 14,
                    color: "#111827", backgroundColor: "#F8FAFC",
                    border: "1px solid #E5EAF2", borderRadius: 10,
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 8 }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#94A3B8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", transition: "color 0.2s" }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="login-input"
                  style={{
                    width: "100%", padding: "12px 16px 12px 40px", fontSize: 14,
                    color: "#111827", backgroundColor: "#F8FAFC",
                    border: "1px solid #E5EAF2", borderRadius: 10,
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="login-error" style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 14px", marginBottom: 16, fontSize: 13,
                color: "#DC2626", backgroundColor: "#FEF2F2",
                borderRadius: 8, border: "1px solid #FECACA",
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="login-btn"
              style={{
                width: "100%", padding: "12px", fontSize: 14, fontWeight: 600,
                color: "#FFF",
                background: isLoading || !username || !password
                  ? "linear-gradient(135deg, #93C5FD, #A5B4FC)"
                  : "linear-gradient(135deg, #4A78F6, #6366F1)",
                border: "none", borderRadius: 10,
                cursor: isLoading || !username || !password ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: isLoading || !username || !password ? "none" : "0 4px 12px rgba(74, 120, 246, 0.3)",
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#FFF", borderRadius: "50%", animation: "spin 0.8s linear infinite"
                  }} />
                  Signing in...
                </>
              ) : "Sign in"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13 }}>
          <Link href="/" style={{
            color: "#4A78F6", textDecoration: "none", display: "inline-flex",
            alignItems: "center", gap: 4, transition: "gap 0.2s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.gap = "8px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.gap = "4px"; }}
          >
            <ArrowLeft size={14} /> Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
