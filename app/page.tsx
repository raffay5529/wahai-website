"use client";

import FeatureSection from "@/components/FeatureSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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
    </main>
  );
}