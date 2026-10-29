import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";

export default function Footer({ c = DEFAULT_CONTENT }: { c?: SiteContent }) {
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
              {c["footer.brand"]}
            </h3>
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#9CA3AF", marginBottom: "20px" }}>
              {c["footer.about"]}
            </p>
            <p style={{ fontSize: "13px", color: "#6B7280" }}>
              {c["footer.copyright"]}
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
              {[
                { label: c["nav.about"], href: "/#about" },
                { label: c["nav.specializations"], href: "/#specializations" },
                { label: c["nav.services"], href: "/#services" },
                { label: c["nav.quiz"], href: "/#match-quiz" },
                { label: c["nav.clinic"], href: "/#clinic" },
                { label: c["nav.feedback"], href: "/#feedback" },
              ].map(({ label: item, href }) => (
                <li key={href}>
                  <a href={href} style={{ fontSize: "14px", color: "#9CA3AF", textDecoration: "none" }}>
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
              {c["footer.emergency_heading"]}
            </h4>
            <p style={{ fontSize: "14px", color: "#9CA3AF", marginBottom: "8px" }}>
              {c["footer.emergency_intro"]}
            </p>
            <p style={{ fontSize: "14px", color: "#9CA3AF", marginBottom: "4px" }}>
              <span style={{ fontWeight: 700, color: "#D1D5DB" }}>{c["footer.emergency_line1"]}</span>
            </p>
            <p style={{ fontSize: "14px", color: "#9CA3AF", marginBottom: "12px" }}>
              <span style={{ fontWeight: 700, color: "#D1D5DB" }}>{c["footer.emergency_line2"]}</span>
            </p>
            <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.6 }}>
              {c["footer.emergency_note"]}
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
          {c["footer.bottom"]}
        </p>
      </div>
    </footer>
  );
}
