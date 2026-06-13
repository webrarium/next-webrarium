import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./ProjectPage.module.css";
import { render } from "storyblok-rich-text-react-renderer";
import Link from "next/link";

export default function ProjectRealization({ blok, projectLink }: { blok: any, projectLink: any }) {
  return (
    <section {...storyblokEditable(blok)}>
      <div className="container">
        <h2>{blok.title}</h2>
        <div className={styles.realization_txt}>{render(blok.text)}</div>
        {projectLink?.url &&
          <Link className={styles.btn} href={projectLink.url} target="_blank">Live</Link>
        }
      </div>
    </section>
  );
}
