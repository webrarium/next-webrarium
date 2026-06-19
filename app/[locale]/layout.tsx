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

type PageParams = {
  locale: string;
};

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webrarium.com"),
  title:
    "Webrarium | Створюємо цифрові рішення, що допомагають вашому бізнесу зростати",
  description:
    "Створення сайтів, розробка чат-ботів, автоматизація маркетингу, продуктовий дизайн, цифрова реклама",
  openGraph: {
    images: "/OpenGraph_UA.jpg",
  },
  twitter: {
    card: "summary_large_image",
    images: "/OpenGraph_UA.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Webrarium",
  description:
    "Створення сайтів, розробка чат-ботів, автоматизація маркетингу, продуктовий дизайн, цифрова реклама",
  image: "https://webrarium.com/OpenGraph_UA.jpg",
  email: "wewebrarium@gmail.com",
  logo: "https://a.storyblok.com/f/276513/140x16/0ee6252073/webrarium-logo.svg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+38 073 979 79 54",
    contactType: "Customer Service",
    areaServed: "UA",
    availableLanguage: "Ukrainian, English",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Послуги компанії Webrarium",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Вебсайт компанії",
          description:
            "Розробляємо потужний онлайн-інструмент для залучення нових клієнтів і підвищення впізнаваності бренду. Від високоякісного UI/UX до стратегічної навігації. Створюємо веб-сайти, які відображають вашу компанію відповідно до споживчих цінностей.",
          url: "https://webrarium.com/services/company-websites",
          provider: {
            "@type": "Organization",
            name: "Webrarium",
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Цифрова реклама",
          description:
            "Забезпечить ваші оголошення охопленнями та взаємодіями. І так - це приносить прибутки.",
          url: "https://webrarium.com/services/digital-advertising",
          provider: {
            "@type": "Organization",
            name: "Webrarium",
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Онлайн-магазин",
          description:
            "Надаємо усі необхідні інструменти для успішного ведення електронної комерції.",
          url: "https://webrarium.com/services/online-store",
          provider: {
            "@type": "Organization",
            name: "Webrarium",
          },
        },
      },
    ],
  },
};
const jsonLdEn = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Webrarium",
  description:
    "Website development, chatbot development, marketing automation, product design, digital advertising.",
  image: "https://webrarium.com/OpenGraph_Eng.jpg",
  email: "wewebrarium@gmail.com",
  logo: "https://a.storyblok.com/f/276513/140x16/0ee6252073/webrarium-logo.svg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+38 073 979 79 54",
    contactType: "Customer Service",
    areaServed: "UA",
    availableLanguage: "Ukrainian, English",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services of Webrarium",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate Websites",
          description:
            "We develop a powerful online tool for attracting new clients and increasing brand recognition. From high-quality UI/UX design to strategic navigation, we create a company website that reflects your brand in alignment with consumer values.",
          url: "https://webrarium.com/en/services/company-websites",
          provider: {
            "@type": "Organization",
            name: "Webrarium",
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Advertising",
          description:
            "Ensure your ads get the reach and engagement they need. And yes, it drives profits.",
          url: "https://webrarium.com/en/services/digital-advertising",
          provider: {
            "@type": "Organization",
            name: "Webrarium",
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Online Store",
          description:
            "We provide all the necessary tools for successful e-commerce.",
          url: "https://webrarium.com/en/services/online-store",
          provider: {
            "@type": "Organization",
            name: "Webrarium",
          },
        },
      },
    ],
  },
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
            dangerouslySetInnerHTML={
              locale === "en"
                ? { __html: JSON.stringify(jsonLdEn) }
                : { __html: JSON.stringify(jsonLd) }
            }
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
