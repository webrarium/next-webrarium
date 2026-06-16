"use client";

import styles from "./uikit.module.css";
import Image from "next/image";
import Delta from "@/app/components/Delta/Delta";
import { useState } from "react";

const DownloadIcon = () => (
  <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C7.73214 0 7.51299 0.220361 7.51299 0.489691V10.5198C7.51299 11.3803 6.49832 11.839 5.85234 11.2705L2.08766 7.95747C1.88312 7.78118 1.5763 7.80077 1.40097 8.00154C1.22565 8.20722 1.24513 8.51572 1.44481 8.69201L7.67857 14.1765C7.76136 14.25 7.87338 14.299 7.99026 14.299H8C8.12175 14.299 8.2289 14.25 8.31169 14.1765L14.5455 8.69201C14.75 8.51572 14.7695 8.20232 14.5893 8.00154C14.414 7.79588 14.1023 7.77629 13.9026 7.95747L10.1379 11.2705C9.49194 11.839 8.47727 11.3803 8.47727 10.5198V0.489691C8.47727 0.220361 8.25812 0 7.99026 0H8Z" fill="white"/>
    <path d="M0.5 18.5103C0.5 18.7796 0.719156 19 0.987013 19H15.013C15.2808 19 15.5 18.7796 15.5 18.5103C15.5 18.241 15.2808 18.0206 15.013 18.0206H0.987013C0.719156 18.0206 0.5 18.241 0.5 18.5103Z" fill="white"/>
  </svg>
);

const COLORS = [
  { name: "Brand Green",    nameUk: "Основний зелений", hex: "#507a49", rgb: "80, 122, 73",  var: "--main-color",   dark: false },
  { name: "Light Green",    nameUk: "Світлий зелений",  hex: "#71aa67", rgb: "113, 170, 103", var: "--color-green-lt", dark: false },
  { name: "Dark Green",     nameUk: "Темний зелений",   hex: "#0f1c0e", rgb: "15, 28, 14",   var: "--color-green-dk", dark: true  },
  { name: "White",          nameUk: "Білий",            hex: "#ffffff", rgb: "255, 255, 255", var: "--foreground",   dark: false },
  { name: "Background",     nameUk: "Фон",              hex: "#000000", rgb: "0, 0, 0",       var: "--background",   dark: true  },
  { name: "Muted",          nameUk: "Приглушений",      hex: "#888888", rgb: "136, 136, 136", var: "--color-muted",  dark: false },
];

function ColorSwatch({ c, locale }: { c: typeof COLORS[0]; locale: string }) {
  const [copied, setCopied] = useState(false);
  function copy(val: string) {
    navigator.clipboard.writeText(val).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  }
  return (
    <div className={styles.swatch} onClick={() => copy(c.hex)}>
      <div className={styles.swatchColor} style={{ background: c.hex, border: c.hex === "#ffffff" ? "1px solid rgba(255,255,255,0.12)" : "none" }} />
      <div className={styles.swatchInfo}>
        <span className={styles.swatchName}>{locale === "en" ? c.name : c.nameUk}</span>
        <span className={styles.swatchHex}>{copied ? "✓ copied" : c.hex}</span>
        <span className={styles.swatchRgb}>rgb({c.rgb})</span>
        <span className={styles.swatchVar}>{c.var}</span>
      </div>
    </div>
  );
}

export default function UiKit({ params: { locale } }: any) {
  const t = (en: string, uk: string) => locale === "en" ? en : uk;

  return (
    <main>
      <Delta />
      <div className={`container ${styles.container_min}`}>

        {/* ── Hero / Logo download ── */}
        <section>
          <div className={styles.hero_wrp}>
            <div className={styles.hero_left}>
              <h1>Webrarium UI Kit</h1>
              <p>{t(
                "Brand guidelines, logo files, colors, typography and UI components.",
                "Брендбук, файли логотипу, кольори, типографіка та UI-компоненти."
              )}</p>
            </div>
            <div className={styles.hero_right}>
              <div><span>.webp </span><span>.svg </span><span>.png </span></div>
              <a href="/uikit/webrarium-logos.zip" download className={styles.button}>
                <DownloadIcon /> {t("Download All", "Завантажити все")}
              </a>
            </div>
          </div>
        </section>

        {/* ── Main logo ── */}
        <section>
          <h2>{t("Main logo", "Головне лого")}</h2>
          <div className={styles.main_logo_grid}>
            <Image src="/uikit/logo2.svg" width={469} height={166} alt="logo dark bg" />
            <Image src="/uikit/logo1.svg" width={469} height={166} alt="logo dark bg green we" />
            <Image src="/uikit/logo3.svg" width={469} height={166} alt="logo light bg" />
            <Image src="/uikit/logo4.svg" width={469} height={166} alt="logo dark minimal" />
          </div>
        </section>

        {/* ── Compact logo ── */}
        <section>
          <h2>{t("Compact logo", "Компактне лого")}</h2>
          <div className={styles.cl_grid}>
            <Image src="/uikit/cl4.svg" width={250} height={250} alt="compact logo" />
            <Image src="/uikit/cl2.svg" width={250} height={250} alt="compact logo" />
            <Image src="/uikit/cl1.svg" width={250} height={250} alt="compact logo" />
            <Image src="/uikit/cl5.svg" width={250} height={250} alt="compact logo" />
            <Image src="/uikit/cl3.svg" width={250} height={250} alt="compact logo" />
            <Image src="/sticker.webp" width={250} height={250} alt="Pupa sticker" />
          </div>
          <div className={styles.btn_wrp}>
            <a href="/uikit/webrarium-logos.zip" download className={styles.button}>
              <DownloadIcon /> {t("Download All", "Завантажити все")}
            </a>
          </div>
        </section>

        {/* ── Logo clearspace ── */}
        <section>
          <h2>{t("Logo clearspace", "Зона безпечного простору")}</h2>
          <p className={styles.sectionDesc}>{t(
            "Always maintain a minimum clear zone around the logo equal to the height of the letter 'W'. Do not place any elements inside this zone.",
            "Завжди залишай мінімальний відступ навколо логотипу рівний висоті літери «W». Не розміщуй жодних елементів у цій зоні."
          )}</p>
          <div className={styles.clearspaceWrap}>
            <div className={styles.clearspaceBox}>
              <div className={styles.clearspaceInner}>
                <svg width="200" height="50" viewBox="0 0 469 166" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M80.2056 64.227H89.7644L81.3085 105.896H60.941L57.9998 87.1963L56.6028 82.1166L55.2793 87.1227L52.6322 105.896H32.3382L23 64.227H32.5588L40.5734 100.153H44.2499L51.6028 64.227H61.1616L69.1762 100.153H72.9262L80.2056 64.227Z" fill="#507A49"/>
                  <path d="M100.227 88.227C101.33 93.9693 105.741 97.8712 112.286 97.8712C117.212 97.8712 121.477 96.0307 124.638 91.8344L130.888 96.1043C126.918 103.687 119.785 107 112.286 107C100.447 107 90.815 97.3558 90.815 85.3558C90.815 73.4294 100.447 63.7853 112.286 63.7853C124.712 63.7853 133.094 73.7975 132.653 88.227H100.227ZM112.286 72.7669C105.962 72.7669 101.624 76.816 100.3 82.0429H123.83C122.58 76.0798 117.8 72.7669 112.286 72.7669Z" fill="#507A49"/>
                  <path d="M166.103 63.7853C176.471 63.7853 184.412 73.4294 184.412 86.2393C184.412 97.3558 176.471 107 166.103 107C157.794 107 151.765 102.804 150 92.2025H148.75L149.485 105.896H140.074V47H149.485V64.227L148.75 77.773H150.294C152.28 68.7178 158.162 63.7853 166.103 63.7853ZM162.868 97.6503C170 97.6503 175.147 92.6442 175.147 85.7975C175.147 78.5828 170 73.5767 162.868 73.5767C155.882 73.5767 150.588 78.8037 150.588 85.5767C150.588 91.6871 156.03 97.6503 162.868 97.6503Z" fill="white"/>
                  <path d="M200.524 77.8466C202.289 66.5828 207.583 64.227 217.288 64.227V74.4601C206.847 72.3988 201.112 77.8466 201.112 87.7853V105.896H191.774V64.1534H201.112L199.053 77.8466H200.524Z" fill="white"/>
                  <path d="M241.552 63.7853C255.449 63.7853 262.067 70.2638 262.067 83.1472V105.896H253.023L254.494 91.7607H253.391C251.552 102.215 245.964 106.926 237.508 106.926C227.214 106.926 222.435 102.215 222.435 94.4847C222.435 86.0184 229.273 80.865 242.141 80.865H252.876C251.92 75.638 248.317 73.2086 241.552 73.2086C236.626 73.2086 233.758 75.2699 230.964 79.0982L223.464 74.0184C228.023 67.4663 233.611 63.7853 241.552 63.7853ZM238.905 97.4295C247.361 97.4295 251.405 93.6749 252.582 86.9755H242.141C235.082 86.9755 231.847 88.7423 231.847 92.4969C231.847 95.2209 233.979 97.4295 238.905 97.4295Z" fill="white"/>
                  <path d="M278.146 77.8466C279.91 66.5828 285.205 64.227 294.91 64.227V74.4601C284.469 72.3988 278.734 77.8466 278.734 87.7853V105.896H269.396V64.1534H278.734L276.675 77.8466H278.146Z" fill="white"/>
                  <path d="M307.65 60.4724C304.636 60.4724 302.283 58.1902 302.283 55.2454C302.283 52.3006 304.636 49.9448 307.65 49.9448C310.518 49.9448 312.797 52.3006 312.797 55.2454C312.797 58.1902 310.518 60.4724 307.65 60.4724ZM303.018 105.896V64.227H312.209V105.896H303.018Z" fill="white"/>
                  <path d="M355.109 64.227H364.521V105.896H355.109L357.168 92.2761H355.771C354.006 104.423 348.418 107 339.888 107C328.491 107 322.388 100.521 322.388 83.9571V64.227H331.506V83.9571C331.506 93.1595 334.815 97.5767 342.535 97.5767C350.182 97.5767 355.109 92.2761 355.109 82.3374V64.227Z" fill="white"/>
                  <path d="M374.089 105.896V64.1534H383.5L381.441 77.8466H383.206C385.706 65.9939 392.986 63.1227 399.309 63.1227C407.618 63.1227 413.059 68.1288 412.691 77.8466H414.456C416.956 65.9939 424.235 63.1227 430.559 63.1227C439.897 63.1227 446 68.2761 446 86.1656V105.896H436.882V86.1656C436.882 76.9632 433.574 72.546 427.029 72.546C419.382 72.546 414.75 77.8466 414.75 87.7853V105.896H405.633V86.1656C405.633 76.9632 402.324 72.546 395.78 72.546C388.133 72.546 383.5 77.8466 383.5 87.7853V105.896H374.089Z" fill="white"/>
                </svg>
                <div className={styles.clearspaceGuides} />
              </div>
              <p className={styles.clearspaceNote}>{t("min. clearspace = height of 'W'", "мін. відступ = висота «W»")}</p>
            </div>
            <div className={styles.dontList}>
              <p className={styles.dontTitle}>{t("Don't", "Не можна")}</p>
              <ul>
                <li>{t("Stretch or distort the logo", "Розтягувати або деформувати логотип")}</li>
                <li>{t("Change brand colors", "Змінювати фірмові кольори")}</li>
                <li>{t("Add shadows or effects", "Додавати тіні чи ефекти")}</li>
                <li>{t("Place on busy backgrounds", "Розміщувати на строкатих фонах")}</li>
                <li>{t("Rotate or tilt", "Повертати або нахиляти")}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Colors ── */}
        <section>
          <h2>{t("Colors", "Кольори")}</h2>
          <p className={styles.sectionDesc}>{t(
            "Click any swatch to copy the HEX value.",
            "Клікни на колір щоб скопіювати HEX."
          )}</p>
          <div className={styles.colorGrid}>
            {COLORS.map(c => <ColorSwatch key={c.hex} c={c} locale={locale} />)}
          </div>
        </section>

        {/* ── Typography ── */}
        <section>
          <h2>{t("Typography", "Типографіка")}</h2>
          <p className={styles.sectionDesc}>{t(
            "Primary typeface: Craftwork Grotesk. Available weights: Regular (400) and Bold (700).",
            "Основний шрифт: Craftwork Grotesk. Доступні накреслення: Regular (400) та Bold (700)."
          )}</p>
          <div className={styles.typeStack}>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>H1 · 48px · 700</span>
              <span className={styles.typeH1}>{t("Design that works", "Дизайн, що працює")}</span>
            </div>
            <div className={styles.typeDivider}/>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>H2 · 40px · 700</span>
              <span className={styles.typeH2}>{t("Our projects", "Наші проєкти")}</span>
            </div>
            <div className={styles.typeDivider}/>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>H3 · 32px · 700</span>
              <span className={styles.typeH3}>{t("Web development", "Веброзробка")}</span>
            </div>
            <div className={styles.typeDivider}/>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>Body · 16px · 400</span>
              <span className={styles.typeBody}>{t(
                "We build digital products that solve real business problems. Clean code, thoughtful UX.",
                "Ми створюємо цифрові продукти, що вирішують реальні бізнес-задачі. Чистий код, продуманий UX."
              )}</span>
            </div>
            <div className={styles.typeDivider}/>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>Caption · 12px · 400</span>
              <span className={styles.typeCaption}>{t("Website development · UI/UX design · Digital advertising", "Веброзробка · UI/UX дизайн · Цифрова реклама")}</span>
            </div>
          </div>
        </section>

        {/* ── UI Components ── */}
        <section>
          <h2>{t("UI Components", "UI-компоненти")}</h2>

          <h3 className={styles.compSubtitle}>{t("Buttons", "Кнопки")}</h3>
          <div className={styles.compRow}>
            <button className={styles.btnPrimary}>{t("Get started", "Почати")}</button>
            <button className={styles.btnOutline}>{t("Learn more", "Дізнатись більше")}</button>
            <button className={styles.btnGhost}>{t("Skip", "Пропустити")}</button>
            <button className={styles.btnPrimary} disabled>{t("Disabled", "Неактивна")}</button>
          </div>

          <h3 className={styles.compSubtitle}>{t("Badges", "Бейджі")}</h3>
          <div className={styles.compRow}>
            <span className={styles.badgeGreen}>{t("New", "Нове")}</span>
            <span className={styles.badgeOutline}>{t("UI/UX", "UI/UX")}</span>
            <span className={styles.badgeOutline}>{t("Development", "Розробка")}</span>
            <span className={styles.badgeMuted}>{t("Draft", "Чернетка")}</span>
          </div>

          <h3 className={styles.compSubtitle}>{t("Form inputs", "Поля форми")}</h3>
          <div className={styles.inputStack}>
            <input className={styles.input} type="text" placeholder={t("Your name", "Ваше ім'я")} readOnly />
            <input className={styles.input} type="email" placeholder={t("Email address", "Email адреса")} readOnly />
            <textarea className={styles.textarea} placeholder={t("Your message…", "Ваше повідомлення…")} readOnly rows={3}/>
          </div>

          <h3 className={styles.compSubtitle}>{t("Divider", "Розділювач")}</h3>
          <div className="divider" style={{margin: "1rem 0"}}/>
        </section>

      </div>
    </main>
  );
}
