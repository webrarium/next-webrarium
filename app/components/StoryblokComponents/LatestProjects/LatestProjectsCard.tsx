import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "@/app/components/StoryblokComponents/Projects/Projects.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({
  blok,
  btntxt,
}: {
  blok: any;
  btntxt: string;
}) {
  return (
    <div {...storyblokEditable(blok)} className={styles.project_card}>
      {blok.cover?.filename && (
        <Image
          src={blok.cover.filename}
          alt={blok.cover.alt || ""}
          className={styles.bg}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      )}
      <div className={styles.pc_content}>
        <h3>{blok.title}</h3>
        <div className={styles.divider}></div>
        <div className={styles.description}>{blok.description}</div>
        {blok.link?.url && (
          <Link href={blok.link.url} className={styles.case_btn} target="_blank">
            {btntxt}
          </Link>
        )}
      </div>
    </div>
  );
}
