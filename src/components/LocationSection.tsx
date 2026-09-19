import Link from "next/link";

export default function LocationSection() {
  return (
    <section style={{ backgroundColor: "#FFFFFF" }}>
      <div
        className="mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24"
        style={{ maxWidth: "1100px" }}
      >
        <div
          style={{
            backgroundColor: "#FAFAFA",
            borderRadius: "20px",
            border: "1px solid #E5E7EB",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {/* Left Content */}
          <div className="p-8 md:p-12">
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#ECFDF5",
                color: "#059669",
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: "9999px",
                marginBottom: "20px",
              }}
            >
              Gurgaon Practice Location
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: "#1A1A2E",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              In-Person Therapeutic Suite
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "15px",
                color: "#4B5563",
                lineHeight: 1.7,
                marginBottom: "28px",
              }}
            >
              A tranquil, sound-insulated space situated along Gurgaon&apos;s
              prime corridor, designed for mindful privacy and grounded
              reflection.
            </p>

            {/* Address Box */}
            <div
              style={{
                borderLeft: "3px solid #3B5BDB",
                paddingLeft: "20px",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Address:
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#1A1A2E",
                  fontWeight: 600,
                  lineHeight: 1.6,
                }}
              >
                F10/12B, Second Floor, Independent Floors,
                <br />
                Golf Course Road, DLF Phase 1, Gurgaon, Haryana 122002
              </p>
            </div>

            {/* Hours */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginTop: "2px" }}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.5 }}>
                <strong>Hours:</strong> Mon – Fri: 9:00 AM – 5:00 PM (By prior
                appointment only)
              </p>
            </div>

            {/* Landmarks */}
            <p
              style={{
                fontSize: "13px",
                color: "#6B7280",
                lineHeight: 1.6,
                marginBottom: "28px",
              }}
            >
              <strong>Landmarks & Transit:</strong> 3-minute drive from
              Sikanderpur Metro Station (Yellow Line / Rapid Metro). Ample
              street parking available.
            </p>

            {/* CTA */}
            <Link
              href="/book-session"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#FFFFFF",
                backgroundColor: "#3B5BDB",
                borderRadius: "9999px",
                boxShadow: "0 4px 12px rgba(59, 91, 219, 0.25)",
                transition: "all 0.15s",
              }}
            >
              Book In-Person Visit at Clinic
            </Link>
          </div>

          {/* Right - Map Placeholder */}
          <div
            style={{
              backgroundColor: "#E8EDF4",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
            }}
            className="p-8 md:p-12"
          >
            {/* Location Pin Icon */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "#D4DFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="#3B5BDB"
                stroke="#3B5BDB"
                strokeWidth="1"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Address */}
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#1A1A2E",
                textAlign: "center",
                marginBottom: "6px",
              }}
            >
              DLF Phase 1, Golf Course Road
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#6B7280",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              F10/12B Independent Floors, Gurgaon
            </p>

            {/* Google Maps Button */}
            <a
              href="https://maps.google.com/?q=DLF+Phase+1+Golf+Course+Road+Gurgaon"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#3B5BDB",
                backgroundColor: "#FFFFFF",
                border: "1px solid #D1D5DB",
                borderRadius: "9999px",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              Open in Google Maps
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
