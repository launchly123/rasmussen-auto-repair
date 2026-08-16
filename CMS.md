# Agency Console (CMS) wiring

The site pulls published edits from **https://cms-omega-seven.vercel.app**.

```
GET /api/public/overrides/rasmussen-auto-repair?page=home
-> { "overrides": { "t12": "…" }, "updated_at": "2026-08-16T06:06:08Z" }
```

The console is **page-aware** — omitting `?page=` is a silent misconfiguration.

## Registration (done 16 Aug 2026)

The console needs two database rows before a site appears in it at all. Both
exist for this site:

| Row | Value |
|---|---|
| `websites.id` | `e3eb2631-1ee3-4bef-a95b-602844175e5c` |
| `websites.slug` / `name` | `rasmussen-auto-repair` |
| `websites.domain` | `rasmussen-auto-repair.vercel.app` (bare host — no protocol, no trailing slash) |
| `websites.vercel_project_id` | `prj_43TYKlHgLseTqiHgRU0xYhsLk39A` |
| `pages.id` | `04d5c5e7-57f7-4ad2-bcdd-ee6f2fcd4e01` |
| `pages.slug` / `title` | `home` / `Home` |

**Diagnosing registration from outside**, using the public endpoint:

| Response | Meaning |
|---|---|
| no `updated_at` key at all | no `websites` row — the site is not registered |
| `"updated_at": null` | `websites` row exists but **no matching `pages` row** → the editor shows "No pages yet" |
| `"updated_at": "<timestamp>"` | fully registered — this is the healthy state |

Public, `access-control-allow-origin: *`, cached ~30s — published edits go live
within about half a minute. Implemented in
[`src/components/CmsOverrides.tsx`](src/components/CmsOverrides.tsx).

**The slug must equal the Vercel project name:** `rasmussen-auto-repair`.
If the project is ever renamed, change `SLUG` in that file in the same commit.

## The contract, and why you must not "improve" it

Edits are keyed by **position, not id**. Both sides walk the page body in
document order and number every text leaf `t0, t1, t2…` and every image
`i0, i1…`. An element is a text leaf when **all** of these hold:

- it has no child elements (`childElementCount === 0`)
- its trimmed `textContent` is non-empty
- it is not inside `header, nav, a, button, script, style, svg, select,
  textarea, input, form, iframe`
- its tag is one of `H1–H6, P, LI, BLOCKQUOTE, FIGCAPTION, TD, TH, SPAN, DIV,
  LABEL, EM, STRONG, SMALL, B, I`

Images are numbered separately and skip anything inside `header, nav`.

The site's traversal and the console's are **one contract**. Changing the skip
list or the tag list on this side only — however sensible the change looks —
silently moves every key.

## The maintenance hazard

**Any change to the number or order of elements in the body shifts every later
key**, so already-published edits land on the wrong element. Adding a section,
removing a paragraph, or wrapping text in a new span all count.

After any structural edit: re-dump the key map, compare against what the client
has published in the console, and re-point anything that moved.

Dump the current key map by pasting this into the browser console on the live
site:

```js
(()=>{const SKIP="header,nav,a,button,script,style,svg,select,textarea,input,form,iframe",
T=/^(H1|H2|H3|H4|H5|H6|P|LI|BLOCKQUOTE|FIGCAPTION|TD|TH|SPAN|DIV|LABEL|EM|STRONG|SMALL|B|I)$/,
leaf=e=>e.childElementCount===0&&(e.textContent||"").trim()&&!e.closest(SKIP)&&T.test(e.tagName),
all=document.body.getElementsByTagName("*");let t=0,i=0,o=[];
for(const e of all){if(e.tagName==="IMG"){if(e.closest("header,nav"))continue;o.push("i"+i+++" "+e.src)}
else if(leaf(e))o.push("t"+t+++" "+e.textContent.replace(/\s+/g," ").trim().slice(0,70))}
console.log(o.join("\n"))})()
```

## What the client can and cannot edit

Editable: 129 text slots and 5 images — every heading, body paragraph, service
list item, timeline entry, review theme, process step and the four "Why
Rasmussen" claims (including the warranty wording).

**Not editable, by design:**

| Locked | Why |
|---|---|
| Nav links, all CTA buttons, the phone links | Inside `a` / `button`, which the console skips |
| The `SINCE 1967` headline and `1967 → Today` | Split into styled spans — the parent is not a leaf, but each span **is**, so edit the pieces |
| Both postal addresses, the footer address | Contain a `<br>`, so they are not leaves |
| Opening hours rows | `<dt>`/`<dd>`, which the console cannot address |
| `<title>`, meta description, **JSON-LD structured data** | The console never touches the document head |

The last two are deliberate. Address and hours live in
[`src/lib/business.ts`](src/lib/business.ts), which also feeds the `AutoRepair`
structured data. If they were CMS-editable, changing them on screen would
silently desync what Google reads from what the page shows. **NAP and hours
changes go through `business.ts` and a redeploy — not the console.**

## The iframe hydration guard — do not remove it

`src/app/layout.tsx` carries a `beforeInteractive` script that swallows one
specific `SecurityError`. Without it **the editor canvas cannot load this site
at all**.

The console serves the site inside an iframe from its own origin with an
injected `<base href>` pointing back here. Next's App Router calls
`history.replaceState()` with a relative URL during hydration; the browser
resolves it through `<base>` (our origin) but validates it against the
document's real origin (the console's, since it served the bytes). The mismatch
throws, hydration dies before the console's postMessage handshake, and the
editor times out on "This page couldn't load".

This affects **every** Next.js App Router site connected to this console. The
right long-term fix is in the console's own `preview-html` bridge script, not
repeated per client site.

## Verified on this build

- SSR HTML and the hydrated DOM produce **identical** key sequences (129 text,
  5 image, zero differences), so it does not matter which of the two the console
  parses.
- Overrides are applied in a `useEffect`, not a pre-hydration script — React
  would otherwise discard the rewrite on reconciliation.
- A `MutationObserver` re-applies after later re-renders and is disconnected
  during our own writes so it cannot loop.
- If the console is unreachable the fetch fails silently and the built-in
  content stays. A CMS outage cannot blank the site.
- The traversal is **byte-identical** to the one on `punjab-auto-repair`, the
  only integration verified working end to end. Keep it that way: a drift check
  is a plain diff of the two `CmsOverrides.tsx` files.
- The hydration guard was reproduced and fixed under a local harness that
  replays the console's exact mechanism (proxy the real HTML from a second
  origin, inject the same `<base>`, embed in an iframe): `SecurityError` without
  the guard, clean with it.
- Applying a simulated payload through the real traversal on the live site
  changed **exactly** the three targeted elements and nothing else.
