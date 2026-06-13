import StoryblokStory from "@storyblok/react/story";

export default async function Header({ locale }: { locale: string }) {
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/header?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`,
    { next: { revalidate: 600 } }
  );
  const { story } = await res.json();
  return <StoryblokStory story={story} locale={locale} />;
}
