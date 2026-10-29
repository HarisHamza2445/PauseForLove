import { Suspense } from "react";
import SafetyBanner from "@/components/SafetyBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutTherapist from "@/components/AboutTherapist";
import TherapeuticFocus from "@/components/TherapeuticFocus";
import TherapyMatchQuiz from "@/components/TherapyMatchQuiz";
import PricingSection from "@/components/PricingSection";
import BookingSystem from "@/components/BookingSystem";
import LocationSection from "@/components/LocationSection";
import FeedbackSection from "@/components/FeedbackSection";
import MindfulPause from "@/components/MindfulPause";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getSiteData } from "@/lib/site-data";

// Render on every request so admin edits show up immediately.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { content: c, services, testimonials } = await getSiteData();

  return (
    <div className="min-h-screen bg-[#E0F2FE]">
      <SafetyBanner c={c} />
      <Navbar c={c} />
      <HeroSection c={c} />
      <div id="about"><AboutTherapist c={c} /></div>
      <div id="specializations"><TherapeuticFocus c={c} /></div>
      <div id="match-quiz"><TherapyMatchQuiz c={c} /></div>
      <div id="services"><PricingSection c={c} services={services} /></div>
      <Suspense>
        <BookingSystem c={c} />
      </Suspense>
      <div id="clinic"><LocationSection c={c} /></div>
      <div id="feedback"><FeedbackSection c={c} testimonials={testimonials} /></div>
      <div id="mindful-space"><MindfulPause c={c} /></div>
      <Footer c={c} />
      <ScrollToTop />
    </div>
  );
}
