import Link from "next/link";

const plans = [
  {
    badge: null,
    title: "Discovery Call",
    subtitle: "For first-time clients seeking to understand the fit",
    price: "FREE",
    priceNote: "15-minute phone / Zoom consultation",
    features: [
      "Discuss your primary concerns and goals",
      "Understand Neha's therapeutic methodology",
      "Ensure comfort before committing to therapy",
      "No financial commitment required",
    ],
    cta: "Book Free 15-Min Call",
    href: "/book-session?plan=discovery",
    popular: false,
  },
  {
    badge: "Most Popular",
    title: "Individual Therapy",
    subtitle: "Deep 1-on-1 healing, abuse recovery, and CBT",
    price: "₹2,200",
    priceNote: "per 60-minute session (Online or Clinic)",
    features: [
      "Full 60 minutes dedicated therapeutic holding",
      "Choice of Gurgaon Clinic or Encrypted Zoom",
      "Tailored narcissistic recovery & somatic tools",
      "Post-session journaling prompts & check-ins",
    ],
    cta: "Book Individual Session",
    href: "/book-session?plan=individual",
    popular: true,
  },
  {
    badge: null,
    title: "Couple & Family",
    subtitle: "Communication mediation and systemic healing",
    price: "₹3,200",
    priceNote: "per 60-minute joint session",
    features: [
      "Joint space for partners or family members",
      "De-escalation & active communication frameworks",
      "Impartial, safe moderation of difficult dialogues",
      "Practical homework between sessions",
    ],
    cta: "Book Joint Session",
    href: "/book-session?plan=couple",
    popular: false,
  },
];

export default function PricingSection() {
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
            Transparent & Ethical Care
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
            Services & Advance Consultation Fees
          </h2>

          <p
            style={{
              fontSize: "17px",
              color: "#4B5563",
              lineHeight: 1.75,
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Clear, upfront fees with zero hidden costs. All consultations are
            booked in advance to ensure dedicated time without interruptions.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "28px", alignItems: "start" }}
        >
          {plans.map((plan) => (
            <div
              key={plan.title}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: plan.popular ? "2px solid #3B5BDB" : "1px solid #E5E7EB",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: plan.popular
                  ? "0 4px 24px rgba(59, 91, 219, 0.12)"
                  : "none",
              }}
              className={plan.popular ? "p-8 sm:p-10" : "p-7 sm:p-9"}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#3B5BDB",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    padding: "6px 16px",
                    borderRadius: "9999px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Title */}
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#1A1A2E",
                  lineHeight: 1.3,
                  marginBottom: "8px",
                }}
              >
                {plan.title}
              </h3>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: 1.5,
                  marginBottom: "24px",
                }}
              >
                {plan.subtitle}
              </p>

              {/* Price */}
              <div style={{ marginBottom: "8px" }}>
                <span
                  style={{
                    fontSize: plan.price === "FREE" ? "36px" : "40px",
                    fontWeight: 800,
                    color: "#1A1A2E",
                    lineHeight: 1.1,
                  }}
                >
                  {plan.price}
                </span>
              </div>

              {/* Price Note */}
              <p
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginBottom: "28px",
                }}
              >
                {plan.priceNote}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#E5E7EB",
                  marginBottom: "28px",
                }}
              />

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "32px",
                  flex: "1 1 0%",
                }}
              >
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontSize: "14px",
                      color: "#374151",
                      lineHeight: 1.5,
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3B5BDB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: plan.popular ? "#FFFFFF" : "#3B5BDB",
                  backgroundColor: plan.popular ? "#3B5BDB" : "transparent",
                  border: plan.popular ? "none" : "2px solid #3B5BDB",
                  borderRadius: "9999px",
                  textAlign: "center",
                  transition: "all 0.15s",
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Policy Notice */}
        <div
          style={{
            marginTop: "40px",
            padding: "20px 24px",
            backgroundColor: "#FFFBEB",
            borderRadius: "12px",
            border: "1px solid #FDE68A",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D97706"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, marginTop: "2px" }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p
            style={{
              fontSize: "13px",
              color: "#92400E",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            <strong>Advance Booking & Cancellation Policy:</strong> All
            appointments must be confirmed in advance. Because therapy slots are
            reserved exclusively for you, cancellations or rescheduling requests
            must be notified at least 16 hours prior to the scheduled time;
            otherwise, a 50% reservation retention fee applies.
          </p>
        </div>
      </div>
    </section>
  );
}
