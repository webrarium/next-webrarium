import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import styles from "./ProjectPage.module.css";

export default function ProjectResults({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)}>
      <div className="container">
        <h2>{blok.title}</h2>
        <div className={styles.project_results_grid}>
          {(blok.project_results_cards || []).map((card: any, index: number) => (
            <StoryblokComponent blok={card} key={card._uid} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
