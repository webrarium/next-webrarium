import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import Image from "next/image";
import styles from "@/app/components/StoryblokComponents/ProjectPage/ProjectPage.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectPage({ blok }: { blok: any }) {
  // get locale
  const { locale } = useParams();
  return (
    <main {...storyblokEditable(blok)} className={styles.project_page}>
      <section className={styles.project_hero_section}>
        <Image
          src={blok.cover.filename}
          width={2160}
          height={1059}
          alt={blok.cover.meta_data.alt}
          className={styles.project_cover}
        />
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/projects" className="bc_link">
              {locale === "en" ? "projects" : "проєкти"}
            </Link>
            <span> / </span>
            <span className="bc_current">{blok.title}</span>
          </div>
          <div className={styles.project_hero}>
            <h1 className={styles.title}>{blok.title}</h1>
            <p className={styles.subtitle}>{blok.subtitle}</p>
          </div>
        </div>
      </section>
      {(blok.blocks || []).map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} projectLink={blok.project_site_link ?? null} />
      ))}
    </main>
  );
}
