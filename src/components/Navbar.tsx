"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Specializations", href: "#specializations", id: "specializations" },
  { label: "Match Quiz", href: "#match-quiz", id: "match-quiz", lines: 2 },
  { label: "Services & Fees", href: "#services", id: "services", lines: 2 },
  { label: "Gurgaon Clinic", href: "#clinic", id: "clinic", lines: 2 },
  { label: "Mindful Space", href: "#mindful-space", id: "mindful-space", lines: 2 },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);

    const handleScroll = () => {
      const navBottom = 120;
      let current = sectionIds[0];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= navBottom && rect.bottom > navBottom) {
          current = sectionIds[i];
          break;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-4 lg:px-12"
        style={{
          maxWidth: "1400px",
          height: "80px",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div style={{ flexShrink: 0, lineHeight: 0 }}>
            <Image
              src="/logo.png"
              alt="Pause for Love Logo"
              width={96}
              height={96}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div
          className="hidden lg:flex items-center"
          style={{ gap: "4px" }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-center"
                style={{
                  padding: "8px 14px",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#3B5BDB" : "#374151",
                  backgroundColor: isActive ? "#EEF2FF" : "transparent",
                  lineHeight: link.lines === 2 ? 1.3 : 1.5,
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side buttons */}
        <div className="hidden lg:flex items-center shrink-0" style={{ gap: "12px" }}>
          <Link
            href="/admin"
            className="flex items-center"
            style={{
              gap: "6px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Admin Portal
          </Link>

          <Link
            href="/free-call"
            style={{
              padding: "10px 24px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#3B5BDB",
              border: "2px solid #3B5BDB",
              borderRadius: "9999px",
              whiteSpace: "nowrap",
            }}
          >
            Free 15-Min Call
          </Link>

          <Link
            href="/book-session"
            style={{
              padding: "10px 24px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#FFFFFF",
              backgroundColor: "#3B5BDB",
              borderRadius: "9999px",
              whiteSpace: "nowrap",
            }}
          >
            Book Session
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          style={{ padding: "8px", borderRadius: "8px" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{
            borderTop: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div style={{ padding: "12px 24px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  padding: "10px 12px",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: activeSection === link.id ? "#3B5BDB" : "#374151",
                  backgroundColor: activeSection === link.id ? "#EEF2FF" : "transparent",
                  borderRadius: "8px",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr style={{ margin: "8px 0", border: "none", borderTop: "1px solid #E5E7EB" }} />
            <Link
              href="/admin"
              style={{
                display: "block",
                padding: "10px 12px",
                fontSize: "15px",
                fontWeight: 500,
                color: "#374151",
                borderRadius: "8px",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Admin Portal
            </Link>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "8px" }}>
              <Link href="/free-call" style={{ textAlign: "center", padding: "10px 20px", fontSize: "15px", fontWeight: 600, color: "#3B5BDB", border: "2px solid #3B5BDB", borderRadius: "9999px" }}>
                Free 15-Min Call
              </Link>
              <Link href="/book-session" style={{ textAlign: "center", padding: "10px 20px", fontSize: "15px", fontWeight: 600, color: "#FFFFFF", backgroundColor: "#3B5BDB", borderRadius: "9999px" }}>
                Book Session
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
