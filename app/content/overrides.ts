/**
 * Content kept in code instead of Storyblok.
 * Anything listed here replaces the Storyblok value for that page, component and field,
 * so text can be changed with a normal commit (no CMS needed).
 *
 *   OVERRIDES[storySlug][componentName][field] = { uk, en }
 *   or an array of { uk, en } — applied to the 1st, 2nd, 3rd… block of that component on the page
 */
import { REPLACED_SERVICE_SLUG, aiServiceCard } from "./ai-automation";

/** Services that are no longer offered: hidden from grids, URLs redirect (next.config.mjs). */
export const HIDDEN_SERVICES = ["event-websites"];

type Localized = { uk: string; en: string };
type Overrides = Record<string, Record<string, Record<string, Localized | Localized[]>>>;

export const OVERRIDES: Overrides = {
  home: {
    hero: {
      subtitle: {
        uk: "Автоматизуйте нудне. Розвивайте решту.",
        en: "Automate the boring. Grow the rest.",
      },
    },
    // process: the four steps spell out the slogan
    work_tl_card: {
      title: [
        { uk: "Знаходимо нудне", en: "Spot the boring" },
        { uk: "Проєктуємо процес", en: "Map the flow" },
        { uk: "Автоматизуємо", en: "Automate" },
        { uk: "Розвивайте решту", en: "Grow the rest" },
      ],
      description: [
        {
          uk: "Розбираємо, де команда втрачає години: ручні ТТН, копіювання заявок, звіти, однакові відповіді клієнтам",
          en: "We find where your team loses hours: manual shipping labels, copy-pasting requests, reports, the same answers to customers",
        },
        {
          uk: "Проєктуємо, як дані рухаються між сервісами, що робить AI, а що — людина",
          en: "We map how data moves between your tools, and what AI does versus what a person does",
        },
        {
          uk: "Збираємо інтеграції, ботів, AI-асистентів і, якщо потрібно, сайт чи магазин",
          en: "We build the integrations, bots, AI assistants and, if needed, the website or store",
        },
        {
          uk: "Підтримуємо й допрацьовуємо систему, а ви займаєтесь тим, що справді рухає бізнес",
          en: "We keep the system running and improving while you focus on what actually grows the business",
        },
      ],
    },
    stack: {
      title: {
        uk: "Будуємо автоматизації, AI-асистентів і сайти, які знімають рутину з вашої команди",
        en: "We build automations, AI assistants and websites that take routine off your team",
      },
      subtitle: {
        uk: "Технології — не мета. Мета — зекономлені години й зростання.",
        en: "Technology isn't the goal. Hours saved and growth are.",
      },
    },
  },
};

const lang = (locale: string) => (locale === "en" ? "en" : "uk");
const storySlug = (story: any) =>
  (story?.full_slug || story?.slug || "").replace(/^en\//, "").replace(/\/$/, "");

/** Services grids: the AI Automation service goes first and replaces the old chatbot service. */
function patchServicesGrid(node: any, locale: string) {
  if (!Array.isArray(node.services_list) || typeof node.services_list[0] !== "object") return node;
  const rest = node.services_list.filter(
    (s: any) =>
      s?.slug !== REPLACED_SERVICE_SLUG && s?.slug !== "ai-automation" && !HIDDEN_SERVICES.includes(s?.slug)
  );
  return { ...node, services_list: [aiServiceCard(locale), ...rest] };
}

export function applyOverrides<T extends { slug?: string; full_slug?: string; content?: any }>(
  story: T,
  locale: string
): T {
  if (!story?.content) return story;
  const page = OVERRIDES[storySlug(story)] || {};
  const l = lang(locale);
  const seen: Record<string, number> = {};
  const walk = (node: any): any => {
    if (Array.isArray(node)) return node.map(walk);
    if (!node || typeof node !== "object") return node;
    let out: any = {};
    for (const k of Object.keys(node)) out[k] = walk(node[k]);
    if (node.component) {
      const n = (seen[node.component] = (seen[node.component] ?? -1) + 1);
      const fields = page[node.component];
      if (fields)
        for (const [f, v] of Object.entries(fields)) {
          const val = Array.isArray(v) ? v[n] : v;
          if (val) out[f] = val[l];
        }
      if (node.component === "services_grid") out = patchServicesGrid(out, locale);
    }
    return out;
  };
  return { ...story, content: walk(story.content) };
}
