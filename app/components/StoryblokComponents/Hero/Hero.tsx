import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./Hero.module.css";
import Image from "next/image";
import { relative } from "path";

export default function Hero({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className={styles.hero_section}>
      <div className="container">
        <div className={styles.hero_wrp}>
          <h1>
            <span className={styles.hero_title}>{blok.title}</span>
            <br />
            <span className={styles.subtitle}>{blok.subtitle}</span>
          </h1>
          <div className={styles.cta_btns_wrp}>
            <div onClick={() => {
              document.getElementById(blok.hero_cta.url)?.scrollIntoView({ behavior: 'smooth' });
            }}
              className={styles.hero_cta}>
              {blok.hero_cta_txt}
            </div>
            <div onClick={() => {
              document.getElementById(blok.hero_cta2.url)?.scrollIntoView({ behavior: 'smooth' });
            }}
              className={styles.hero_cta}>
              {blok.hero_cta_txt2}
            </div>
          </div>
          <div className="divider">
            <Image
              style={{
                position: "absolute",
                bottom: 0,
                width: "100px",
                height: "auto",
              }}
              src="/pupa.webp"
              width={100}
              height={54}
              sizes="100px"
              alt="Pupa"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
