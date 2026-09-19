import Link from "next/link";

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Recovery from Narcissistic Abuse",
    description:
      "Overcoming the destabilizing cycle of gaslighting, emotional manipulation, and cognitive dissonance. We gently unravel trauma bonds and re-anchor your trust in your own reality.",
    tags: ["Gaslighting Recovery", "Boundary Restoration", "Trauma Bonding"],
    cta: "Book Healing Session",
    href: "/book-session",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Relationship & Family Counseling",
    description:
      "Navigating communication impasses, systemic family stressors, infidelity fractures, and codependency. Designed for individuals or couples seeking emotionally authentic alignment.",
    tags: ["Healthy Conflict", "Intimacy & Attachment", "Family Dynamics"],
    cta: "Explore Couple/Family Care",
    href: "/book-session",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Depression & Anxiety Management",
    description:
      "Practical coping architectures to regulate heightened nervous systems, disrupt depressive paralysis, eliminate chronic self-doubt, and reconnect with meaningful daily vitality.",
    tags: ["CBT Tools", "Somatic Grounding", "Emotional Regulation"],
    cta: "Start Anxious Mind Relief",
    href: "/book-session",
  },
];

export default function TherapeuticFocus() {
  return (
    <section style={{ backgroundColor: "#FFFFFF" }}>
      <div
        className="mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24"
        style={{ maxWidth: "1200px" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vw, 64px)" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#EEF2FF",
              color: "#3B5BDB",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "8px 16px",
              borderRadius: "9999px",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            Therapeutic Focus
          </div>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#1A1A2E",
              marginBottom: "20px",
              letterSpacing: "-0.01em",
            }}
          >
            Compassionate, Tailored Interventions
          </h2>

          <p
            style={{
              fontSize: "17px",
              color: "#4B5563",
              lineHeight: 1.75,
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Every human journey holds unique complexities. My practice
            integrates psychodynamic insights, Cognitive Behavioral Therapy
            (CBT), and somatic nervous system grounding.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "28px" }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                backgroundColor: "#FAFAFA",
                borderRadius: "16px",
                border: "1px solid #E5E7EB",
                display: "flex",
                flexDirection: "column",
              }}
              className="p-7 sm:p-9"
            >
              {/* Icon */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  backgroundColor: "#F3F4F6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#1A1A2E",
                  lineHeight: 1.3,
                  marginBottom: "14px",
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                }}
              >
                {service.description}
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "24px",
                }}
              >
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#374151",
                      backgroundColor: "#F3F4F6",
                      padding: "6px 12px",
                      borderRadius: "9999px",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Link */}
              <div style={{ marginTop: "auto" }}>
                <Link
                  href={service.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#3B5BDB",
                    textDecoration: "none",
                  }}
                >
                  {service.cta}
                  <svg
                    width="16"
                    height="16"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
