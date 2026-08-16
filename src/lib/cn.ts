/**
 * Joins classnames. It does NOT merge conflicting Tailwind utilities — a
 * component's own colour utility will win over a caller's by stylesheet order,
 * not prop order. Base components therefore leave colour unset where a caller
 * is expected to supply it.
 */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
