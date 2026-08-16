import { business } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";

export function Contact() {
  return (
    <section id="contact" className="grain bg-ink">
      <div className="container-x relative py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---------------- Details ---------------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="mt-8 text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-semibold text-paper">
                Rasmussen Auto Repair
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <address className="mt-7 space-y-6 not-italic">
                <div>
                  <p className="eyebrow text-mute-dark">Address</p>
                  <p className="mt-2.5 font-serif text-[1.5rem] leading-[1.35] text-paper">
                    {business.addressLine}
                    <br />
                    {business.cityLine}
                  </p>
                </div>

                <div>
                  <p className="eyebrow text-mute-dark">Phone</p>
                  <a
                    href={business.phone.href}
                    className="mt-2.5 inline-flex min-h-11 items-center gap-3 font-serif text-[1.5rem] text-paper transition-colors hover:text-red-300"
                  >
                    <PhoneIcon className="h-5 w-5 text-red-300" />
                    {business.phone.display}
                  </a>
                </div>

                <div>
                  <p className="eyebrow text-mute-dark">Hours</p>
                  <dl className="mt-3 max-w-sm">
                    {business.hours.rows.map((row) => (
                      <div
                        key={row.days}
                        className="flex items-baseline justify-between gap-6 border-b py-3 rule-dark"
                      >
                        <dt className="text-[0.9375rem] text-paper/85">
                          {row.days}
                        </dt>
                        <dd
                          className={
                            row.open
                              ? "text-[0.9375rem] text-paper"
                              : "text-[0.9375rem] text-mute-dark"
                          }
                        >
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </address>
            </Reveal>

            <Reveal delay={170}>
              <div className="mt-8">
                <Button
                  href={business.maps.directions}
                  variant="outlineLight"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---------------- Form ---------------- */}
          <Reveal delay={100} className="lg:col-span-7">
            <ServiceRequestForm />
          </Reveal>
        </div>

        {/* ---------------- Map ---------------- */}
        <Reveal delay={80}>
          {/* bg-ink-800 so the frame reads as part of the page before the map
              paints, rather than flashing a white block on a dark section. */}
          <div className="mt-16 border bg-ink-800 rule-dark">
            <iframe
              title={`Map showing ${business.name} at ${business.addressLine}, ${business.cityLine}`}
              src={business.maps.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[20rem] w-full grayscale-[0.65] contrast-[1.05] md:h-[26rem]"
            />
          </div>
          <p className="mt-4 text-sm text-mute-dark">
            On Maple Avenue since 1967 — {business.addressShort}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
