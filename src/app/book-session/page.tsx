import { Suspense } from "react";
import SafetyBanner from "@/components/SafetyBanner";
import Navbar from "@/components/Navbar";
import BookingSystem from "@/components/BookingSystem";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Book a Session | Pause for Love",
  description: "Book your therapy session with Neha, M.A. Psychology. Choose between in-person at Gurgaon clinic or online via Zoom.",
};

export default function BookSessionPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <SafetyBanner />
      <Navbar />
      <div>
        <Suspense>
          <BookingSystem />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
