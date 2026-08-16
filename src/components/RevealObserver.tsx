"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal], [data-reveal-media]";

/**
 * Drives the scroll reveals.
 *
 * The concealed state only exists while `html.js-reveal` is set, which the
 * pre-paint script in the document head adds when — and only when — the tab is
 * visible and motion is allowed. If that class is absent there is nothing to
 * reveal, so this observer stands down entirely.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("js-reveal")) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (nodes.length === 0) return;

    const show = (el: HTMLElement) => {
      el.setAttribute(
        el.hasAttribute("data-reveal-media") ? "data-reveal-media" : "data-reveal",
        "in",
      );
    };

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      // Fire slightly before the element reaches the fold so the motion has
      // finished by the time the reader's eye arrives.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    nodes.forEach((node) => observer.observe(node));

    /**
     * Backstop for the case where the observer never fires at all. It is
     * deliberately conditional on *nothing* having revealed yet — an
     * unconditional reveal-all would also run on healthy loads and flatten
     * every animation on the page.
     */
    const backstop = window.setTimeout(() => {
      const revealed = document.querySelector(
        '[data-reveal="in"], [data-reveal-media="in"]',
      );
      if (!revealed) nodes.forEach(show);
    }, 1600);

    return () => {
      window.clearTimeout(backstop);
      observer.disconnect();
    };
  }, []);

  return null;
}
