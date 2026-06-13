
import StoryblokStory from "@storyblok/react/story";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 600;

// Merge resolved relations back into story content
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

export async function generateMetadata({ params: { locale } }: HomeProps) {
  const rawSeoData = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/home?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`,
    { next: { revalidate: 600 } }
  );
  const seoData = await rawSeoData.json();

  const Metadata: Metadata = {
    title:
      seoData.story?.content?.title ||
      (locale === "en"
        ? "Webrarium | We create digital solutions"
        : "Webrarium | Створюємо цифрові рішення"),
    description:
      seoData.story?.content?.description ||
      (locale === "en"
        ? "Website development, chatbot development, marketing automation, product design, digital advertising."
        : "Створення сайтів, розробка чат-ботів, автоматизація маркетингу, продуктовий дизайн, цифрова реклама"),
    openGraph: {
      images:
        seoData.story?.content?.og_image?.filename ||
        (locale === "en" ? "/OpenGraph_Eng.jpg" : "/OpenGraph_UA.jpg"),
    },
    alternates: {
      canonical: locale === "en" ? "/en" : "/",
      languages: { uk: "/", en: "/en" },
    },
  };
  return Metadata;
}

interface HomeProps {
  params: { locale: string };
}

export default async function Home({ params: { locale } }: HomeProps) {
  try {
    const { data } = await fetchData(locale);
    return <StoryblokStory story={data.story} />;
  } catch {
    return notFound();
  }
}

async function fetchData(locale: string) {
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/home?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}&resolve_relations=projects_grid.projects_list,services_grid.services_list`,
    { next: { revalidate: 600 } }
  );
  const json = await res.json();
  const story = mergeRels(json.story, json.rels);
  return { data: { story } };
}
