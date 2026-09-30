"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Same purple gradient as "Undetectable" in the hero.
const PURPLE = "linear-gradient(90deg, #6d28d9, #a855f7, #6d28d9)";

type Part = { text: string; tone?: "dark" | "brand" };

// Edit the wording here. "dark" is near-black, "brand" is the purple gradient.
const PARTS: Part[] = [
  { text: "Wah AI is made for conversations where getting help from AI is " },
  { text: "allowed", tone: "dark" },
  {
    text: ". Sales calls, client meetings, mock interviews, language practice, self-study. ",
  },
  { text: "Read the rules first.", tone: "dark" },
  {
    text: " If your employer, school, or the person on the other end says no, honor that. When you are not sure, ",
  },
  { text: "just ask", tone: "brand" },
  { text: "." },
];

// Wraps each word in a span (spaces stay outside) so GSAP can animate word by word.
function renderWords(text: string) {
  return text.split(/(\s+)/).map((chunk, i) =>
    chunk.trim() === "" ? (
      chunk
    ) : (
      <span key={i} data-word>
        {chunk}
      </span>
    )
  );
}

export default function ResponsibleUseSection() {
  const textRef = useRef<HTMLParagraphElement>(null);

  // Subtle scroll reveal: words softly fade in one after another as the
  // paragraph scrolls into view. Skipped if the user prefers reduced motion.
  // To make it softer, raise the 0.25 start opacity. To make it stronger, lower it.
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = el.querySelectorAll("[data-word]");

      gsap.fromTo(
        words,
        { opacity: 0.25 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      aria-label="Responsible use"
      className="w-full px-4 pb-24 pt-4 sm:px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p
          ref={textRef}
          className="m-0 text-[#8b90a0]"
          style={{
            fontSize: "clamp(1.25rem, 2.6vw, 1.875rem)",
            lineHeight: 1.7,
            letterSpacing: "-0.025em",
          }}
        >
          {PARTS.map(({ text, tone }, i) => {
            if (tone === "dark") {
              return (
                <strong key={i} className="font-medium text-[#151515]">
                  {renderWords(text)}
                </strong>
              );
            }
            if (tone === "brand") {
              return (
                <span
                  key={i}
                  data-word
                  className="bg-clip-text font-medium text-transparent"
                  style={{
                    backgroundImage: PURPLE,
                    WebkitBoxDecorationBreak: "clone",
                    boxDecorationBreak: "clone",
                  }}
                >
                  {text}
                </span>
              );
            }
            return <Fragment key={i}>{renderWords(text)}</Fragment>;
          })}
        </p>
      </div>
    </section>
  );
}