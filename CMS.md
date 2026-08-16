# Agency Console (CMS) wiring

The site pulls published edits from **https://cms-omega-seven.vercel.app**.

```
GET /api/public/overrides/rasmussen-auto-repair
-> { "overrides": { "t12": "…", "i1": "https://…" } }
```

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
