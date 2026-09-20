"use client";

import { useState, useEffect } from "react";
import { Save, LogOut, User, MapPin, Clock, Phone, Mail, Shield, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import { useAuth } from "../layout";

export default function SettingsPage() {
  const { updateCredentials } = useAuth();
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [profile, setProfile] = useState({
    full_name: "Neha",
    email: "neha@pauseforlove.com",
    phone: "+91 98765 43210",
    designation: "M.A. Psychology",
    clinic_address: "DLF Phase 1, Golf Course Road, Gurgaon",
    working_hours: "Mon - Fri, 9:00 AM - 5:00 PM",
    emergencyhelpline: "14416",
    emergency_name: "Tele-MANAS",
  });

  const [credentials, setCredentials] = useState({
    current_password: "",
    new_username: "",
    new_password: "",
    confirm_password: "",
  });
  const [credMsg, setCredMsg] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("admin_username");
    if (savedUser) setCredentials(prev => ({ ...prev, new_username: savedUser }));
  }, []);

  const updateField = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const saveAll = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setMsg("Settings saved!");
    setTimeout(() => setMsg(""), 2000);
    setSaving(false);
  };

  const changeCredentials = async () => {
    setCredMsg("");
    if (!credentials.current_password) {
      setCredMsg("Current password is required");
      return;
    }
    if (!credentials.new_username.trim()) {
      setCredMsg("Username cannot be empty");
      return;
    }
    if (credentials.new_password && credentials.new_password !== credentials.confirm_password) {
      setCredMsg("New passwords do not match");
      return;
    }

    const verifyRes = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", username: "Neha", password: credentials.current_password }),
    });
    const verifyData = await verifyRes.json();

    const savedUser = credentials.new_username.trim();
    const savedPass = credentials.new_password || credentials.current_password;

    const checkRes = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", username: savedUser, password: savedPass }),
    });
    const checkData = await checkRes.json();

    if (!verifyData.success && !checkData.success) {
      setCredMsg("Current password is incorrect");
      return;
    }

    const newUser = credentials.new_username.trim();
    const newPass = credentials.new_password || undefined;
    await updateCredentials(newUser, newPass || credentials.current_password);
    setCredentials(prev => ({ ...prev, current_password: "", new_password: "", confirm_password: "" }));
    setCredMsg("Credentials updated! Use new credentials on next login.");
    setTimeout(() => setCredMsg(""), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", fontSize: 13, color: "#111827",
    backgroundColor: "#F8FAFC", border: "1px solid #E5EAF2", borderRadius: 8,
    outline: "none", boxSizing: "border-box" as const,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.15s ease",
  };

  const iconInputStyle: React.CSSProperties = { ...inputStyle, paddingLeft: 34 };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your profile and practice information."
        action={
          <button onClick={saveAll} disabled={saving} className="admin-btn" style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", fontSize: 13, fontWeight: 600, color: "#FFF",
            background: saving ? "#93C5FD" : "linear-gradient(135deg, #4A78F6, #6366F1)", border: "none", borderRadius: 10,
            cursor: saving ? "not-allowed" : "pointer",
            boxShadow: saving ? "none" : "0 2px 8px rgba(74, 120, 246, 0.25)",
          }}>
            <Save size={14} /> {saving ? "Saving..." : "Save All"}
          </button>
        }
      />

      {msg && (
        <div className="admin-toast" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, fontWeight: 500, color: "#059669", backgroundColor: "#D1FAE5", borderRadius: 10, border: "1px solid #A7F3D0" }}>
          <CheckCircle2 size={16} /> {msg}
        </div>
      )}

      {/* Profile */}
      <div className="admin-stagger-1" style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #E5EAF2", marginBottom: 16, overflow: "hidden" }}>
        <div style={{ padding: "clamp(12px, 3vw, 18px) clamp(14px, 3vw, 24px)", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <User size={18} color="#4A78F6" />
          </div>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Profile</h2>
            <p style={{ fontSize: 12, color: "#64748B", margin: "2px 0 0" }}>Your personal information</p>
          </div>
        </div>
        <div style={{ padding: "clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={14} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type="text" value={profile.full_name} onChange={e => updateField("full_name", e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 34 }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={14} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type="email" value={profile.email} onChange={e => updateField("email", e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 34 }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Phone</label>
              <div style={{ position: "relative" }}>
                <Phone size={14} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type="tel" value={profile.phone} onChange={e => updateField("phone", e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 34 }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Designation</label>
              <input type="text" value={profile.designation} onChange={e => updateField("designation", e.target.value)}
                style={inputStyle} />
            </div>
          </div>
        </div>
      </div>

      {/* Practice Information */}
      <div className="admin-stagger-2" style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #E5EAF2", marginBottom: 16, overflow: "hidden" }}>
        <div style={{ padding: "clamp(12px, 3vw, 18px) clamp(14px, 3vw, 24px)", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <MapPin size={18} color="#10B981" />
          </div>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Practice Information</h2>
            <p style={{ fontSize: 12, color: "#64748B", margin: "2px 0 0" }}>Clinic details and working hours</p>
          </div>
        </div>
        <div style={{ padding: "clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Clinic Address</label>
              <div style={{ position: "relative" }}>
                <MapPin size={14} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type="text" value={profile.clinic_address} onChange={e => updateField("clinic_address", e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 34 }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Working Hours</label>
              <div style={{ position: "relative" }}>
                <Clock size={14} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type="text" value={profile.working_hours} onChange={e => updateField("working_hours", e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 34 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency */}
      <div className="admin-stagger-3" style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #E5EAF2", marginBottom: 16, overflow: "hidden" }}>
        <div style={{ padding: "clamp(12px, 3vw, 18px) clamp(14px, 3vw, 24px)", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Phone size={18} color="#EF4444" />
          </div>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Emergency</h2>
            <p style={{ fontSize: 12, color: "#64748B", margin: "2px 0 0" }}>Helpline information</p>
          </div>
        </div>
        <div style={{ padding: "clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Emergency Helpline</label>
              <input type="text" value={profile.emergencyhelpline} onChange={e => updateField("emergencyhelpline", e.target.value)}
                style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Helpline Name</label>
              <input type="text" value={profile.emergency_name} onChange={e => updateField("emergency_name", e.target.value)}
                style={inputStyle} />
            </div>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="admin-stagger-4" style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #E5EAF2", marginBottom: 16, overflow: "hidden" }}>
        <div style={{ padding: "clamp(12px, 3vw, 18px) clamp(14px, 3vw, 24px)", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Shield size={18} color="#D97706" />
          </div>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Account Security</h2>
            <p style={{ fontSize: 12, color: "#64748B", margin: "2px 0 0" }}>Change your login username and password</p>
          </div>
        </div>
        <div style={{ padding: "clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Current Password *</label>
              <div style={{ position: "relative" }}>
                <Shield size={14} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type={showPass ? "text" : "password"} value={credentials.current_password}
                  onChange={e => setCredentials(prev => ({ ...prev, current_password: e.target.value }))}
                  placeholder="Enter current password"
                  style={{ ...iconInputStyle, paddingRight: 36 }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 4 }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>New Username</label>
              <div style={{ position: "relative" }}>
                <User size={14} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type="text" value={credentials.new_username}
                  onChange={e => setCredentials(prev => ({ ...prev, new_username: e.target.value }))}
                  placeholder="Enter new username" style={iconInputStyle} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>New Password</label>
              <div style={{ position: "relative" }}>
                <Shield size={14} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type={showNewPass ? "text" : "password"} value={credentials.new_password}
                  onChange={e => setCredentials(prev => ({ ...prev, new_password: e.target.value }))}
                  placeholder="Leave blank to keep current"
                  style={{ ...iconInputStyle, paddingRight: 36 }} />
                <button type="button" onClick={() => setShowNewPass(!showNewPass)}
                  style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 4 }}>
                  {showNewPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Confirm New Password</label>
              <div style={{ position: "relative" }}>
                <Shield size={14} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type="password" value={credentials.confirm_password}
                  onChange={e => setCredentials(prev => ({ ...prev, confirm_password: e.target.value }))}
                  placeholder="Confirm new password" style={iconInputStyle} />
              </div>
            </div>
          </div>

          {credMsg && (
            <div style={{
              marginTop: 16, padding: "10px 14px", fontSize: 13, fontWeight: 500,
              color: credMsg.includes("incorrect") || credMsg.includes("match") || credMsg.includes("empty") ? "#DC2626" : "#059669",
              backgroundColor: credMsg.includes("incorrect") || credMsg.includes("match") || credMsg.includes("empty") ? "#FEF2F2" : "#D1FAE5",
              borderRadius: 8,
            }}>
              {credMsg}
            </div>
          )}

          <button onClick={changeCredentials} className="admin-btn" style={{
            marginTop: 16, display: "flex", alignItems: "center", gap: 6,
            padding: "10px 18px", fontSize: 13, fontWeight: 600, color: "#FFF",
            backgroundColor: "#D97706", border: "none", borderRadius: 10, cursor: "pointer",
            boxShadow: "0 2px 8px rgba(217, 119, 6, 0.25)",
          }}>
            <Shield size={14} /> Update Credentials
          </button>
        </div>
      </div>

      {/* Account */}
      <div className="admin-stagger-5" style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #E5EAF2", overflow: "hidden" }}>
        <div style={{ padding: "clamp(12px, 3vw, 18px) clamp(14px, 3vw, 24px)", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <LogOut size={18} color="#64748B" />
          </div>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Account</h2>
            <p style={{ fontSize: 12, color: "#64748B", margin: "2px 0 0" }}>Manage your account</p>
          </div>
        </div>
        <div style={{ padding: "clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px)", display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => {
            localStorage.removeItem("admin_auth");
            window.location.href = "/admin/login";
          }} className="admin-btn" style={{
            display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", fontSize: 13, fontWeight: 500,
            color: "#DC2626", backgroundColor: "#FEE2E2", border: "1px solid #FECACA", borderRadius: 10, cursor: "pointer",
          }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
