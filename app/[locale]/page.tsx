
import StoryblokStory from "@storyblok/react/story";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 600;


export async function generateMetadata({ params: { locale } }: HomeProps) {
  const rawSeoData = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/home?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`,
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
      canonical: locale === "en" ? "/en" : "/",
      languages: {
        uk: "/",
        en: "/en",
      },
    },
  };
  return Metadata;
}

interface HomeProps {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }: HomeProps) {
  try {
    const { data } = await fetchData(locale);
    return <StoryblokStory story={data.story} />;
  } catch {
    return notFound(); // Повертає сторінку 404;
  }
}
async function fetchData(locale: string) {
  let sbParams: {
    version: "published" | "draft";
    language: any;
    resolve_relations: any;
  } = {
    version: "published",
    language: locale,
    resolve_relations: [
      "projects_grid.projects_list,services_grid.services_list",
    ],
  };

  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/home?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}&resolve_relations=projects_grid.projects_list,services_grid.services_list`,
    { next: { revalidate: 600 } }
  );
  const data = await res.json();
  return { data };
}
