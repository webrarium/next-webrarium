import { storyblokEditable, getStoryblokApi } from "@storyblok/react/rsc";
import styles from "@/app/components/StoryblokComponents/Projects/Projects.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectsGrid({ blok }: { blok: any }) {
  const [resolvedBlok, setResolvedBlok] = useState(blok);
  const { locale } = useParams();

  useEffect(() => {
    const fetchResolvedData = async () => {
      const storyblokApi = getStoryblokApi();

      // Case: projects_list contains UUID strings (inline on service/project pages)
      if (blok.projects_list?.length && typeof blok.projects_list[0] === "string") {
        const { data } = await storyblokApi.get("cdn/stories", {
          version: "published",
          by_uuids: blok.projects_list.join(","),
          language: locale?.toString() || "uk",
        });
        setResolvedBlok({ ...blok, projects_list: data.stories });
        return;
      }

      // Case: no projects_list — fetch the grid story by slug
      if (blok.slug) {
        const { data } = await storyblokApi.get(`cdn/stories/${blok.slug}`, {
          version: "published",
          resolve_relations: ["projects_grid.projects_list"],
        });
        setResolvedBlok(data.story.content);
      }
    };

    const needsFetch =
      !blok.projects_list ||
      (blok.projects_list.length > 0 && typeof blok.projects_list[0] === "string");

    if (needsFetch) {
      fetchResolvedData();
    }
  }, [blok]);

  if (!resolvedBlok || !resolvedBlok.projects_list) {
    return <div>Loading...</div>;
  }
  return (
    <section {...storyblokEditable(resolvedBlok)}>
      <div className="container">
        {resolvedBlok.title ? <h2>{resolvedBlok.title}</h2> : null}
        <div className={styles.projects_wrp}>
          {resolvedBlok.projects_list.map((project: any) => (
            <ProjectCard
              blok={project}
              key={project.id}
              btntxt={resolvedBlok.button_txt}
              btn2txt={resolvedBlok.button2_txt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  blok,
  btntxt,
  btn2txt,
}: {
  blok: any;
  btntxt: string;
  btn2txt: string;
}) {
  const projectLink = `/${blok.full_slug}`;
  const projectSiteLink = blok.content?.project_site_link ?? null;

  return (
    <div className={styles.project_card}>
      <img
        src={blok.content?.cover?.filename}
        alt={blok.content?.cover?.alt || ""}
        className={styles.bg}
        loading="lazy"
      />
      <div className={styles.pc_content}>
        <h3>{blok.content?.title}</h3>
        <div className={styles.divider}></div>
        <div className={styles.description}>{blok.content?.description}</div>
        <div className={styles.pc_btns_wrp}>
          <Link href={projectLink} className={styles.case_btn}>
            {btntxt}
          </Link>
          {projectSiteLink?.url && projectSiteLink.url !== "" ? (
            <Link
              href={projectSiteLink.url}
              className={styles.case_btn}
              target="_blank"
            >
              {btn2txt}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
