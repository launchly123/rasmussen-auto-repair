import { business } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    index: "i",
    title: "Honest diagnosis",
    body: "Customers describe the shop the same way year after year: straightforward about what a vehicle needs, and equally straightforward about what it doesn't.",
  },
  {
    index: "ii",
    title: "Experience that shows",
    body: "Nearly six decades of automotive repair means a difficult problem isn't approached as a guess. It's approached as something the shop has almost certainly seen a version of before.",
  },
  {
    index: "iii",
    title: "Work that stands behind itself",
    body: `Repairs are covered by a ${business.warranty.term}, ${business.warranty.attribution}.`,
  },
  {
    index: "iv",
    title: "A family business",
    body: "Rasmussen has stayed family-oriented since 1967, serving customers whose parents brought their vehicles to the same address.",
  },
];

export function WhyRasmussen() {
  return (
    <section className="grain bg-ink">
      <div className="container-x relative py-24 md:py-32 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow>Why Rasmussen</Eyebrow>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="mt-8 max-w-[13ch] text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] font-semibold text-paper">
                  The kind of mechanic you keep.
                </h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-7 max-w-[42ch] leading-[1.7] text-mute-dark">
                  Plenty of shops can replace a part. The reason people stay
                  with Rasmussen for decades has more to do with what happens
                  before the wrench comes out.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* h3 + p rather than dl/dt/dd. These are headed content blocks,
                not term/definition pairs — and the Agency Console's tag list
                covers neither <dt> nor <dd>, so a description list here would
                make the shop's own trust claims uneditable in the CMS. */}
            <div>
              {reasons.map((reason, index) => (
                <Reveal
                  key={reason.title}
                  delay={index * 70}
                  className="border-t py-8 first:border-t-0 first:pt-0 rule-dark md:py-10"
                >
                  <div className="flex gap-6 md:gap-10">
                    <span
                      aria-hidden="true"
                      className="font-serif text-lg text-red-300 italic md:text-xl"
                    >
                      {reason.index}
                    </span>
                    <div>
                      <h3 className="text-[1.375rem] leading-tight font-semibold text-paper md:text-[1.625rem]">
                        {reason.title}
                      </h3>
                      <p className="mt-3.5 max-w-[52ch] leading-[1.7] text-mute-dark">
                        {reason.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
