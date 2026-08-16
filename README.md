# Rasmussen Auto Repair

Redesign concept for Rasmussen Auto Repair — family-owned auto repair at
1023 N Maple Ave, Fresno, CA, in business since 1967.

Next.js (App Router) · TypeScript · Tailwind v4. No UI or animation libraries.

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Where things live

| What | Where |
|---|---|
| Every business fact (NAP, hours, phone, map links, warranty) | `src/lib/business.ts` |
| Service catalogue and grouping | `src/lib/services.ts` |
| Customer reviews | `src/lib/testimonials.ts` |
| Photo provenance — what is real, what is placeholder | `public/images/CREDITS.md` |
| Page composition | `src/app/page.tsx` |

`business.ts` is the single source of truth: the visible NAP, the footer, the
`AutoRepair` structured data and the map links all read from it, so they cannot
drift apart.

## Two things that are deliberate

**No invented reviews.** `testimonials.ts` is empty on purpose. Until verified
quotes are taken from the shop's Google or BBB profile, the Reviews section
shows only the themes that recur in the existing feedback and links out to the
real reviews. Drop entries into that array and the quoted layout appears
automatically.

**The appointment form fails loudly.** `POST /api/service-request` forwards to
`SERVICE_REQUEST_WEBHOOK_URL`. If that env var is unset it returns 501 and the
form tells the customer to call. A booking request must never look like it
succeeded while going nowhere.

## Animation

Entrance reveals are CSS-only and gated on `html.js-reveal`, which an inline
pre-paint script adds **only** when the tab is visible and the visitor has not
asked for reduced motion. The hidden state is never the default — with no
JavaScript, in a background tab, or under `prefers-reduced-motion`, every
section renders fully visible. This is what stops a link opened in a background
tab from rendering a blank page.

Verify with: SSR HTML must contain no `opacity:0` and no `js-reveal` on `<html>`.

## Still needed from the client

- Photography of the shop floor, a technician working, and the building at a
  usable resolution (see `public/images/CREDITS.md`)
- Verified review quotes with attribution
- A delivery endpoint for appointment requests
- Confirmation of the 12-month / 12,000-mile warranty wording, currently
  attributed on-page to the BBB listing
