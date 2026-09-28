"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Edit these                                                                */
/* -------------------------------------------------------------------------- */

// Text beside the logo: bold name + small black badge, like "Parakeet [AI]".
// For plain text instead, use name: "Wah AI" and badge: "". Set both to "" to hide.
const BRAND = { name: "Wah", badge: "AI" };

// Accessible name for the logo link (screen readers read "Wah AI").
const BRAND_LABEL =
  [BRAND.name, BRAND.badge].filter(Boolean).join(" ") || "Home";

const NAV_LINKS = [
  { label: "Call Assistant", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Privacy", href: "/#privacy" },
  { label: "Pricing", href: "/#pricing" },
];

// Items inside the "Prepare" dropdown.
const PREPARE_LINKS = [
  { label: "Interview prep", href: "/prepare/interviews" },
  { label: "Practice questions", href: "/prepare/questions" },
  { label: "Guides", href: "/prepare/guides" },
];

const SIGN_IN_HREF = "/sign-in";
const CTA_HREF = "/sign-up";

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

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const prepareButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => pathname === href;

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setPrepareOpen(false);
  }, []);

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

  return (
    <header
      ref={headerRef}
      className="pointer-events-none sticky top-0 z-50 px-2 pt-3"
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
                Prepare
                <ChevronDown
                  className={`h-4 w-4 transition-transform motion-reduce:transition-none ${
                    prepareOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {prepareOpen && (
                <ul
                  id="prepare-menu"
                  className={`absolute left-1/2 top-full z-10 mt-7 w-56 -translate-x-1/2 rounded-2xl p-2 ${surface}`}
                >
                  {PREPARE_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={closeAll}
                        className={`block rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 motion-reduce:transition-none ${focusRing}`}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>

          {/* Actions */}
          <div className="col-start-3 flex items-center gap-2 justify-self-end">
            <Link
              href={SIGN_IN_HREF}
              className={`${buttonLight} hidden px-4 sm:inline-flex`}
            >
              Sign in
            </Link>
            <Link href={CTA_HREF} className={`${buttonDark} inline-flex px-4`}>
              Try for Free
            </Link>

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
                    onClick={closeAll}
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

              <p className="px-3 pb-1 pt-3 text-sm text-zinc-500">Prepare</p>
              {PREPARE_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeAll}
                  className={`rounded-xl px-3 py-2.5 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 ${focusRing}`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <Link
              href={SIGN_IN_HREF}
              onClick={closeAll}
              className={`${buttonLight} mt-3 flex w-full sm:hidden`}
            >
              Sign in
            </Link>
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