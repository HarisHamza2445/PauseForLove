export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1A1A2E", color: "#D1D5DB" }}>
      <div
        className="mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-12"
        style={{ maxWidth: "1400px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "14px",
                fontFamily: "var(--font-heading)",
              }}
            >
              Pause for Love
            </h3>
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#9CA3AF", marginBottom: "20px" }}>
              Psychological counselling and compassionate relational healing practice led by Neha, M.A. Psychology. Based at DLF Phase 1, Gurgaon, and available worldwide via secure video.
            </p>
            <p style={{ fontSize: "13px", color: "#6B7280" }}>
              © 2025 Pause for Love. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {["About Neha", "Core Specializations", "Fees & Policy", "Therapy Match Quiz", "Gurgaon Clinic Suite"].map((item) => (
                <li key={item}>
                  <a href="#" style={{ fontSize: "14px", color: "#9CA3AF", textDecoration: "none" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Services */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              Quick Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Individual Counseling", "Relationship Therapy", "15-Min Discovery Call", "Therapist Login"].map((item) => (
                <li key={item}>
                  <a href="#" style={{ fontSize: "14px", color: "#9CA3AF", textDecoration: "none" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              Emergency Helplines
            </h4>
            <p style={{ fontSize: "14px", color: "#9CA3AF", marginBottom: "8px" }}>
              For immediate psychiatric crisis:
            </p>
            <p style={{ fontSize: "14px", color: "#9CA3AF", marginBottom: "4px" }}>
              <span style={{ fontWeight: 700, color: "#D1D5DB" }}>Tele-MANAS: 14416</span>
            </p>
            <p style={{ fontSize: "14px", color: "#9CA3AF", marginBottom: "12px" }}>
              <span style={{ fontWeight: 700, color: "#D1D5DB" }}>Vandrevala Foundation: +91 9999 666 555</span>
            </p>
            <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.6 }}>
              Pause for Love is an outpatient practice and does not offer 24/7 psychiatric emergency services.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid #2D2D44",
          padding: "16px clamp(16px, 4vw, 48px)",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "13px", color: "#6B7280" }}>
          Strict Client Confidentiality Protected • Professional Psychological Practice Standards
        </p>
      </div>
    </footer>
  );
}
