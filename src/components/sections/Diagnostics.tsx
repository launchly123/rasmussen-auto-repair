import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/Parallax";

const notes = [
  {
    label: "Method",
    body: "The fault is identified before anything is replaced — so the repair addresses the cause, not the symptom.",
  },
  {
    label: "Equipment",
    body: "Modern diagnostic technology for check-engine, electrical and drivability faults across American, Japanese and European vehicles.",
  },
  {
    label: "Experience",
    body: "Decades of hands-on repair inform where to look first, which is usually what separates a two-hour diagnosis from a two-day one.",
  },
];

export function Diagnostics() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Mechanical texture, barely there — it gives the panel depth without
          reading as a graphic. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/images/texture-engine.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.05] mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      </div>

      <div className="container-x relative py-24 md:py-32 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal media>
              <Parallax amount={24}>
                <div className="relative aspect-[5/4] w-full overflow-hidden bg-ink-800">
                  <Image
                    src="/images/diagnosis-hands.jpg"
                    alt="Two technicians examining a connector and wiring in an engine bay."
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Parallax>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Diagnostics</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-8 max-w-[14ch] text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] font-semibold text-paper">
                Find the problem. Fix it right.
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-7 max-w-[50ch] text-[1.0625rem] leading-[1.7] text-mute-dark md:text-lg">
                A repair is only as good as the diagnosis behind it. Rasmussen
                approaches difficult automotive problems methodically, using
                modern diagnostic technology backed by decades of hands-on
                experience.
              </p>
            </Reveal>

            {/* h3 + p, not dt/dd — see the note in WhyRasmussen: the Agency
                Console cannot address <dt>/<dd>, so these would be locked. */}
            <div className="mt-12">
              {notes.map((note, index) => (
                <Reveal
                  key={note.label}
                  delay={index * 70}
                  className="grid grid-cols-[6.5rem_1fr] gap-4 border-t py-6 rule-dark md:grid-cols-[8rem_1fr] md:gap-6"
                >
                  <h3 className="eyebrow pt-1 font-medium text-red-300">
                    {note.label}
                  </h3>
                  <p className="max-w-[46ch] text-[0.9375rem] leading-[1.7] text-mute-dark">
                    {note.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
