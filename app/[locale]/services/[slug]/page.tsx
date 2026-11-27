import StoryblokStory from "@storyblok/react/story";
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
  const statitParams = [...slugsUk, ...slugsEn];
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
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/services/${slug}?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}&resolve_relations=services_grid.services_list,projects_grid.projects_list`,
    { next: { revalidate: 600 } }
  );
  if (!res.ok) throw new Error(`Failed to fetch service: ${slug}`);
  const json = await res.json();
  const story = mergeRels(json.story, json.rels);
  return { data: { story } };
}
