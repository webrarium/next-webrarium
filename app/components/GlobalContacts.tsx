import Contact from "@/app/components/StoryblokComponents/Contact/Contact";

export default async function GlobalContacts({ locale }: any) {
  const data = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/home?version=published&token=${process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN}&language=${locale}`
  );
  const contactBlok = await data.json();
  return <Contact blok={contactBlok.story.content.body[9]} />;
}
