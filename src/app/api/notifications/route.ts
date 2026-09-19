import { NextResponse } from "next/server";
import { notifyBookingConfirmed, notifyBookingCancelled } from "@/lib/notifications";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, booking } = body;

    if (!action || !booking) {
      return NextResponse.json({ error: "Missing action or booking data" }, { status: 400 });
    }

    const bookingData = {
      full_name: booking.full_name,
      email: booking.email,
      phone: booking.phone || undefined,
      format: booking.format,
      preferred_date: booking.preferred_date || "",
      preferred_time: booking.preferred_time || "",
      service_type: booking.service_type || "consultation",
    };

    let result;
    if (action === "confirmed") {
      result = await notifyBookingConfirmed(bookingData);
    } else if (action === "cancelled") {
      result = await notifyBookingCancelled(bookingData);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, results: result }, { status: 200 });
  } catch (err) {
    console.error("Notification API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
