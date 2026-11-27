/**
 * Content kept in code instead of Storyblok.
 * Anything listed here replaces the Storyblok value for that page, component and field,
 * so text can be changed with a normal commit (no CMS needed).
 *
 *   OVERRIDES[storySlug][componentName][field] = { uk, en }
 */
type Localized = { uk: string; en: string };
type Overrides = Record<string, Record<string, Record<string, Localized>>>;

export const OVERRIDES: Overrides = {
  home: {
    hero: {
      subtitle: {
        uk: "Автоматизуйте нудне. Розвивайте решту.",
        en: "Automate the boring. Grow the rest.",
      },
    },
  },
};

export function applyOverrides<T extends { slug?: string; full_slug?: string; content?: any }>(
  story: T,
  locale: string
): T {
  const slug = (story?.full_slug || story?.slug || "").replace(/^en\//, "").replace(/\/$/, "");
  const page = OVERRIDES[slug];
  if (!page || !story?.content) return story;
  const lang = locale === "en" ? "en" : "uk";
  const walk = (node: any): any => {
    if (Array.isArray(node)) return node.map(walk);
    if (!node || typeof node !== "object") return node;
    const out: any = {};
    for (const k of Object.keys(node)) out[k] = walk(node[k]);
    const fields = node.component ? page[node.component] : undefined;
    if (fields) for (const [f, v] of Object.entries(fields)) out[f] = v[lang];
    return out;
  };
  return { ...story, content: walk(story.content) };
}
