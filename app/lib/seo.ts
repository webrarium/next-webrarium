import { BASEURL } from "@/app/lib/constances";

export type Locale = "uk" | "en";

const CYRILLIC = /[а-яіїєґ]/i;

/** A CMS value for the given locale, or undefined if the English page would get Ukrainian text
 *  (Storyblok falls back to the default language when a field has no English value). */
export function localized(value: unknown, locale: string): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  if (locale === "en" && CYRILLIC.test(value)) return undefined;
  return value;
}

export function pageUrl(path: string, locale: string): string {
  const clean = path === "/" ? "" : path;
  return `${BASEURL}${locale === "en" ? "/en" : ""}${clean}` || BASEURL;
}

/** canonical + hreflang (uk, en, x-default) for a path like "/services/online-store" or "/" */
export function alternates(path: string, locale: string) {
  const clean = path === "/" ? "" : path;
  return {
    canonical: locale === "en" ? `/en${clean}` : clean || "/",
    languages: {
      uk: clean || "/",
      en: `/en${clean}`,
      "x-default": clean || "/",
    },
  };
}

export function ogLocale(locale: string) {
  return locale === "en"
    ? { locale: "en_US", alternateLocale: ["uk_UA"] }
    : { locale: "uk_UA", alternateLocale: ["en_US"] };
}

export function defaultOgImage(locale: string) {
  return locale === "en" ? "/OpenGraph_Eng.jpg" : "/OpenGraph_UA.jpg";
}

export const ORG_ID = `${BASEURL}/#organization`;

export function organizationLd(locale: string) {
  const en = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Webrarium",
    url: en ? `${BASEURL}/en` : BASEURL,
    logo: "https://a.storyblok.com/f/276513/140x16/0ee6252073/webrarium-logo.svg",
    image: `${BASEURL}${defaultOgImage(locale)}`,
    description: en
      ? "Ukrainian web studio: website and online store development, digital advertising, chatbots, business automation and UX/UI design."
      : "Українська веб-студія: розробка сайтів та інтернет-магазинів, цифрова реклама, чат-боти, автоматизація бізнесу та UX/UI дизайн.",
    email: "wewebrarium@gmail.com",
    telephone: "+380674614067",
    address: { "@type": "PostalAddress", addressCountry: "UA" },
    areaServed: ["UA", "Worldwide"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+380674614067",
      email: "wewebrarium@gmail.com",
      contactType: "customer service",
      availableLanguage: ["Ukrainian", "English"],
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[], locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: pageUrl(item.path, locale),
    })),
  };
}

export function serviceLd(opts: { name: string; description?: string; path: string; locale: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    url: pageUrl(opts.path, opts.locale),
    provider: { "@id": ORG_ID },
    areaServed: ["UA", "Worldwide"],
  };
}

/** <script type="application/ld+json"> payload; escapes "<" so content can't close the tag */
export function ldJson(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const LABELS = {
  uk: { home: "Головна", services: "Послуги", projects: "Проєкти" },
  en: { home: "Home", services: "Services", projects: "Projects" },
};
