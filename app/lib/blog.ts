import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";

/**
 * Blog — articles live in /content/blog/*.md (Ukrainian), frontmatter + Markdown.
 * Not linked from the header/hero/footer yet; reachable by URL and listed in the sitemap.
 */

export type Category = { slug: string; name: string; description: string; service: { name: string; path: string } };

export const CATEGORIES: Category[] = [
  {
    slug: "ai",
    name: "AI та чат-боти",
    description: "AI-агенти, чат-боти для Telegram, Instagram і сайту, вибір LLM-моделі та впровадження ШІ в бізнес.",
    service: { name: "AI-автоматизація для бізнесу", path: "/services/ai-automation" },
  },
  {
    slug: "automation",
    name: "Автоматизація та інтеграції",
    description: "Автоматизація бізнес-процесів, Make, Zapier, n8n, інтеграції Shopify, Нової пошти, Monobank і CRM.",
    service: { name: "Автоматизація бізнес-процесів", path: "/services/business-automation" },
  },
  {
    slug: "ecommerce",
    name: "E-commerce та Shopify",
    description: "Запуск і міграція інтернет-магазинів, Shopify та WooCommerce для українського ринку.",
    service: { name: "Розробка інтернет-магазинів", path: "/services/online-store" },
  },
  {
    slug: "websites",
    name: "Сайти",
    description: "Корпоративні сайти, лендінги та сайти для подій: вартість, структура, запуск.",
    service: { name: "Розробка сайтів", path: "/services/company-websites" },
  },
  {
    slug: "ads",
    name: "Реклама та аналітика",
    description: "Google Ads, Meta Ads, GA4 і відстеження заявок — на реальних кейсах.",
    service: { name: "Цифрова реклама", path: "/services/digital-advertising" },
  },
  {
    slug: "design",
    name: "UX/UI дизайн",
    description: "UX-аудит, дизайн інтерфейсів і чому сайт не продає.",
    service: { name: "UX/UI дизайн", path: "/services/product-design" },
  },
];

export type Faq = { q: string; a: string };
export type Heading = { id: string; text: string };

export type Article = {
  slug: string;
  title: string; // H1
  metaTitle: string;
  description: string;
  category: string;
  keywords: string[];
  date: string;
  updated: string;
  coverTitle?: string; // shorter text for the cover image
  faq: Faq[];
  related: string[];
  html: string;
  headings: Heading[];
  readingMinutes: number;
};

const DIR = path.join(process.cwd(), "content/blog");

function slugify(text: string) {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ie", ж: "zh", з: "z", и: "y", і: "i", ї: "i", й: "i",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch",
    ш: "sh", щ: "shch", ь: "", ю: "iu", я: "ia", "'": "", "’": "",
  };
  return text
    .toLowerCase()
    .split("")
    .map((c) => (c in map ? map[c] : c))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function render(md: string) {
  const headings: Heading[] = [];
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const plain = text.replace(/<[^>]+>/g, "");
        if (depth === 2) {
          const id = slugify(plain);
          headings.push({ id, text: plain });
          return `<h2 id="${id}">${text}</h2>\n`;
        }
        return `<h${depth}>${text}</h${depth}>\n`;
      },
      table(token) {
        // wrap tables so they scroll on phones
        const header = token.header.map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`).join("");
        const rows = token.rows
          .map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
          .join("");
        return `<div class="table_wrp"><table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  const html = marked.parse(md, { async: false }) as string;
  return { html, headings };
}

let cache: Article[] | null = null;

export function getArticles(): Article[] {
  if (cache) return cache;
  if (!fs.existsSync(DIR)) return (cache = []);
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      const { html, headings } = render(content);
      const words = content.split(/\s+/).length;
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        metaTitle: data.metaTitle || data.title,
        description: data.description,
        category: data.category,
        keywords: data.keywords || [],
        date: String(data.date),
        updated: String(data.updated || data.date),
        coverTitle: data.coverTitle,
        faq: data.faq || [],
        related: data.related || [],
        html,
        headings,
        readingMinutes: Math.max(3, Math.round(words / 180)),
      } as Article;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export function getArticle(slug: string) {
  return getArticles().find((a) => a.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
}
