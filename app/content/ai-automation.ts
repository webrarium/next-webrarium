/**
 * "AI Automation" service — content kept in code (no Storyblok).
 * Replaces the former "Chatbot Development" service (its URL redirects here),
 * so chatbot keywords (Telegram, Instagram, Viber, WhatsApp) are covered on this page.
 *
 * The story has the same shape as a Storyblok service story, so the existing
 * service components render it unchanged.
 */

export const AI_SLUG = "ai-automation";
export const REPLACED_SERVICE_SLUG = "chatbots-developing";

type L = "uk" | "en";
type T = { uk: string; en: string };

const ASSET = "https://a.storyblok.com/f/276513/";
const doc = (...paras: string[]) => ({
  type: "doc",
  content: paras.map((text) => ({ type: "paragraph", content: [{ type: "text", text }] })),
});
const logo = (path: string, alt: string) => ({ filename: ASSET + path, alt });
let uid = 0;
const id = (p: string) => `ai-${p}-${++uid}`;

const C = {
  title: {
    uk: "AI-автоматизація бізнесу — AI-агенти, чат-боти та інтеграції",
    en: "AI Automation for Business — AI Agents, Chatbots & Integrations",
  },
  subtitle: {
    uk: "AI-агенти й чат-боти на Claude, ChatGPT і Gemini, підключені до вашої CRM, магазину та месенджерів.",
    en: "AI agents and chatbots on Claude, ChatGPT and Gemini, wired into your CRM, store and messengers.",
  },
  metaTitle: {
    uk: "AI-автоматизація бізнесу: AI-агенти та чат-боти | Webrarium",
    en: "AI Automation for Business: AI Agents & Chatbots | Webrarium",
  },
  metaDescription: {
    uk: "AI-агенти й чат-боти на Claude та ChatGPT для Telegram, Instagram і Viber. Обробка заявок і документів, інтеграція з CRM, Shopify, Make, Zapier і n8n.",
    en: "AI agents and chatbots on Claude and ChatGPT for Telegram, Instagram and Viber. Request and document processing, connected to your CRM, Shopify, Make, Zapier and n8n.",
  },
  card: {
    uk: "AI-агенти й чат-боти на Claude та ChatGPT для Telegram, Instagram і Viber: відповідають клієнтам, розбирають заявки й документи, працюють з вашою CRM і магазином.",
    en: "AI agents and chatbots on Claude and ChatGPT for Telegram, Instagram and Viber: they answer customers, sort requests and documents, and work with your CRM and store.",
  },
} satisfies Record<string, T>;

const WHAT = {
  headline: { uk: "🤖 AI всередині ваших процесів", en: "🤖 AI inside your processes" },
  text: {
    uk: [
      "Підключаємо Claude, ChatGPT і Gemini до Shopify, CRM, Нової пошти й месенджерів. AI-агент відповідає клієнтам у Telegram, Instagram і Viber, розбирає заявки й документи, пише описи товарів, а Make, Zapier чи n8n розносять результат куди треба. Людина потрібна лише там, де без неї не обійтись.",
    ],
    en: [
      "We connect Claude, ChatGPT and Gemini to your Shopify store, CRM, Nova Poshta and messengers. An AI agent answers customers in Telegram, Instagram and Viber, sorts requests and documents and writes product copy, while Make, Zapier or n8n send the results where they belong. People step in only where they're actually needed.",
    ],
  },
};

const USES: { title: T; text: T }[] = [
  {
    title: { uk: "Чат-боти в Telegram, Instagram, Viber", en: "Chatbots in Telegram, Instagram, Viber" },
    text: {
      uk: "Відповідають своїми словами 24/7, розуміють голосові та довільні питання. Ще WhatsApp і віджет на сайті.",
      en: "Answer in plain language 24/7 and understand voice and free-form questions. WhatsApp and a website widget too.",
    },
  },
  {
    title: { uk: "Заявки → угоди в CRM", en: "Leads → deals in your CRM" },
    text: {
      uk: "Агент уточнює потребу й бюджет, записує на дзвінок і створює угоду в CRM з усім контекстом розмови.",
      en: "The agent qualifies need and budget, books a call and creates the deal in your CRM with the full conversation.",
    },
  },
  {
    title: { uk: "Підтримка без «де моє замовлення?»", en: "Support without “where's my order?”" },
    text: {
      uk: "Статус замовлення в Shopify, трекінг Нової пошти, повернення — бот відповідає сам, складне передає менеджеру.",
      en: "Shopify order status, Nova Poshta tracking, returns — the bot handles them and passes the tricky ones to a manager.",
    },
  },
  {
    title: { uk: "Пошта й повідомлення", en: "Email and messages" },
    text: {
      uk: "AI сортує вхідні, витягує контакти й деталі та розносить їх у CRM, Google Sheets чи таск-трекер.",
      en: "AI sorts the inbox, pulls out contacts and details and routes them to your CRM, Google Sheets or task tracker.",
    },
  },
  {
    title: { uk: "Рахунки, накладні, прайси", en: "Invoices, delivery notes, price lists" },
    text: {
      uk: "Розпізнаємо PDF і скани, перевіряємо дані та заносимо в таблиці чи облік — без ручного копіювання.",
      en: "We read PDFs and scans, check the data and put it into spreadsheets or accounting — no copy-pasting.",
    },
  },
  {
    title: { uk: "Тексти для магазину", en: "Copy for your store" },
    text: {
      uk: "Описи товарів, переклади й відповіді на відгуки для Shopify чи WooCommerce — пачками, у вашому стилі.",
      en: "Product descriptions, translations and review replies for Shopify or WooCommerce — in batches, in your voice.",
    },
  },
];

const STEPS: { title: T; text: T }[] = [
  {
    title: { uk: "Знаходимо нудне", en: "Spot the boring" },
    text: {
      uk: "Рахуємо, де команда втрачає години, і беремо задачі, де AI окупиться найшвидше.",
      en: "We count where the team loses hours and start with the tasks where AI pays off fastest.",
    },
  },
  {
    title: { uk: "Проєктуємо процес", en: "Map the flow" },
    text: {
      uk: "Що робить AI, що людина, звідки агент бере знання і яку модель обрати під задачу й бюджет.",
      en: "What AI does, what people do, where the agent gets its knowledge and which model fits the task and budget.",
    },
  },
  {
    title: { uk: "Автоматизуємо", en: "Automate" },
    text: {
      uk: "Збираємо агента, підключаємо CRM, магазин, Нову пошту чи Monobank і тестуємо на реальних діалогах.",
      en: "We build the agent, connect your CRM, store, Nova Poshta or Monobank and test it on real conversations.",
    },
  },
  {
    title: { uk: "Розвивайте решту", en: "Grow the rest" },
    text: {
      uk: "Стежимо за якістю й витратами, доповнюємо знання. Ви бачите, скільки роботи забрав AI.",
      en: "We watch quality and costs and keep adding knowledge. You see how much work AI has taken over.",
    },
  },
];

const RESULTS: { title: T; text: T }[] = [
  { title: { uk: "🧠 Знає ваш бізнес", en: "🧠 Knows your business" }, text: { uk: "відповідає з вашої бази знань", en: "answers from your own knowledge base" } },
  { title: { uk: "🔗 Працює з вашими сервісами", en: "🔗 Works with your tools" }, text: { uk: "CRM, Shopify, Google Sheets, Нова пошта, Monobank", en: "CRM, Shopify, Google Sheets, Nova Poshta, Monobank" } },
  { title: { uk: "💬 Усі канали", en: "💬 Every channel" }, text: { uk: "Telegram, Instagram, Viber, WhatsApp, сайт", en: "Telegram, Instagram, Viber, WhatsApp, website" } },
  { title: { uk: "👤 Людина поруч", en: "👤 Human in the loop" }, text: { uk: "складне йде менеджеру з контекстом", en: "tricky cases go to a manager with context" } },
  { title: { uk: "🌍 Будь-якою мовою", en: "🌍 Any language" }, text: { uk: "українською, англійською та іншими", en: "Ukrainian, English and more" } },
  { title: { uk: "📊 Видно результат", en: "📊 Visible results" }, text: { uk: "скільки звернень і годин закрив AI", en: "requests handled and hours saved" } },
  { title: { uk: "💸 Витрати наперед", en: "💸 Costs known up front" }, text: { uk: "рахуємо вартість AI-запитів до старту", en: "we estimate AI usage costs before we start" } },
  { title: { uk: "🛠 Підтримка", en: "🛠 Ongoing support" }, text: { uk: "допрацьовуємо агента після запуску", en: "we keep improving the agent after launch" } },
];

const TOOLS: { title: T; list: T; logos: { filename: string; alt: string }[] }[] = [
  {
    title: { uk: "LLM-моделі", en: "LLMs" },
    list: {
      uk: "Claude (Anthropic), ChatGPT / GPT (OpenAI), Gemini (Google), DeepSeek; Llama і Mistral, якщо модель має працювати на вашому сервері. RAG — щоб відповідати з ваших документів.",
      en: "Claude (Anthropic), ChatGPT / GPT (OpenAI), Gemini (Google), DeepSeek; Llama and Mistral when the model must run on your own server. RAG to answer from your documents.",
    },
    logos: [
      { filename: "/logos/claude.svg", alt: "Claude logo" },
      { filename: "/logos/anthropic.svg", alt: "Anthropic logo" },
      logo("1180x320/f23ca2dea4/openai-logo.webp", "OpenAI logo"),
      { filename: "/logos/googlegemini.svg", alt: "Gemini logo" },
      { filename: "/logos/deepseek.svg", alt: "DeepSeek logo" },
      { filename: "/logos/meta.svg", alt: "Llama logo" },
      { filename: "/logos/mistralai.svg", alt: "Mistral logo" },
    ],
  },
  {
    title: { uk: "Make, Zapier, n8n", en: "Make, Zapier, n8n" },
    list: {
      uk: "Зв'язують AI з рештою сервісів: CRM, Shopify, Google Sheets, пошта, оплати й доставка.",
      en: "Connect AI to the rest of your stack: CRM, Shopify, Google Sheets, email, payments and delivery.",
    },
    logos: [
      logo("3371x1024/66338251a2/make-logo.png", "Make logo"),
      logo("1619x439/1e5b3e9f82/zapier-logo.png", "Zapier logo"),
      logo("2560x1024/7f5e82b718/n8n-logo.png", "n8n logo"),
    ],
  },
  {
    title: { uk: "Код і дані", en: "Code and data" },
    list: {
      uk: "Python і JavaScript для складних інтеграцій, Supabase і PostgreSQL для даних і бази знань.",
      en: "Python and JavaScript for complex integrations, Supabase and PostgreSQL for data and the knowledge base.",
    },
    logos: [
      logo("519x154/34bdc0b722/python_logo.svg", "Python logo"),
      logo("150x150/d34a92bbd4/js_logo.svg", "JavaScript logo"),
      logo("1580x305/aa02828198/supabase_logotype.png", "Supabase logo"),
    ],
  },
  {
    title: { uk: "Канали", en: "Channels" },
    list: {
      uk: "Telegram, Instagram, Viber, WhatsApp, Messenger, віджет на сайті.",
      en: "Telegram, Instagram, Viber, WhatsApp, Messenger, website widget.",
    },
    logos: [
      logo("512x512/7bcf04b90b/telegram_app-logo.webp", "Telegram logo"),
      logo("632x666/4097ba1978/viber-logo.webp", "Viber logo"),
      logo("512x513/957ab8be1d/whatsapp-logo.webp", "WhatsApp logo"),
      logo("512x512/2e37a96054/messenger-logo.webp", "Messenger logo"),
      logo("397x397/7b53ca043b/dialog-widget.webp", "Website chat widget"),
    ],
  },
];

export const AI_FAQ: { q: T; a: T }[] = [
  {
    q: { uk: "Чим це відрізняється від Make чи Zapier?", en: "How is this different from Make or Zapier?" },
    a: {
      uk: "Make, Zapier і n8n переносять дані за правилами: прийшла оплата — створи ТТН. AI додаємо там, де треба зрозуміти текст: відповісти клієнту, розібрати лист чи документ. Зазвичай поєднуємо обидва.",
      en: "Make, Zapier and n8n move data by rules: payment in — create a shipment. AI comes in where text has to be understood: replying to a customer, reading an email or a document. We usually combine both.",
    },
  },
  {
    q: { uk: "Яку модель обрати: Claude, ChatGPT чи Gemini?", en: "Which model: Claude, ChatGPT or Gemini?" },
    a: {
      uk: "Залежить від задачі. Для діалогів і довгих документів часто беремо Claude, для швидких дешевих задач — менші моделі GPT чи Gemini. Тестуємо кілька на ваших даних і обираємо за якістю та ціною.",
      en: "It depends on the task. For conversations and long documents we often pick Claude; for quick, cheap tasks, smaller GPT or Gemini models. We test several on your data and choose by quality and price.",
    },
  },
  {
    q: { uk: "У яких месенджерах працює бот?", en: "Which messengers does the bot work in?" },
    a: {
      uk: "Telegram, Instagram, Viber, WhatsApp, Messenger і віджет на сайті — один агент, одна база знань.",
      en: "Telegram, Instagram, Viber, WhatsApp, Messenger and a website widget — one agent, one knowledge base.",
    },
  },
  {
    q: { uk: "Чи не вигадуватиме бот відповіді?", en: "Won't the bot make things up?" },
    a: {
      uk: "Агент відповідає лише з вашої бази знань і правил. Якщо відповіді немає — каже про це й передає розмову менеджеру. Перед запуском перевіряємо на реальних питаннях клієнтів.",
      en: "The agent answers only from your knowledge base and rules. If there's no answer, it says so and hands over to a manager. We test it on real customer questions before launch.",
    },
  },
  {
    q: { uk: "Скільки це коштує і як довго?", en: "How much and how long?" },
    a: {
      uk: "Разова розробка плюс щомісячна плата за API моделі, яка залежить від обсягу запитів. Термін залежить від кількості сценаріїв та інтеграцій. Точний кошторис і терміни даємо після короткого аудиту.",
      en: "A one-off build plus a monthly model API fee that depends on volume. Timing depends on the number of flows and integrations. We give an exact estimate and timeline after a short audit.",
    },
  },
  {
    q: { uk: "Що з безпекою даних?", en: "What about data security?" },
    a: {
      uk: "Працюємо через бізнес-API, де дані не йдуть на навчання моделей, передаємо AI лише потрібне для задачі. Якщо дані не можна виносити, розгортаємо модель на вашому сервері.",
      en: "We use business APIs where data isn't used to train models and pass AI only what the task needs. If data can't leave your infrastructure, we run the model on your own server.",
    },
  },
];

const RELATED_PROJECTS = [
  "projects/ebay-product-monitoring-system-with-telegram-alerts-and-interactive-dashboard",
  "projects/development-of-an-online-store-for-a-jewelry-brand",
];

export function aiRelatedProjectSlugs() {
  return RELATED_PROJECTS;
}

/** Card used in services grids (home + /services). Shaped like a resolved Storyblok story. */
export function aiServiceCard(locale: string) {
  const l: L = locale === "en" ? "en" : "uk";
  return {
    id: "local-ai-automation",
    uuid: "local-ai-automation",
    slug: AI_SLUG,
    full_slug: `${l === "en" ? "en/" : ""}services/${AI_SLUG}`,
    content: { component: "service", title: C.title[l], description: doc(C.card[l]) },
  };
}

export function aiServiceMeta(locale: string) {
  const l: L = locale === "en" ? "en" : "uk";
  return { title: C.metaTitle[l], description: C.metaDescription[l], name: C.title[l] };
}

/** Full page story. `projects` = resolved project stories for the grid (may be empty). */
export function aiServiceStory(locale: string, projects: any[] = []) {
  const l: L = locale === "en" ? "en" : "uk";
  uid = 0;
  const body: any[] = [
    { _uid: id("h"), component: "project_headline", headline: WHAT.headline[l], text: doc(...WHAT.text[l]) },
    {
      _uid: id("d"),
      component: "service_details",
      title: l === "en" ? "🧩 What we automate" : "🧩 Що автоматизуємо",
      service_details_cards: USES.map((u) => ({
        _uid: id("dc"),
        component: "service_details_card",
        title: u.title[l],
        description: doc(u.text[l]),
      })),
    },
    {
      _uid: id("n"),
      component: "service_need",
      media: "",
      title: l === "en" ? "⚙️ How we work" : "⚙️ Як працюємо",
      cards: STEPS.map((s) => ({ _uid: id("nc"), component: "service_need_card", title: s.title[l], description: doc(s.text[l]) })),
    },
    {
      _uid: id("r"),
      component: "project_results",
      title: l === "en" ? "✅ What you get" : "✅ Що ви отримуєте",
      project_results_cards: RESULTS.map((r) => ({ _uid: id("rc"), component: "project_results_card", title: r.title[l], text: r.text[l] })),
    },
    {
      _uid: id("i"),
      component: "service_instruments",
      title: l === "en" ? "Tools and models" : "Інструменти та моделі",
      cards: TOOLS.map((t) => ({
        _uid: id("ic"),
        component: "service_instruments_card",
        title: t.title[l],
        instruments_list: doc(t.list[l]),
        instruments_logos: t.logos,
      })),
    },
    {
      _uid: id("f"),
      component: "service_faq",
      title: l === "en" ? "FAQ: AI automation and chatbots" : "Питання про AI-автоматизацію та чат-ботів",
      items: AI_FAQ.map((f) => ({ _uid: id("fi"), component: "faq_item", question: f.q[l], answer: f.a[l] })),
    },
  ];
  if (projects.length) {
    body.push({
      _uid: id("p"),
      component: "projects_grid",
      title: l === "en" ? "Recent Projects" : "Останні проєкти",
      button_txt: l === "en" ? "View Case" : "Переглянути кейс",
      button2_txt: l === "en" ? "View Site" : "Переглянути сайт",
      projects_list: projects,
    });
  }
  return {
    name: C.title[l],
    id: 0,
    uuid: "local-ai-automation",
    slug: AI_SLUG,
    full_slug: `${l === "en" ? "en/" : ""}services/${AI_SLUG}`,
    lang: l === "en" ? "en" : "default",
    content: {
      _uid: "local-ai-automation",
      component: "service",
      title: C.title[l],
      subtitle: C.subtitle[l],
      meta_title: C.metaTitle[l],
      meta_description: C.metaDescription[l],
      description: doc(C.card[l]),
      body,
    },
  };
}
