import Link from "next/link";
import { business, nav } from "@/lib/business";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-ink-800 rule-dark">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/#top" className="inline-block text-paper">
              <Logo />
            </Link>
            <p className="mt-6 max-w-[36ch] text-[0.9375rem] leading-[1.7] text-mute-dark">
              Family-owned auto repair in Fresno, California. Serving drivers,
              fleets and heavy equipment from Maple Avenue since 1967.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow text-mute-dark">Site</p>
            <ul className="mt-4 space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-paper/80 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow text-mute-dark">Visit</p>
            <address className="mt-4 text-[0.9375rem] leading-[1.75] text-paper/80 not-italic">
              {business.addressLine}
              <br />
              {business.cityLine}
              <br />
              <a
                href={business.phone.href}
                className="mt-2 inline-flex min-h-11 items-center text-paper transition-colors hover:text-red-300"
              >
                {business.phone.display}
              </a>
            </address>
            <p className="mt-3 text-[0.9375rem] text-mute-dark">
              {business.hours.summary}
              <br />
              Saturday &amp; Sunday: Closed
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t pt-7 rule-dark sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-mute-dark">
            © {year} {business.name} · Est. 1967
          </p>
          <p className="eyebrow text-mute-dark">
            Fresno, California
          </p>
        </div>
      </div>
    </footer>
  );
}
