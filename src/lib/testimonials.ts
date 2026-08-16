export type Testimonial = {
  /** The customer's own wording, verbatim. Never paraphrased or composed. */
  quote: string;
  /** Attribution exactly as it appears on the source platform. */
  author: string;
  /** Where the review was published, e.g. "Google". */
  source: string;
};

/**
 * INTENTIONALLY EMPTY.
 *
 * No review on this site may be written by anyone other than the customer who
 * left it. Until verified quotes are pulled from Rasmussen's Google or BBB
 * profile, the Reviews section renders the recurring themes only — which are
 * supported by the existing feedback — and links out to the real reviews.
 *
 * To publish real reviews: add entries below with the exact published wording
 * and attribution. The section picks them up automatically and switches to the
 * quoted layout; no other file needs to change.
 */
export const testimonials: Testimonial[] = [];
