"use client";

import GradientText from "@/components/GradientText";

// Logo files are served from your /public folder.
// If they are inside a subfolder, set it here, e.g. "/logos".
const LOGO_DIR = "";
const LOGOS = {
  zoom: `${LOGO_DIR}/zoom.webp`,
  team: `${LOGO_DIR}/team.webp`,
  meet: `${LOGO_DIR}/meet.webp`,
  cisco: `${LOGO_DIR}/cisco.webp`,
  hackerrank: `${LOGO_DIR}/hackerrank.webp`,
  leetcode: `${LOGO_DIR}/leetcode.png`,
  codeforce: `${LOGO_DIR}/codeforce.webp`,
  lark: `${LOGO_DIR}/lark.webp`,
};

export default function HeroSection() {
  return (
    <>
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
        {/* Soft bluish wash from the top, fading into the default background */}
        <div className="hero-glow" aria-hidden="true" />

        {/* Decorative white boxes: 4 on the left, 4 on the right */}
        <div className="hero-boxes" aria-hidden="true">
          <div className="hero-box hb-l1">
            <img src={LOGOS.zoom} alt="" />
          </div>
          <div className="hero-box hb-l2">
            <img src={LOGOS.team} alt="" />
          </div>
          <div className="hero-box hb-l3">
            <img src={LOGOS.meet} alt="" />
          </div>
          <div className="hero-box hb-l4">
            <img src={LOGOS.cisco} alt="" />
          </div>
          <div className="hero-box hb-r1">
            <img src={LOGOS.hackerrank} alt="" />
          </div>
          <div className="hero-box hb-r2">
            <img src={LOGOS.leetcode} alt="" />
          </div>
          <div className="hero-box hb-r3">
            <img src={LOGOS.codeforce} alt="" />
          </div>
          <div className="hero-box hb-r4">
            <img src={LOGOS.lark} alt="" />
          </div>
        </div>

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
            fontSize: "clamp(0.90rem, 1.2vw, 1.125rem)",
            fontWeight: 400,
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
            className="try-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "12px",
              border: "none",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try for Free
            <svg
              className="try-arrow"
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
        /* Soft bluish wash at the top of the page. It fades out into the default
           page background (globals.css) by the bottom of the hero.
           --hero-glow-offset: pulls the wash up behind the header (roughly the
             header's height) so there is no visible line under it.
           --hero-glow-rgb: the blue. Edit the alpha values below to make the
             wash stronger or softer. */
        .hero-glow {
        opacity: 0.3;
          --hero-glow-offset: 6rem;
          --hero-glow-rgb: 147, 197, 253;
          position: absolute;
          top: calc(var(--hero-glow-offset) * -1);
          left: 0;
          right: 0;
          height: calc(100% + var(--hero-glow-offset));
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(var(--hero-glow-rgb), 0.45) 0%,
            rgba(var(--hero-glow-rgb), 0.42) 17%,
            rgba(var(--hero-glow-rgb), 0.31) 35%,
            rgba(var(--hero-glow-rgb), 0.21) 50%,
            rgba(var(--hero-glow-rgb), 0.12) 65%,
            rgba(var(--hero-glow-rgb), 0.05) 80%,
            rgba(var(--hero-glow-rgb), 0) 100%
          );
        }

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

        /* Try for Free: animated gradient + smooth hover */
        @property --try-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .try-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg, #6d28d9, #a855f7, #6d28d9);
          background-size: 200% 100%;
          background-position: 0% 50%;
          box-shadow: 0 4px 14px rgba(109, 40, 217, 0.25);
          animation: tryGradientMove 4s linear infinite;
          transition:
            transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.3s ease,
            filter 0.3s ease;
        }
        .try-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(168, 85, 247, 0.45);
          filter: brightness(1.08);
        }
        .try-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 4px 14px rgba(109, 40, 217, 0.3);
        }
        .try-btn .try-arrow {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .try-btn:hover .try-arrow {
          transform: translateX(4px);
        }
        @keyframes tryGradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        /* Looping animated border (light travels around the button) */
        .try-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: conic-gradient(
            from var(--try-angle),
            transparent 0deg,
            transparent 230deg,
            rgba(255, 255, 255, 0.35) 290deg,
            #ffffff 335deg,
            transparent 360deg
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
          animation: tryBorderSpin 3s linear infinite;
          pointer-events: none;
        }
        @keyframes tryBorderSpin {
          to { --try-angle: 360deg; }
        }

        /* Looping shine sweep */
        .try-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.55),
            transparent
          );
          transform: skewX(-20deg);
          animation: tryShine 2.8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes tryShine {
          0% { left: -75%; }
          60%, 100% { left: 135%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .try-btn,
          .try-btn::before,
          .try-btn::after {
            animation: none;
          }
        }

        /* Floating white boxes (left and right of the hero) */
        .hero-boxes {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero-box {
          position: absolute;
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 26%;
          box-shadow:
            0 12px 32px rgba(0, 0, 0, 0.08),
            0 2px 6px rgba(0, 0, 0, 0.04);
        }

        /* left side: sharp at the top, softer and fainter going down */
        .hb-l1 { top: 24px;  left: 3%;    width: 96px; height: 96px; transform: rotate(-9deg); }
        .hb-l2 { top: 172px; left: 10.5%; width: 80px; height: 80px; transform: rotate(7deg);   filter: blur(0.6px); }
        .hb-l3 { top: 244px; left: 4%;    width: 68px; height: 68px; transform: rotate(-12deg); filter: blur(2.2px); opacity: 0.85; }
        .hb-l4 { top: 340px; left: 10.5%; width: 62px; height: 62px; transform: rotate(8deg);   filter: blur(3.5px); opacity: 0.6; }

        /* right side */
        .hb-r1 { top: 42px;  right: 5%;    width: 94px; height: 94px; transform: rotate(9deg); }
        .hb-r2 { top: 172px; right: 13.5%; width: 80px; height: 80px; transform: rotate(-7deg); filter: blur(0.6px); }
        .hb-r3 { top: 272px; right: 8%;    width: 70px; height: 70px; transform: rotate(12deg); filter: blur(2.2px); opacity: 0.85; }
        .hb-r4 { top: 352px; right: 16%;   width: 78px; height: 78px; transform: rotate(-8deg); filter: blur(3px);   opacity: 0.7; }

        /* Hide on narrower screens so they never sit on top of the text */
        @media (max-width: 1099px) {
          .hero-boxes { display: none; }
        }

        /* Logos inside the boxes */
        .hero-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-box img {
          display: block;
          width: 64%;
          height: 64%;
          object-fit: contain;
          user-select: none;
        }

        /* Slow, subtle "breathing" float: up and down, loops forever */
        @keyframes hbBreathe {
          0%, 100% { translate: 0 var(--hb-amp, 5px); }
          50%      { translate: 0 calc(var(--hb-amp, 5px) * -1); }
        }
        .hero-box {
          animation-name: hbBreathe;
          animation-duration: var(--hb-dur, 6.5s);
          animation-delay: var(--hb-delay, 0s);
          animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
          animation-iteration-count: infinite;
        }
        /* distance, speed and start point differ per box so they never move in sync */
        .hb-l1 { --hb-amp: 6px; --hb-dur: 6.5s; --hb-delay: -0.5s; }
        .hb-l2 { --hb-amp: 5px; --hb-dur: 7s;   --hb-delay: -3s; }
        .hb-l3 { --hb-amp: 4px; --hb-dur: 6s;   --hb-delay: -1.5s; }
        .hb-l4 { --hb-amp: 4px; --hb-dur: 7.5s; --hb-delay: -4.5s; }
        .hb-r1 { --hb-amp: 6px; --hb-dur: 7s;   --hb-delay: -2s; }
        .hb-r2 { --hb-amp: 5px; --hb-dur: 6.5s; --hb-delay: -5s; }
        .hb-r3 { --hb-amp: 4px; --hb-dur: 7.5s; --hb-delay: -3.5s; }
        .hb-r4 { --hb-amp: 5px; --hb-dur: 6s;   --hb-delay: -0.8s; }

        @media (prefers-reduced-motion: reduce) {
          .hero-box { animation: none; }
        }
      `}</style>
    </>
  );
}