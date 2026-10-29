import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Public: a client submits feedback. It is saved hidden until the admin approves it.
export async function POST(req: Request) {
  try {
    const { client_name, content, rating } = await req.json();
    const name = String(client_name || "").trim().slice(0, 80);
    const text = String(content || "").trim().slice(0, 2000);
    const stars = Math.min(5, Math.max(1, Number(rating) || 5));

    if (!name || text.length < 10) {
      return NextResponse.json({ error: "Please add your name and at least a short message." }, { status: 400 });
    }

    const { error } = await supabase
      .from("testimonials")
      .insert({ client_name: name, content: text, rating: stars, is_visible: false });

    if (error) {
      console.error("Feedback insert error:", error);
      return NextResponse.json({ error: "Could not save feedback. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
