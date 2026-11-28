import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/app/components/Blog/Blog.module.css";
import ArticleCard from "@/app/components/Blog/ArticleCard";
import { formatDate, getArticle, getArticles, getCategory } from "@/app/lib/blog";
import { PUBLISHER, blogAlternates, blogUrl, crumbs } from "@/app/lib/blog-seo";
import { ldJson } from "@/app/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return getArticles().map((a) => ({ locale: "uk", slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticle(params.slug);
  if (!a) return {};
  const path = `/blog/${a.slug}`;
  return {
    title: a.metaTitle,
    description: a.description,
    keywords: a.keywords,
    alternates: blogAlternates(path),
    openGraph: {
      title: a.metaTitle,
      description: a.description,
      type: "article",
      locale: "uk_UA",
      siteName: "Webrarium",
      url: path,
      publishedTime: a.date,
      modifiedTime: a.updated,
      section: getCategory(a.category)?.name,
      tags: a.keywords,
      images: [{ url: `/api/blog-cover/${a.slug}`, width: 1200, height: 630, alt: a.title }],
    },
    twitter: { card: "summary_large_image", title: a.metaTitle, description: a.description, images: [`/api/blog-cover/${a.slug}`] },
  };
}

export default function ArticlePage({ params }: { params: { locale: string; slug: string } }) {
  const a = getArticle(params.slug);
  if (!a || params.locale !== "uk") notFound();
  const cat = getCategory(a.category)!;
  const path = `/blog/${a.slug}`;
  const cover = `/api/blog-cover/${a.slug}`;
  const related = a.related.map((s) => getArticle(s)).filter(Boolean).slice(0, 3) as ReturnType<typeof getArticles>;
  const fallback = getArticles().filter((x) => x.category === a.category && x.slug !== a.slug).slice(0, 3);
  const more = related.length ? related : fallback;

  const ld: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      image: [blogUrl(cover)],
      datePublished: a.date,
      dateModified: a.updated,
      inLanguage: "uk",
      mainEntityOfPage: blogUrl(path),
      url: blogUrl(path),
      articleSection: cat.name,
      keywords: a.keywords.join(", "),
      wordCount: undefined,
      author: { "@type": "Organization", name: "Webrarium", url: "https://webrarium.com" },
      publisher: PUBLISHER,
    },
    crumbs([
      { name: "Головна", path: "/" },
      { name: "Блог", path: "/blog" },
      { name: cat.name, path: `/blog/category/${cat.slug}` },
      { name: a.title, path },
    ]),
  ];
  if (a.faq.length)
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: a.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });

  return (
    <main className="container">
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(ld)} />
      <article className={`${styles.wrp} ${styles.article}`}>
        <div className="breadcrumbs">
          <Link href="/blog" className="bc_link">блог</Link>
          <span> / </span>
          <Link href={`/blog/category/${cat.slug}`} className="bc_link">{cat.name}</Link>
        </div>
        <header className={styles.article_head}>
          <h1>{a.title}</h1>
          <p className={styles.lead}>{a.description}</p>
          <div className={styles.meta}>
            <time dateTime={a.updated}>Оновлено {formatDate(a.updated)}</time>
            <span>{a.readingMinutes} хв читання</span>
            <Link href={`/blog/category/${cat.slug}`}>{cat.name}</Link>
          </div>
        </header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.cover} src={cover} alt={a.title} width={1200} height={630} />
        {a.headings.length > 2 && (
          <nav className={styles.toc} aria-label="Зміст">
            <strong>Зміст</strong>
            <ol>
              {a.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={styles.body} dangerouslySetInnerHTML={{ __html: a.html }} />
        <aside className={styles.cta}>
          <p>{"Хочете так само у своєму бізнесі? Почнемо з 30-хвилинної консультації — без зобов'язань."}</p>
          <Link href={cat.service.path}>{cat.service.name} →</Link>
        </aside>
        {a.faq.length > 0 && (
          <section className={styles.faq}>
            <h2>Часті питання</h2>
            {a.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>
        )}
        {more.length > 0 && (
          <section className={styles.related}>
            <h2>Читайте також</h2>
            <div className={styles.grid}>
              {more.map((r) => (
                <ArticleCard key={r.slug} a={r} level={3} />
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
