import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";

export default async function Header({ locale }: { locale: string }) {
  const { data } = await fetchData(locale);
  return <StoryblokStory story={data.story} locale={locale} />;
}
async function fetchData(locale: string) {
  let sbParams: {
    version: "published" | "draft";
    language: any;
  } = { version: "published", language: locale };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/header`, sbParams, {
    // cache: "no-store",
    next: {
      revalidate: 600,
    },
  });
}
