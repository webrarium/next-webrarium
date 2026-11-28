import { BASEURL } from "@/app/lib/constances";
import { ORG_ID } from "@/app/lib/seo";

/** The blog is Ukrainian-only: canonical + uk/x-default, no English alternate. */
export function blogAlternates(path: string) {
  return { canonical: path, languages: { uk: path, "x-default": path } };
}

export function blogUrl(path: string) {
  return `${BASEURL}${path}`;
}

export function crumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: blogUrl(it.path) })),
  };
}

export const PUBLISHER = { "@id": ORG_ID };
