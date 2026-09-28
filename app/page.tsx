"use client";

import Header from "@/components/Header";
import TechText from "../components/TechText";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#000" }}>
      <Header/>
      <div style={{ width: "100%", height: "480px", position: "relative" }}>
        <TechText
          text="Raffay"
          fontWeight={600}
          fontSize={150}
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={15}
          fontFamily="sans-serif"
          color="#ffffff"
          accentColor="#ffffff"
          letterSpacing={-0.05}
          reach={200}
          softness={0.7}
          strokeWidth={1.5}
          speed={1}
          lineStyle="dashed"
          selection
          labels
          draggable
          sweep
        />
      </div>
    </main>
  );
}