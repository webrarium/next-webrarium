import Link from "next/link";
import styles from "./Footer.module.css";
import PupaIcon from "../PupaIcon/PupaIcon";

export default async function Footer({ locale }: { locale: string }) {
  // get current year
  const date = new Date();
  let year = date.getFullYear();
  // get navlinks from SB header component
  const data = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/header?version=published&token=${process.env.STORYBLOK_ACCESS_TOKEN}&language=${locale}`
  ).then((response) => response.json());

  return (
    <footer>
      <div className="container">
        <div className="divider"></div>
        <div className={styles.f_top}>
          <Link href="/" className={styles.f_brand} aria-label="Webrarium">
            <PupaIcon size={160} animated="lively" bigEyes />
            <span>webrarium</span>
          </Link>
          <p className={styles.f_slogan}>
            {locale === "en" ? (
              <>Automate the boring.<br />Grow the rest.</>
            ) : (
              <>Автоматизуйте нудне.<br />Розвивайте решту.</>
            )}
          </p>
        </div>
        <nav className={styles.f_nav}>
          <ul>
            {data.story.content.nav.map((navlink: any) => (
              <li key={navlink._uid}>
                <Link href={navlink.nav_link.url}>{navlink.nav_text}</Link>
              </li>
            ))}
            <li>
              <Link href="/uikit">ui/ux kit</Link>
            </li>
          </ul>
        </nav>
        <p className={styles.copyright}>
          <small>
            &copy;{year} Webrarium.
            {locale === "en" ? " All rights reserved." : " Всі права захищено."}
            <Link href="/privacy-policy">
              {locale === "en"
                ? " Privacy Policy"
                : " Політика конфіденційності"}
            </Link>
          </small>
        </p>
      </div>
    </footer>
  );
}
