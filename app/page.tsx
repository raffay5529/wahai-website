"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <HeroSection />
    </main>
  );
}