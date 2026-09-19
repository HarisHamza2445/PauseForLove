import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function convertTo24Hour(time12h: string): string {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, service_type, format, preferred_date, preferred_time, notes } = body;

    if (!full_name || !email || !phone || !service_type || !format) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const time24 = preferred_time && /^\d{1,2}:\d{2}\s?(AM|PM)$/i.test(preferred_time)
      ? convertTo24Hour(preferred_time)
      : null;

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          full_name,
          email,
          phone,
          service_type,
          format,
          preferred_date: preferred_date || null,
          preferred_time: time24,
          notes: notes || null,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", JSON.stringify(error));
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Booking created successfully", booking: data[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch bookings" },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookings: data });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
