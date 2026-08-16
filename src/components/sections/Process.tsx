import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Bring it in",
    body: "Tell the team what's happening with your vehicle — the noise, the light, the way it drives.",
  },
  {
    number: "02",
    title: "Diagnose",
    body: "The team identifies the actual problem rather than working from an assumption.",
  },
  {
    number: "03",
    title: "Explain",
    body: "You find out what's wrong and what your options are, in language that makes the decision yours.",
  },
  {
    number: "04",
    title: "Repair",
    body: "The vehicle gets the appropriate repair using quality parts.",
  },
];

export function Process() {
  return (
    <section className="border-t bg-ink-800 rule-dark">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-8 max-w-[16ch] text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-semibold text-paper">
                Four steps, and no surprises in between.
              </h2>
            </Reveal>
          </div>
        </div>

        <ol className="mt-14 grid gap-px border-t rule-dark sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 80}
              className="relative border-b pt-8 pb-10 rule-dark sm:border-b-0 sm:pr-8 lg:pr-10"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-px w-10 bg-red"
              />
              <p className="eyebrow text-mute-dark">{step.number}</p>
              <h3 className="mt-4 font-serif text-[1.625rem] leading-tight font-normal text-paper">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-[1.7] text-mute-dark">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
