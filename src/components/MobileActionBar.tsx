"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { business } from "@/lib/business";
import { cn } from "@/lib/cn";
import { PhoneIcon } from "./icons";

/**
 * Persistent call / schedule bar on small screens. It appears once the hero's
 * own CTAs have scrolled away, so the two never compete.
 */
export function MobileActionBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t bg-ink/95 backdrop-blur-md rule-dark lg:hidden",
        "transition-transform duration-300 ease-[var(--ease-out-soft)]",
        "pb-[env(safe-area-inset-bottom)]",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      // Keep it out of the tab order and off screen readers while hidden.
      aria-hidden={!shown}
      inert={!shown}
    >
      <div className="flex items-stretch gap-2 px-4 py-3">
        <a
          href={business.phone.href}
          className="flex min-h-13 flex-1 items-center justify-center gap-2.5 bg-red text-[0.9375rem] font-medium text-white"
        >
          <PhoneIcon className="h-[1.05rem] w-[1.05rem]" />
          Call the shop
        </a>
        <Link
          href="/#contact"
          className="flex min-h-13 flex-1 items-center justify-center border border-paper/25 text-[0.9375rem] font-medium text-paper"
        >
          Schedule
        </Link>
      </div>
    </div>
  );
}
