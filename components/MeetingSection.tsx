"use client";

import Image from "next/image";
import {
  AudioLines,
  ChevronUp,
  Command,
  CornerDownLeft,
  Ellipsis,
  MessageSquare,
  Play,
  RefreshCw,
  Rocket,
  Sparkles,
  Square,
  WandSparkles,
  Zap,
} from "lucide-react";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Product name used in the copy (replaces the reference brand name).
const PRODUCT_NAME = "Wah";

// Same purple gradient as the Ask button in your widget.
const PURPLE = "linear-gradient(180deg, #9b6bff 0%, #7c3aed 100%)";

// Left card background, in your purple. For the blue from the reference,
// use: "linear-gradient(180deg, #7ea3ff 0%, #6a94f8 100%)"
const LEFT_BG =
  "radial-gradient(120% 70% at 0% 0%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #9d7cff 0%, #7f58f2 100%)";

const RIGHT_BG = "linear-gradient(180deg, #f8f9fd 0%, #eceef7 100%)";

// Bar heights (px) of the audio line. One pass of 60 bars repeats seamlessly.
const WAVE = [
  14, 10, 8, 8, 16, 8, 18, 12, 8, 14, 20, 12, 18, 24, 16, 22, 14, 20, 26, 16,
  8, 6, 6, 8, 6, 6, 8, 6, 6, 8, 6, 6, 8, 6, 14, 20, 16, 28, 34, 26, 38, 22,
  32, 40, 24, 34, 26, 16, 14, 10, 12, 8, 14, 10, 8, 12, 8, 10, 8, 8,
];

const FADE_EDGES =
  "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";

const CHIPS = [
  { label: "Assist", Icon: Sparkles },
  { label: "What should I say?", Icon: WandSparkles },
  { label: "Follow-up questions", Icon: MessageSquare },
  { label: "Recap", Icon: RefreshCw },
];

// One timer digit. When its value changes the parent remounts it (via key):
// the new digit slides in from the right while the old one leaves to the left.
function Digit({
  value,
  base,
  animateOnMount,
}: {
  value: number;
  base: number;
  animateOnMount: boolean;
}) {
  // Captured once per mount, so digits that did not change never animate.
  const [animate] = useState(animateOnMount);
  const prev = (value + base - 1) % base;

  return (
    <span className="wah-digit">
      {animate && (
        <span aria-hidden="true" className="wah-digit-out">
          {prev}
        </span>
      )}
      <span className={animate ? "wah-digit-in" : undefined}>{value}</span>
    </span>
  );
}

// Recording timer: starts at 00:14 and counts up every second.
function Recording() {
  const [seconds, setSeconds] = useState(14);
  const [ticked, setTicked] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s + 1) % 3600);
      setTicked(true);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return (
    <div aria-hidden="true" className="mtg-rec mt-5 text-center">
      <div className="text-[44px] font-semibold leading-[52px] tabular-nums tracking-tight text-white/65">
        <Digit
          key={`m1-${Math.floor(m / 10)}`}
          value={Math.floor(m / 10)}
          base={6}
          animateOnMount={ticked}
        />
        <Digit
          key={`m2-${m % 10}`}
          value={m % 10}
          base={10}
          animateOnMount={ticked}
        />
        <span>:</span>
        <Digit
          key={`s1-${Math.floor(s / 10)}`}
          value={Math.floor(s / 10)}
          base={6}
          animateOnMount={ticked}
        />
        <Digit
          key={`s2-${s % 10}`}
          value={s % 10}
          base={10}
          animateOnMount={ticked}
        />
      </div>
      <div className="mt-1 flex items-center justify-center gap-1.5 text-[15px] text-white/60">
        <span className="h-[5px] w-[5px] rounded-full bg-[#ff5f7a]" />
        Recording
      </div>
    </div>
  );
}

// Audio line that scrolls from right to left. Three identical copies sit in a
// row and the row moves left by exactly one copy, then loops.
function Waveform() {
  return (
    <div
      aria-hidden="true"
      className="mtg-wave mx-auto mt-14 h-10 w-full max-w-[504px] overflow-hidden"
      style={{ WebkitMaskImage: FADE_EDGES, maskImage: FADE_EDGES }}
    >
      <div className="wah-wave flex w-max">
        {[0, 1, 2].map((copy) => (
          <div
            key={copy}
            className="flex h-10 items-center gap-[5px] pr-[5px]"
          >
            {WAVE.map((h, i) => (
              <span
                key={i}
                className="w-1 shrink-0 rounded-full bg-white/60"
                style={{ height: h }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Key({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-white/25 bg-white/[0.06] text-white/70">
      {children}
    </span>
  );
}

// Bottom part of the Assist box: quick actions and the text box.
// Used full-strength on the right card and faded on the left card.
function AssistFooter() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-white/75">
        {CHIPS.map(({ label, Icon }, i) => (
          <Fragment key={label}>
            {i > 0 && (
              <span className="h-[3px] w-[3px] rounded-full bg-white/35" />
            )}
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Icon size={13} />
              {label}
            </span>
          </Fragment>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-[14px] border border-white/15 bg-white/5 py-2.5 pl-3.5 pr-3">
        <div className="flex flex-wrap items-center gap-1.5 text-[13px] leading-5 text-white/45">
          Ask about your screen or conversation, or
          <Key>
            <Command size={11} />
          </Key>
          <Key>
            <CornerDownLeft size={11} />
          </Key>
          for Assist
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex h-[26px] items-center gap-1.5 rounded-full border border-white/20 px-2.5 text-xs font-medium text-white/65">
              <Zap size={12} />
              Smart
            </span>
            <Ellipsis size={16} className="text-white/55" />
          </div>
          <span
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#c4a0ff]/40 pl-0.5 text-white shadow-[0_0_12px_rgba(139,92,246,0.6),0_2px_4px_rgba(0,0,0,0.2)]"
            style={{ backgroundImage: PURPLE }}
          >
            <Play size={12} fill="currentColor" />
          </span>
        </div>
      </div>
    </>
  );
}

export default function MeetingSection() {
  const container = useRef<HTMLElement>(null);

  // Plays once when the section scrolls into view, soft and slow:
  // the heading rises first. When the cards come into view they rise one
  // after the other, then their text, then the timer, audio line, faded
  // Assist preview (left) and the widget pill and Assist box (right).
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Respect reduced motion: show everything, no animation.
      if (reduceMotion) {
        gsap.set(
          [
            ".mtg-head",
            ".mtg-card",
            ".mtg-item",
            ".mtg-rec",
            ".mtg-wave",
            ".mtg-foot",
            ".mtg-pill",
            ".mtg-box",
          ],
          { opacity: 1 }
        );
        return;
      }

      // Heading
      gsap.fromTo(
        ".mtg-head",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Cards and everything inside them
      const grid = container.current?.querySelector(".mtg-grid");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: grid ?? container.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        ".mtg-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          clearProps: "transform",
        }
      )
        .fromTo(
          ".mtg-item",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            clearProps: "transform",
          },
          0.3
        )
        .fromTo(
          ".mtg-rec",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "transform" },
          0.6
        )
        .fromTo(
          ".mtg-pill",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "transform" },
          0.7
        )
        .fromTo(
          ".mtg-wave",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "transform" },
          0.75
        )
        .fromTo(
          ".mtg-box",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, clearProps: "transform" },
          0.85
        )
        .fromTo(
          ".mtg-foot",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "transform" },
          0.9
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      aria-labelledby="meeting-heading"
      className="w-full px-4 pb-24 pt-4 sm:px-6"
    >
      <style>{`
        /* Start hidden so there is no flash before the scroll animation runs */
        .mtg-head,
        .mtg-card,
        .mtg-item,
        .mtg-rec,
        .mtg-wave,
        .mtg-foot,
        .mtg-pill,
        .mtg-box { opacity: 0; }

        .wah-wave { animation: wahWave 12s linear infinite; }
        @keyframes wahWave { to { transform: translateX(-33.3333%); } }

        .wah-digit { position: relative; display: inline-block; }
        .wah-digit-in {
          display: inline-block;
          animation: wahDigitIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .wah-digit-out {
          position: absolute;
          left: 0;
          top: 0;
          animation: wahDigitOut 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes wahDigitIn { from { opacity: 0; transform: translateX(0.6em); } }
        @keyframes wahDigitOut { to { opacity: 0; transform: translateX(-0.6em); } }

        @media (prefers-reduced-motion: reduce) {
          .mtg-head,
          .mtg-card,
          .mtg-item,
          .mtg-rec,
          .mtg-wave,
          .mtg-foot,
          .mtg-pill,
          .mtg-box { opacity: 1; }
          .wah-wave, .wah-digit-in, .wah-digit-out { animation: none; }
          .wah-digit-out { display: none; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="meeting-heading"
          className="mtg-head m-0 w-fit bg-clip-text font-medium text-transparent"
          style={{
            fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            backgroundImage:
              "linear-gradient(90deg, #151515 0%, #151515 45%, #6b7280 100%)",
          }}
        >
          How {PRODUCT_NAME} helps during a meeting
        </h2>

        <div className="mtg-grid mt-10 grid gap-7 md:grid-cols-2">
          {/* Left card: listens */}
          <article
            className="mtg-card flex flex-col overflow-hidden rounded-[32px] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] sm:rounded-[40px] sm:px-10 sm:py-10"
            style={{ background: LEFT_BG }}
          >
            <h3 className="mtg-item m-0 text-[26px] font-medium leading-[38px] tracking-[-0.01em] text-white">
              {PRODUCT_NAME}{" "}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-0.5 leading-[1.2] ring-1 ring-inset ring-white/40">
                <AudioLines size={20} />
                listens
              </span>{" "}
              in to the conversation
            </h3>
            <p className="mtg-item m-0 mt-3 max-w-[30rem] text-base leading-[26px] text-white/85 sm:text-[17px]">
              It picks up the context of your meeting in real time, so it can
              help when you need it.
            </p>

            <Recording />
            <Waveform />

            {/* Faded preview of the Assist box */}
            <div aria-hidden="true" className="mtg-foot mt-auto pt-10">
              <div
                className="flex flex-col gap-3 rounded-[18px] border border-white/15 p-4 opacity-60"
                style={{ background: "rgba(45,20,120,0.3)" }}
              >
                <AssistFooter />
              </div>
            </div>
          </article>

          {/* Right card: assists */}
          <article
            className="mtg-card flex flex-col overflow-hidden rounded-[32px] px-6 py-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8),0_10px_40px_-12px_rgba(30,20,80,0.15)] sm:rounded-[40px] sm:px-10 sm:py-10"
            style={{ background: RIGHT_BG }}
          >
            <h3 className="mtg-item m-0 text-[26px] font-medium leading-[38px] tracking-[-0.01em] text-[#151515]">
              When you need help, {PRODUCT_NAME}{" "}
              <span className="-mx-1.5 inline-flex items-center rounded-full bg-white/80 px-2 py-0.5 leading-[1.2] shadow-[0_1px_2px_rgba(30,20,80,0.06)]">
                assists
              </span>{" "}
              you instantly
            </h3>
            <p className="mtg-item m-0 mt-3 max-w-[30rem] text-base leading-[26px] text-[#9ca3af] sm:text-[17px]">
              Hit Cmd/Ctrl + Enter and {PRODUCT_NAME} helps you with AI in the
              moment.
            </p>

            {/* Static mock of the widget: pill, then the Assist box */}
            <div
              aria-hidden="true"
              className="mt-6 flex flex-col items-center gap-2"
            >
              <div className="mtg-pill flex items-center gap-[7px] rounded-full border border-white/15 bg-[#3f3f43] p-[5px]">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#1c1c1e]">
                  <Image
                    src="/wahlogo.png"
                    alt=""
                    width={19}
                    height={19}
                    draggable={false}
                    className="h-[19px] w-[19px] select-none object-contain"
                  />
                </span>
                <span
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/30 px-3.5 text-sm font-medium text-white shadow-[0_0_10px_rgba(255,255,255,0.12),0_2px_4px_rgba(0,0,0,0.3)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #4a4a50 0%, #2c2c30 100%)",
                  }}
                >
                  <Rocket size={15} />
                  Hide
                  <ChevronUp size={10} strokeWidth={2.5} />
                </span>
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/15 bg-[#242426] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.3)]">
                  <Square size={13} fill="currentColor" strokeWidth={0} />
                </span>
              </div>

              <div className="mtg-box flex w-full max-w-[520px] flex-col gap-3 rounded-[18px] border border-white/15 bg-[#4a4a4e] p-4 text-white shadow-[0_12px_32px_-8px_rgba(20,15,50,0.35)]">
                <div className="flex justify-end">
                  <span
                    className="rounded-full border border-[#c4a0ff]/40 px-3.5 py-[5px] text-xs font-semibold shadow-[0_0_12px_rgba(139,92,246,0.45),0_2px_4px_rgba(0,0,0,0.2)]"
                    style={{ backgroundImage: PURPLE }}
                  >
                    Assist
                  </span>
                </div>

                <div>
                  <div className="text-[11.5px] leading-4 text-white/55">
                    Viewed screen
                  </div>
                  <p className="m-0 mt-0.5 text-[12.5px] font-semibold leading-[19px] text-white/90">
                    {PRODUCT_NAME} is an AI meeting assistant that listens in
                    real time, understands what&apos;s being said, and gives
                    you instant answers, notes, and next steps, all while
                    staying completely undetectable on your screen.
                  </p>
                </div>

                <AssistFooter />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}