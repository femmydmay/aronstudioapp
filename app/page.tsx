// app/page.tsx
"use client";

import Navbar from "@/components/landing/navbar";
import HeroSection from "@/components/landing/hero";
import FeaturesSection from "@/components/landing/features";
import HowItWorksSection from "@/components/landing/how-it-works";
import CTASection from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
