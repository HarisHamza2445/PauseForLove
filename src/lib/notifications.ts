import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.FROM_EMAIL || "Pause for Love <notifications@pauseforlove.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pauseforlove.com";

interface BookingEmailData {
  full_name: string;
  email: string;
  format: string;
  preferred_date: string;
  preferred_time: string;
  service_type: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(timeStr: string): string {
  if (!timeStr) return "—";
  return timeStr;
}

const formatLabel: Record<string, string> = {
  "in-person": "Gurgaon Clinic (In-Person)",
  "online": "Online Consultation (Zoom)",
};

// ── Booking Confirmed Email ──
export async function sendBookingConfirmedEmail(booking: BookingEmailData) {
  if (!resend) {
    console.warn("Resend not configured — skipping email");
    return { ok: false, error: "Email service not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.email,
      subject: "Your Session is Confirmed — Pause for Love",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1A1A2E;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #F0FDF4; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
              <span style="font-size: 28px;">✓</span>
            </div>
            <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">Booking Confirmed!</h1>
            <p style="font-size: 14px; color: #6B7280; margin: 0;">Your therapy session has been confirmed.</p>
          </div>

          <div style="background: #F9FAFB; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
            <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 16px;">Session Details</h2>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6B7280; width: 120px;">Name</td>
                <td style="padding: 8px 0; font-weight: 500;">${booking.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Format</td>
                <td style="padding: 8px 0; font-weight: 500;">${formatLabel[booking.format] || booking.format}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Date</td>
                <td style="padding: 8px 0; font-weight: 500;">${formatDate(booking.preferred_date)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Time</td>
                <td style="padding: 8px 0; font-weight: 500;">${formatTime(booking.preferred_time)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Duration</td>
                <td style="padding: 8px 0; font-weight: 500;">60 minutes</td>
              </tr>
            </table>
          </div>

          ${booking.format === "online" ? `
          <div style="background: #EEF2FF; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; border: 1px solid #D6DFFF;">
            <p style="font-size: 13px; color: #3B5BDB; margin: 0;">
              📹 A Zoom link will be shared with you 1 hour before the session.
            </p>
          </div>
          ` : `
          <div style="background: #ECFDF5; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; border: 1px solid #A7F3D0;">
            <p style="font-size: 13px; color: #059669; margin: 0;">
              📍 Clinic Address: F10/12B, Second Floor, Independent Floors, Golf Course Road, DLF Phase 1, Gurgaon, Haryana 122002
            </p>
          </div>
          `}

          <div style="background: #FFF0F0; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; border: 1px solid #FECACA;">
            <p style="font-size: 13px; color: #C62828; margin: 0 0 4px; font-weight: 600;">Before your session:</p>
            <ul style="font-size: 13px; color: #7F1D1D; margin: 0; padding-left: 16px; line-height: 1.8;">
              <li>Find a quiet, private space</li>
              <li>Test your internet connection (for online)</li>
              <li>Keep a journal or notebook handy</li>
            </ul>
          </div>

          <p style="font-size: 14px; color: #6B7280; line-height: 1.6; margin-bottom: 24px;">
            If you need to reschedule or cancel, please contact us at least 24 hours in advance.
          </p>

          <div style="text-align: center; padding-top: 24px; border-top: 1px solid #E5E7EB;">
            <p style="font-size: 12px; color: #9CA3AF; margin: 0;">
              Pause for Love — Therapy & Mental Wellness<br/>
              DLF Phase 1, Gurgaon · Mon–Fri 9 AM – 5 PM
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  } catch (err) {
    console.error("Email send error:", err);
    return { ok: false, error: "Failed to send email" };
  }
}

// ── Booking Cancelled Email ──
export async function sendBookingCancelledEmail(booking: BookingEmailData) {
  if (!resend) {
    console.warn("Resend not configured — skipping email");
    return { ok: false, error: "Email service not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.email,
      subject: "Session Cancelled — Pause for Love",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1A1A2E;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #FEE2E2; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
              <span style="font-size: 28px;">✕</span>
            </div>
            <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">Session Cancelled</h1>
            <p style="font-size: 14px; color: #6B7280; margin: 0;">Your therapy session has been cancelled.</p>
          </div>

          <div style="background: #F9FAFB; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
            <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 16px;">Cancelled Session Details</h2>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6B7280; width: 120px;">Name</td>
                <td style="padding: 8px 0; font-weight: 500;">${booking.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Format</td>
                <td style="padding: 8px 0; font-weight: 500;">${formatLabel[booking.format] || booking.format}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Date</td>
                <td style="padding: 8px 0; font-weight: 500;">${formatDate(booking.preferred_date)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Time</td>
                <td style="padding: 8px 0; font-weight: 500;">${formatTime(booking.preferred_time)}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 14px; color: #6B7280; line-height: 1.6; margin-bottom: 24px;">
            If this was a mistake or you&apos;d like to rebook, you can schedule a new session anytime.
          </p>

          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${SITE_URL}/book-session" style="display: inline-block; padding: 12px 28px; font-size: 14px; font-weight: 600; color: #FFFFFF; background-color: #3B5BDB; border-radius: 9999px; text-decoration: none;">Rebook Session</a>
          </div>

          <div style="text-align: center; padding-top: 24px; border-top: 1px solid #E5E7EB;">
            <p style="font-size: 12px; color: #9CA3AF; margin: 0;">
              Pause for Love — Therapy & Mental Wellness<br/>
              DLF Phase 1, Gurgaon · Mon–Fri 9 AM – 5 PM
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  } catch (err) {
    console.error("Email send error:", err);
    return { ok: false, error: "Failed to send email" };
  }
}

// ── WhatsApp Notification ──
export async function sendWhatsAppNotification(
  phone: string,
  message: string
) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.warn("WhatsApp not configured — skipping");
    return { ok: false, error: "WhatsApp service not configured" };
  }

  if (!phone) {
    return { ok: false, error: "No phone number provided" };
  }

  const cleaned = phone.replace(/[^0-9]/g, "");
  const formatted = cleaned.startsWith("91") ? cleaned : `91${cleaned}`;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: formatted,
          type: "text",
          text: { body: message },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("WhatsApp API error:", data);
      return { ok: false, error: data.error?.message || "WhatsApp send failed" };
    }

    return { ok: true, data };
  } catch (err) {
    console.error("WhatsApp send error:", err);
    return { ok: false, error: "Failed to send WhatsApp message" };
  }
}

// ── Combined notification helpers ──
export async function notifyBookingConfirmed(booking: BookingEmailData & { phone?: string }) {
  const emailResult = await sendBookingConfirmedEmail(booking);

  let whatsappResult: { ok: boolean; error?: string; data?: unknown } = { ok: false, error: "Skipped" };
  if (booking.phone) {
    const fmtDate = booking.preferred_date
      ? new Date(booking.preferred_date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
      : "TBD";
    const fmtTime = booking.preferred_time
      ? (() => { const [h, m] = booking.preferred_time.split(":"); const hr = parseInt(h); return hr > 12 ? `${hr - 12}:${m} PM` : hr === 0 ? `12:${m} AM` : `${hr}:${m} AM`; })()
      : "TBD";
    const fmtFormat = booking.format === "in-person" ? "In-Person (Gurgaon Clinic)" : "Online (Zoom)";

    const msg = `Hello ${booking.full_name},

Your therapy session with *Pause for Love* has been confirmed.

*Session Details*
Date: ${fmtDate}
Time: ${fmtTime}
Duration: 60 minutes
Format: ${fmtFormat}
${booking.format === "online" ? "\nA Zoom meeting link will be shared with you 1 hour before the session." : "\nClinic Address: F10/12B, Golf Course Road, DLF Phase 1, Gurgaon"}

Before your session:
- Find a quiet, private space
- Test your internet connection (for online sessions)
- Keep a journal or notebook handy

If you need to reschedule, please let us know at least 24 hours in advance.

Warm regards,
Neha
Pause for Love`;

    whatsappResult = await sendWhatsAppNotification(booking.phone, msg);
  }

  return { email: emailResult, whatsapp: whatsappResult };
}

export async function notifyBookingCancelled(booking: BookingEmailData & { phone?: string }) {
  const emailResult = await sendBookingCancelledEmail(booking);

  let whatsappResult: { ok: boolean; error?: string; data?: unknown } = { ok: false, error: "Skipped" };
  if (booking.phone) {
    const fmtDate = booking.preferred_date
      ? new Date(booking.preferred_date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
      : "TBD";
    const fmtTime = booking.preferred_time
      ? (() => { const [h, m] = booking.preferred_time.split(":"); const hr = parseInt(h); return hr > 12 ? `${hr - 12}:${m} PM` : hr === 0 ? `12:${m} AM` : `${hr}:${m} AM`; })()
      : "TBD";

    const msg = `Hello ${booking.full_name},

We regret to inform you that your therapy session with *Pause for Love* has been cancelled.

*Cancelled Session*
Date: ${fmtDate}
Time: ${fmtTime}

If this was a mistake or you would like to rebook, you can schedule a new session at any time.

Warm regards,
Neha
Pause for Love`;

    whatsappResult = await sendWhatsAppNotification(booking.phone, msg);
  }

  return { email: emailResult, whatsapp: whatsappResult };
}
