import { cn } from "@/lib/cn";

/**
 * Typographic wordmark with a stamped monogram. Colour is inherited from the
 * parent (`currentColor`) so it can sit on ink or paper without the caller
 * fighting a baked-in colour utility.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0"
        fill="none"
      >
        <rect
          x="0.75"
          y="0.75"
          width="30.5"
          height="30.5"
          stroke="var(--color-red)"
          strokeWidth="1.5"
        />
        <path
          d="M11 23V9h6.4c2.5 0 4.1 1.4 4.1 3.7 0 1.8-1 3-2.7 3.4L22 23h-2.9l-2.9-6.3h-2.6V23H11Zm2.6-8.4h3.4c1.2 0 1.9-.6 1.9-1.7s-.7-1.7-1.9-1.7h-3.4v3.4Z"
          fill="currentColor"
        />
      </svg>
      <span className="leading-none">
        <span className="block text-[0.9375rem] font-semibold tracking-[0.06em] uppercase">
          Rasmussen
        </span>
        <span className="eyebrow mt-1 block text-[0.5625rem] opacity-60">
          Auto Repair · Est. 1967
        </span>
      </span>
    </span>
  );
}
