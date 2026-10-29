import { DEFAULT_CONTENT, parseContent, SITE_CONTENT_KEY, type SiteContent } from "./content";

export type PublicService = {
  id: string;
  title: string;
  subtitle: string | null;
  price: string;
  price_note: string | null;
  features: string[] | null;
  is_popular: boolean;
};

export type Testimonial = {
  id: string;
  client_name: string;
  content: string;
  rating: number;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
};

export type SiteData = {
  content: SiteContent;
  services: PublicService[] | null; // null = use built-in plans
  testimonials: Testimonial[];
};

// Loads everything the homepage needs. Falls back to defaults if the
// database is unreachable so the site never goes blank.
export async function getSiteData(): Promise<SiteData> {
  const fallback: SiteData = { content: { ...DEFAULT_CONTENT }, services: null, testimonials: [] };
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return fallback;

  try {
    const { supabase } = await import("./supabase");
    const [contentRes, servicesRes, testimonialsRes] = await Promise.all([
      supabase.from("settings").select("setting_value").eq("setting_key", SITE_CONTENT_KEY).maybeSingle(),
      supabase.from("services").select("*").eq("is_active", true).order("sort_order"),
      supabase.from("testimonials").select("*").eq("is_visible", true).order("sort_order").order("created_at", { ascending: false }),
    ]);
    return {
      content: parseContent(contentRes.data?.setting_value),
      services: servicesRes.data && servicesRes.data.length > 0 ? servicesRes.data : null,
      testimonials: testimonialsRes.data || [],
    };
  } catch (e) {
    console.error("getSiteData failed:", e);
    return fallback;
  }
}
