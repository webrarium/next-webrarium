import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/app/components/Blog/Blog.module.css";
import ArticleCard from "@/app/components/Blog/ArticleCard";
import { CATEGORIES, getArticles } from "@/app/lib/blog";
import { blogAlternates, crumbs } from "@/app/lib/blog-seo";
import { ldJson } from "@/app/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "uk" }];
}

const TITLE = "Блог Webrarium — AI-автоматизація, чат-боти, Shopify, реклама";
const DESC =
  "Практичні статті про AI-агентів і чат-боти, автоматизацію бізнес-процесів, Shopify, сайти та рекламу — з нашого досвіду впроваджень.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: blogAlternates("/blog"),
  openGraph: { title: TITLE, description: DESC, type: "website", locale: "uk_UA", siteName: "Webrarium", images: "/OpenGraph_UA.jpg" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: "/OpenGraph_UA.jpg" },
};

export default function BlogIndex({ params: { locale } }: { params: { locale: string } }) {
  if (locale !== "uk") notFound();
  const articles = getArticles();
  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldJson([
          crumbs([
            { name: "Головна", path: "/" },
            { name: "Блог", path: "/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Блог Webrarium",
            url: "https://webrarium.com/blog",
            inLanguage: "uk",
            blogPost: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: `https://webrarium.com/blog/${a.slug}` })),
          },
        ])}
      />
      <div className={styles.wrp}>
        <div className="breadcrumbs">
          <Link href="/" className="bc_link">головна</Link>
          <span> / </span>
          <span className="bc_current">блог</span>
        </div>
        <div className={styles.head}>
          <h1>Блог</h1>
          <p>{DESC}</p>
        </div>
        <nav className={styles.cats} aria-label="Категорії">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/blog/category/${c.slug}`} className={styles.cat}>
              {c.name}
            </Link>
          ))}
        </nav>
        <div className={styles.grid}>
          {articles.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      </div>
    </main>
  );
}
