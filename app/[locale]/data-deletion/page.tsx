
import { alternates, ogLocale } from "@/app/lib/seo";
import StoryblokStory from "@storyblok/react/story";
import type { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: any) {
  const pageSlug = "data-deletion";
  const rawSeoData = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/${pageSlug}?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`
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
      ...ogLocale(locale),
      images:
        seoData.story.content.og_image?.filename ||
        (locale === "en" ? "/OpenGraph_Eng.jpg" : "/OpenGraph_UA.jpg"),
    },
    alternates: alternates("/data-deletion", locale),
  };
  return Metadata;
}

export default async function DataDeletionPage({ params: { locale } }: any) {
  const { data } = await fetchData(locale);

  return <StoryblokStory story={data.story} />;
}

async function fetchData(locale: string) {
  let sbParams: {
    version: "published" | "draft";
    language: any;
  } = { version: "published", language: locale };

  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/data-deletion?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`,
    { next: { revalidate: 600 } }
  );
  const data = await res.json();
  return { data };
}
