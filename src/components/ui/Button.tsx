import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outlineLight" | "outlineDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 font-medium tracking-[-0.005em] " +
  "transition-colors duration-200 ease-[var(--ease-out-soft)] select-none";

const variants: Record<Variant, string> = {
  // Solid accent. The only element on the page that is filled red.
  primary: "bg-red text-white hover:bg-red-700",
  // On dark surfaces.
  outlineLight:
    "border border-paper/25 text-paper hover:border-paper/60 hover:bg-paper/5",
  // On paper surfaces.
  outlineDark:
    "border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  // 48px / 56px tall — comfortably above the 44px minimum tap target.
  md: "min-h-12 px-6 text-[0.9375rem]",
  lg: "min-h-14 px-8 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
