import { Code, Video } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

// Monospace font for the card heading, the tag and the code panel.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

// Product name used in the card text (the reference said "ParakeetAI").
// Change it if your product is called something else.
const PRODUCT_NAME = "Wah";

// Fine film grain over the dark card. It is an inline SVG noise tile,
// so there is no image file to add to /public.
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Syntax colours for the code panel: light purple keywords and numbers,
// bold white function name.
function Kw({ children }: { children: ReactNode }) {
  return <span className="font-medium text-[#c4a0ff]">{children}</span>;
}
function Fn({ children }: { children: ReactNode }) {
  return <span className="font-bold text-white">{children}</span>;
}

// The code shown on the right of the card: [indent level, line].
// Each indent level is 4 characters wide.
const codeLines: [number, ReactNode][] = [
  [0, <><Kw>def</Kw> <Fn>longest_unique</Fn>(s):</>],
  [1, <>seen, start, best = {"{}"}, <Kw>0</Kw>, <Kw>0</Kw></>],
  [1, <><Kw>for</Kw> i, ch <Kw>in</Kw> enumerate(s):</>],
  [2, <><Kw>if</Kw> ch <Kw>in</Kw> seen <Kw>and</Kw> seen[ch] {">="} start:</>],
  [3, <>start = seen[ch] + <Kw>1</Kw></>],
  [2, <>seen[ch] = i</>],
  [2, <>best = max(best, i - start + <Kw>1</Kw>)</>],
  [1, <><Kw>return</Kw> best</>],
];

export default function FeaturesSection() {
  return (
    <section
      aria-labelledby="features-heading"
      className="w-full px-4 pb-24 pt-4 sm:px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="features-heading"
          className="m-0 text-center font-medium"
          style={{
            fontSize: "clamp(1.75rem, 4.2vw, 2.75rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            color: "#151515",
          }}
        >
          {/* Same purple gradient as "Undetectable" in the hero */}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #6d28d9, #a855f7, #6d28d9)",
            }}
          >
            Everything You Need
          </span>
          , Mid-Conversation
        </h2>

        <p className="mx-auto mt-3.5 max-w-xl text-center text-[15px] leading-6 text-[#6b7280] sm:text-base">
          Code, speech, and answers, handled live while the call is still
          happening.
        </p>

        {/* Dark feature card */}
        <article className="relative isolate mt-11 overflow-hidden rounded-3xl bg-[#05070b] antialiased shadow-[0_24px_60px_-28px_rgba(30,20,80,0.45)] ring-1 ring-white/10">
          {/* Purple glow behind the code */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 80% at 74% 60%, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.08) 45%, rgba(139,92,246,0) 75%)",
            }}
          />

          {/* Film grain */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{ backgroundImage: GRAIN }}
          />

          {/* Faint background snippets (large screens only) */}
          <div
            aria-hidden="true"
            className={`${mono.className} pointer-events-none absolute inset-0 hidden select-none text-xs text-white/[0.14] lg:block`}
          >
            <span className="absolute left-[19.5%] top-[27px]">
              {"const solve = (arr) => {...}"}
            </span>
            <span className="absolute right-7 top-[100px]">O(log n)</span>
            <span className="absolute right-7 top-[254px]">
              {"// edge cases"}
            </span>
            <span className="absolute -bottom-[3px] left-7">
              Time: O(1) Space: O(1)
            </span>
          </div>

          <div className="relative grid lg:grid-cols-2">
            {/* Text side */}
            <div className="flex flex-col items-start p-7">
              <span
                className={`${mono.className} inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-[5px] text-xs font-bold text-white`}
              >
                <Code
                  className="h-3.5 w-3.5 text-[#c4a0ff]"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                Programming
              </span>

              <h3
                className={`${mono.className} mt-9 text-[26px] font-bold leading-8 text-white`}
              >
                Full Coding Support
              </h3>

              <p className="mt-2.5 max-w-[490px] text-[15px] leading-6 text-white/60">
                You can use {PRODUCT_NAME} for technical calls. It listens for
                coding questions and reads code shared on your screen, then
                talks the approach through with you while the call is still
                going.
              </p>

              <button
                type="button"
                className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[15px] font-medium leading-6 text-[#151515] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(168,85,247,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7] active:translate-y-0 active:scale-[0.98]"
              >
                <Video
                  className="h-4 w-4"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                Learn More
              </button>
            </div>

            {/* Code side: starts at the middle of the card, fades out toward the bottom */}
            <div className="relative h-[232px] overflow-hidden sm:h-[264px] lg:h-auto">
              <pre
                aria-hidden="true"
                className={`${mono.className} absolute left-7 top-1 m-0 text-[11px] leading-[28px] text-white/75 sm:text-[13px] sm:leading-8 lg:left-0 lg:top-7 lg:text-sm lg:leading-[34px]`}
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 45%, rgba(0,0,0,0.12) 100%)",
                  maskImage:
                    "linear-gradient(to bottom, #000 45%, rgba(0,0,0,0.12) 100%)",
                }}
              >
                {codeLines.map(([indent, line], i) => (
                  <span
                    key={i}
                    className="block"
                    style={{ paddingLeft: `${indent * 4}ch` }}
                  >
                    {line}
                  </span>
                ))}
              </pre>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}