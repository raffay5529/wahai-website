"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Mail, MessageCircle, X } from "lucide-react";

// Change the prices here. The yearly saving is worked out for you.
const MONTHLY = 3;
const YEARLY = 20;
const SAVE = Math.round((1 - YEARLY / (MONTHLY * 12)) * 100); // 44

// Change your contact details here. They show when someone clicks Subscribe.
const EMAIL = "abdulrafay5526@gmail.com";
const WHATSAPP = "+923185186302";

// Setup file hosted on GitHub Releases. "Get started" (Free plan) starts this download.
const DOWNLOAD_URL =
  "https://github.com/raffay5529/wahai-website/releases/download/WahSetup/Wah.AI-Setup.exe";

const CARD_BG = "linear-gradient(180deg, #f5f6fb 0%, #eff0f8 100%)";
const CARD_SHADOW =
  "0 26px 50px -18px rgba(76,96,180,0.38), 0 2px 6px rgba(76,96,180,0.06), inset 0 0 0 1px rgba(255,255,255,0.9)";
const BTN_BG = "linear-gradient(180deg, #34353c 0%, #16171b 100%)";

const PAID_FEATURES = [
  "Unlimited AI answers",
  "Unlimited meeting notes",
  "Latest AI models",
  "Priority support",
];

// Feature lists are placeholders: edit the text to match your real plans.
const PLANS = [
  {
    name: "Free",
    price: "$0",
    unit: null,
    cta: "Get started",
    note: "Core features to get you started.",
    intro: null,
    features: [
      "Limited AI answers",
      "Limited meeting notes",
      "Custom instructions and file uploads",
      "Ask AI about past meetings",
    ],
  },
  {
    name: "Monthly",
    price: `$${MONTHLY}`,
    unit: "/ month",
    cta: "Subscribe",
    note: "Billed monthly.",
    intro: "Everything in Free, plus…",
    features: PAID_FEATURES,
  },
  {
    name: "Yearly",
    price: `$${YEARLY}`,
    unit: "/ year",
    cta: "Subscribe",
    note: `Billed yearly. Save ${SAVE}% vs monthly.`,
    intro: "Everything in Free, plus…",
    features: PAID_FEATURES,
  },
];

// The box that opens on Subscribe. Everything behind it is blurred.
function ContactModal({ plan, onClose }) {
  const dialogRef = useRef(null);

  // Lock page scroll, close on Escape, and give focus back when it closes.
  useEffect(() => {
    const trigger = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus?.();
    };
  }, [onClose]);

  // Pre-fills the plan name so you know what they want.
  const subject = encodeURIComponent(`${plan.name} plan`);
  const text = encodeURIComponent(
    `Hi, I want to subscribe to the ${plan.name} plan (${plan.price} ${plan.unit}).`
  );
  const contacts = [
    {
      label: "Email",
      value: EMAIL,
      href: `mailto:${EMAIL}?subject=${subject}&body=${text}`,
      Icon: Mail,
    },
    {
      label: "WhatsApp",
      value: WHATSAPP,
      href: `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${text}`,
      Icon: MessageCircle,
      external: true,
    },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: "rgba(24, 28, 56, 0.34)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        tabIndex={-1}
        className="relative max-h-full w-full max-w-[420px] overflow-y-auto rounded-[28px] p-5 outline-none"
        style={{ background: CARD_BG, boxShadow: CARD_SHADOW }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#6b7280] transition duration-300 hover:bg-[#e3e5ee] hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]"
        >
          <X size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <h3
          id="contact-title"
          className="m-0 text-base font-medium leading-6 text-[#2a2b31]"
        >
          {plan.name} plan
        </h3>

        <p className="m-0 mt-7 flex items-baseline gap-1.5">
          <span className="text-[44px] font-semibold leading-[52px] tracking-[-0.03em] text-black">
            {plan.price}
          </span>
          <span className="text-base text-[#6b7280]">{plan.unit}</span>
        </p>

        <p className="m-0 mt-5 text-[15px] leading-6 text-[#6b7280]">
          To subscribe, email us or message us on WhatsApp.
        </p>

        <div className="mt-5 flex flex-col gap-2.5 border-t border-[#e3e5ee] pt-5">
          {contacts.map(({ label, value, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-2xl bg-white/70 px-3.5 py-3 shadow-[inset_0_0_0_1px_#e3e5ee] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(76,96,180,0.45),inset_0_0_0_1px_#e3e5ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7] active:translate-y-0 active:scale-[0.98]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#7c3aed]/10 text-[#7c3aed]">
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] leading-5 text-[#6b7280]">
                  {label}
                </span>
                <span className="block break-all text-[15px] font-medium leading-5 text-[#151515]">
                  {value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function PricingSection() {
  // The plan whose box is open (null = closed). Free never opens one.
  const [selected, setSelected] = useState(null);
  const closeBox = useCallback(() => setSelected(null), []);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="w-full px-4 pb-24 pt-4 sm:px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="pricing-heading"
          className="mx-auto w-fit bg-clip-text text-center font-medium text-transparent"
          style={{
            fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            backgroundImage:
              "linear-gradient(90deg, #151515 0%, #151515 45%, #6b7280 100%)",
          }}
        >
          Simple pricing
        </h2>

        <p className="mx-auto mt-3.5 max-w-xl text-center text-[15px] leading-6 text-[#6b7280] sm:text-base">
          Start free, and upgrade when you need unlimited answers.
        </p>

        <div className="mx-auto mt-14 grid max-w-[420px] gap-5 lg:max-w-[960px] lg:grid-cols-3">
          {PLANS.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-[28px] p-5"
              style={{ background: CARD_BG, boxShadow: CARD_SHADOW }}
            >
              <h3 className="m-0 text-base font-medium leading-6 text-[#2a2b31]">
                {p.name}
              </h3>

              <p className="m-0 mt-7 flex items-baseline gap-1.5">
                <span className="text-[44px] font-semibold leading-[52px] tracking-[-0.03em] text-black">
                  {p.price}
                </span>
                {p.unit && (
                  <span className="text-base text-[#6b7280]">{p.unit}</span>
                )}
              </p>

              <button
                type="button"
                onClick={
                  p.unit
                    ? () => setSelected(p)
                    : () => {
                        window.location.href = DOWNLOAD_URL;
                      }
                }
                className="mt-6 h-11 w-full cursor-pointer rounded-[10px] text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(20,20,40,0.55),inset_0_1px_0_rgba(255,255,255,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7] active:translate-y-0 active:scale-[0.98]"
                style={{ backgroundImage: BTN_BG }}
              >
                {p.cta}
              </button>

              <p className="m-0 mt-5 text-[15px] leading-6 text-[#6b7280]">
                {p.note}
              </p>

              <div className="mt-5 border-t border-[#e3e5ee] pt-5">
                {p.intro && (
                  <p className="m-0 mb-3 text-[13.5px] font-medium leading-5 text-[#151515]">
                    {p.intro}
                  </p>
                )}
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm leading-5 text-[#151515]"
                    >
                      <Check
                        size={15}
                        strokeWidth={1.75}
                        aria-hidden="true"
                        className="mt-[3px] shrink-0 text-[#7c3aed]"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && <ContactModal plan={selected} onClose={closeBox} />}
    </section>
  );
}