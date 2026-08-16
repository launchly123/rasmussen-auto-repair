import Image from "next/image";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MapPinIcon, ClockIcon, PhoneIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-ink">
      {/* A single soft light source from the upper left, like a bay door. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(244,241,234,0.06),transparent_65%)]"
      />

      <div className="container-x relative pt-28 pb-0 md:pt-32 lg:pt-34">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- Copy ---------------- */}
          <div className="lg:col-span-7 lg:pb-24">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-mute-dark">
                <span aria-hidden="true" className="h-px w-8 bg-red" />
                Family-owned auto repair · Fresno, California
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7">
                <span className="flex items-start gap-4 md:gap-6">
                  <span className="eyebrow mt-1.5 shrink-0 text-red-300 md:mt-3">
                    Since
                  </span>
                  <span className="display-serif text-[clamp(4.75rem,14vw,9.5rem)] text-paper">
                    1967
                  </span>
                </span>
                <span className="mt-5 block max-w-[24ch] text-[clamp(1.625rem,3.8vw,2.5rem)] leading-[1.08] font-semibold text-paper md:mt-6">
                  Auto repair built on nearly six decades of trust.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-[1.65] text-mute-dark md:text-lg">
                Family-owned automotive repair in Fresno. Honest diagnostics,
                experienced technicians, and quality repairs for the vehicles
                and people who depend on them.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/#contact" size="lg">
                  Schedule Service
                </Button>
                <Button href={business.phone.href} size="lg" variant="outlineLight">
                  <PhoneIcon className="h-[1.05rem] w-[1.05rem]" />
                  Call {business.phone.display}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t pt-6 rule-dark">
                <div className="flex items-center gap-2.5">
                  <MapPinIcon className="h-4 w-4 shrink-0 text-red-300" />
                  <dt className="sr-only">Address</dt>
                  <dd className="text-sm text-mute-dark">
                    {business.addressShort}
                  </dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <ClockIcon className="h-4 w-4 shrink-0 text-red-300" />
                  <dt className="sr-only">Hours</dt>
                  <dd className="text-sm text-mute-dark">
                    Mon–Fri {business.hours.weekdays}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* ---------------- Visual ---------------- */}
          <div className="lg:col-span-5">
            <Reveal media className="relative block">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-800 lg:aspect-auto lg:h-[38rem]">
                <Image
                  src="/images/hero-under-hood.jpg"
                  alt="A technician leaning over an open engine bay in a service bay."
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-[50%_35%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"
                />
              </div>

              {/* Stamped mark, bottom-left of the frame. */}
              <div className="absolute bottom-0 left-0 flex items-center gap-3 border-t border-r bg-ink px-4 py-3 rule-dark">
                <span className="eyebrow text-red-300">Est.</span>
                <span className="font-serif text-2xl leading-none text-paper">
                  1967
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------------- Capability strip ---------------- */}
        <Reveal delay={120}>
          <div className="mt-16 grid gap-6 border-t py-7 rule-dark md:grid-cols-2 md:gap-10 lg:mt-20">
            <div>
              <p className="eyebrow text-mute-dark">Vehicles we service</p>
              <p className="mt-2.5 text-[0.9375rem] text-paper/85">
                {business.vehicleOrigins.join(" · ")}
              </p>
            </div>
            <div>
              <p className="eyebrow text-mute-dark">From daily drivers to fleets</p>
              <p className="mt-2.5 text-[0.9375rem] text-paper/85">
                {business.vehicleTypes.join(" · ")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
