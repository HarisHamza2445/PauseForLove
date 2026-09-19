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
import MindfulPause from "@/components/MindfulPause";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <SafetyBanner />
      <Navbar />
      <HeroSection />
      <div id="about"><AboutTherapist /></div>
      <div id="specializations"><TherapeuticFocus /></div>
      <div id="match-quiz"><TherapyMatchQuiz /></div>
      <div id="services"><PricingSection /></div>
      <Suspense>
        <BookingSystem />
      </Suspense>
      <div id="clinic"><LocationSection /></div>
      <div id="mindful-space"><MindfulPause /></div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
