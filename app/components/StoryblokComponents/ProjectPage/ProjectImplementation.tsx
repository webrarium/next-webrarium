import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import styles from "./ProjectPage.module.css";
import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";


export default function ProjectImplementation({ blok, projectLink }: { blok: any, projectLink: any }) {
    return (
        <section {...storyblokEditable(blok)}>
            <div className="container">
                <h2>{blok.title}</h2>
                <div className={styles.implementation}>
                    {(blok.cards || []).map((card: any) => (
                        <ProjectImplementationCard blok={card} key={card._uid} />
                    ))}
                </div>
                {projectLink?.url &&
                    <Link className={`${styles.btn} ${styles.btnWild}`} href={projectLink.url} target="_blank">{blok.button_text}</Link>
                }
            </div>
        </section>
    );
}


function ProjectImplementationCard({ blok }: { blok: any }) {
    return (
        <div className={styles.implementation_card}>
            <h3>{blok.title}</h3>
            <div>{render(blok.text)}</div>
        </div>
    );
}