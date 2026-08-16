import { business } from "@/lib/business";
import { serviceGroups } from "@/lib/services";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" className="bg-paper text-ink">
      <div className="container-x py-24 md:py-32 lg:py-40">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="light">What we do</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-8 max-w-[18ch] text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] font-semibold">
                A full repair facility, not a quick-lube counter.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={130} className="lg:col-span-5">
            <p className="max-w-[44ch] leading-[1.7] text-mute-light lg:pb-2">
              Maintenance, diagnostics and heavier specialized work all happen
              under one roof on Maple Avenue — which means one shop keeps the
              history of your vehicle.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 border-t pt-4 rule-light md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {serviceGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 90} className="pt-8">
              <div className="flex items-baseline gap-4">
                <span className="eyebrow text-red">{group.index}</span>
                <h3 className="font-serif text-[1.75rem] leading-tight font-normal md:text-[2rem]">
                  {group.title}
                </h3>
              </div>

              <p className="mt-4 max-w-[38ch] text-[0.9375rem] leading-[1.7] text-mute-light">
                {group.summary}
              </p>

              <ul className="mt-7 border-t border-ink/12">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-ink/12 py-3.5 text-[0.9375rem] text-ink/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Coverage strip */}
        <Reveal delay={80}>
          <div className="mt-16 grid gap-8 bg-ink px-7 py-9 text-paper md:grid-cols-2 md:px-10 md:py-10 lg:mt-20">
            <div>
              <p className="eyebrow text-red-300">Makes serviced</p>
              <p className="mt-3 font-serif text-[1.5rem] leading-tight md:text-[1.75rem]">
                {business.vehicleOrigins.join(" · ")}
              </p>
            </div>
            <div className="border-t pt-8 rule-dark md:border-t-0 md:border-l md:pt-0 md:pl-10">
              <p className="eyebrow text-red-300">Vehicles serviced</p>
              <p className="mt-3 font-serif text-[1.5rem] leading-tight md:text-[1.75rem]">
                {business.vehicleTypes.join(" · ")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
