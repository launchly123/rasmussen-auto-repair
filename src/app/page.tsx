import { Hero } from "@/components/sections/Hero";
import { Heritage } from "@/components/sections/Heritage";
import { WhyRasmussen } from "@/components/sections/WhyRasmussen";
import { Services } from "@/components/sections/Services";
import { Diagnostics } from "@/components/sections/Diagnostics";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { Family } from "@/components/sections/Family";
import { CallToAction } from "@/components/sections/CallToAction";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Heritage />
      <WhyRasmussen />
      <Services />
      <Diagnostics />
      <Process />
      <Reviews />
      <Family />
      <CallToAction />
      <Contact />
    </>
  );
}
