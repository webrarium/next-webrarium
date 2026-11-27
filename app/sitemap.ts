import { MetadataRoute } from "next";
import { BASEURL } from "@/app/lib/constances";

export const revalidate = 3600;

type SbStory = {
  full_slug: string;
  is_startpage: boolean;
  published_at: string | null;
};

// Lists every published story in a folder (not only the ones linked from the grid),
// so new services/projects get into the sitemap as soon as they are published.
async function listFolder(folder: string): Promise<SbStory[]> {
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?version=published&starts_with=${folder}/&per_page=100&token=${process.env.STORYBLOK_ACCESS_TOKEN}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return (json.stories || []).filter((s: SbStory) => !s.is_startpage);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();
  const staticRoutes = ["", "/projects", "/services", "/privacy-policy"].map(
    (path) => ({ path, lastModified: now })
  );

  const [services, projects] = await Promise.all([
    listFolder("services"),
    listFolder("projects"),
  ]);
  const dynamicRoutes = [...services, ...projects].map((s) => ({
    path: `/${s.full_slug.replace(/\/$/, "")}`,
    lastModified: s.published_at || now,
  }));

  const seen = new Set<string>();
  const routes = [...staticRoutes, ...dynamicRoutes].filter(({ path }) => {
    if (seen.has(path)) return false;
    seen.add(path);
    return true;
  });

  return routes.map(({ path, lastModified }) => ({
    url: `${BASEURL}${path}`,
    lastModified,
    alternates: {
      languages: {
        uk: `${BASEURL}${path}`,
        en: `${BASEURL}/en${path}`,
        "x-default": `${BASEURL}${path}`,
      },
    },
  }));
}
