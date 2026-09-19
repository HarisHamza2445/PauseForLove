"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setSubmitMessage("Thank you! Your message has been sent successfully.");
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setIsSuccess(false);
        setSubmitMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setIsSuccess(false);
      setSubmitMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ backgroundColor: "#FFFFFF" }}>
      <div
        className="mx-auto px-6 py-16 lg:px-12 lg:py-24"
        style={{ maxWidth: "700px" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#EEF2FF",
              color: "#3B5BDB",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              padding: "6px 14px",
              borderRadius: "9999px",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Get in Touch
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "#1A1A2E",
              marginBottom: "12px",
            }}
          >
            Send Us a Message
          </h2>
          <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.6 }}>
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "14px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "14px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "14px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "14px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "14px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {submitMessage && (
            <div
              style={{
                padding: "12px 16px",
                marginBottom: "20px",
                fontSize: "14px",
                fontWeight: 500,
                color: isSuccess ? "#059669" : "#DC2626",
                backgroundColor: isSuccess ? "#D1FAE5" : "#FEE2E2",
                borderRadius: "8px",
              }}
            >
              {submitMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#FFFFFF",
              backgroundColor: isSubmitting ? "#93C5FD" : "#3B5BDB",
              border: "none",
              borderRadius: "9999px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
