import type { Metadata } from "next";
import styles from "./uikit.module.css";
import Image from "next/image";
import Delta from "@/app/components/Delta/Delta";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export async function generateStaticParams() {
  const staticParams = [{ locale: "en" }, { locale: "uk" }];
  return staticParams;
}

export default function UiKit({ params: { locale } }: any) {
  return (
    <main>
      <Delta />
      <div className={`container ${styles.container_min}`}>
        <section>
          <div className={styles.hero_wrp}>
            <div className={styles.hero_left}>
              <h1>Webrarium Logo</h1>
              {locale === "en" ? (
                <p>
                  All necessary logo files. Please do not change its appearance,
                  but rather choose from the list of proposed options.
                </p>
              ) : (
                <p>
                  Усі необхідні файли логотипу. Будь ласка, не змінюйте його
                  вигляд, а краще оберіть із списку, запропонованих варіантів.
                </p>
              )}
            </div>
            <div className={styles.hero_right}>
              <div>
                <span>.webp </span>
                <span>.svg </span>
                <span>.png </span>
              </div>
              <a href="/uikit/webrarium-logos.zip" download className={styles.button}>
                <svg
                  width="16"
                  height="19"
                  viewBox="0 0 16 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C7.73214 0 7.51299 0.220361 7.51299 0.489691V10.5198C7.51299 11.3803 6.49832 11.839 5.85234 11.2705L2.08766 7.95747C1.88312 7.78118 1.5763 7.80077 1.40097 8.00154C1.22565 8.20722 1.24513 8.51572 1.44481 8.69201L7.67857 14.1765C7.76136 14.25 7.87338 14.299 7.99026 14.299C7.99026 14.299 7.99026 14.299 7.99513 14.299H8C8.12175 14.299 8.2289 14.25 8.31169 14.1765L14.5455 8.69201C14.75 8.51572 14.7695 8.20232 14.5893 8.00154C14.414 7.79588 14.1023 7.77629 13.9026 7.95747L10.1379 11.2705C9.49194 11.839 8.47727 11.3803 8.47727 10.5198V0.489691C8.47727 0.220361 8.25812 0 7.99026 0H8Z"
                    fill="white"
                  />
                  <path
                    d="M0.5 18.5103C0.5 18.7796 0.719156 19 0.987013 19H15.013C15.2808 19 15.5 18.7796 15.5 18.5103C15.5 18.241 15.2808 18.0206 15.013 18.0206H0.987013C0.719156 18.0206 0.5 18.241 0.5 18.5103Z"
                    fill="white"
                  />
                </svg>
                Download All
              </a>
            </div>
          </div>
        </section>
        <section>
          {locale === "en" ? <h2>Main logo</h2> : <h2>Головне лого</h2>}
          <div className={styles.main_logo_grid}>
            <Image
              src="/uikit/logo2.svg"
              width={469}
              height={166}
              alt="logo variant"
            />
            <Image
              src="/uikit/logo1.svg"
              width={469}
              height={166}
              alt="logo variant"
            />
            <Image
              src="/uikit/logo3.svg"
              width={469}
              height={166}
              alt="logo variant"
            />
            <Image
              src="/uikit/logo4.svg"
              width={469}
              height={166}
              alt="logo variant"
            />
          </div>
        </section>
        <section>
          {locale === "en" ? <h2>Compact logo</h2> : <h2>Компактне лого</h2>}
          <div className={styles.cl_grid}>
            <Image
              src="/uikit/cl4.svg"
              width={250}
              height={250}
              alt="logo variant"
            />
            <Image
              src="/uikit/cl2.svg"
              width={250}
              height={250}
              alt="logo variant"
            />
            <Image
              src="/uikit/cl1.svg"
              width={250}
              height={250}
              alt="logo variant"
            />
            <Image
              src="/uikit/cl5.svg"
              width={250}
              height={250}
              alt="logo variant"
            />
            <Image
              src="/uikit/cl3.svg"
              width={250}
              height={250}
              alt="logo variant"
            />
            <Image src="/sticker.webp" width={250} height={250} alt="Pupa" />
          </div>
          <div className={styles.btn_wrp}>
            <a href="/uikit/webrarium-logos.zip" download className={styles.button}>
              <svg
                width="16"
                height="19"
                viewBox="0 0 16 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C7.73214 0 7.51299 0.220361 7.51299 0.489691V10.5198C7.51299 11.3803 6.49832 11.839 5.85234 11.2705L2.08766 7.95747C1.88312 7.78118 1.5763 7.80077 1.40097 8.00154C1.22565 8.20722 1.24513 8.51572 1.44481 8.69201L7.67857 14.1765C7.76136 14.25 7.87338 14.299 7.99026 14.299C7.99026 14.299 7.99026 14.299 7.99513 14.299H8C8.12175 14.299 8.2289 14.25 8.31169 14.1765L14.5455 8.69201C14.75 8.51572 14.7695 8.20232 14.5893 8.00154C14.414 7.79588 14.1023 7.77629 13.9026 7.95747L10.1379 11.2705C9.49194 11.839 8.47727 11.3803 8.47727 10.5198V0.489691C8.47727 0.220361 8.25812 0 7.99026 0H8Z"
                  fill="white"
                />
                <path
                  d="M0.5 18.5103C0.5 18.7796 0.719156 19 0.987013 19H15.013C15.2808 19 15.5 18.7796 15.5 18.5103C15.5 18.241 15.2808 18.0206 15.013 18.0206H0.987013C0.719156 18.0206 0.5 18.241 0.5 18.5103Z"
                  fill="white"
                />
              </svg>
              Download All
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
