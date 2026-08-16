"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { business, nav } from "@/lib/business";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { PhoneIcon } from "./icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Solid backdrop once the hero is behind us.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu: lock the page, close on Escape, and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[var(--ease-out-soft)]",
        scrolled || open
          ? "border-b bg-ink/92 backdrop-blur-md rule-dark"
          : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-18 items-center justify-between gap-4 md:h-20">
        <Link
          href="/#top"
          className="flex min-h-11 shrink-0 items-center text-paper"
          aria-label="Rasmussen Auto Repair — home"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative text-[0.875rem] text-paper/75 transition-colors duration-200 hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Phone is the priority action on small screens. */}
          <a
            href={business.phone.href}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 px-3 text-[0.875rem] font-medium text-paper transition-colors hover:text-red-300"
          >
            <PhoneIcon className="h-4 w-4 text-red-300" />
            <span className="hidden sm:inline">{business.phone.display}</span>
            <span className="sr-only sm:hidden">
              Call {business.phone.display}
            </span>
          </a>

          <Link
            href="/#contact"
            className="hidden min-h-11 items-center bg-red px-5 text-[0.875rem] font-medium text-white transition-colors duration-200 hover:bg-red-700 lg:inline-flex"
          >
            Schedule Service
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-paper lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-out-soft)]",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-out-soft)]",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t bg-ink rule-dark lg:hidden"
      >
        <nav aria-label="Primary mobile" className="container-x py-4">
          <ul className="divide-y divide-paper/10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between text-[1.0625rem] text-paper"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-red-300">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-5 flex min-h-14 items-center justify-center bg-red text-base font-medium text-white"
          >
            Schedule Service
          </Link>

          <p className="eyebrow mt-5 text-mute-dark">
            {business.addressLine} · {business.cityLine}
          </p>
          <p className="eyebrow mt-2 mb-2 text-mute-dark">
            Mon–Fri {business.hours.weekdays}
          </p>
        </nav>
      </div>
    </header>
  );
}
