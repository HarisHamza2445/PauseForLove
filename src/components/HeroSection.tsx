import Link from "next/link";

export default function HeroSection() {
  return (
    <section style={{ backgroundColor: "#FAF8F5" }}>
      <div
        className="mx-auto px-4 py-10 sm:px-6 sm:py-12 lg:px-12 lg:py-16"
        style={{
          maxWidth: "1400px",
        }}
      >
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center"
          style={{
            gap: "clamp(24px, 5vw, 64px)",
          }}
        >
          {/* Left Content */}
          <div style={{ flex: "1 1 0%", minWidth: 0 }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#FFFFFF",
                color: "#3B5BDB",
                fontSize: "13px",
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: "9999px",
                border: "1px solid #DBEAFE",
                marginBottom: "32px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Accepting New In-Person &amp; Online Clients
            </div>

            {/* Heading */}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                color: "#1A1A2E",
                marginBottom: "28px",
                letterSpacing: "-0.01em",
              }}
            >
              Find Healing, Rebuild Boundaries, &amp;
              <br />
              <span style={{ color: "#3B5BDB" }}>Pause for Love.</span>
            </h1>

            {/* Description */}
            <p
              className="text-sm sm:text-base"
              style={{
                color: "#4B5563",
                lineHeight: 1.75,
                maxWidth: "520px",
                marginBottom: "40px",
              }}
            >
              A confidential, evidence-informed therapeutic sanctuary led by
              Neha, M.A. Psychology. Specializing in recovery from narcissistic
              abuse, restoring relationship intimacy, and rediscovering peaceful
              emotional autonomy.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "16px",
                marginBottom: "56px",
              }}
            >
              <Link
                href="/book-session"
                className="btn-primary"
              >
                Book 1-Hour Session
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/match-quiz"
                className="btn-outline"
              >
                Take Therapy Match Quiz
              </Link>
            </div>

            {/* Bottom credentials */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(16px, 3vw, 32px)",
                paddingTop: "32px",
                borderTop: "1px solid #E5E7EB",
              }}
            >
              {/* M.A. Psychology */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    backgroundColor: "#EEF2FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A2E" }}>M.A. Psychology</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>Clinical Counseling Spec</div>
                </div>
              </div>

              {/* 100% Confidential */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    backgroundColor: "#EEF2FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A2E" }}>100% Confidential</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>Protected Safe Space</div>
                </div>
              </div>

              {/* Hybrid Practice */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    backgroundColor: "#EEF2FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A2E" }}>Hybrid Practice</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>Gurgaon Clinic &amp; Zoom</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Profile Card */}
          <div className="w-full lg:w-[480px]" style={{ flexShrink: 0 }}>
            <div
              className="p-6 sm:p-10"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)",
                border: "1px solid #E5E7EB",
              }}
            >
              {/* Profile Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      backgroundColor: "#EEF2FF",
                      border: "3px solid #D6DFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: "26px", fontWeight: 700, color: "#3B5BDB" }}>N</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1px",
                      right: "1px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#22C55E",
                      border: "2px solid #FFFFFF",
                    }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#1A1A2E", lineHeight: 1.2, margin: 0 }}>
                    Neha
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.4, margin: 0 }}>
                    M.A. Psychology | Counselling Therapist
                  </p>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#3B5BDB", lineHeight: 1.4, margin: 0, marginTop: "4px" }}>
                    8+ Years Clinical Experience
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div
                style={{
                  borderLeft: "3px solid #3B5BDB",
                  paddingLeft: "16px",
                  marginBottom: "24px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "#4B5563",
                    fontStyle: "italic",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  &quot;Recovery is not about becoming who you were before
                  trauma; it is about gently shedding who you had to be to
                  survive it.&quot;
                </p>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "clamp(8px, 2vw, 12px)",
                  padding: "20px 0",
                  marginTop: "4px",
                  marginBottom: "20px",
                  borderTop: "1px solid #F3F4F6",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 700, color: "#3B5BDB", lineHeight: 1.1 }}>1,200+</div>
                  <div style={{ fontSize: "clamp(11px, 2vw, 13px)", color: "#6B7280", marginTop: "4px" }}>Hours Held</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 700, color: "#3B5BDB", lineHeight: 1.1 }}>100%</div>
                  <div style={{ fontSize: "clamp(11px, 2vw, 13px)", color: "#6B7280", marginTop: "4px" }}>Non-Judgmental</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 700, color: "#3B5BDB", lineHeight: 1.1 }}>Mon–Fri</div>
                  <div style={{ fontSize: "clamp(11px, 2vw, 13px)", color: "#6B7280", marginTop: "4px" }}>9 AM – 5 PM</div>
                </div>
              </div>

              {/* Booking Info */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "#4B5563" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginTop: "1px" }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ lineHeight: 1.4 }}>
                  Advance booking required • Strict 16h cancellation window
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
