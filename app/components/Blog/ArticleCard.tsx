import Link from "next/link";
import styles from "./Blog.module.css";
import { Article, formatDate, getCategory } from "@/app/lib/blog";

export default function ArticleCard({ a, level = 2 }: { a: Article; level?: 2 | 3 }) {
  const cat = getCategory(a.category);
  const H = level === 2 ? "h2" : "h3";
  return (
    <Link href={`/blog/${a.slug}`} className={styles.card}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/blog/${a.slug}/opengraph-image`} alt={a.title} width={1200} height={630} loading="lazy" />
      <div className={styles.card_body}>
        <div className={styles.meta}>
          <span>{cat?.name}</span>
          <span>{a.readingMinutes} хв читання</span>
        </div>
        <H>{a.title}</H>
        <p>{a.description}</p>
        <div className={styles.meta}>{formatDate(a.date)}</div>
      </div>
    </Link>
  );
}
