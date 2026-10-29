import { Suspense } from "react";
import SafetyBanner from "@/components/SafetyBanner";
import Navbar from "@/components/Navbar";
import BookingSystem from "@/components/BookingSystem";
import Footer from "@/components/Footer";
import { getSiteData } from "@/lib/site-data";

export const metadata = {
  title: "Book a Session | Pause for Love",
  description: "Book your therapy session with Neha, M.A. Psychology. Choose between in-person at Gurgaon clinic or online via Zoom.",
};

export const dynamic = "force-dynamic";

export default async function BookSessionPage() {
  const { content: c } = await getSiteData();
  return (
    <div className="min-h-screen bg-[#E0F2FE]">
      <SafetyBanner c={c} />
      <Navbar c={c} />
      <div>
        <Suspense>
          <BookingSystem c={c} />
        </Suspense>
      </div>
      <Footer c={c} />
    </div>
  );
}
