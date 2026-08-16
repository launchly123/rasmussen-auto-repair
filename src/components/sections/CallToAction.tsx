import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneIcon, MapPinIcon } from "@/components/icons";

export function CallToAction() {
  return (
    <section className="bg-paper-2 text-ink">
      <div className="container-x py-20 md:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="max-w-[18ch] text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] font-semibold">
                Your vehicle deserves a mechanic you can trust.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 max-w-[44ch] text-lg leading-[1.65] text-mute-light">
                Bring nearly six decades of experience to your next repair.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/#contact" size="lg">
                  Schedule Service
                </Button>
                <Button
                  href={business.phone.href}
                  size="lg"
                  variant="outlineDark"
                >
                  <PhoneIcon className="h-[1.05rem] w-[1.05rem]" />
                  Call {business.phone.plain}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="border-t border-ink/20 pt-8 lg:border-t-0 lg:border-l lg:border-ink/20 lg:pt-0 lg:pl-12">
              <p className="eyebrow flex items-center gap-2.5 text-mute-light">
                <MapPinIcon className="h-4 w-4 text-red" />
                Find us
              </p>
              <address className="mt-5 font-serif text-[1.625rem] leading-[1.3] not-italic md:text-[1.875rem]">
                {business.addressLine}
                <br />
                {business.cityLine}
              </address>
              <p className="mt-5 text-[0.9375rem] text-mute-light">
                {business.hours.summary}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
