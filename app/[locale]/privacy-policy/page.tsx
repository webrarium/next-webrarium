
import StoryblokStory from "@storyblok/react/story";
import type { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: any) {
  const pageSlug = "privacy-policy";
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

export default async function PrivacyPolicyPage({ params: { locale } }: any) {
  const { data } = await fetchData(locale);

  return <StoryblokStory story={data.story} />;
}

async function fetchData(locale: string) {
  let sbParams: {
    version: "published" | "draft";
    language: any;
  } = { version: "published", language: locale };

  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/privacy-policy?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`,
    { next: { revalidate: 600 } }
  );
  const data = await res.json();
  return { data };
}
