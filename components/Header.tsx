"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Edit these                                                                */
/* -------------------------------------------------------------------------- */

// Text beside the logo: bold name + small black badge, like "Parakeet [AI]".
// For plain text instead, use name: "Wah AI" and badge: "". Set both to "" to hide.
const BRAND = { name: "Wah", badge: "AI" };

// Accessible name for the logo link (screen readers read "Wah AI").
const BRAND_LABEL =
  [BRAND.name, BRAND.badge].filter(Boolean).join(" ") || "Home";

// The part after "#" must match the id of the wrapper div in page.tsx.
const NAV_LINKS = [
  { label: "Call Assistant", href: "/" },
  { label: "Features", href: "/#features" }, // FeatureSection
  { label: "Meeting", href: "/#meeting" }, // MeetingSection
  { label: "Pricing", href: "/#pricing" }, // PricingSection
  { label: "FAQ", href: "/#faq" }, // FaqSection
];



const SIGN_IN_HREF = "/sign-in";

// Setup file hosted on GitHub Releases. "Try for Free" starts this download.
const DOWNLOAD_URL =
  "https://github.com/raffay5529/wahai-website/releases/download/WahSetup/Wah.AI-Setup.exe";

// Hide on scroll: while scrolling down, the header blurs and slides out of view
// as soon as this element (the demo section in VideoSection) reaches the bottom
// of the header. Scrolling up brings it straight back. Above that point it
// always stays visible. If the element isn't on the page, the header just stays
// visible.
const HIDE_TARGET = 'section[aria-label="Product demo"]';
// Fine-tune when it hides, in px: positive = hides earlier, negative = later.
const HIDE_OFFSET = 0;

/* -------------------------------------------------------------------------- */
/*  Styles                                                                    */
/* -------------------------------------------------------------------------- */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2";

// Trims a text box to cap-height so capital letters centre exactly (against the
// logo, and inside the badge). Older browsers ignore it and centre as usual.
const trimToCaps = "[text-box:trim-both_cap_alphabetic]";

// White floating surface used by the bar and both dropdown panels.
const surface =
  "bg-white ring-1 ring-black/5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-4px_rgba(16,24,40,0.10)]";

// Hide-on-scroll motion: the whole header slides up, blurs and fades out, and
// plays in reverse when it comes back. `invisible` lands at the end of the
// transition, so a hidden header can't be tabbed into.
const headerMotion =
  "transition-all duration-500 ease-in-out motion-reduce:transition-none";
const headerAway = "invisible -translate-y-full opacity-0 blur-md";

const buttonShape = `h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors motion-reduce:transition-none ${focusRing}`;
const buttonLight = `${buttonShape} border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50`;
const buttonDark = `${buttonShape} bg-zinc-900 text-white hover:bg-zinc-700`;

const navLink = `relative cursor-pointer rounded-sm text-sm font-medium leading-5 transition-colors motion-reduce:transition-none ${focusRing}`;
const navLinkIdle = "text-zinc-500 hover:text-zinc-900";
const navLinkActive =
  "text-zinc-900 after:absolute after:-inset-x-1 after:-bottom-px after:h-0.5 after:rounded-full after:bg-purple-500";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prepareOpen, setPrepareOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const prepareButtonRef = useRef<HTMLButtonElement>(null);
  const hiddenRef = useRef(false);

  const isActive = (href: string) => pathname === href;

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setPrepareOpen(false);
  }, []);

  // Smooth-scroll to a section on the home page when a "/#id" link is clicked.
  // On any other page the link falls back to normal navigation to "/#id".
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    closeAll();

    const id = href.split("#")[1];
    if (!id || pathname !== "/") return;

    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  // Close the dropdown / mobile menu on outside click or Escape.
  useEffect(() => {
    if (!menuOpen && !prepareOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) closeAll();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      (prepareOpen ? prepareButtonRef : menuButtonRef).current?.focus();
      closeAll();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, prepareOpen, closeAll]);

  // Hide the header while scrolling down once the demo section reaches it,
  // and show it again the moment the user scrolls up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const setHidden = (next: boolean) => {
      if (hiddenRef.current === next) return;
      hiddenRef.current = next;
      setHideHeader(next);
      // Don't leave a dropdown / mobile menu open behind a hidden header.
      if (next) closeAll();
    };

    const update = () => {
      frame = 0;

      const header = headerRef.current;
      const target = document.querySelector(HIDE_TARGET);
      if (!header || !target) {
        setHidden(false);
        return;
      }

      // Clamped so rubber-band overscroll (iOS / macOS) never counts as scrolling up.
      const maxY = Math.max(
        0,
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight,
      );
      const y = Math.min(Math.max(window.scrollY, 0), maxY);
      const delta = y - lastY;
      lastY = y;

      // offsetHeight ignores the slide transform, so this stays right while hidden.
      const reached =
        target.getBoundingClientRect().top <= header.offsetHeight + HIDE_OFFSET;

      if (!reached) setHidden(false);
      else if (delta > 0) setHidden(true);
      else if (delta < 0) setHidden(false);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [closeAll]);

  return (
    <header
      ref={headerRef}
      className={`pointer-events-none sticky top-0 z-50 px-2 pt-3 ${headerMotion} ${
        hideHeader ? headerAway : ""
      }`}
    >
      <div className="pointer-events-auto relative mx-auto max-w-[1440px]">
        {/* Bar */}
        <div
          className={`grid h-[66px] grid-cols-[1fr_auto_1fr] items-center rounded-[20px] px-4 ${surface}`}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={closeAll}
            aria-label={BRAND_LABEL}
            className={`col-start-1 flex items-center gap-2 justify-self-start rounded-lg ${focusRing}`}
          >
            <Image
              src="/logo.png"
              alt=""
              width={160}
              height={40}
              priority
              className="h-9 w-auto"
            />
            {(BRAND.name || BRAND.badge) && (
              <span className="flex items-center gap-1.5">
                {BRAND.name && (
                  <span
                    className={`block text-[22px] font-bold leading-none tracking-tight text-zinc-900 ${trimToCaps}`}
                  >
                    {BRAND.name}
                  </span>
                )}
                {BRAND.badge && (
                  <span className="inline-flex h-5 items-center justify-center rounded-md bg-zinc-900 px-1.5 text-[13px] font-bold text-white">
                    <span className={`block leading-none ${trimToCaps}`}>
                      {BRAND.badge}
                    </span>
                  </span>
                )}
              </span>
            )}
          </Link>

          {/* Desktop navigation: middle grid column, so it sits dead-centre in the bar */}
          <nav
            aria-label="Primary"
            className="col-start-2 hidden items-center gap-9 lg:flex"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  aria-current={active ? "page" : undefined}
                  className={`${navLink} ${active ? navLinkActive : navLinkIdle}`}
                >
                  {label}
                </Link>
              );
            })}

            {/* "Prepare" dropdown */}
            <div
              className="relative"
              onBlur={(e) => {
                const next = e.relatedTarget as Node | null;
                if (next && !e.currentTarget.contains(next)) setPrepareOpen(false);
              }}
            >
              <button
                ref={prepareButtonRef}
                type="button"
                aria-expanded={prepareOpen}
                aria-controls="prepare-menu"
                onClick={() => setPrepareOpen((open) => !open)}
                className={`${navLink} inline-flex items-center gap-0.5 ${
                  prepareOpen ? "text-zinc-900" : navLinkIdle
                }`}
              >
               
              </button>

             
            </div>
          </nav>

          {/* Actions */}
          <div className="col-start-3 flex items-center gap-2 justify-self-end">
           
            <a href={DOWNLOAD_URL} className={`${buttonDark} inline-flex px-4`}>
              Try for Free
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className={`${buttonLight} inline-flex w-11 lg:hidden`}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className={`absolute inset-x-0 top-full mt-2 rounded-[20px] p-3 lg:hidden ${surface}`}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-0.5">
              {NAV_LINKS.map(({ label, href }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl px-3 py-2.5 text-base font-medium ${focusRing} ${
                      active
                        ? "bg-purple-50 text-zinc-900"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}

            
            </nav>

           
          </div>
        )}
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}