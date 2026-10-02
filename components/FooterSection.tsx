"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const YEAR = new Date().getFullYear();
const RING_MASK = "linear-gradient(to bottom, #000 45%, transparent 100%)";

// Setup file hosted on GitHub Releases. "Try for Free" starts this download.
const DOWNLOAD_URL =
  "https://github.com/raffay5529/wahai-website/releases/download/WahSetup/Wah.AI-Setup.exe";

// Links are placeholders ("#") except Pricing. Point them at your real pages.
const LINK_ROWS = [
  {
    main: [
      { label: "Features", href: "#features" },
      { label: "Privacy", href: "#" },
      { label: "Pricing", href: "#pricing" },
    ],
    legal: [{ label: "Support", href: "#" }],
  },
  {
    main: [
      { label: "Creator Program", href: "#" },
      { label: "Comparisons", href: "#" },
      { label: "Blog", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Cookie Settings", href: "#" },
    ],
  },
];

// Social icons are inline SVGs, so they do not depend on your lucide version.
const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "X",
    href: "#",
    icon: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />,
  },
  {
    label: "TikTok",
    href: "#",
    icon: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />,
  },
  {
    label: "YouTube",
    href: "#",
    icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
  },
  {
    label: "Facebook",
    href: "#",
    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </g>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
  },
];

const LINK_FOCUS =
  "rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]";

export default function FooterSection() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#17171a] text-white">
      {/* Call to action */}
      <div className="relative px-4 pb-20 pt-24 text-center sm:px-6">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 420"
          preserveAspectRatio="xMidYMin slice"
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] w-full"
          style={{ WebkitMaskImage: RING_MASK, maskImage: RING_MASK }}
        >
          {[130, 210, 300, 400, 510].map((r) => (
            <circle
              key={r}
              cx="600"
              cy="110"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="relative">
          <h2
            className="m-0 font-semibold text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
            }}
          >
            Never Get Stuck
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #a855f7, #c4a0ff, #a855f7)",
              }}
            >
              For Words Again
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-md text-base leading-6 text-[#a1a1aa]">
            Start free and see how Wah AI helps on your next call.
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href = DOWNLOAD_URL;
            }}
            className="mt-8 inline-flex h-12 cursor-pointer items-center gap-2 rounded-xl border border-[#c4a0ff]/40 px-6 text-[15px] font-semibold text-white shadow-[0_0_28px_rgba(139,92,246,0.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_34px_rgba(168,85,247,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7] active:translate-y-0 active:scale-[0.98]"
            style={{ backgroundImage: "linear-gradient(180deg, #9b6bff 0%, #7c3aed 100%)" }}
          >
            Try for Free
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-8 pt-8 sm:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <a href="/" aria-label="Wah AI home" className={`flex h-fit items-center gap-2.5 ${LINK_FOCUS}`}>
            <Image
              src="/wahlogo.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <span className="text-[22px] font-semibold tracking-tight">Wah AI</span>
          </a>

          <nav aria-label="Footer" className="flex flex-col gap-12 md:w-[430px]">
            {LINK_ROWS.map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-x-8">
                {[row.main, row.legal].map((links, j) => (
                  <ul key={j} className="m-0 flex list-none flex-col gap-2.5 p-0">
                    {links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className={`text-[15px] leading-5 transition-colors ${LINK_FOCUS} ${
                            j === 0
                              ? "font-medium text-white hover:text-[#c4a0ff]"
                              : "text-[#8a8a92] hover:text-white"
                          }`}
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-[13px] text-[#8a8a92]">
            © {YEAR} Wah AI. All rights reserved.
          </p>
          <ul className="m-0 flex list-none items-center gap-5 p-0 md:w-[430px]">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className={`block text-[#71717a] transition-colors hover:text-white ${LINK_FOCUS}`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
                    {s.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}