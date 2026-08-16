import { business } from "@/lib/business";
import { testimonials } from "@/lib/testimonials";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";

/** The themes that recur across the shop's existing customer feedback. */
const themes = [
  "Honest",
  "Trustworthy",
  "Fair pricing",
  "Knowledgeable",
  "Professional",
  "Thorough",
  "Friendly",
  "Reliable",
  "Explains repairs clearly",
  "Doesn't push unnecessary repairs",
];

export function Reviews() {
  return (
    <section id="reviews" className="bg-paper text-ink">
      <div className="container-x py-24 md:py-32 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow tone="light">Reviews</Eyebrow>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="mt-8 max-w-[15ch] text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] font-semibold">
                The same words, decade after decade.
              </h2>
            </Reveal>

            <Reveal delay={130}>
              <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-mute-light">
                Read enough of Rasmussen&rsquo;s customer feedback and the
                descriptions start repeating. Not the vocabulary of marketing —
                the vocabulary of people describing a mechanic they trust.
              </p>
            </Reveal>

            {testimonials.length > 0 && (
              <div className="mt-12 space-y-10">
                {testimonials.map((testimonial, index) => (
                  <Reveal
                    as="figure"
                    key={testimonial.author + index}
                    delay={index * 80}
                    className="border-l-2 border-red pl-6 md:pl-8"
                  >
                    <blockquote className="font-serif text-[1.375rem] leading-[1.55] md:text-[1.5rem]">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="eyebrow mt-4 text-mute-light">
                      {testimonial.author} · {testimonial.source}
                    </figcaption>
                  </Reveal>
                ))}
              </div>
            )}

            <Reveal delay={180}>
              <div className="mt-10">
                <Button
                  href={business.maps.reviews}
                  variant="outlineDark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read reviews on Google
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Index of recurring themes — deliberately set as a reference list
              rather than a wall of cards. */}
          <div className="lg:col-span-6">
            <Reveal delay={90}>
              <div className="border-t border-ink/20 pt-6">
                <p className="eyebrow text-mute-light">
                  What comes up again and again
                </p>
                <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                  {themes.map((theme) => (
                    <li
                      key={theme}
                      className="flex items-baseline gap-3 border-b border-ink/12 py-4"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 shrink-0 translate-y-[-0.2em] rounded-full bg-red"
                      />
                      <span className="font-serif text-[1.1875rem] leading-snug">
                        {theme}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
