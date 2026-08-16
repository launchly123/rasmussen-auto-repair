import { cn } from "@/lib/cn";

/**
 * Section label with a short machined rule. Deliberately small and quiet —
 * it orients the reader without competing with the heading.
 */
export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "dark" ? "text-mute-dark" : "text-mute-light",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-red" />
      <span>{children}</span>
    </div>
  );
}
