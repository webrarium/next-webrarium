import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "@/app/components/StoryblokComponents/StoryblokProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import CalBlock from "@/app/components/CalBlock";
import { Analytics } from "@vercel/analytics/react";
import { i18nConfig } from "@/i18nConfig";
import { defaultOgImage, ldJson, ogLocale, organizationLd } from "@/app/lib/seo";

type PageParams = {
  locale: string;
};

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
});

export async function generateMetadata({
  params: { locale },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const en = locale === "en";
  const image = defaultOgImage(locale);
  return {
    metadataBase: new URL("https://webrarium.com"),
    title: en
      ? "Webrarium | We create digital solutions that help your business grow"
      : "Webrarium | Створюємо цифрові рішення, що допомагають вашому бізнесу зростати",
    description: en
      ? "Website development, chatbot development, marketing automation, product design, digital advertising."
      : "Створення сайтів, розробка чат-ботів, автоматизація маркетингу, продуктовий дизайн, цифрова реклама",
    openGraph: { siteName: "Webrarium", type: "website", images: image, ...ogLocale(locale) },
    twitter: { card: "summary_large_image", images: image },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams(): Promise<PageParams[]> {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
export const revalidate = 600;

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: PageParams;
}) {
  return (
    <StoryblokProvider>
      <html lang={locale}>
        <head>
          <link rel="preload" href="/fonts/CraftworkGrotesk-Regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/CraftworkGrotesk-Bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        </head>
        <body>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={ldJson(organizationLd(locale))}
          />
          <CalBlock />
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
          <SpeedInsights />
          <Analytics />
        </body>
        <GoogleAnalytics gaId="G-J8ZW4RCXNG" />
      </html>
    </StoryblokProvider>
  );
}
