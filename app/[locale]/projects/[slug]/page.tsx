import GlobalContacts from "@/app/components/GlobalContacts";
import { LABELS, alternates, breadcrumbLd, defaultOgImage, ldJson, localized, ogLocale } from "@/app/lib/seo";
import StoryblokStory from "@storyblok/react/story";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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


export async function generateMetadata({ params }: any) {
  const locale = params.locale || "uk";
  const projectData = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/projects/${params.slug}/?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`
  );
  if (projectData.status === 404) {
    return {};
  }
  const project = await projectData.json();
  const content = project.story.content;
  const coverImage = content.cover?.filename || defaultOgImage(locale);
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
      images: coverImage,
      siteName: "Webrarium",
      type: "article",
      ...ogLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage,
    },
    alternates: alternates(`/projects/${params.slug}`, locale),
  };
  return metadata;
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 600;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const projects = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/projects/?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&resolve_relations=projects_grid.projects_list`,
    { next: { revalidate: 600 } }
  ).then((res) => res.json());

  const slugsUk = projects.rels.map((project: any) => ({
    slug: project.slug,
    locale: "uk",
  }));
  const slugsEn = projects.rels.map((project: any) => ({
    slug: project.slug,
    locale: "en",
  }));
  const staticParams = [...slugsUk, ...slugsEn];

  return staticParams;
}

export default async function ProjectPage({ params: { locale, slug } }: any) {
  try {
    const { data } = await fetchData(locale, slug);
    const L = locale === "en" ? LABELS.en : LABELS.uk;
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            breadcrumbLd(
              [
                { name: L.home, path: "/" },
                { name: L.projects, path: "/projects" },
                { name: data.story.content.title, path: `/projects/${slug}` },
              ],
              locale
            )
          )}
        />
        <StoryblokStory story={data.story} />
        <GlobalContacts locale={locale} />
      </>
    );
  } catch (e) {
    // return 404 error
    console.error(e);
    return notFound();
  }
}

async function fetchData(locale: string, slug: string) {
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/projects/${slug}?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}&resolve_relations=services_grid.services_list,projects_grid.projects_list`,
    { next: { revalidate: 600 } }
  );
  if (!res.ok) throw new Error(`Failed to fetch project: ${slug}`);
  const json = await res.json();
  const story = mergeRels(json.story, json.rels);
  return { data: { story } };
}
