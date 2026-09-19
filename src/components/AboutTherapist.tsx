export default function AboutTherapist() {
  return (
    <section style={{ backgroundColor: "#FAF8F5" }}>
      <div
        className="mx-auto px-6 py-16 lg:px-12 lg:py-24"
        style={{ maxWidth: "1100px" }}
      >
        {/* Top - Image + Bio */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          {/* Profile Image */}
          <div
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: "28px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              border: "5px solid #FFFFFF",
              flexShrink: 0,
            }}
            className="w-40 h-40 sm:w-56 sm:h-56"
          >
            <img
              src="/Neha.jpeg"
              alt="Neha - Therapist"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                imageRendering: "auto",
                WebkitFontSmoothing: "antialiased",
              }}
            />
          </div>

          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#EEF2FF",
              color: "#3B5BDB",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "6px 14px",
              borderRadius: "9999px",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            About Your Therapist
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "#1A1A2E",
              lineHeight: 1.15,
              marginBottom: "24px",
              letterSpacing: "-0.01em",
            }}
          >
            Meet Neha, M.A.{" "}
            <span style={{ fontStyle: "italic" }}>Psychology</span>
          </h2>

          {/* Bio Paragraphs - Centered */}
          <div style={{ maxWidth: "640px" }}>
            <p
              style={{
                fontSize: "16px",
                color: "#4B5563",
                lineHeight: 1.75,
                marginBottom: "20px",
              }}
            >
              I believe that therapy is not about fixing what is broken; it is
              about uncovering the intrinsic wisdom and resilience that life
              trauma, toxic relationships, and chronic stress have obscured.
            </p>

            <p
              style={{
                fontSize: "16px",
                color: "#4B5563",
                lineHeight: 1.75,
                marginBottom: "32px",
              }}
            >
              Holding a Master&apos;s degree in Psychology with specialized
              post-graduate training in trauma-informed counseling and cognitive
              behavioral interventions, I combine clinical rigor with authentic
              human presence. I have helped hundreds of survivors of narcissistic
              abuse, divorce, panic disorders, and deep family estrangements
              rebuild their lives from a place of grounded self-worth.
            </p>

            {/* Quote */}
            <div
              style={{
                borderTop: "1px solid #E5E7EB",
                paddingTop: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "#1A1A2E",
                  lineHeight: 1.6,
                }}
              >
                &ldquo;When you pause for love, you start with
                yourself.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Bottom - Ethics Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
          }}
          className="p-6 sm:p-10"
        >
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "22px",
              fontWeight: 700,
              color: "#1A1A2E",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            Clinical Ethics{" "}
            <span style={{ fontStyle: "italic" }}>&amp; Standards</span>
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
              lineHeight: 1.5,
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            The non-negotiable principles anchoring every interaction:
          </p>

          {/* Ethics Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: "32px" }}
          >
            {/* 1 */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#EEF2FF",
                  color: "#3B5BDB",
                  fontSize: "18px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                1
              </div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1A1A2E",
                  marginBottom: "8px",
                }}
              >
                Strict Confidentiality Guarantee
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Everything shared within sessions or through our intake portal is
                fully confidential under standard psychological ethics.
              </p>
            </div>

            {/* 2 */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#EEF2FF",
                  color: "#3B5BDB",
                  fontSize: "18px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                2
              </div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1A1A2E",
                  marginBottom: "8px",
                }}
              >
                Zero-Gaslighting, Affirming Space
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Your experiences and emotional truths will never be minimized or
                doubted.
              </p>
            </div>

            {/* 3 */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#EEF2FF",
                  color: "#3B5BDB",
                  fontSize: "18px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                3
              </div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1A1A2E",
                  marginBottom: "8px",
                }}
              >
                Client-Paced Progression
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                You retain full agency over which memories, relationships, or
                coping systems we open up during each session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
