/**
 * "AI Automation" service — content kept in code (no Storyblok).
 * Replaces the former "Chatbot Development" service (its URL redirects here).
 *
 * Copy is built around real Google queries (UA autocomplete, Nov 2026):
 *   ai автоматизація для бізнесу · ai автоматизація бізнес процесів ·
 *   автоматизація бізнес процесів за допомогою ші · впровадження ші в бізнес ·
 *   ai агенти для бізнесу · чат бот для бізнесу · розробка чат бота ·
 *   чат бот телеграм нова пошта / підтримка · чат бот для інстаграм
 * Keyword Planner (UA, Nov 2025–Oct 2026): ai автоматизація 100–1K (+900% YoY), автоматизація бізнесу 100–1K,
 *   ai агенти для бізнесу 10–100 (rising), чат бот для бізнесу / для сайту / розробка чат бота 10–100 (high CPC)
 * EN: ai automation for small businesses · ai automation for ecommerce · ai agent for business
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
const local = (file: string, alt: string) => ({ filename: `/logos/${file}`, alt });
let uid = 0;
const id = (p: string) => `ai-${p}-${++uid}`;

const C = {
  title: {
    uk: "AI-автоматизація для бізнесу — AI-агенти, чат-боти та інтеграції",
    en: "AI Automation for Business — AI Agents, Chatbots & Integrations",
  },
  subtitle: {
    uk: "AI-агенти й чат-боти на Claude, ChatGPT і Gemini для автоматизації бізнесу: підключаємо до вашої CRM, магазину та месенджерів. Починаємо з одного процесу, який забирає найбільше часу.",
    en: "AI agents and chatbots on Claude, ChatGPT and Gemini for business automation, wired into your CRM, store and messengers. We start with the one process that eats the most time.",
  },
  metaTitle: {
    uk: "AI-автоматизація для бізнесу: AI-агенти та чат-боти | Webrarium",
    en: "AI Automation for Business & E-commerce: AI Agents | Webrarium",
  },
  metaDescription: {
    uk: "Впровадження ШІ в бізнес: AI-агенти й чат-боти для Telegram та Instagram, автоматизація бізнес-процесів за допомогою ШІ. Аудит, пілот, інтеграція з CRM.",
    en: "AI automation for small business and e-commerce: AI agents, chatbots for Telegram and Instagram, email and document processing. Audit, pilot, CRM integration.",
  },
  card: {
    uk: "AI-агенти й чат-боти на Claude та ChatGPT для Telegram, Instagram і Viber: відповідають клієнтам, розбирають заявки й документи, працюють з вашою CRM і магазином.",
    en: "AI agents and chatbots on Claude and ChatGPT for Telegram, Instagram and Viber: they answer customers, sort requests and documents, and work with your CRM and store.",
  },
} satisfies Record<string, T>;

const INTRO = {
  headline: { uk: "🤖 AI всередині ваших процесів", en: "🤖 AI inside your processes" },
  text: {
    uk: "Підключаємо Claude, ChatGPT і Gemini до Shopify, CRM, Нової пошти й месенджерів. AI-агент відповідає клієнтам у Telegram, Instagram і Viber, розбирає заявки й документи, пише описи товарів, а Make, Zapier чи n8n розносять результат куди треба. Людина потрібна лише там, де без неї не обійтись.",
    en: "We connect Claude, ChatGPT and Gemini to your Shopify store, CRM, Nova Poshta and messengers. An AI agent answers customers in Telegram, Instagram and Viber, sorts requests and documents and writes product copy, while Make, Zapier or n8n send the results where they belong. People step in only where they're actually needed.",
  },
};

// Use cases — one card per real search intent
const USES: { title: T; text: T }[] = [
  {
    title: { uk: "Чат-бот для бізнесу: Telegram, Instagram, сайт", en: "Business chatbot: Telegram, Instagram, website" },
    text: {
      uk: "Розробка чат-ботів і Telegram-ботів під ваші сценарії: відповідають своїми словами 24/7, розуміють голосові й довільні питання, приймають замовлення. Також Viber і WhatsApp.",
      en: "Chatbot and Telegram bot development for your scenarios: plain-language answers 24/7, voice and free-form questions, order taking. Viber and WhatsApp too.",
    },
  },
  {
    title: { uk: "AI-агенти для бізнесу та продажів", en: "AI agents for business and sales" },
    text: {
      uk: "Кваліфікують заявку, підбирають товар чи тариф, записують на дзвінок і створюють угоду в CRM з усією розмовою. Нагадують тим, хто не дописав.",
      en: "Qualify the lead, recommend a product or plan, book a call and create the CRM deal with the full conversation. Follow up with people who went quiet.",
    },
  },
  {
    title: { uk: "Підтримка: Нова пошта, статуси, повернення", en: "Support: tracking, order status, returns" },
    text: {
      uk: "«Де моє замовлення?» — бот сам перевіряє Shopify і ТТН Нової пошти, оформлює повернення, а складне передає менеджеру з контекстом.",
      en: "“Where's my order?” — the bot checks Shopify and the carrier itself, starts returns and hands tricky cases to a manager with context.",
    },
  },
  {
    title: { uk: "Автоматизація бізнес-процесів за допомогою ШІ", en: "Business process automation with AI" },
    text: {
      uk: "Пошта, заявки з форм, рахунки, накладні, прайси постачальників: AI читає, витягує дані й заносить у CRM, Google Sheets чи облік.",
      en: "Inbox, form leads, invoices, delivery notes, supplier price lists: AI reads them, extracts the data and puts it into your CRM, Google Sheets or accounting.",
    },
  },
  {
    title: { uk: "AI для інтернет-магазину", en: "AI for e-commerce" },
    text: {
      uk: "Описи й переклади товарів для Shopify чи WooCommerce пачками, відповіді на відгуки, підказки покупцям у чаті — у вашому стилі.",
      en: "Product descriptions and translations for Shopify or WooCommerce in batches, review replies, shopping help in chat — in your brand voice.",
    },
  },
  {
    title: { uk: "AI-асистент для команди", en: "Internal AI assistant" },
    text: {
      uk: "Бот у Telegram чи Slack, який знає ваші регламенти, ціни й документи: нові співробітники питають його, а не колег.",
      en: "A Telegram or Slack bot that knows your policies, prices and documents: new hires ask it instead of their colleagues.",
    },
  },
];

// How to start — offer formats
const START: { title: T; text: T }[] = [
  {
    title: { uk: "Консультація, 30 хвилин", en: "30-minute call" },
    text: {
      uk: "Безкоштовно. Розповідаєте, де команда втрачає час, — ми чесно кажемо, чи допоможе тут AI, чи вистачить звичайної автоматизації.",
      en: "Free. You tell us where the team loses time; we tell you honestly whether AI helps there or plain automation is enough.",
    },
  },
  {
    title: { uk: "AI-аудит процесів", en: "AI process audit" },
    text: {
      uk: "Розбираємо процеси й дані, рахуємо години та гроші, обираємо 1–3 задачі з найшвидшою окупністю. На виході — план, кошторис і вартість AI-запитів на місяць.",
      en: "We go through your processes and data, count hours and money, and pick 1–3 tasks with the fastest payback. You get a plan, an estimate and the monthly AI usage cost.",
    },
  },
  {
    title: { uk: "Пілот на одному процесі", en: "Pilot on one process" },
    text: {
      uk: "Запускаємо агента на реальних даних, наприклад підтримку в Telegram чи обробку заявок, і міряємо результат, перш ніж масштабувати.",
      en: "We launch the agent on real data — say, Telegram support or lead processing — and measure the result before scaling.",
    },
  },
  {
    title: { uk: "Впровадження та супровід", en: "Rollout and support" },
    text: {
      uk: "Підключаємо решту каналів і сервісів, навчаємо команду, стежимо за якістю відповідей і витратами, доповнюємо базу знань.",
      en: "We connect the remaining channels and tools, train your team, watch answer quality and costs, and keep the knowledge base up to date.",
    },
  },
];

// Who it's for — industries
const WHO: { title: T; text: T }[] = [
  { title: { uk: "🛍 Інтернет-магазини", en: "🛍 Online stores" }, text: { uk: "Shopify, WooCommerce, доставка Новою поштою", en: "Shopify, WooCommerce, carrier tracking" } },
  { title: { uk: "🩺 Клініки та салони", en: "🩺 Clinics and salons" }, text: { uk: "запис, нагадування, відповіді на типові питання", en: "bookings, reminders, typical questions" } },
  { title: { uk: "🎓 Школи та курси", en: "🎓 Schools and courses" }, text: { uk: "консультації вступників, оплата, доступи", en: "applicant questions, payments, access" } },
  { title: { uk: "🏗 B2B і виробництво", en: "🏗 B2B and manufacturing" }, text: { uk: "заявки, прайси, документи постачальників", en: "requests, price lists, supplier documents" } },
  { title: { uk: "🏠 Нерухомість", en: "🏠 Real estate" }, text: { uk: "підбір об'єктів, кваліфікація лідів, показ", en: "listing matches, lead qualification, viewings" } },
  { title: { uk: "💼 Агенції та сервіси", en: "💼 Agencies and services" }, text: { uk: "брифи, звіти, комунікація з клієнтами", en: "briefs, reports, client communication" } },
];

const RESULTS: { title: T; text: T }[] = [
  { title: { uk: "🧠 Знає ваш бізнес", en: "🧠 Knows your business" }, text: { uk: "відповідає з вашої бази знань", en: "answers from your own knowledge base" } },
  { title: { uk: "🔗 Працює з вашими сервісами", en: "🔗 Works with your tools" }, text: { uk: "CRM, Shopify, Google Sheets, Нова пошта, Monobank", en: "CRM, Shopify, Google Sheets, Nova Poshta, Monobank" } },
  { title: { uk: "👤 Людина поруч", en: "👤 Human in the loop" }, text: { uk: "складне йде менеджеру з контекстом", en: "tricky cases go to a manager with context" } },
  { title: { uk: "📊 Видно результат", en: "📊 Visible results" }, text: { uk: "скільки звернень і годин закрив AI", en: "requests handled and hours saved" } },
  { title: { uk: "💸 Витрати наперед", en: "💸 Costs known up front" }, text: { uk: "вартість AI-запитів рахуємо до старту", en: "AI usage cost estimated before we start" } },
  { title: { uk: "🔑 Усе ваше", en: "🔑 You own it" }, text: { uk: "акаунти, доступи й код залишаються у вас", en: "accounts, access and code stay with you" } },
];

const TOOLS: { title: T; list: T; logos: { filename: string; alt: string }[] }[] = [
  {
    title: { uk: "LLM-моделі", en: "LLMs" },
    list: {
      uk: "Claude (Anthropic), ChatGPT / GPT (OpenAI), Gemini (Google), DeepSeek; Llama і Mistral, якщо модель має працювати на вашому сервері. RAG — щоб відповідати з ваших документів.",
      en: "Claude (Anthropic), ChatGPT / GPT (OpenAI), Gemini (Google), DeepSeek; Llama and Mistral when the model must run on your own server. RAG to answer from your documents.",
    },
    logos: [
      local("claude.svg", "Claude logo"),
      local("anthropic.svg", "Anthropic logo"),
      logo("1180x320/f23ca2dea4/openai-logo.webp", "OpenAI logo"),
      local("googlegemini.svg", "Gemini logo"),
      local("deepseek.svg", "DeepSeek logo"),
      local("meta.svg", "Llama logo"),
      local("mistralai.svg", "Mistral logo"),
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
    q: { uk: "Чим AI-агент відрізняється від звичайного чат-бота?", en: "How is an AI agent different from a regular chatbot?" },
    a: {
      uk: "Звичайний бот іде по кнопках і сценарію. AI-агент розуміє довільні питання, бере відповіді з вашої бази знань і сам виконує дії: перевіряє замовлення, створює угоду в CRM, записує на дзвінок.",
      en: "A regular bot follows buttons and a script. An AI agent understands free-form questions, answers from your knowledge base and takes actions itself: checks orders, creates CRM deals, books calls.",
    },
  },
  {
    q: { uk: "Чим це відрізняється від Make чи Zapier?", en: "How is this different from Make or Zapier?" },
    a: {
      uk: "Make, Zapier і n8n переносять дані за правилами: прийшла оплата — створи ТТН. AI додаємо там, де треба зрозуміти текст: відповісти клієнту, розібрати лист чи документ. Зазвичай поєднуємо обидва.",
      en: "Make, Zapier and n8n move data by rules: payment in — create a shipment. AI comes in where text has to be understood: replying to a customer, reading an email or a document. We usually combine both.",
    },
  },
  {
    q: { uk: "Чи можна зробити Telegram-бота, який перевіряє ТТН Нової пошти?", en: "Can the bot check delivery status with the carrier?" },
    a: {
      uk: "Так. Бот бере номер замовлення чи телефон, знаходить ТТН через API Нової пошти й відповідає статусом. Те саме для Укрпошти, Meest і статусів у Shopify чи вашій CRM.",
      en: "Yes. The bot takes an order number or phone, finds the shipment through the carrier's API (Nova Poshta, Ukrposhta, Meest and others) and replies with the status. Same for Shopify or CRM order statuses.",
    },
  },
  {
    q: { uk: "Чи підходить AI-автоматизація малому бізнесу?", en: "Is AI automation worth it for a small business?" },
    a: {
      uk: "Так, якщо є повторювані задачі: однакові питання клієнтів, ручне перенесення заявок, документи. Почати можна з одного процесу й пілота — без великих вкладень і з видимим результатом.",
      en: "Yes, if you have repetitive work: the same customer questions, manual data entry, documents. You can start with one process and a pilot — no big upfront spend, visible results.",
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
    q: { uk: "Чи не вигадуватиме бот відповіді?", en: "Won't the bot make things up?" },
    a: {
      uk: "Агент відповідає лише з вашої бази знань і правил. Якщо відповіді немає — каже про це й передає розмову менеджеру. Перед запуском перевіряємо на реальних питаннях клієнтів.",
      en: "The agent answers only from your knowledge base and rules. If there's no answer, it says so and hands over to a manager. We test it on real customer questions before launch.",
    },
  },
  {
    q: { uk: "Скільки коштує і скільки триває впровадження?", en: "How much does it cost and how long does it take?" },
    a: {
      uk: "Разова розробка плюс щомісячна плата за API моделі, яка залежить від обсягу запитів. Термін залежить від кількості сценаріїв та інтеграцій. Точний кошторис і терміни даємо після аудиту.",
      en: "A one-off build plus a monthly model API fee that depends on volume. Timing depends on the number of flows and integrations. We give an exact estimate and timeline after the audit.",
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
    { _uid: id("h"), component: "project_headline", headline: INTRO.headline[l], text: doc(INTRO.text[l]) },
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
      _uid: id("w"),
      component: "project_results",
      title: l === "en" ? "🎯 Who it's for" : "🎯 Для кого",
      project_results_cards: WHO.map((r) => ({ _uid: id("wc"), component: "project_results_card", title: r.title[l], text: r.text[l] })),
    },
    {
      _uid: id("n"),
      component: "service_need",
      media: "",
      title: l === "en" ? "🚀 How to start" : "🚀 Як почати",
      cards: START.map((s) => ({ _uid: id("nc"), component: "service_need_card", title: s.title[l], description: doc(s.text[l]) })),
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
