import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import styles from "./ServicePage.module.css";
import Image from "next/image";

export default function ServiceNeed({ blok }: { blok: any }) {
  let imagePattern = /^\/\//;
  return (
    <section {...storyblokEditable(blok)}>
      <div className="container">
        <h2>{blok.title}</h2>
        <div className={blok.media ? styles.service_need_wrp : ""}>
          {blok.media && !imagePattern.test(blok.media) ? (
            <video autoPlay muted loop playsInline controls={false}>
              <source src={blok.media}></source>
            </video>
          ) : blok.media ? (
            <Image
              src={blok.media}
              width={1000}
              height={1000}
              alt={blok.title}
            />
          ) : null}
          <div className={styles.service_need_cards_wrp}>
            {blok.cards.map((card: any, index: number) => (
              <StoryblokComponent blok={card} key={card._uid} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
