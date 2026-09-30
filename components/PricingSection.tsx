import { Check } from "lucide-react";

// Change the prices here. The yearly saving is worked out for you.
const MONTHLY = 3;
const YEARLY = 20;
const SAVE = Math.round((1 - YEARLY / (MONTHLY * 12)) * 100); // 44

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

export default function PricingSection() {
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
    </section>
  );
}