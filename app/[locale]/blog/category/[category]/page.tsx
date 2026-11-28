import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/app/components/Blog/Blog.module.css";
import ArticleCard from "@/app/components/Blog/ArticleCard";
import { CATEGORIES, getArticles, getCategory } from "@/app/lib/blog";
import { blogAlternates, crumbs } from "@/app/lib/blog-seo";
import { ldJson } from "@/app/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ locale: "uk", category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const c = getCategory(params.category);
  if (!c) return {};
  const title = `${c.name} — блог Webrarium`;
  return {
    title,
    description: c.description,
    alternates: blogAlternates(`/blog/category/${c.slug}`),
    openGraph: { title, description: c.description, type: "website", locale: "uk_UA", siteName: "Webrarium", images: "/OpenGraph_UA.jpg" },
    twitter: { card: "summary_large_image", title, description: c.description, images: "/OpenGraph_UA.jpg" },
  };
}

export default function CategoryPage({ params }: { params: { locale: string; category: string } }) {
  const c = getCategory(params.category);
  if (!c || params.locale !== "uk") notFound();
  const articles = getArticles().filter((a) => a.category === c.slug);
  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldJson(
          crumbs([
            { name: "Головна", path: "/" },
            { name: "Блог", path: "/blog" },
            { name: c.name, path: `/blog/category/${c.slug}` },
          ])
        )}
      />
      <div className={styles.wrp}>
        <div className="breadcrumbs">
          <Link href="/blog" className="bc_link">блог</Link>
          <span> / </span>
          <span className="bc_current">{c.name}</span>
        </div>
        <div className={styles.head}>
          <h1>{c.name}</h1>
          <p>
            {c.description} Послуга: <Link href={c.service.path} style={{ color: "#8fbf87" }}>{c.service.name}</Link>.
          </p>
        </div>
        <nav className={styles.cats} aria-label="Категорії">
          {CATEGORIES.map((x) => (
            <Link key={x.slug} href={`/blog/category/${x.slug}`} className={`${styles.cat} ${x.slug === c.slug ? styles.cat_active : ""}`}>
              {x.name}
            </Link>
          ))}
        </nav>
        {articles.length ? (
          <div className={styles.grid}>
            {articles.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        ) : (
          <p>Статті готуються.</p>
        )}
      </div>
    </main>
  );
}
