import StoryblokStory from "@storyblok/react/story";
import { AI_FAQ, AI_SLUG, aiRelatedProjectSlugs, aiServiceMeta, aiServiceStory } from "@/app/content/ai-automation";
import { notFound } from "next/navigation";
import GlobalContacts from "@/app/components/GlobalContacts";
import { Metadata } from "next";
import {
  LABELS,
  alternates,
  breadcrumbLd,
  defaultOgImage,
  ldJson,
  localized,
  ogLocale,
  serviceLd,
} from "@/app/lib/seo";

function mergeRels(story: any, rels: any[]) {
  if (!rels?.length) return story;
  const relMap: Record<string, any> = {};
  rels.forEach((rel: any) => { relMap[rel.uuid] = rel; });
  function resolve(val: any): any {
    if (typeof val === "string" && relMap[val]) return relMap[val];
    if (Array.isArray(val)) return val.map(resolve);
    if (val && typeof val === "object") {
      const out: any = {};
      for (const k of Object.keys(val)) out[k] = resolve(val[k]);
      return out;
    }
    return val;
  }
  return { ...story, content: resolve(story.content) };
}

export const revalidate = 600;

export async function generateMetadata({ params }: any) {
  const locale = params.locale || "uk";
  if (params.slug === AI_SLUG) {
    const m = aiServiceMeta(locale);
    const ogImage = defaultOgImage(locale);
    return {
      title: m.title,
      description: m.description,
      keywords:
        locale === "en"
          ? "AI automation, AI agents for business, AI chatbot, chatbot development, Telegram bot, Instagram chatbot, Viber bot, WhatsApp bot, GPT integration, business process automation"
          : "AI-автоматизація, AI-агенти для бізнесу, впровадження ШІ в бізнес, чат-бот, розробка чат-ботів, Telegram-бот, чат-бот для Instagram, Viber-бот, Claude, ChatGPT, Gemini, Make, Zapier, n8n",
      openGraph: { title: m.title, description: m.description, images: ogImage, siteName: "Webrarium", type: "website", ...ogLocale(locale) },
      twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ogImage },
      alternates: alternates(`/services/${AI_SLUG}`, locale),
    } as Metadata;
  }
  const serviceData = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/services/${params.slug}/?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`,
    { next: { revalidate: 600 } }
  );
  if (serviceData.status === 404) {
    return {};
  }
  const service = await serviceData.json();

  const content = service.story.content;
  const ogImage = defaultOgImage(locale);
  const title =
    localized(content.meta_title, locale) ||
    (localized(content.title, locale) ?? content.title) + " | Webrarium";
  const description =
    localized(content.meta_description, locale) || localized(content.subtitle, locale) || content.subtitle;
  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage,
      siteName: "Webrarium",
      type: "website",
      ...ogLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage,
    },
    alternates: alternates(`/services/${params.slug}`, locale),
  };
  return metadata;
}

export async function generateStaticParams() {
  const services = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/services/?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&resolve_relations=services_grid.services_list`,
    { next: { revalidate: 600 } }
  ).then((res) => res.json());

  const slugsUk = services.rels.map((service: any) => ({
    slug: service.slug,
    locale: "uk",
  }));
  const slugsEn = services.rels.map((service: any) => ({
    slug: service.slug,
    locale: "en",
  }));
  const statitParams = [
    ...slugsUk,
    ...slugsEn,
    { slug: AI_SLUG, locale: "uk" },
    { slug: AI_SLUG, locale: "en" },
  ];
  return statitParams;
}

export default async function ServicePage({ params: { locale, slug } }: any) {
  try {
    const { data } = await fetchData(locale, slug);
    const content = data.story.content;
    const name = content.title;
    const path = `/services/${slug}`;
    const L = locale === "en" ? LABELS.en : LABELS.uk;
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson([
            serviceLd({
              name,
              description:
                localized(content.meta_description, locale) || localized(content.subtitle, locale),
              path,
              locale,
            }),
            breadcrumbLd(
              [
                { name: L.home, path: "/" },
                { name: L.services, path: "/services" },
                { name, path },
              ],
              locale
            ),
            ...(slug === AI_SLUG
              ? [
                  {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: AI_FAQ.map((f) => ({
                      "@type": "Question",
                      name: locale === "en" ? f.q.en : f.q.uk,
                      acceptedAnswer: { "@type": "Answer", text: locale === "en" ? f.a.en : f.a.uk },
                    })),
                  },
                ]
              : []),
          ])}
        />
        <StoryblokStory story={data.story} />
        <GlobalContacts locale={locale} />
      </>
    );
  } catch {
    // return 404 error
    return notFound();
  }
}
async function fetchData(locale: string, slug: string) {
  if (slug === AI_SLUG) {
    let projects: any[] = [];
    try {
      const r = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}&by_slugs=${aiRelatedProjectSlugs().join(",")}`,
        { next: { revalidate: 600 } }
      );
      if (r.ok) projects = (await r.json()).stories || [];
    } catch {}
    return { data: { story: aiServiceStory(locale, projects) as any } };
  }
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/services/${slug}?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}&resolve_relations=services_grid.services_list,projects_grid.projects_list`,
    { next: { revalidate: 600 } }
  );
  if (!res.ok) throw new Error(`Failed to fetch service: ${slug}`);
  const json = await res.json();
  const story = mergeRels(json.story, json.rels);
  return { data: { story } };
}
