/**
 * Prefixes a root-relative path with the GitHub Pages project base.
 * Absolute URLs and in-page anchors stay unchanged so external links
 * (HUDI, Instagram, WhatsApp, GitHub) are not rewritten.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;

  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  if (!base) return path;

  return `${base}${path}`;
}
