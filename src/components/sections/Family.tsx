import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function Family() {
  return (
    <section className="bg-ink">
      <div className="lg:grid lg:grid-cols-2 lg:items-center">
        {/* Full-bleed photograph on the left half at desktop widths. */}
        <Reveal media className="relative">
          {/* Kept at the photograph's own 5:4 ratio so nobody in it gets
              cropped out by the column. */}
          <figure className="relative aspect-[5/4] w-full bg-ink-800">
            <Image
              src="/images/rasmussen-team.jpg"
              alt="Three members of the Rasmussen Auto Repair team in the shop office."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover saturate-[0.85]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-ink/8 lg:bg-gradient-to-r lg:from-transparent lg:to-ink/30"
            />
            <figcaption className="eyebrow absolute bottom-0 left-0 border-t border-r bg-ink px-4 py-3 text-mute-dark rule-dark">
              The team on Maple Avenue
            </figcaption>
          </figure>
        </Reveal>

        <div className="flex items-center">
          <div className="container-x py-20 md:py-28 lg:max-w-[36rem] lg:py-32 lg:pl-14 xl:pl-20">
            <Reveal>
              <Eyebrow>The family</Eyebrow>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="mt-8 max-w-[16ch] text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[1.04] font-semibold text-paper">
                A family business in the truest sense.
              </h2>
            </Reveal>

            <Reveal delay={130}>
              <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-mute-dark">
                Ron Rasmussen started this shop in 1967 because he wanted to
                work on cars and build a business around something he genuinely
                loved. The family has stayed involved in running it ever since.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-mute-dark">
                That continuity is the whole point. A shop that has stayed in
                one family, at one address, for this long has no interest in
                the kind of repair that wins a single invoice and loses a
                customer.
              </p>
            </Reveal>

            <Reveal delay={230}>
              <p className="mt-10 border-t pt-8 font-serif text-[1.5rem] leading-[1.35] text-paper rule-dark md:text-[1.875rem]">
                Generations of customers.
                <span className="mt-1 block text-red-300">
                  Generations of experience.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
