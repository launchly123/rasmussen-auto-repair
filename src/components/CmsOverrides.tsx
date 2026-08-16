"use client";

import { useEffect } from "react";

/**
 * Applies text/image edits published from the Agency Console
 * (https://cms-omega-seven.vercel.app) on top of the site's built-in content.
 *
 * The console keys edits by POSITION, not by id: it walks the rendered page in
 * document order and numbers every text leaf `t0, t1, t2…` and every image
 * `i0, i1…`. The traversal below must stay byte-for-byte equivalent to the
 * console's, or an edit made to one paragraph lands on a different one.
 * Do not "improve" the SKIP list or the tag test in isolation — the two sides
 * are one contract. Anything that changes the number or order of elements in
 * the page body invalidates every already-published key after it.
 *
 * Why this is a component and not the plain inline <script> the static sites
 * use: this site is React. A script that rewrites the DOM before hydration has
 * its work thrown away the moment React reconciles. Running in an effect puts
 * it after hydration, and the MutationObserver re-applies the overrides after
 * any later re-render.
 *
 * Fails silently and leaves the built-in content in place if the console is
 * unreachable — a CMS outage must never blank a client's site.
 */

/**
 * Configurable so the console can be pointed elsewhere without a code change,
 * but with working defaults baked in — "someone forgot to set the env var in
 * Vercel" must not be a way for the CMS to silently do nothing.
 */
const CMS = process.env.NEXT_PUBLIC_CMS_URL || "https://cms-omega-seven.vercel.app";

/** Must equal the Vercel project name. */
const SLUG = process.env.NEXT_PUBLIC_CMS_SLUG || "rasmussen-auto-repair";

/**
 * The console is page-aware. Naming the page "Home" in the console slugifies
 * to "home", which is the row created for this site.
 */
const PAGE = process.env.NEXT_PUBLIC_CMS_PAGE || "home";

const SKIP =
  "header,nav,a,button,script,style,svg,select,textarea,input,form,iframe";
const TEXT_TAGS =
  /^(H1|H2|H3|H4|H5|H6|P|LI|BLOCKQUOTE|FIGCAPTION|TD|TH|SPAN|DIV|LABEL|EM|STRONG|SMALL|B|I)$/;

export function CmsOverrides() {
  useEffect(() => {
    let overrides: Record<string, string> | null = null;
    let observer: MutationObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const isTextLeaf = (el: Element) => {
      if (el.childElementCount !== 0) return false;
      if (!(el.textContent || "").trim()) return false;
      if (el.closest(SKIP)) return false;
      return TEXT_TAGS.test(el.tagName);
    };

    const apply = () => {
      if (!overrides || !document.body) return;
      // Disconnect first: our own writes would otherwise retrigger the
      // observer and loop.
      observer?.disconnect();
      try {
        const all = document.body.getElementsByTagName("*");
        let ti = 0;
        let ii = 0;
        for (let i = 0; i < all.length; i++) {
          const el = all[i];
          if (el.tagName === "IMG") {
            if (el.closest("header,nav")) continue;
            const key = "i" + ii++;
            const value = overrides[key];
            if (value) (el as HTMLImageElement).src = value;
          } else if (isTextLeaf(el)) {
            const key = "t" + ti++;
            const value = overrides[key];
            if (value != null) el.textContent = value;
          }
        }
      } finally {
        observer?.observe(document.body, { childList: true, subtree: true });
      }
    };

    fetch(
      `${CMS}/api/public/overrides/${SLUG}?page=${encodeURIComponent(PAGE)}`,
    )
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const published: Record<string, string> = (d && d.overrides) || {};
        overrides = published;
        if (!Object.keys(published).length) return;
        observer = new MutationObserver(() => {
          clearTimeout(timer);
          timer = setTimeout(apply, 120);
        });
        apply();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  return null;
}
