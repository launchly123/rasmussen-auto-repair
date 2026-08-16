import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/Parallax";

const timeline = [
  {
    year: "1967",
    title: "It starts on Maple Avenue",
    body: "Ron Rasmussen opens the shop on Maple Avenue, building a business around the work he genuinely loved.",
  },
  {
    year: "The decades since",
    title: "The shop grows. The family stays.",
    body: "A small repair shop becomes a full repair facility — everyday vehicles, commercial fleets, RVs and heavy equipment — while remaining family operated.",
  },
  {
    year: "Today",
    title: "Same street. Same principle.",
    body: "Rasmussen continues serving Fresno with modern diagnostic equipment and experienced automotive repair.",
  },
];

export function Heritage() {
  return (
    <section id="story" className="bg-paper text-ink">
      <div className="container-x py-24 md:py-32 lg:py-40">
        <Reveal>
          <Eyebrow tone="light">Our Story</Eyebrow>
        </Reveal>

        {/* Oversized archival year type. */}
        <Reveal delay={70}>
          <h2 className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:gap-x-10">
            <span className="display-serif text-[clamp(4.5rem,15vw,10.5rem)]">
              1967
            </span>
            <span
              aria-hidden="true"
              className="text-[clamp(2rem,6vw,4rem)] leading-none text-red"
            >
              →
            </span>
            <span className="display-serif text-[clamp(3rem,10vw,7rem)] text-mute-light">
              Today
            </span>
          </h2>
        </Reveal>

        <Reveal delay={130}>
          <p className="mt-10 max-w-[58ch] text-lg leading-[1.65] text-ink/80 md:text-xl md:leading-[1.6]">
            Rasmussen Auto Repair began on Maple Avenue in 1967 when Ron
            Rasmussen turned his passion for fixing vehicles into a family
            business.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Photograph */}
          <div className="lg:col-span-5">
            <Reveal media>
              <Parallax amount={30}>
                {/* The shop's own photograph of the building. Presented as an
                    archival plate at its native size rather than blown up. */}
                <figure className="max-w-[25rem]">
                  <div className="border border-ink/12 bg-paper p-3 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-3">
                      <Image
                        src="/images/rasmussen-shop-maple-ave.jpg"
                        alt="The Rasmussen Auto Repair building on North Maple Avenue, service bay doors open and the shop sign above the office entrance."
                        fill
                        sizes="(min-width: 1024px) 400px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-4 flex items-start gap-3 text-sm text-mute-light">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-6 shrink-0 bg-red"
                    />
                    <span className="max-w-[32ch]">
                      The shop on North Maple Avenue — the same address since
                      1967.
                    </span>
                  </figcaption>
                </figure>
              </Parallax>
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7">
            <ol className="relative border-l border-ink/15 pl-8 md:pl-12">
              {timeline.map((entry, index) => (
                <Reveal
                  as="li"
                  key={entry.year}
                  delay={index * 90}
                  className="relative pb-12 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 -left-8 h-1.5 w-1.5 rounded-full bg-red md:-left-12"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.8125rem] -left-8 h-px w-5 bg-ink/20 md:-left-12 md:w-9"
                  />

                  <p className="eyebrow text-red">{entry.year}</p>
                  <h3 className="mt-3 font-serif text-[1.75rem] leading-tight font-normal md:text-[2rem]">
                    {entry.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] leading-[1.7] text-mute-light">
                    {entry.body}
                  </p>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120}>
              <blockquote className="mt-4 border-l-2 border-red pl-6 md:pl-8">
                <p className="font-serif text-[1.375rem] leading-[1.5] text-ink italic md:text-[1.625rem]">
                  Diagnose the problem correctly, explain it honestly, and
                  repair it properly.
                </p>
                <footer className="eyebrow mt-4 text-mute-light">
                  The principle the shop opened with
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
