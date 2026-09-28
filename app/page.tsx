"use client";

import Header from "@/components/Header";
import GradientText from "@/components/GradientText";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f1fae9 0%, #e0f3d3 50%, #e6f2cd 100%)",
      }}
    >
      <Header />

      <div
        style={{
          width: "100%",
          height: "480px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        <h1
          className="hero-title"
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: "clamp(2rem, 5.75vw, 4.5rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            color: "#151515",
          }}
        >
          #1{" "}
          <GradientText
            colors={["#6d28d9", "#a855f7", "#6d28d9"]}
            animationSpeed={2}
            showBorder={false}
            className="hero-gradient"
          >
            Undetectable
          </GradientText>
          <br />
          AI Call Assistant
        </h1>

        <p
          style={{
            margin: "18px 0 0",
            maxWidth: "620px",
            textAlign: "center",
            fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
            fontWeight: 450,
            lineHeight: 1.6,
            color: "#6b7280",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          Get real-time answers and talking points during interviews, sales
          calls, and client meetings, so you never get stuck for words.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginTop: "28px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "12px",
              border: "none",
              background: "#151515",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
            }}
          >
            Try for Free
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 24px",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.06)",
              background: "#ffffff",
              color: "#151515",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
            Demo Video
          </button>
        </div>
      </div>

      {/* Lets GradientText sit inline inside the heading instead of as its own block */}
      <style>{`
        .hero-title .hero-gradient {
          display: inline-flex;
          margin: 0;
          padding: 0;
          overflow: visible;
          border-radius: 0;
          backdrop-filter: none;
          cursor: inherit;
          font-weight: inherit;
          vertical-align: baseline;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-title .hero-gradient .text-content {
            animation: none !important;
            background-position: 0% 50% !important;
          }
        }
      `}</style>
    </main>
  );
}