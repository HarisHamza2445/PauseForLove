export default function SafetyBanner() {
  return (
    <div
      className="border-b"
      style={{
        backgroundColor: "#FEF2F2",
        borderColor: "#FECACA",
      }}
    >
      {/* Line 1: Badge + Crisis message */}
      <div
        className="mx-auto flex flex-wrap items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-12"
        style={{
          maxWidth: "1400px",
          paddingTop: "8px",
          paddingBottom: "2px",
        }}
      >
        <span
          className="inline-flex items-center whitespace-nowrap"
          style={{
            backgroundColor: "#B91C1C",
            color: "#FFFFFF",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            padding: "3px 8px",
            borderRadius: "9999px",
            textTransform: "uppercase",
          }}
        >
          IMMEDIATE SAFETY
        </span>
        <span
          className="hidden sm:inline"
          style={{
            color: "#4A4A4A",
            fontSize: "13px",
            fontWeight: 400,
          }}
        >
          If you or someone you love is experiencing an acute psychological
          crisis or self-harm emergency, please dial:
        </span>
        <span
          className="sm:hidden"
          style={{
            color: "#4A4A4A",
            fontSize: "11px",
            fontWeight: 400,
          }}
        >
          In crisis? Call now:
        </span>
      </div>

      {/* Line 2: Phone numbers */}
      <div
        className="mx-auto flex flex-wrap items-center px-3 sm:px-4 lg:px-12"
        style={{
          maxWidth: "1400px",
          paddingBottom: "8px",
          paddingTop: "2px",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#1A1A2E",
          }}
        >
          Tele-MANAS:&nbsp;
          <a
            href="tel:14416"
            style={{
              color: "#3B5BDB",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            14416
          </a>
        </span>
        <span className="hidden sm:inline" style={{ color: "#9CA3AF", fontSize: "12px" }}>|</span>
        <br className="sm:hidden" />
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#1A1A2E",
          }}
        >
          Vandrevala:&nbsp;
          <a
            href="tel:+919999666555"
            style={{
              color: "#3B5BDB",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            +91 9999 666 555
          </a>
        </span>
        <span
          className="hidden sm:inline"
          style={{
            fontSize: "11px",
            color: "#6B7280",
          }}
        >
          (24x7 Free &amp; Confidential)
        </span>
      </div>
    </div>
  );
}
