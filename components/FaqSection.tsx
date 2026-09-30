import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

// Answers are drafts based on what the rest of your site says. Edit freely.
const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Why real-time vs. a regular AI notetaker?",
    a: "A regular notetaker writes up the call after it ends. Wah works while you are still talking: it follows the conversation as it happens and gives you answers and talking points right when you need them. You can still get a recap once the call is over.",
  },
  {
    q: "Who is Wah for?",
    a: "Anyone who wants help in the middle of a conversation: candidates in interviews, sales reps on calls, and people in client meetings. On technical calls, Wah can also read code on your screen and talk the approach through with you.",
  },
  {
    q: "Is Wah free?",
    a: (
      <>
        Yes. You can start on the free plan, and the monthly and yearly plans
        remove the limits. See the{" "}
        <a
          href="#pricing"
          className="font-medium text-[#6d28d9] underline underline-offset-2"
        >
          pricing
        </a>{" "}
        section for details.
      </>
    ),
  },
  {
    q: "How is it undetectable in meetings?",
    a: "Wah does not join your meeting, so there is no bot in the participant list. Its window stays out of shared screens, recordings, and screenshots, so other people only see what you choose to show.",
  },
  {
    // TODO: add the languages Wah supports. The apps below come from the logos in the hero.
    q: "What languages and apps are supported?",
    a: "Wah works with the apps you already use for calls, such as Zoom, Microsoft Teams, Google Meet, Cisco Webex, and Lark, and with coding platforms like HackerRank, LeetCode, and Codeforces.",
  },
  {
    // TODO: add your support email or link here.
    q: "Can I talk to customer support?",
    a: "Yes. Get in touch with the Wah team and we will help you out.",
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full px-4 pb-24 pt-4 sm:px-6"
    >
      <style>{`
        /* Smooth open and close where the browser supports it; instant elsewhere. */
        .wah-faq details { interpolate-size: allow-keywords; }
        .wah-faq details::details-content {
          block-size: 0;
          overflow: hidden;
          transition: block-size 0.3s ease, content-visibility 0.3s allow-discrete;
        }
        .wah-faq details[open]::details-content { block-size: auto; }
        .wah-chevron { transition: transform 0.3s ease; }
        .wah-faq details[open] .wah-chevron { transform: rotate(180deg); }

        @media (prefers-reduced-motion: reduce) {
          .wah-faq details::details-content,
          .wah-chevron { transition: none; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="faq-heading"
          className="m-0 w-fit bg-clip-text font-medium text-transparent"
          style={{
            fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            backgroundImage:
              "linear-gradient(90deg, #151515 0%, #151515 45%, #6b7280 100%)",
          }}
        >
          Frequently asked questions
        </h2>

        <div className="wah-faq mt-10 divide-y divide-[#e6e7ec] sm:mt-14">
          {FAQS.map(({ q, a }) => (
            <details key={q}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-[21px] text-lg font-medium leading-[27px] tracking-[-0.01em] text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7] sm:text-xl [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="wah-chevron shrink-0 text-[#6b7280]"
                />
              </summary>
              <div className="max-w-[40rem] pb-6 pr-10 text-base leading-7 text-[#6b7280]">
                {a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}