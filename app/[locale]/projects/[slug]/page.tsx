import GlobalContacts from "@/app/components/GlobalContacts";
import StoryblokStory from "@storyblok/react/story";
import type { Metadata } from "next";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: any) {
  const locale = params.locale || "uk";
  const projectData = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/projects/${params.slug}/?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`
  );
  if (projectData.status === 404) {
    return {};
  }
  const project = await projectData.json();
  const coverImage = project.story.content.cover?.filename || (locale === "en" ? "/OpenGraph_Eng.jpg" : "/OpenGraph_UA.jpg");
  const metadata: Metadata = {
    title: project.story.content.title + " | Webrarium",
    description: project.story.content.subtitle,
    openGraph: {
      images: coverImage,
    },
    twitter: {
      card: "summary_large_image",
      images: coverImage,
    },
    alternates: {
      canonical: locale === "en" ? `/en/projects/${params.slug}` : `/projects/${params.slug}`,
      languages: {
        uk: `/projects/${params.slug}`,
        en: `/en/projects/${params.slug}`,
      },
    },
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
    return (
      <>
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
  const data = await res.json();
  return { data };
}
