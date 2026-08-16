import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Marks a subtree for the scroll-reveal observer. Renders no client JS of its
 * own and — critically — no hidden styling. The concealed state lives entirely
 * in CSS behind `html.js-reveal`, so this element is fully visible whenever the
 * reveal cannot be guaranteed to complete. See globals.css.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  media = false,
  className,
  children,
}: {
  as?: ElementType;
  /** Stagger in milliseconds. Keep under ~240ms; longer reads as a queue. */
  delay?: number;
  /** Use the slower image-settle variant. */
  media?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const attrs = media ? { "data-reveal-media": "" } : { "data-reveal": "" };
  return (
    <Tag
      {...attrs}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined
      }
      className={className && cn(className)}
    >
      {children}
    </Tag>
  );
}
