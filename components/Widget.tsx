"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

// Web version of the desktop widget pill: same look, same hover effects and the
// same Ask / Hide button. The desktop-only parts are left out: window dragging
// over IPC, double-click to expand, react-router, and syncing with the Assist
// panel. The round icon on the left is /public/dl.png (copy it from
// src/assets/dl.png).

type WidgetProps = {
  /** Icon in the round badge on the left. The file lives in /public. */
  iconSrc?: string;
  /** Start with the Ask button open (it then reads "Hide" with a chevron). */
  defaultAskOpen?: boolean;
  /** Runs when Ask / Hide is clicked, with the new open state. */
  onAskToggle?: (open: boolean) => void;
  /** Runs when the Stop button is clicked. */
  onStop?: () => void;
  /** Extra classes, e.g. to position the pill inside your layout. */
  className?: string;
};

export default function Widget({
  iconSrc = "/wahlogo.png",
  defaultAskOpen = false,
  onAskToggle,
  onStop,
  className,
}: WidgetProps) {
  // Flips the Ask button between "Ask" and "Hide". In the desktop app this
  // follows the Assist panel; on the web it just switches the button's look.
  const [askOpen, setAskOpen] = useState(defaultAskOpen);

  const handleAskClick = () => {
    const next = !askOpen;
    setAskOpen(next);
    onAskToggle?.(next);
  };

  return (
    <div
      className={className ? `widget-pill ${className}` : "widget-pill"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        height: 50,
        padding: "5px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: 999,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .widget-pill {
          background: rgba(14, 14, 16, 0.75);
          transition: background 0.15s ease;
        }
        .widget-dl-circle {
          background: rgba(20, 20, 22, 0.85);
          transition: background 0.15s ease;
        }
        .widget-hover-zoom {
          transition: transform 0.15s ease;
        }
        /* Hover effects only where a mouse can hover, so touch screens
           don't get stuck on the hovered look after a tap. */
        @media (hover: hover) {
          .widget-pill:hover {
            background: rgba(210, 210, 214, 0.8);
          }
          .widget-hover-zoom:hover {
            transform: scale(1.06);
          }
        }
      `}</style>

      {/* Round icon badge (decorative) */}
      <div
        className="widget-dl-circle"
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Image
          src={iconSrc}
          alt=""
          width={19}
          height={19}
          draggable={false}
          style={
            {
              width: 19,
              height: 19,
              objectFit: "contain",
              WebkitUserDrag: "none",
              userSelect: "none",
              pointerEvents: "none",
            } as CSSProperties
          }
        />
      </div>

      <button
        type="button"
        onClick={handleAskClick}
        aria-expanded={askOpen}
        className="widget-hover-zoom"
        style={{
          ...askButtonStyle,
          ...(askOpen ? askButtonActiveStyle : {}),
        }}
      >
        <RocketIcon />
        {askOpen ? "Hide" : "Ask"}
        {askOpen && <ChevronUpIcon />}
      </button>

      <button
        type="button"
        onClick={() => onStop?.()}
        title="Stop"
        aria-label="Stop"
        className="widget-hover-zoom"
        style={iconButtonStyle}
      >
        <SquareIcon />
      </button>
    </div>
  );
}

// padding: 0 and the pointer cursor make the buttons look the same on the web
// whether or not your site has a CSS reset.
const iconButtonStyle: CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: "100%",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  background: "#242426",
  boxShadow:
    "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.3)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  flexShrink: 0,
  padding: 0,
  cursor: "pointer",
};

const askButtonStyle: CSSProperties = {
  height: 32,
  borderRadius: 999,
  border: "1px solid rgba(196, 160, 255, 0.4)",
  background: "linear-gradient(180deg, #9b6bff 0%, #7c3aed 100%)",
  boxShadow: "0 0 12px rgba(139, 92, 246, 0.6), 0 2px 4px rgba(0, 0, 0, 0.2)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  fontSize: 14,
  fontWeight: 500,

  padding: "0 14px",
  flexShrink: 0,
  cursor: "pointer",
};

// Applied on top of askButtonStyle when the button is open (it reads "Hide").
// Only background/border/shadow change — everything else (size, padding,
// layout) is inherited from askButtonStyle.
const askButtonActiveStyle: CSSProperties = {
  border: "1px solid rgba(255, 255, 255, 0.3)",
  background: "linear-gradient(180deg, #4a4a50 0%, #2c2c30 100%)",
  boxShadow: "0 0 10px rgba(255, 255, 255, 0.12), 0 2px 4px rgba(0, 0, 0, 0.3)",
};

function RocketIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function SquareIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}