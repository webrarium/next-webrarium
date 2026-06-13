import { MetadataRoute } from "next";
import { BASEURL } from "@/app/lib/constances";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/projects", "/services", "/privacy-policy"];
  const servicesList = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/services/?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&resolve_relations=services_grid.services_list`
  ).then((res) => res.json());
  const projectsList = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/projects/?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&resolve_relations=projects_grid.projects_list`
  ).then((res) => res.json());
  const projects = projectsList.rels.map(
    (project: any) => `/${project.full_slug}`
  );
  const services = servicesList.rels.map(
    (service: any) => `/${service.full_slug}`
  );

  const allRoutes = [...routes, ...projects, ...services];
  const urls: MetadataRoute.Sitemap = allRoutes.map((url) => ({
    url: `${BASEURL}${url}`,
    lastModified: new Date().toISOString(),
    alternates: {
      languages: {
        en: `${BASEURL}/en${url}`,
        uk: `${BASEURL}${url}`,
      },
    },
  }));
  return urls;
}
