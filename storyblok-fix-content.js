#!/usr/bin/env node
/**
 * storyblok-fix-content.js — typo & consistency fixes from the Nov 2026 site review.
 *
 *   STORYBLOK_MANAGEMENT_TOKEN=... node storyblok-fix-content.js           # dry run: shows what would change
 *   STORYBLOK_MANAGEMENT_TOKEN=... node storyblok-fix-content.js --apply   # saves and publishes changed stories
 *
 * Works on the LIVE content in Storyblok (pulls every story fresh), so it is safe to run
 * even if content/ is out of date. Replacements are exact strings and language-aware:
 * UK fixes touch only Ukrainian fields, EN fixes only fields ending in "__i18n__en".
 * Strings that were not found anywhere are listed at the end — fix those by hand.
 */
const TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;
if (!TOKEN) {
  console.error("Set STORYBLOK_MANAGEMENT_TOKEN (Storyblok → My account → Personal access tokens)");
  process.exit(1);
}
const SPACE_ID = process.env.STORYBLOK_SPACE_ID || "276513";
const APPLY = process.argv.includes("--apply");

// ---------- Ukrainian fields ----------
const UK = [
  ["Завджди підтримуємо проєкти розроблені нами", "Завжди підтримуємо проєкти, розроблені нами"],
  ["Спроектувати", "Спроєктувати"],
  ["юверлірного", "ювелірного"],
  ["ювелірних прекрас", "ювелірних прикрас"],
  ["що цеплює з першої секунди", "що чіпляє з першої секунди"],
  ["майбутнє Візуального Сторітелінгу", "майбутнє візуального сторітелінгу"],
  ["матеріалів:одним", "матеріалів: одним"],
  ["дорогоцінних металу", "дорогоцінних металів"],
  ["рефракцію (переломлення світла)", "рефракцію (заломлення світла)"],
  ["коштує менше , ніж", "коштує менше, ніж"],
  ["Це особливо важливо продажу й реклами", "Це особливо важливо для продажів і реклами"],
  ["сприймаються, як прогресивні", "сприймаються як прогресивні"],
  ["обожнююємо", "обожнюємо"],
  ["тільки прочитайте їх опис", "тільки прочитайте їхній опис"],
  ["Презентація продукту: cтворити", "Презентація продукту: створити"], // Latin "c"
  ["Liquid, Shopify Google Analytics Google Search Console Google Ads,", "Liquid, Shopify, Google Analytics, Google Search Console, Google Ads,"],
  ["Що використвовували?", "Що використовували?"],
  ["Масштабований сайт на Webflow +", "Масштабований сайт на Webflow"],
  ["зручна запис на прийом", "зручний запис на прийом"],
  ["найбльші", "найбільші"],
  ["визначили цільову аудиторії", "визначили цільову аудиторію"],
  ["Розробли тему", "Розробили тему"],
  ["функціональность", "функціональність"],
  ["платіжні методіи та інтегрували необхідних плагінів", "платіжні методи та інтегрували необхідні плагіни"],
  ["простий адмін-панель", "просту адмін-панель"],
  ["меркетинг-менеджера", "маркетинг-менеджера"],
  ["Використали різні толоки аудиторій за географічним демографічними ознаками", "Використали різні сегменти аудиторій за географічними та демографічними ознаками"],
  ["Налаштували Таргетинг", "Налаштували таргетинг"],
  ["за 21 днів", "за 21 день"],
  ["Використані інструменти: Google Keyword, Ahrefs", "Використані інструменти: Google Keyword Planner, Ahrefs"],
  ["За 21 день Google Ads та відеокампаній отримали", "За 21 день роботи Google Ads і відеокампаній ми отримали"],
  ["Переглянути Веб Сайт", "Переглянути вебсайт"],
  ["Переглянути Кейс", "Переглянути кейс"],
  ["Переглянути Сайт", "Переглянути сайт"],
  ["зворотнього зв'язку", "зворотного зв'язку"],
  ["Бази данних", "Бази даних"],
  ["затребуваного ринку продукту", "затребуваного ринком продукту"],
  ["добре спроектований продукт", "добре спроєктований продукт"],
  ["управління проектами та завданнями", "управління проєктами та завданнями"],
  ["Підтпримка та обслуговування", "Підтримка та обслуговування"],
  ["Навіщо компанії веб сайт?", "Навіщо компанії вебсайт?"],
  ["статичного генерації сайтів", "статичної генерації сайтів"],
  ["забезпечує реальний час синхронізації даних між клієнтами", "забезпечує синхронізацію даних між клієнтами в реальному часі"],
  ["Адаптивний Дизайн", "Адаптивний дизайн"],
  ["Навіщо будувати online магазин?", "Навіщо будувати онлайн-магазин?"],
  ["Стежити за метриками, коригуємо", "Стежимо за метриками, коригуємо"],
  ["можуть запаморочити голову", "можуть запаморочити"],
  ["Facebook Ads: Реклама", "Meta Ads: Реклама"],
  ["Facebook Pixel: Відстеження", "Meta Pixel: Відстеження"],
  ["Інстументи, що використовуємо", "Інструменти, що використовуємо"],
  ["реалізовуємо рішення", "реалізуємо рішення"],
  ["готуємо звіти по реєстраціям", "готуємо звіти щодо реєстрацій"],
  ["LiqPay, Stripe, Fondy.", "LiqPay, Stripe, WayForPay."], // NBU removed Fondy from the payment registry (Apr 2024)
  // testimonials — only clear typos, wording left as the clients wrote it
  ["Співзасновник у The Digital State", "Співзасновниця The Digital State"],
  ["пропрацювати її", "опрацювати її"],
  ["які, зрештою, задовільнити запит", "які зрештою задовольнили запит"],
  ["експертиза в розробці та у чудовий сервіс", "експертиза в розробці та чудовий сервіс"],
  ["я побачив людей які передусім", "я побачив людей, які передусім"],
  ["одніє зі своїх", "однією зі своїх"],
  ["під час роботи над проектом дуже раджу", "під час роботи над проєктом, дуже раджу"],
];

// ---------- English fields (…__i18n__en) ----------
const EN = [
  ["Our team devised a tailoIncreasing the Number of Courses Participants for Ukrainian Catholic University Business School (LvBS) through Contextual Advertising and community building.",
   "We designed and ran a contextual advertising strategy that grew course enrolment for the Ukrainian Catholic University Business School (LvBS)."],
  ["View SIte", "View Site"],
  ["Схожі проєкти", "Similar Projects"],
  ["Переглянути Кейс", "View Case"],
  ["Переглянути Сайт", "View Site"],
  ["Tobі Mozhna", "Tobi Mozhna"], // Cyrillic "і"
  ["Olexander Balbyshev", "Oleksandr Balbyshev"],
  ["Alexander Balbishev", "Oleksandr Balbyshev"],
  ["Yulia Marunyak", "Yulia Maruniak"],
  ["Співзасновник у The Digital State", "Co-founder at The Digital State"],
  ["Євген Скринник", "Yevhen Skrynnyk"],
  ["Sergiy, the head of the development team", "Serhiy, the head of the development team"],
  ["which gave a sense of being closely monitored", "so we always had our finger on the pulse"],
  ["Sooner or Later, the russian-Ukrainian War will End, and Everyone will Return to a Better Life.",
   "Sooner or later, the russian-Ukrainian war will end, and everyone will return to a better life."],
  ["🧠 What did you use?", "🧠 What we used"],
  ["🧠 What was Used?", "🧠 What we used"],
  ["Liquid, Shopify Google Analytics. Google Search Console,", "Liquid, Shopify, Google Analytics, Google Search Console,"],
  ["A scalable website on Webflow+", "A scalable website on Webflow"],
  ["Spends a lot of time on repetitive tasks", "Spend a lot of time on repetitive tasks"],
  ["Works with large amounts of data", "Work with large amounts of data"],
  ["Seeks to reduce dependence on third-party services", "Seek to reduce dependence on third-party services"],
  ["Wants to scale without expanding the team", "Want to scale without expanding the team"],
  ["This reduces errors and reduces the workload of your team", "This reduces errors and lightens your team's workload"],
  ["Facebook Ads: Advertising on social networks Facebook and Instagram", "Meta Ads: Advertising on Facebook and Instagram"],
  ["Facebook Pixel: Tracks", "Meta Pixel: Tracks"],
  ["From Google Ads to Facebook Ads", "From Google Ads to Meta Ads"],
  ["Telegram, WhatsApp, Viber, Messenger, віджет на сайт", "Telegram, WhatsApp, Viber, Messenger, website widget"],
  ["Stripe, Liqpay, Fondy:", "Stripe, LiqPay, WayForPay:"],
  ["We support projects developed by us", "We keep supporting the projects we build"],
];

// Text nodes with exactly this text are removed (leftover from a ChatGPT paste on /en/services/online-store).
const REMOVE_TEXT_NODES = ["4o mini"];

const used = new Map([...UK, ...EN].map(([a]) => [a, 0]));
let removedNodes = 0;

function fixString(str, lang) {
  let out = str;
  for (const [from, to] of lang === "en" ? EN : UK) {
    if (out.includes(from)) {
      used.set(from, used.get(from) + out.split(from).length - 1);
      out = out.split(from).join(to);
    }
  }
  return out;
}

function isRemovable(n) {
  return n && typeof n === "object" && n.type === "text" && REMOVE_TEXT_NODES.includes((n.text || "").trim());
}

function walk(node, lang) {
  if (typeof node === "string") return fixString(node, lang);
  if (Array.isArray(node)) {
    const out = [];
    for (const n of node) {
      if (isRemovable(n)) { removedNodes++; continue; }
      const hadContent = n && typeof n === "object" && Array.isArray(n.content) && n.content.length > 0;
      const fixed = walk(n, lang);
      // a paragraph that only held a removed node is dropped as well
      if (hadContent && fixed.type === "paragraph" && fixed.content.length === 0) continue;
      out.push(fixed);
    }
    return out;
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = walk(v, k.endsWith("__i18n__en") ? "en" : lang);
    }
    return out;
  }
  return node;
}

async function api(method, endpoint, body) {
  for (let i = 0; i < 5; i++) {
    const res = await fetch(`https://mapi.storyblok.com/v1/${endpoint}`, {
      method,
      headers: { Authorization: TOKEN, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) { await new Promise((r) => setTimeout(r, 1000 * (i + 1))); continue; }
    if (!res.ok) throw new Error(`${method} ${endpoint}: ${res.status} ${await res.text()}`);
    return res.json();
  }
  throw new Error("Rate limited, try again");
}

async function main() {
  console.log(APPLY ? "APPLY mode — changes will be published\n" : "DRY RUN — nothing is saved (add --apply to publish)\n");
  const list = [];
  for (let page = 1; ; page++) {
    const { stories } = await api("GET", `spaces/${SPACE_ID}/stories?per_page=100&page=${page}&story_only=1`);
    list.push(...stories.filter((s) => !s.is_folder));
    if (stories.length < 100) break;
  }
  let changed = 0;
  for (const meta of list) {
    const { story } = await api("GET", `spaces/${SPACE_ID}/stories/${meta.id}`);
    const before = JSON.stringify(story.content);
    const content = walk(story.content, "uk");
    const after = JSON.stringify(content);
    if (before === after) continue;
    changed++;
    console.log(`✏️  ${story.full_slug}${story.published ? "" : "  (not published — will stay a draft)"}`);
    if (APPLY) {
      await api("PUT", `spaces/${SPACE_ID}/stories/${story.id}`, {
        story: { content },
        ...(story.published && !story.unpublished_changes ? { publish: 1 } : {}),
      });
      if (story.unpublished_changes) console.log("   ⚠️ had unpublished draft changes — saved as draft, publish it manually");
    }
  }
  console.log(`\n${changed} stories ${APPLY ? "updated" : "would change"}; ${removedNodes} stray text node(s) removed.`);
  const missing = [...used].filter(([, n]) => n === 0).map(([s]) => s);
  if (missing.length) {
    console.log(`\nNot found (already fixed, or split by formatting — check by hand):`);
    missing.forEach((s) => console.log("  • " + s.slice(0, 90)));
  }
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
