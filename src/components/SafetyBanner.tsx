import { DEFAULT_CONTENT, telHref, type SiteContent } from "@/lib/content";

export default function SafetyBanner({ c = DEFAULT_CONTENT }: { c?: SiteContent }) {
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
          {c["banner.badge"]}
        </span>
        <span
          className="hidden sm:inline"
          style={{
            color: "#4A4A4A",
            fontSize: "13px",
            fontWeight: 400,
          }}
        >
          {c["banner.message"]}
        </span>
        <span
          className="sm:hidden"
          style={{
            color: "#4A4A4A",
            fontSize: "11px",
            fontWeight: 400,
          }}
        >
          {c["banner.message_mobile"]}
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
          {c["banner.helpline1_name"]}:&nbsp;
          <a
            href={telHref(c["banner.helpline1_number"])}
            style={{
              color: "#3B5BDB",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            {c["banner.helpline1_number"]}
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
          {c["banner.helpline2_name"]}:&nbsp;
          <a
            href={telHref(c["banner.helpline2_number"])}
            style={{
              color: "#3B5BDB",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            {c["banner.helpline2_number"]}
          </a>
        </span>
        <span
          className="hidden sm:inline"
          style={{
            fontSize: "11px",
            color: "#6B7280",
          }}
        >
          {c["banner.note"]}
        </span>
      </div>
    </div>
  );
}
