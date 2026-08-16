/**
 * Single source of truth for every verified business fact on this site.
 *
 * Everything here came from the client brief. Nothing in this file may be
 * embellished — no awards, certifications, staff names, prices, review counts
 * or guarantees beyond what is recorded below. If a claim needs a source, it
 * carries one.
 */

export const business = {
  name: "Rasmussen Auto Repair",
  legalName: "Rasmussen Auto Repair",
  founded: 1967,
  founder: "Ron Rasmussen",

  address: {
    street: "1023 N Maple Ave",
    city: "Fresno",
    region: "CA",
    regionName: "California",
    postalCode: "93702",
    country: "US",
  },

  // Display strings — keep NAP identical everywhere it appears.
  addressLine: "1023 N Maple Ave",
  cityLine: "Fresno, CA 93702",
  addressShort: "1023 N Maple Ave · Fresno, CA",

  phone: {
    display: "(559) 251-0669",
    plain: "559-251-0669",
    href: "tel:+15592510669",
  },

  hours: {
    weekdays: "7:30 AM – 6:00 PM",
    summary: "Monday – Friday, 7:30 AM – 6:00 PM",
    rows: [
      { days: "Monday – Friday", value: "7:30 AM – 6:00 PM", open: true },
      { days: "Saturday", value: "Closed", open: false },
      { days: "Sunday", value: "Closed", open: false },
    ],
  },

  /** Structured-data opening hours (Mo–Fr 07:30–18:00). */
  openingHours: {
    days: [
      "https://schema.org/Monday",
      "https://schema.org/Tuesday",
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
      "https://schema.org/Friday",
    ],
    opens: "07:30",
    closes: "18:00",
  },

  /** Approximate shop coordinates for map + structured data. */
  geo: { lat: 36.7621, lng: -119.7728 },

  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=1023+N+Maple+Ave%2C+Fresno%2C+CA+93702",
    embed:
      "https://www.google.com/maps?q=1023+N+Maple+Ave,+Fresno,+CA+93702&z=15&output=embed",
    reviews:
      "https://www.google.com/maps/search/?api=1&query=Rasmussen+Auto+Repair+1023+N+Maple+Ave+Fresno+CA+93702",
  },

  /**
   * Verified only. The warranty below is attributed in the UI to the source it
   * came from and must not be restated as an unqualified promise.
   */
  warranty: {
    term: "12-month / 12,000-mile parts and labor warranty",
    short: "12 months / 12,000 miles",
    attribution: "as listed on the company's BBB profile",
  },

  vehicleOrigins: ["American", "Japanese", "European"],
  vehicleTypes: ["Cars", "Trucks", "Fleets", "RVs", "Heavy Equipment"],
} as const;

export const yearsInBusiness = new Date().getFullYear() - business.founded;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const nav = [
  { label: "Home", href: "/#top" },
  { label: "Services", href: "/#services" },
  { label: "Our Story", href: "/#story" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
] as const;
