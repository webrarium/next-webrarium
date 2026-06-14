import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import styles from "@/app/components/Header/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import LanguageChanger from "../LanguageSwitcher/LangChanger";

export default function HeaderS({ blok }: { blok: any }) {
  function openMenu() {
    const menu = document.querySelector("#menu");
    const burger = document.querySelector("#brg");
    burger?.classList.toggle(`${styles.brg_open}`);
    menu?.classList.toggle(`${styles.nav_show}`);
  }
  return (
    <header {...storyblokEditable(blok)} className={styles.header}>
      <div className="container">
        <div className={styles.header_wrp}>
          <Link href="/" className={styles.brand}>
            <Image
              src={blok.logo.filename}
              width={144}
              height={21}
              alt="webrarium logo"
              className="brand_img"
            />
          </Link>

          <LanguageChanger />

          <div className={styles.nav_wrp} id="menu">
            <nav className={styles.nav} onClick={openMenu}>
              {blok.nav.map((navlink: any) => (
                <StoryblokComponent blok={navlink} key={navlink._uid} />
              ))}
            </nav>
          </div>
          <div className={styles.brg} id="brg" onClick={openMenu}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </div>
    </header>
  );
}
