"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const steps = [
  { id: 1, label: "Format" },
  { id: 2, label: "Date & Time" },
  { id: 3, label: "Intake Details" },
  { id: 4, label: "Confirmation" },
];

const formats = [
  {
    id: "in-person",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="6" x2="9" y2="6.01" />
        <line x1="15" y1="6" x2="15" y2="6.01" />
        <line x1="9" y1="10" x2="9" y2="10.01" />
        <line x1="15" y1="10" x2="15" y2="10.01" />
        <line x1="9" y1="14" x2="9" y2="14.01" />
        <line x1="15" y1="14" x2="15" y2="14.01" />
        <line x1="9" y1="18" x2="15" y2="18" />
      </svg>
    ),
    title: "Gurgaon Clinic (In-Person)",
    address: "DLF Phase 1, Golf Course Road, Gurgaon",
    tag: "Quiet, confidential consulting suite",
    tagColor: "#059669",
    tagBg: "#ECFDF5",
  },
  {
    id: "online",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Online Consultation (Zoom)",
    address: "Secure, end-to-end encrypted video link",
    tag: "Join securely anywhere across India",
    tagColor: "#3B5BDB",
    tagBg: "#EEF2FF",
  },
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export default function BookingSystem() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bookingSuccess && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [bookingSuccess]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,5}[-\s\.]?[0-9]{3,5}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!form.notes.trim()) {
      newErrors.notes = "Please tell us what brings you to therapy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return days;
  }, [currentMonth]);

  const isWeekend = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const isPastDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear();
  };

  const handleDateClick = (day: number) => {
    if (isWeekend(day) || isPastDate(day)) return;
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    setSelectedTime(null);
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedFormat;
    if (currentStep === 2) return !!selectedDate && !!selectedTime;
    if (currentStep === 3) return form.fullName.trim() !== "" && form.email.trim() !== "" && form.notes.trim() !== "";
    return true;
  };

  const handleContinue = () => {
    if (currentStep === 3) {
      if (!validateStep3()) return;
    }
    if (currentStep < 4 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleConfirmBooking = async () => {
    if (!selectedFormat || !selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    setBookingError("");

    try {
      const dateStr = selectedDate.toISOString().split("T")[0];
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          email: form.email,
          phone: form.phone || null,
          service_type: planParam || "consultation",
          format: selectedFormat,
          preferred_date: dateStr,
          preferred_time: selectedTime,
          notes: form.notes || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setBookingError(data.error || "Failed to create booking. Please try again.");
      } else {
        setBookingSuccess(true);
      }
    } catch {
      setBookingError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <section ref={sectionRef} style={{ backgroundColor: "#FAF8F5" }}>
        <div className="mx-auto px-6 py-16 lg:px-12 lg:py-24" style={{ maxWidth: "900px" }}>
          {/* Step Indicator - All Complete */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "40px" }}>
            {steps.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  backgroundColor: "#22C55E", color: "#FFF",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: 600,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 500, color: "#22C55E" }}>{s.label}</span>
                {i < steps.length - 1 && <div style={{ width: "24px", height: "2px", backgroundColor: "#22C55E", borderRadius: "1px" }} />}
              </div>
            ))}
          </div>

          <div className="px-4 py-12 sm:px-10 sm:py-16" style={{
            backgroundColor: "#FFFFFF", borderRadius: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)",
            border: "1px solid #E5E7EB", textAlign: "center",
          }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#F0FDF4",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
              animation: "fadeInUp 0.5s ease",
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, color: "#1A1A2E", marginBottom: "12px" }}>
              Booking Confirmed!
            </h2>
            <p style={{ fontSize: "16px", color: "#4B5563", lineHeight: 1.7, marginBottom: "8px" }}>
              Thank you, <strong>{form.fullName}</strong>. Your session has been booked.
            </p>
            <p style={{ fontSize: "15px", color: "#6B7280", marginBottom: "32px" }}>
              {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} at {selectedTime} &bull; {selectedFormat === "in-person" ? "Gurgaon Clinic" : "Online (Zoom)"}
            </p>
            <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "32px" }}>
              A confirmation email has been sent to <strong>{form.email}</strong>.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/" className="btn-primary" style={{ padding: "12px 28px", fontSize: "14px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Back to Home
              </a>
              <button onClick={() => window.location.reload()} style={{
                padding: "12px 28px", fontSize: "14px", fontWeight: 600, color: "#3B5BDB",
                backgroundColor: "transparent", border: "2px solid #3B5BDB", borderRadius: "9999px",
                cursor: "pointer", transition: "all 0.25s ease",
              }}>
                Book Another Session
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#FAF8F5" }}>
      <div className="mx-auto px-6 py-16 lg:px-12 lg:py-24" style={{ maxWidth: "900px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            backgroundColor: "#EEF2FF", color: "#3B5BDB", fontSize: "12px",
            fontWeight: 600, letterSpacing: "0.08em", padding: "8px 16px",
            borderRadius: "9999px", marginBottom: "24px", textTransform: "uppercase",
          }}>
            Schedule Consultation
          </div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700, lineHeight: 1.15, color: "#1A1A2E",
            marginBottom: "20px", letterSpacing: "-0.01em",
          }}>
            Client Booking System
          </h2>
          <p style={{ fontSize: "17px", color: "#4B5563", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto" }}>
            Reserve your 1-hour session or free discovery call in four seamless steps. Mon–Fri from 9:00 AM to 5:00 PM.
          </p>
        </div>

        {/* Booking Card */}
        <div style={{
          backgroundColor: "#FFFFFF", borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)",
          border: "1px solid #E5E7EB", overflow: "hidden",
        }}>
          {/* Steps Navigation */}
          <div style={{ display: "flex", borderBottom: "1px solid #E5E7EB", overflowX: "auto", WebkitOverflowScrolling: "touch" as const }}>
            {steps.map((step) => (
              <div key={step.id} style={{
                flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                padding: "20px 16px", minWidth: "fit-content",
                borderBottom: currentStep === step.id ? "3px solid #3B5BDB" : "3px solid transparent",
                backgroundColor: currentStep === step.id ? "#FAFAFA" : "transparent",
              }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  backgroundColor: currentStep >= step.id ? "#3B5BDB" : "#E5E7EB",
                  color: currentStep >= step.id ? "#FFFFFF" : "#9CA3AF",
                  fontSize: "12px", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {currentStep > step.id ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : step.id}
                </div>
                <span style={{
                  fontSize: "14px", fontWeight: currentStep === step.id ? 600 : 400,
                  color: currentStep === step.id ? "#1A1A2E" : "#6B7280", whiteSpace: "nowrap",
                }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="px-6 py-8 sm:px-8 lg:px-10">
            {/* Step 1: Format */}
            {currentStep === 1 && (
              <>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1A1A2E", marginBottom: "8px" }}>
                  Step 1: Choose Your Preferred Format
                </h3>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.5, marginBottom: "32px" }}>
                  Choose whether you would like to meet in person at the Gurgaon clinic or remotely online.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "20px", marginBottom: "32px" }}>
                  {formats.map((format) => (
                    <button key={format.id} onClick={() => setSelectedFormat(format.id)} style={{
                      padding: "32px 24px",
                      backgroundColor: selectedFormat === format.id ? "#EEF2FF" : "#FFFFFF",
                      border: selectedFormat === format.id ? "2px solid #3B5BDB" : "1px solid #E5E7EB",
                      borderRadius: "12px", cursor: "pointer", textAlign: "center", transition: "all 0.15s",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                        {format.icon}
                      </div>
                      <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#1A1A2E", marginBottom: "8px" }}>{format.title}</h4>
                      <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5, marginBottom: "12px" }}>{format.address}</p>
                      <span style={{ display: "inline-block", fontSize: "12px", fontWeight: 500, color: format.tagColor, backgroundColor: format.tagBg, padding: "4px 12px", borderRadius: "9999px" }}>
                        {format.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 2: Date & Time */}
            {currentStep === 2 && (
              <>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1A1A2E", marginBottom: "8px" }}>
                  Step 2: Select Date & Time
                </h3>
                <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "24px" }}>
                  Pick an available slot that works for your schedule.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "32px" }}>
                  {/* Calendar */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{
                        width: "36px", height: "36px", borderRadius: "8px", border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                      </button>
                      <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#1A1A2E" }}>
                        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </h4>
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{
                        width: "36px", height: "36px", borderRadius: "8px", border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
                      {DAYS.map((day) => (
                        <div key={day} style={{ textAlign: "center", fontSize: "12px", fontWeight: 600, color: "#9CA3AF", padding: "8px 0" }}>
                          {day}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                      {calendarDays.map((day, index) => {
                        if (day === null) return <div key={`empty-${index}`} />;
                        const weekend = isWeekend(day);
                        const past = isPastDate(day);
                        const selected = isDateSelected(day);
                        const disabled = weekend || past;

                        return (
                          <button key={day} onClick={() => handleDateClick(day)} disabled={disabled} style={{
                            width: "100%", aspectRatio: "1", borderRadius: "8px", border: selected ? "2px solid #3B5BDB" : "1px solid transparent",
                            backgroundColor: selected ? "#3B5BDB" : disabled ? "#F9FAFB" : "transparent",
                            color: selected ? "#FFFFFF" : disabled ? "#D1D5DB" : "#374151",
                            fontSize: "14px", fontWeight: selected ? 600 : 400, cursor: disabled ? "not-allowed" : "pointer",
                            transition: "all 0.1s",
                          }}>
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    <div style={{ marginTop: "12px", fontSize: "12px", color: "#9CA3AF" }}>
                      * Available Mon–Fri only
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A2E", marginBottom: "16px" }}>
                      {selectedDate ? `Available Times for ${selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}` : "Select a date first"}
                    </h4>

                    {selectedDate ? (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        {timeSlots.map((time) => (
                          <button key={time} onClick={() => setSelectedTime(time)} style={{
                            padding: "14px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: 500, cursor: "pointer",
                            border: selectedTime === time ? "2px solid #3B5BDB" : "1px solid #E5E7EB",
                            backgroundColor: selectedTime === time ? "#EEF2FF" : "#FFFFFF",
                            color: selectedTime === time ? "#3B5BDB" : "#374151",
                            transition: "all 0.1s",
                          }}>
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{
                        padding: "40px", textAlign: "center", backgroundColor: "#F9FAFB",
                        borderRadius: "12px", border: "1px dashed #E5E7EB",
                      }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 12px" }}>
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        <p style={{ fontSize: "13px", color: "#9CA3AF" }}>Pick a date to see available times</p>
                      </div>
                    )}

                    {selectedDate && selectedTime && (
                      <div style={{
                        marginTop: "16px", padding: "16px", backgroundColor: "#F0FDF4",
                        borderRadius: "10px", border: "1px solid #BBF7D0",
                      }}>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#166534", margin: 0 }}>
                          ✓ Selected: {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Intake Details */}
            {currentStep === 3 && (
              <>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1A1A2E", marginBottom: "8px" }}>
                  Step 3: Intake Details
                </h3>
                <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "24px" }}>
                  Share a bit about yourself so we can prepare for your session.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "20px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Full Name *</label>
                    <input type="text" placeholder="Your full name" value={form.fullName} onChange={e => { setForm({ ...form, fullName: e.target.value }); if (errors.fullName) setErrors(prev => { const n = { ...prev }; delete n.fullName; return n; }); }}
                      style={{ width: "100%", padding: "12px 16px", fontSize: "14px", border: errors.fullName ? "2px solid #DC2626" : "1px solid #E5E7EB", borderRadius: "10px", outline: "none", boxSizing: "border-box", backgroundColor: errors.fullName ? "#FEF2F2" : "#FFFFFF" }} />
                    {errors.fullName && <p style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>{errors.fullName}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Email *</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors(prev => { const n = { ...prev }; delete n.email; return n; }); }}
                      style={{ width: "100%", padding: "12px 16px", fontSize: "14px", border: errors.email ? "2px solid #DC2626" : "1px solid #E5E7EB", borderRadius: "10px", outline: "none", boxSizing: "border-box", backgroundColor: errors.email ? "#FEF2F2" : "#FFFFFF" }} />
                    {errors.email && <p style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>{errors.email}</p>}
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Phone Number *</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => { setForm({ ...form, phone: e.target.value }); if (errors.phone) setErrors(prev => { const n = { ...prev }; delete n.phone; return n; }); }}
                    style={{ width: "100%", padding: "12px 16px", fontSize: "14px", border: errors.phone ? "2px solid #DC2626" : "1px solid #E5E7EB", borderRadius: "10px", outline: "none", boxSizing: "border-box", backgroundColor: errors.phone ? "#FEF2F2" : "#FFFFFF" }} />
                  {errors.phone && <p style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>What brings you to therapy? *</label>
                  <textarea rows={4} placeholder="Tell us briefly..." value={form.notes} onChange={e => { setForm({ ...form, notes: e.target.value }); if (errors.notes) setErrors(prev => { const n = { ...prev }; delete n.notes; return n; }); }}
                    style={{ width: "100%", padding: "12px 16px", fontSize: "14px", border: errors.notes ? "2px solid #DC2626" : "1px solid #E5E7EB", borderRadius: "10px", outline: "none", resize: "vertical", boxSizing: "border-box", backgroundColor: errors.notes ? "#FEF2F2" : "#FFFFFF" }} />
                  {errors.notes && <p style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>{errors.notes}</p>}
                </div>
              </>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1A1A2E", marginBottom: "8px" }}>
                  Step 4: Review & Confirm
                </h3>
                <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "24px" }}>
                  Please review your booking details before confirming.
                </p>

                {bookingError && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "12px 16px", marginBottom: "20px", fontSize: "14px",
                    color: "#DC2626", backgroundColor: "#FEF2F2",
                    borderRadius: "10px", border: "1px solid #FECACA",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                    {bookingError}
                  </div>
                )}

                <div style={{ backgroundColor: "#F9FAFB", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "20px" }}>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "4px" }}>Name</p>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#1A1A2E" }}>{form.fullName || "—"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "4px" }}>Email</p>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#1A1A2E" }}>{form.email || "—"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "4px" }}>Format</p>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#1A1A2E", textTransform: "capitalize" }}>{selectedFormat?.replace("-", " ") || "—"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "4px" }}>Date</p>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#1A1A2E" }}>
                        {selectedDate ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "—"}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "4px" }}>Time</p>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#1A1A2E" }}>{selectedTime || "—"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "4px" }}>Duration</p>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#1A1A2E" }}>60 minutes</p>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "center", padding: "24px", backgroundColor: "#F0FDF4", borderRadius: "12px", border: "1px solid #BBF7D0" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 12px" }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "#166534", marginBottom: "4px" }}>Ready to book!</p>
                  <p style={{ fontSize: "13px", color: "#15803D" }}>Click confirm to reserve your session</p>
                </div>
              </>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="px-6 pb-8 sm:px-8 sm:pb-10" style={{ display: "flex", justifyContent: "space-between" }}>
            {currentStep > 1 ? (
              <button onClick={handleBack} disabled={isSubmitting} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 24px", fontSize: "14px", fontWeight: 600,
                color: "#6B7280", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB",
                borderRadius: "9999px", cursor: isSubmitting ? "not-allowed" : "pointer",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                Back
              </button>
            ) : <div />}

            <button
              onClick={currentStep === 4 ? handleConfirmBooking : handleContinue}
              disabled={!canProceed() || isSubmitting}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", fontSize: "14px", fontWeight: 600,
                color: canProceed() && !isSubmitting ? "#FFFFFF" : "#9CA3AF",
                backgroundColor: canProceed() && !isSubmitting ? "#3B5BDB" : "#E5E7EB",
                border: "none", borderRadius: "9999px",
                cursor: canProceed() && !isSubmitting ? "pointer" : "not-allowed",
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#FFF", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  Booking...
                </>
              ) : currentStep === 4 ? "Confirm Booking" : (
                <>
                  Continue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
