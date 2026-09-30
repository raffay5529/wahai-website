"use client";

import FaqSection from "@/components/FaqSection";
import FeatureSection from "@/components/FeatureSection";
import FooterSection from "@/components/FooterSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MeetingSection from "@/components/MeetingSection";
import PricingSection from "@/components/PricingSection";
import ResponsibleSection from "@/components/ResponsibleSection";
import UndetectableSection from "@/components/UndetectableSection";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <HeroSection />
      <VideoSection/>
      <FeatureSection/>
      <MeetingSection/>
      <UndetectableSection/>
      <PricingSection/>
      <FaqSection/>
      <ResponsibleSection/>
      <FooterSection/>
    </main>
  );
}