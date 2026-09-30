import Image from "next/image";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  ChevronsLeftRight,
  Command,
  EyeOff,
  Files,
  GitBranch,
  LayoutGrid,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

const PRODUCT_NAME = "Wah";

// Soft periwinkle tile behind each mock.
const TILE_BG =
  "radial-gradient(90% 60% at 20% 0%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 70%), linear-gradient(180deg, #d5d9ef 0%, #c3c9e5 100%)";

const PILL =
  "rounded-lg bg-[#5d6272]/90 px-3 py-1.5 text-[12.5px] font-medium leading-4 text-white backdrop-blur-sm";
const CODE_CHIP =
  "rounded bg-[#e8edff] px-1 font-mono text-[10.5px] text-[#4f6bed]";

// Card 1 mock data. Avatars are gradient initials, so no photos are needed.
const PEOPLE = [
  { name: "Maya Chen", you: true, email: "maya.chen@example.com", role: "Owner", bg: "linear-gradient(135deg,#fda4af,#c084fc)" },
  { name: "Daniel Ortiz", email: "daniel.ortiz@example.com", role: "Speaker", bg: "linear-gradient(135deg,#93c5fd,#6366f1)" },
  { name: "Priya Nair", email: "priya.nair@example.com", role: "Speaker", bg: "linear-gradient(135deg,#fcd34d,#f97316)" },
  { name: "Lucas Meyer", email: "lucas.meyer@example.com", role: "Speaker", bg: "linear-gradient(135deg,#86efac,#14b8a6)" },
];

// Card 2 mock code: [indent level, text | skeleton width in % | null for blank].
const CODE: [number, string | number | null][] = [
  [0, "// Load the profile, then show it"],
  [0, null],
  [0, "import axios from 'axios';"],
  [0, null],
  [0, "async function loadProfile(id) {"],
  [1, "try {"],
  [2, 70], [2, 52], [1, 24], [2, 64], [3, 46], [3, 38], [2, 22], [2, 30],
];

function Key({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <span
      className={`flex h-10 items-center justify-center rounded-xl border border-[#e4e6ef] bg-white text-[#151515] shadow-[0_1px_2px_rgba(30,20,80,0.08)] ${
        wide ? "w-[58px] shrink-0 flex-col gap-0.5" : "min-w-0 max-w-[44px] flex-1"
      }`}
    >
      {children}
    </span>
  );
}

// Card 1: the participant list has no bot, and the widget is ghosted out.
function ParticipantsVisual() {
  return (
    <div className="flex h-full flex-col justify-between px-5 py-5">
      <div className="rounded-[18px] bg-white px-4 py-3.5 shadow-[0_8px_24px_-12px_rgba(30,20,80,0.25)]">
        <div className="flex items-center justify-between gap-2">
          <span className="whitespace-nowrap text-[15px] font-medium text-[#151515]">
            Meeting participants <span className="text-[#9ca3af]">(4)</span>
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-[#e6f4ec] px-2 py-1 text-[10.5px] font-medium text-[#1f2937]">
            <ShieldCheck size={12} className="text-[#22a559]" />
            No bots detected
          </span>
        </div>

        <ul className="m-0 mt-2 list-none p-0">
          {PEOPLE.map((p) => (
            <li
              key={p.email}
              className="flex items-center gap-2.5 border-t border-[#eef0f6] py-2 first:border-t-0"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                style={{ background: p.bg }}
              >
                {p.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold leading-4 text-[#151515]">
                  {p.name}
                  {p.you && <span className="font-normal text-[#9ca3af]"> (You)</span>}
                </span>
                <span className="block truncate text-[11px] leading-4 text-[#9ca3af]">
                  {p.email}
                </span>
              </span>
              <span
                className={`inline-flex shrink-0 items-center gap-1 text-[13px] ${
                  p.role === "Owner" ? "text-[#b4b8c5]" : "text-[#151515]"
                }`}
              >
                {p.role}
                {p.role !== "Owner" && <ChevronDown size={14} />}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/40 px-4 py-4">
        <span className="flex items-center gap-2 text-sm font-medium text-[#9aa0b4]">
          <Image
            src="/wahlogo.png"
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] object-contain opacity-50"
          />
          {PRODUCT_NAME}
        </span>
        <EyeOff size={18} className="text-[#b4b8c5]" />
      </div>
    </div>
  );
}

// Card 2: split view. Left of the divider is what you see, right is what others see.
function SplitVisual() {
  return (
    <div className="wah-split relative h-full">
      {/* The editor is visible on both sides */}
      <div className="absolute inset-x-5 bottom-0 top-[152px] overflow-hidden rounded-t-[14px] bg-white shadow-[0_-4px_30px_-10px_rgba(30,20,80,0.25)]">
        <div className="flex h-8 items-center gap-2.5 border-b border-[#eef0f6] px-3">
          <span className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
            ))}
          </span>
          <ArrowLeft size={11} className="text-[#b4b8c5]" />
          <ArrowRight size={11} className="text-[#b4b8c5]" />
          <span className="mx-auto inline-flex h-5 w-[42%] items-center justify-center gap-1 rounded-md border border-[#e8eaf2] bg-[#f6f7fb] text-[10px] text-[#9ca3af]">
            <Search size={9} />
            loadProfile
          </span>
        </div>
        <div className="flex">
          <div className="flex w-9 shrink-0 flex-col items-center gap-3.5 border-r border-[#eef0f6] pt-3 text-[#b4b8c5]">
            <Files size={13} className="text-[#7c3aed]" />
            <Search size={13} />
            <GitBranch size={13} />
            <Play size={13} />
            <LayoutGrid size={13} />
          </div>
          <div className="min-w-0 flex-1 py-2 font-mono">
            {CODE.map(([indent, c], i) => (
              <div key={i} className="flex h-[17px] items-center">
                <span className="w-7 shrink-0 pr-2 text-right text-[10px] text-[#b4b8c5]">
                  {i + 1}
                </span>
                <span
                  className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-[10.5px] text-[#6b7280]"
                  style={{ paddingLeft: indent * 12 }}
                >
                  {typeof c === "string" ? (
                    c.startsWith("//") ? (
                      c
                    ) : (
                      c
                        .split(/\b(import|from|async|function|try)\b/)
                        .map((t, j) =>
                          j % 2 ? (
                            <span key={j} className="text-[#8b5cf6]">{t}</span>
                          ) : (
                            t
                          )
                        )
                    )
                  ) : c ? (
                    <span
                      className="block h-[7px] rounded-full bg-[#e6e8f0]"
                      style={{ width: `${c}%` }}
                    />
                  ) : null}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Only shown left of the divider: green outline, label and the AI answer */}
      <div className="wah-visible pointer-events-none absolute inset-0">
        <div className="absolute inset-[10px] rounded-[20px] border-2 border-[#22e34a]" />
        <span className={`${PILL} absolute left-[22px] top-[22px]`}>Visible to you</span>
        <div className="absolute inset-x-[22px] top-[60px] rounded-xl bg-white/90 px-3.5 py-2.5 shadow-[0_6px_20px_-10px_rgba(30,20,80,0.3)]">
          <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#151515]">
            <Sparkles size={12} className="text-[#7c3aed]" />
            AI Response
          </div>
          <p className="m-0 mt-1.5 whitespace-nowrap text-[11.5px] leading-[19px] text-[#374151]">
            Add a check for missing <code className={CODE_CHIP}>userId</code> before
            <br />
            Also handle <code className={CODE_CHIP}>profile.name</code> safely to avoid
          </p>
        </div>
      </div>

      <span className={`${PILL} absolute right-[22px] top-[22px]`}>Invisible to others</span>

      <div className="wah-divider pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-[#151515]">
        <span className="absolute left-1/2 top-[49%] flex h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#151515] text-white ring-2 ring-white/70">
          <ChevronsLeftRight size={12} />
        </span>
      </div>
    </div>
  );
}

// Card 3: a call with the floating AI window, and the shortcut keys to move it.
function EyesVisual() {
  return (
    <div className="flex h-full flex-col gap-2 p-5 sm:p-6">
      <div
        className="relative min-h-0 flex-1 overflow-hidden rounded-2xl"
        style={{ background: "linear-gradient(135deg, #6f8dff 0%, #7b5cf5 60%, #6d28d9 100%)" }}
      >
        <div className="absolute -left-10 -top-10 h-40 w-56 rounded-full bg-white/25 blur-2xl" />

        <div className="absolute right-3 top-3 z-10 flex w-[52%] gap-1.5 rounded-md border border-white/40 bg-white/25 p-1.5 backdrop-blur-md">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full bg-white/80" />
          ))}
        </div>
        <div className="absolute right-3 top-[44px] z-10 w-[52%] rounded-xl border border-white/40 bg-white/25 p-2.5 backdrop-blur-md">
          <div className="flex items-center gap-1 text-[9.5px] font-medium text-white">
            <Sparkles size={10} />
            AI Response
          </div>
          <div className="mt-2 space-y-1.5">
            {["100%", "90%", "70%"].map((w) => (
              <span key={w} className="block h-1.5 rounded-full bg-white/80" style={{ width: w }} />
            ))}
          </div>
        </div>

        <div className="isolate absolute left-3 top-[76px] h-[124px] w-[58%] overflow-hidden rounded-lg bg-black/30">
          <Image
            src="/image.png"
            alt=""
            fill
            sizes="220px"
            className="object-cover"
          />
          <span className="absolute inset-x-1.5 bottom-1.5 rounded bg-black/70 px-2 py-1 text-[9px] leading-3 text-white">
            How would you scale this to a million users?
          </span>
        </div>

        <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between text-white">
          <span className="text-[11px] font-semibold">System design interview</span>
          <ChevronUp size={13} />
        </div>
      </div>

      <div className="flex h-[72px] shrink-0 items-center justify-center gap-1.5 rounded-[18px] bg-white/45 px-3">
        <Key wide>
          <Command size={12} />
          <span className="text-[10px]">command</span>
        </Key>
        <span className="text-[#9aa0b4]">+</span>
        {[ArrowUp, ArrowDown, ArrowLeft, ArrowRight].map((Icon, i) => (
          <Key key={i}>
            <Icon size={15} />
          </Key>
        ))}
      </div>
    </div>
  );
}

const CARDS = [
  {
    lead: "Doesn't join meetings.",
    body: `${PRODUCT_NAME} never joins your meetings, so there are no bots and no extra names on the participant list.`,
    Visual: ParticipantsVisual,
  },
  {
    lead: "Invisible to screen share.",
    body: `${PRODUCT_NAME} never shows up in shared screens, recordings, or screenshots.`,
    Visual: SplitVisual,
  },
  {
    lead: "Follows your eyes.",
    body: `${PRODUCT_NAME}'s window is fully moveable, so you can position it exactly where you're looking.`,
    Visual: EyesVisual,
  },
];

export default function UndetectableSection() {
  return (
    <section
      aria-labelledby="undetectable-heading"
      className="w-full px-4 pb-24 pt-4 sm:px-6"
    >
      <style>{`
        /* The divider in card 2 slowly sweeps left and right.
           Everything (divider, outline, AI answer) reads --wah-split. */
        @property --wah-split {
          syntax: "<percentage>";
          inherits: true;
          initial-value: 50%;
        }
        .wah-split { --wah-split: 50%; animation: wahSplit 9s ease-in-out infinite; }
        @keyframes wahSplit {
          0%, 100% { --wah-split: 40%; }
          50% { --wah-split: 58%; }
        }
        .wah-visible { clip-path: inset(0 calc(100% - var(--wah-split)) 0 0); }
        .wah-divider { left: var(--wah-split); }

        @media (prefers-reduced-motion: reduce) {
          .wah-split { animation: none; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="undetectable-heading"
          className="mx-auto w-fit bg-clip-text text-center font-medium text-transparent"
          style={{
            fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            backgroundImage:
              "linear-gradient(90deg, #151515 0%, #151515 45%, #6b7280 100%)",
          }}
        >
          Undetectable in every way
        </h2>

        <p className="mx-auto mt-3.5 max-w-xl text-center text-[15px] leading-6 text-[#6b7280] sm:text-base">
          Suite of features to use {PRODUCT_NAME} without a trace.
        </p>

        <div className="mx-auto mt-14 grid max-w-[420px] gap-10 lg:max-w-none lg:grid-cols-3 lg:gap-7">
          {CARDS.map(({ lead, body, Visual }) => (
            <article key={lead}>
              <div
                aria-hidden="true"
                className="relative h-[366px] overflow-hidden rounded-[32px] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                style={{ background: TILE_BG }}
              >
                <Visual />
              </div>
              <p className="m-0 mt-6 text-[17px] leading-7 text-[#6b7280]">
                <strong className="font-semibold text-[#151515]">{lead}</strong>{" "}
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}