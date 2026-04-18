"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart, Menu, Music2, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

/** Desktop nav + drawer — labels match bareface.com; hrefs verified (200). */
const NAV_MENU: { label: string; items: { label: string; href: string }[] }[] = [
  {
    label: "Models",
    items: [
      { label: "Arriving", href: "https://www.bareface.com/arriving/all" },
      { label: "Women", href: "https://www.bareface.com/models/women" },
      { label: "Men", href: "https://www.bareface.com/models/men" },
      { label: "New faces", href: "https://www.bareface.com/new-faces/all" },
    ],
  },
  {
    label: "Lifestyle",
    items: [
      { label: "Talent", href: "https://www.bareface.com/talent/all" },
      { label: "Arabic", href: "https://www.bareface.com/arabic/all" },
      { label: "Emirati", href: "https://www.bareface.com/emirati/all" },
      { label: "Classic", href: "https://www.bareface.com/classic/all" },
      { label: "Teen", href: "https://www.bareface.com/teen/all" },
      { label: "Kids", href: "https://www.bareface.com/kids/all" },
    ],
  },
  {
    label: "Cast",
    items: [
      { label: "Women", href: "https://www.bareface.com/cast/women" },
      { label: "Men", href: "https://www.bareface.com/cast/men" },
      { label: "Teen girls", href: "https://www.bareface.com/cast-teen/girls" },
      { label: "Teen boys", href: "https://www.bareface.com/cast-teen/boys" },
      { label: "Girls", href: "https://www.bareface.com/cast/girls" },
      { label: "Boys", href: "https://www.bareface.com/cast/boys" },
    ],
  },
  {
    label: "Influencers",
    items: [
      { label: "Women", href: "https://www.bareface.com/influencers/women" },
      { label: "Men", href: "https://www.bareface.com/influencers/men" },
    ],
  },
  {
    label: "Stylists",
    items: [
      { label: "Hair & makeup", href: "https://www.bareface.com/hair-and-makeup/all" },
      { label: "Fashion", href: "https://www.bareface.com/stylists-fashion/all" },
      { label: "Lifestyle", href: "https://www.bareface.com/lifestyle/all" },
      { label: "Food", href: "https://www.bareface.com/food/all" },
      { label: "Interiors", href: "https://www.bareface.com/interiors/all" },
    ],
  },
  {
    label: "Photographers",
    items: [
      { label: "Fashion", href: "https://www.bareface.com/photographers-fashion/all" },
      { label: "E-comm", href: "https://www.bareface.com/e-comm/all" },
    ],
  },
];

/** Drawer layout: left column (ref. Bareface), right column. */
const DRAWER_LEFT = [NAV_MENU[0], NAV_MENU[1], NAV_MENU[3]];
const DRAWER_RIGHT = [NAV_MENU[2], NAV_MENU[4], NAV_MENU[5]];

const DRAWER_UTIL_LINKS: { label: string; href: string; internal: boolean }[] = [
  { label: "Apply now", href: "/apply", internal: true },
  { label: "Search", href: "https://www.bareface.com", internal: false },
  { label: "Events", href: "https://www.bareface.com/events", internal: false },
  { label: "Our work", href: "https://www.bareface.com/our-work", internal: false },
  { label: "About", href: "https://www.bareface.com/about", internal: false },
  { label: "Our partners", href: "https://www.bareface.com/our-work", internal: false },
  { label: "Faq", href: "https://www.bareface.com/about", internal: false },
  { label: "Contact", href: "/contact", internal: true },
];

const submenuLinkClass =
  "block whitespace-nowrap py-2.5 pl-5 pr-8 font-heading text-[13px] font-light uppercase tracking-[0.08em] text-foreground transition-opacity hover:opacity-70 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30";

const drawerSubLinkClass =
  "block font-heading text-[12px] font-light uppercase leading-relaxed tracking-[0.1em] text-foreground/95 transition-opacity hover:opacity-60 sm:text-[13px]";

const drawerSectionTitleClass =
  "mb-3 font-heading text-[14px] font-bold uppercase tracking-[0.14em] text-foreground sm:text-[15px]";

const socialIconClass = "text-foreground opacity-85 transition-opacity hover:opacity-100";
const socialSize = 20;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="22" height="22">
      <path d="M12.875 3.063C14.188 4.375 15 6.092 15 7.969c0 3.812-3.187 6.937-7.031 6.937-1.157 0-2.282-.312-3.313-.844L1 15l.969-3.594a6.95 6.95 0 0 1-.938-3.469C1.031 4.126 4.156 1 7.97 1c1.875 0 3.625.75 4.906 2.063M7.969 13.719c3.187 0 5.844-2.594 5.844-5.75 0-1.563-.657-3-1.75-4.094A5.7 5.7 0 0 0 8 2.188c-3.187 0-5.781 2.593-5.781 5.75 0 1.093.312 2.156.875 3.093l.156.219-.594 2.125 2.188-.594.187.125a5.8 5.8 0 0 0 2.938.813m3.187-4.313c.156.094.281.125.313.219.062.063.062.406-.094.813s-.844.78-1.156.812c-.563.094-1 .063-2.094-.437-1.75-.75-2.875-2.5-2.969-2.594-.093-.125-.687-.938-.687-1.813 0-.843.437-1.25.593-1.437a.59.59 0 0 1 .47-.219h.312c.125 0 .25-.031.406.313.125.343.5 1.187.531 1.28.032.095.063.188 0 .313-.312.657-.687.625-.5.938.688 1.156 1.344 1.562 2.375 2.062.156.094.25.063.375-.031.094-.125.438-.531.531-.687.126-.188.25-.157.407-.094.156.062 1 .469 1.187.562" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 29.767 29.76" fill="currentColor" width="22" height="22">
      <path d="M14.887 7.25a7.62 7.62 0 0 0-7.63 7.63 7.62 7.62 0 0 0 7.63 7.63 7.62 7.62 0 0 0 7.63-7.63 7.62 7.62 0 0 0-7.63-7.63m0 12.591a4.97 4.97 0 0 1-4.96-4.96 4.965 4.965 0 0 1 4.96-4.961 4.965 4.965 0 0 1 4.961 4.961 4.97 4.97 0 0 1-4.961 4.956Zm9.718-12.904a1.78 1.78 0 0 0-1.78-1.78 1.78 1.78 0 0 0-1.78 1.78 1.776 1.776 0 0 0 1.78 1.78 1.776 1.776 0 0 0 1.78-1.78m5.053 1.806a8.8 8.8 0 0 0-2.4-6.236 8.87 8.87 0 0 0-6.236-2.4c-2.457-.139-9.821-.139-12.279 0a8.85 8.85 0 0 0-6.235 2.4 8.84 8.84 0 0 0-2.403 6.23c-.14 2.458-.14 9.822 0 12.279a8.8 8.8 0 0 0 2.4 6.236 8.88 8.88 0 0 0 6.235 2.4c2.457.139 9.821.139 12.279 0a8.8 8.8 0 0 0 6.236-2.4 8.87 8.87 0 0 0 2.4-6.236c.15-2.457.15-9.815.007-12.272Zm-3.17 14.91a5.02 5.02 0 0 1-2.829 2.829c-1.959.777-6.607.6-8.772.6s-6.82.173-8.772-.6a5.02 5.02 0 0 1-2.83-2.829c-.777-1.959-.6-6.607-.6-8.772s-.173-6.82.6-8.772A5.02 5.02 0 0 1 6.114 3.28c1.959-.777 6.607-.6 8.772-.6s6.82-.173 8.772.6a5.02 5.02 0 0 1 2.829 2.829c.777 1.959.6 6.607.6 8.772s.178 6.819-.599 8.772" />
    </svg>
  );
}

function DrawerFacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={socialSize} height={socialSize} className={socialIconClass}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DrawerYoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={socialSize} height={socialSize} className={socialIconClass}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DrawerLinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={socialSize} height={socialSize} className={socialIconClass}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function DrawerColumnSection({
  column,
  onNavigate,
}: {
  column: (typeof NAV_MENU)[number];
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className={drawerSectionTitleClass}>{column.label}</p>
      <ul className="flex flex-col gap-1.5">
        {column.items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className={drawerSubLinkClass} onClick={onNavigate}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DrawerSocialRow() {
  return (
    <div className="flex flex-wrap items-center gap-4 border-t border-border/80 px-6 py-5">
      <a href="https://wa.me/+971505919770?text=Ask+us+anything" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex">
        <svg viewBox="0 0 24 24" fill="currentColor" width={socialSize} height={socialSize} className={socialIconClass}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
      <a href="https://www.instagram.com/bareface_model_agency/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={socialSize} height={socialSize} className={socialIconClass}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
      <a href="#" aria-label="Facebook" className="flex">
        <DrawerFacebookIcon />
      </a>
      <a href="#" aria-label="YouTube" className="flex">
        <DrawerYoutubeIcon />
      </a>
      <a href="#" aria-label="LinkedIn" className="flex">
        <DrawerLinkedinIcon />
      </a>
      <a href="#" aria-label="TikTok" className="flex">
        <Music2 size={socialSize} className={socialIconClass} />
      </a>
    </div>
  );
}

const DRAWER_TRANSITION_MS = 320;

export function Header() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerActive, setDrawerActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const unmountAfterCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clearCloseUnmountTimer = useCallback(() => {
    if (unmountAfterCloseRef.current !== null) {
      clearTimeout(unmountAfterCloseRef.current);
      unmountAfterCloseRef.current = null;
    }
  }, []);

  const finishCloseUnmount = useCallback(() => {
    clearCloseUnmountTimer();
    setDrawerVisible(false);
  }, [clearCloseUnmountTimer]);

  const closeDrawer = useCallback(() => {
    setDrawerActive(false);
    clearCloseUnmountTimer();
    unmountAfterCloseRef.current = setTimeout(finishCloseUnmount, DRAWER_TRANSITION_MS);
  }, [clearCloseUnmountTimer, finishCloseUnmount]);

  const openDrawer = useCallback(() => {
    clearCloseUnmountTimer();
    setDrawerVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDrawerActive(true));
    });
  }, [clearCloseUnmountTimer]);

  const handleAsideTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "transform") return;
      if (!drawerActive) finishCloseUnmount();
    },
    [drawerActive, finishCloseUnmount]
  );

  useEffect(() => {
    if (!drawerVisible) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerVisible, closeDrawer]);

  useEffect(() => {
    if (!drawerVisible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerVisible]);

  useEffect(() => () => clearCloseUnmountTimer(), [clearCloseUnmountTimer]);

  useEffect(() => {
    if (drawerVisible && drawerActive) {
      closeButtonRef.current?.focus();
    }
  }, [drawerVisible, drawerActive]);

  const onDrawerLinkClick = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[70px] border-b border-border/80 text-foreground transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "color-mix(in srgb, var(--background) 80%, transparent)" : "var(--background)",
          backdropFilter: scrolled ? "blur(14px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(1.4)" : "none",
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1512px] items-center gap-6 px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openDrawer}
              className="flex cursor-pointer items-center p-1 text-foreground transition-opacity hover:opacity-70"
              aria-label="Open menu"
              aria-expanded={drawerVisible && drawerActive}
              aria-controls="site-nav-drawer"
            >
              <Menu size={22} />
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center p-1 text-foreground transition-opacity hover:opacity-70"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              href="/favs"
              className="flex items-center p-1 text-foreground transition-opacity hover:opacity-70"
              aria-label="Favourites"
            >
              <Heart size={20} />
            </Link>
            <ThemeToggle />
          </div>

          <div className="hidden flex-1 items-center justify-between md:flex">
            <nav className="flex items-center gap-1 pl-2 lg:gap-2" aria-label="Main">
              {NAV_MENU.map((column) => (
                <div key={column.label} className="group relative">
                  <span
                    className="flex cursor-default items-center gap-1 px-1.5 py-[5px] font-heading text-[14px] font-normal uppercase tracking-[0.04em] text-foreground lg:text-[15px]"
                    tabIndex={0}
                  >
                    {column.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={1.7}
                      className="shrink-0 transition-transform duration-200 ease-out group-hover:-rotate-180 group-focus-within:-rotate-180"
                      aria-hidden
                    />
                  </span>
                  <div
                    className="pointer-events-none invisible absolute left-0 top-full z-50 min-w-[10rem] pt-2 opacity-0 shadow-[4px_8px_24px_rgba(0,0,0,0.45)] transition-[opacity,visibility] duration-150 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
                    role="presentation"
                  >
                    <ul className="border-0 bg-background py-1" role="menu" aria-label={`${column.label} categories`}>
                      {column.items.map((item) => (
                        <li key={item.href} role="none">
                          <a role="menuitem" href={item.href} className={submenuLinkClass}>
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/+971505919770?text=Ask+us+anything"
                target="_blank"
                rel="noopener noreferrer"
                className="flex text-foreground opacity-80 transition-opacity hover:opacity-100"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://www.instagram.com/bareface_model_agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex text-foreground opacity-80 transition-opacity hover:opacity-100"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <Link href="/" className="ml-auto flex items-center md:ml-0" aria-label="BareFace home">
            <img
              src="/images/logo.svg"
              alt="BareFace Productions"
              width={160}
              height={38}
              style={{ filter: "invert(1)" }}
            />
          </Link>
        </div>
      </header>

      {/* Spacer to compensate for fixed header */}
      <div className="h-[70px]" />

      {drawerVisible && (
        <div
          className="pointer-events-none fixed inset-0 z-[100]"
          aria-hidden={!drawerActive}
        >
          {/* Parent is pointer-events-none so clicks reach the page; only backdrop + panel opt in */}
          <button
            type="button"
            aria-label="Close menu"
            className={`absolute inset-0 bg-black transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              drawerActive ? "pointer-events-auto opacity-[0.55]" : "pointer-events-none opacity-0"
            }`}
            onClick={closeDrawer}
          />
          <div
            id="site-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onTransitionEnd={handleAsideTransitionEnd}
            className={`pointer-events-auto absolute left-0 top-0 z-[101] flex h-full max-h-dvh w-[min(100%,22rem)] flex-col bg-background text-foreground shadow-[12px_0_48px_rgba(0,0,0,0.35)] transition-[transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] dark:shadow-[12px_0_48px_rgba(0,0,0,0.55)] sm:w-[min(42vw,28rem)] md:w-[min(34vw,30rem)] ${
              drawerActive ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="relative shrink-0 px-5 pt-5">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeDrawer}
                className="flex cursor-pointer items-center p-1 text-foreground transition-opacity hover:opacity-70"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-2">
              <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                  {DRAWER_LEFT.map((col) => (
                    <DrawerColumnSection key={col.label} column={col} onNavigate={onDrawerLinkClick} />
                  ))}
                  <div className="mt-2 border-t border-border/80 pt-6">
                    <ul className="flex flex-col gap-2.5">
                      {DRAWER_UTIL_LINKS.map((link) => (
                        <li key={link.label}>
                          {link.internal ? (
                            <Link href={link.href} className={drawerSubLinkClass} onClick={onDrawerLinkClick}>
                              {link.label}
                            </Link>
                          ) : (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={drawerSubLinkClass}
                              onClick={onDrawerLinkClick}
                            >
                              {link.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col gap-9 sm:pt-0">
                  {DRAWER_RIGHT.map((col) => (
                    <DrawerColumnSection key={col.label} column={col} onNavigate={onDrawerLinkClick} />
                  ))}
                </div>
              </div>
            </div>

            <DrawerSocialRow />
          </div>
        </div>
      )}
    </>
  );
}
