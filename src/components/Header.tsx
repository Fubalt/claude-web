"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart, Menu, Search, X } from "lucide-react";

/** Desktop nav + mobile drawer — labels match bareface.com IA; hrefs verified (200). */
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

const submenuLinkClass =
  "block whitespace-nowrap py-2.5 pl-5 pr-8 font-heading text-[13px] font-light uppercase tracking-[0.08em] text-[#e8e6e3] transition-opacity hover:opacity-70 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6e3]/40";

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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-50 h-[70px] border-b border-white/10 bg-[#181a1b] text-[#e8e6e3]">
        <div className="mx-auto flex h-16 max-w-[1512px] items-center gap-6 px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex cursor-pointer items-center p-1 text-[#e8e6e3] transition-opacity hover:opacity-70"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center p-1 text-[#e8e6e3] transition-opacity hover:opacity-70"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              href="/favs"
              className="flex items-center p-1 text-[#e8e6e3] transition-opacity hover:opacity-70"
              aria-label="Favourites"
            >
              <Heart size={20} />
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-between md:flex">
            <nav className="flex items-center gap-1 pl-2 lg:gap-2" aria-label="Main">
              {NAV_MENU.map((column) => (
                <div key={column.label} className="group relative">
                  <span
                    className="flex cursor-default items-center gap-1 px-1.5 py-[5px] font-heading text-[14px] font-normal uppercase tracking-[0.04em] text-[#e8e6e3] lg:text-[15px]"
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
                  {/* pt-2 bridge keeps hover while moving into the panel */}
                  <div
                    className="pointer-events-none invisible absolute left-0 top-full z-50 min-w-[10rem] pt-2 opacity-0 shadow-[4px_8px_24px_rgba(0,0,0,0.45)] transition-[opacity,visibility] duration-150 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
                    role="presentation"
                  >
                    <ul
                      className="border-0 bg-[#181a1b] py-1"
                      role="menu"
                      aria-label={`${column.label} categories`}
                    >
                      {column.items.map((item) => (
                        <li key={item.href} role="none">
                          <a
                            role="menuitem"
                            href={item.href}
                            className={submenuLinkClass}
                          >
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
                className="flex text-[#e8e6e3] opacity-80 transition-opacity hover:opacity-100"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://www.instagram.com/bareface_model_agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex text-[#e8e6e3] opacity-80 transition-opacity hover:opacity-100"
                aria-label="Instagram"
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

      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-[#181a1b] px-6 py-5 text-[#e8e6e3]">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="ml-auto cursor-pointer text-[#e8e6e3] transition-opacity hover:opacity-70"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile main">
            {NAV_MENU.map((column) => (
              <details key={column.label} className="group border-b border-white/10 pb-2">
                <summary className="flex cursor-pointer list-none items-center justify-between py-2 font-heading text-[22px] font-normal uppercase tracking-[0.06em] text-[#e8e6e3] marker:content-none [&::-webkit-details-marker]:hidden">
                  {column.label}
                  <ChevronDown
                    size={18}
                    strokeWidth={1.7}
                    className="shrink-0 transition-transform duration-200 group-open:-rotate-180"
                    aria-hidden
                  />
                </summary>
                <div className="mt-2 flex flex-col gap-1 border-l border-white/15 pl-4">
                  {column.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="py-1.5 font-heading text-[15px] font-light uppercase tracking-[0.06em] text-[#e8e6e3]/90 transition-opacity hover:opacity-70"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </details>
            ))}
            <Link
              href="/apply"
              onClick={() => setMenuOpen(false)}
              className="mt-4 border-t border-white/10 pt-6 font-heading text-[22px] font-normal uppercase tracking-[0.06em] text-[#e8e6e3]"
            >
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
