
import StoryblokStory from "@storyblok/react/story";
import type { Metadata } from "next";


export const revalidate = 600;


export async function generateMetadata({ params: { locale } }: any) {
  const pageSlug = "projects";
  const rawSeoData = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/${pageSlug}?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`,
    { next: { revalidate: 600 } }
  );
  const seoData = await rawSeoData.json();

  const Metadata: Metadata = {
    title:
      seoData.story.content.title ||
      (locale === "en"
        ? "Webrarium | We create digital solutions"
        : "Webrarium | Створюємо цифрові рішення"),
    description:
      seoData.story.content.description ||
      (locale === "en"
        ? "Website development, chatbot development, marketing automation, product design, digital advertising."
        : "Створення сайтів, розробка чат-ботів, автоматизація маркетингу, продуктовий дизайн, цифрова реклама"),
    openGraph: {
      images:
        seoData.story.content.og_image?.filename ||
        (locale === "en" ? "/OpenGraph_Eng.jpg" : "/OpenGraph_UA.jpg"),
    },
    alternates: {
      canonical: locale === "en" ? `/en/${pageSlug}` : `/${pageSlug}`,
      languages: {
        uk: `/${pageSlug}`,
        en: `/en/${pageSlug}`,
      },
    },
  };
  return Metadata;
}

export default async function Projects({ params: { locale } }: any) {
  const { data } = await fetchData(locale);

  return <StoryblokStory story={data.story} locale={locale} />;
}
async function fetchData(locale: string) {
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/projects?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}&resolve_relations=projects_grid.projects_list`,
    { next: { revalidate: 600 } }
  );
  const data = await res.json();
  return { data };
}
