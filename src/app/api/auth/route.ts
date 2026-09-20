import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { action, username, password, new_username, new_password } = await req.json();

    if (action === "login") {
      const { data } = await supabase
        .from("settings")
        .select("setting_key, setting_value")
        .in("setting_key", ["admin_username", "admin_password"]);

      const savedUser = data?.find(d => d.setting_key === "admin_username")?.setting_value || "Neha";
      const savedPass = data?.find(d => d.setting_key === "admin_password")?.setting_value || "Neha@2026";

      if (username === savedUser && password === savedPass) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ success: false, error: "Invalid credentials" });
    }

    if (action === "update") {
      const updates = [];
      if (new_username) {
        updates.push(
          supabase.from("settings").upsert(
            { setting_key: "admin_username", setting_value: new_username, category: "admin" },
            { onConflict: "setting_key" }
          )
        );
      }
      if (new_password) {
        updates.push(
          supabase.from("settings").upsert(
            { setting_key: "admin_password", setting_value: new_password, category: "admin" },
            { onConflict: "setting_key" }
          )
        );
      }
      await Promise.all(updates);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
