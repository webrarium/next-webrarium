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
    uk: "Вбудовуємо штучний інтелект у ваші процеси: AI-агенти та чат-боти для Telegram, Instagram, Viber і WhatsApp відповідають клієнтам, обробляють заявки й документи та працюють разом з вашою CRM і магазином.",
    en: "We put AI to work inside your processes: AI agents and chatbots for Telegram, Instagram, Viber and WhatsApp that answer customers, process requests and documents, and work with your CRM and online store.",
  },
  metaTitle: {
    uk: "AI-автоматизація бізнесу: AI-агенти та чат-боти | Webrarium",
    en: "AI Automation for Business: AI Agents & Chatbots | Webrarium",
  },
  metaDescription: {
    uk: "Впровадження AI в бізнес: AI-агенти, чат-боти з GPT для Telegram, Instagram і Viber, обробка заявок і документів. Інтеграція з CRM, Shopify та Google Sheets.",
    en: "AI automation for business: AI agents, GPT chatbots for Telegram, Instagram and Viber, request and document processing. Integrated with your CRM, Shopify and Google Sheets.",
  },
  card: {
    uk: "AI-агенти та чат-боти для Telegram, Instagram і Viber: відповідають клієнтам 24/7, кваліфікують заявки й обробляють документи — разом з вашою CRM і магазином.",
    en: "AI agents and chatbots for Telegram, Instagram and Viber: answer customers 24/7, qualify leads and process documents — connected to your CRM and online store.",
  },
} satisfies Record<string, T>;

const WHAT = {
  headline: { uk: "🔍 Що таке AI-автоматизація", en: "🔍 What is AI automation?" },
  text: {
    uk: [
      "AI-автоматизація — це коли рутинну роботу, яка потребує «подумати», виконує штучний інтелект: відповісти клієнту своїми словами, зрозуміти, чого він хоче, витягти дані з листа чи PDF, написати опис товару. Звичайна автоматизація переносить дані за жорсткими правилами, а AI-агент розуміє текст і приймає прості рішення.",
      "Ми не продаємо «окремого чат-бота». Ми вбудовуємо AI у ваші процеси: агент працює у Telegram, Instagram, Viber чи на сайті, бере відповіді з вашої бази знань, створює угоди в CRM, перевіряє статус замовлення і передає складні випадки менеджеру.",
    ],
    en: [
      "AI automation means handing routine work that needs a bit of thinking to artificial intelligence: answering a customer in natural language, understanding what they want, pulling data out of an email or a PDF, writing a product description. Classic automation moves data by fixed rules; an AI agent understands text and makes simple decisions.",
      "We don't sell a standalone chatbot. We build AI into your processes: the agent works in Telegram, Instagram, Viber or on your website, answers from your own knowledge base, creates deals in your CRM, checks order status and hands complex cases over to a manager.",
    ],
  },
};

const USES: { title: T; text: T }[] = [
  {
    title: { uk: "AI-чат-боти в месенджерах", en: "AI chatbots in messengers" },
    text: {
      uk: "Чат-боти для Telegram, Instagram, Viber, WhatsApp і віджет на сайті. Відповідають природною мовою 24/7, розуміють голосові й довільні запитання, а не лише кнопки.",
      en: "Chatbots for Telegram, Instagram, Viber, WhatsApp and a website widget. They answer in natural language 24/7 and understand free-form and voice questions, not only buttons.",
    },
  },
  {
    title: { uk: "Продажі та кваліфікація лідів", en: "Sales and lead qualification" },
    text: {
      uk: "AI-агент уточнює потребу, бюджет і терміни, підбирає товар чи послугу, записує на дзвінок і створює угоду в CRM з усім контекстом розмови.",
      en: "The AI agent clarifies needs, budget and timing, recommends a product or service, books a call and creates a deal in your CRM with the full conversation context.",
    },
  },
  {
    title: { uk: "Підтримка клієнтів 24/7", en: "24/7 customer support" },
    text: {
      uk: "Статус замовлення, трекінг Нової пошти, повернення, типові запитання — бот відповідає з вашої бази знань і передає менеджеру лише те, що справді потребує людини.",
      en: "Order status, Nova Poshta tracking, returns, typical questions — the bot answers from your knowledge base and passes on only what really needs a human.",
    },
  },
  {
    title: { uk: "Обробка заявок і листів", en: "Request and email processing" },
    text: {
      uk: "AI читає вхідні заявки, листи й повідомлення, визначає тип і пріоритет, витягує контакти й деталі та розносить їх у CRM, Google Sheets чи таск-трекер.",
      en: "AI reads incoming requests, emails and messages, sets type and priority, extracts contacts and details and routes them to your CRM, Google Sheets or task tracker.",
    },
  },
  {
    title: { uk: "Документи та дані", en: "Documents and data" },
    text: {
      uk: "Рахунки, накладні, договори, прайси від постачальників: AI розпізнає PDF і скани, перевіряє дані та заносить їх у таблиці чи облікову систему без ручного копіювання.",
      en: "Invoices, delivery notes, contracts, supplier price lists: AI reads PDFs and scans, checks the data and puts it into spreadsheets or your accounting system with no copy-pasting.",
    },
  },
  {
    title: { uk: "Контент для інтернет-магазину", en: "Content for online stores" },
    text: {
      uk: "Описи товарів, переклади, SEO-тексти та відповіді на відгуки для Shopify чи WooCommerce — пачками, у вашому стилі, з перевіркою перед публікацією.",
      en: "Product descriptions, translations, SEO copy and review replies for Shopify or WooCommerce — in batches, in your brand voice, reviewed before publishing.",
    },
  },
];

const STEPS: { title: T; text: T }[] = [
  {
    title: { uk: "Знаходимо нудне", en: "Spot the boring" },
    text: {
      uk: "Розбираємо ваші процеси та рахуємо, де команда втрачає години: однакові відповіді, ручне перенесення заявок, документи. Обираємо задачі, де AI окупиться найшвидше.",
      en: "We go through your processes and count where the team loses hours: repetitive answers, manual data entry, documents. We pick the tasks where AI pays off fastest.",
    },
  },
  {
    title: { uk: "Проєктуємо сценарій", en: "Map the flow" },
    text: {
      uk: "Описуємо, що робить AI, а що людина, звідки агент бере знання, з якими сервісами інтегрується і як виглядає передача менеджеру. Обираємо модель під задачу і бюджет.",
      en: "We define what AI does and what a person does, where the agent gets its knowledge, which services it connects to and how hand-over to a manager works. We choose the model for the task and budget.",
    },
  },
  {
    title: { uk: "Розробляємо та інтегруємо", en: "Build and integrate" },
    text: {
      uk: "Збираємо агента чи бота, підключаємо вашу базу знань, CRM, магазин, Google Sheets, Нову пошту чи Monobank. Тестуємо на реальних діалогах і документах.",
      en: "We build the agent or bot and connect your knowledge base, CRM, store, Google Sheets, Nova Poshta or Monobank. We test it on real conversations and documents.",
    },
  },
  {
    title: { uk: "Запускаємо і вдосконалюємо", en: "Launch and improve" },
    text: {
      uk: "Після запуску стежимо за якістю відповідей і витратами, доповнюємо базу знань і покращуємо сценарії. Ви бачите, скільки звернень і годин закриває AI.",
      en: "After launch we monitor answer quality and costs, extend the knowledge base and improve the flows. You see how many requests and hours AI takes off your team.",
    },
  },
];

const RESULTS: { title: T; text: T }[] = [
  { title: { uk: "🧠 Знає ваш бізнес", en: "🧠 Knows your business" }, text: { uk: "відповідає з вашої бази знань, а не загальними фразами", en: "answers from your knowledge base, not with generic phrases" } },
  { title: { uk: "🔗 Працює з вашими сервісами", en: "🔗 Works with your tools" }, text: { uk: "CRM, Shopify, Google Sheets, Нова пошта, Monobank", en: "CRM, Shopify, Google Sheets, Nova Poshta, Monobank" } },
  { title: { uk: "💬 Усі канали", en: "💬 Every channel" }, text: { uk: "Telegram, Instagram, Viber, WhatsApp і сайт", en: "Telegram, Instagram, Viber, WhatsApp and your website" } },
  { title: { uk: "👤 Людина в процесі", en: "👤 Human in the loop" }, text: { uk: "складні випадки бот передає менеджеру з усім контекстом", en: "complex cases go to a manager with full context" } },
  { title: { uk: "🇺🇦 Українською та англійською", en: "🌍 Ukrainian, English and more" }, text: { uk: "і іншими мовами, якими пишуть ваші клієнти", en: "and any other language your customers write in" } },
  { title: { uk: "📊 Прозорі результати", en: "📊 Clear results" }, text: { uk: "скільки звернень оброблено і скільки годин заощаджено", en: "how many requests were handled and hours saved" } },
  { title: { uk: "💸 Передбачувані витрати", en: "💸 Predictable costs" }, text: { uk: "заздалегідь рахуємо вартість AI-запитів на місяць", en: "we estimate monthly AI usage costs up front" } },
  { title: { uk: "🛠 Підтримка", en: "🛠 Ongoing support" }, text: { uk: "доповнюємо знання і вдосконалюємо агента після запуску", en: "we keep improving the agent after launch" } },
];

const TOOLS: { title: T; list: T; logos: { filename: string; alt: string }[] }[] = [
  {
    title: { uk: "AI-моделі та платформи", en: "AI models and platforms" },
    list: {
      uk: "OpenAI (GPT), Claude, Gemini, Dialogflow; бази знань і RAG для відповідей з ваших документів",
      en: "OpenAI (GPT), Claude, Gemini, Dialogflow; knowledge bases and RAG for answers from your own documents",
    },
    logos: [logo("1180x320/f23ca2dea4/openai-logo.webp", "OpenAI logo"), logo("353x116/396506bec2/dialogflow.webp", "Dialogflow logo")],
  },
  {
    title: { uk: "Автоматизація та код", en: "Automation and code" },
    list: {
      uk: "n8n, Make, Zapier для зв'язків між сервісами; Python і JavaScript для складних інтеграцій",
      en: "n8n, Make and Zapier to connect services; Python and JavaScript for complex integrations",
    },
    logos: [logo("519x154/34bdc0b722/python_logo.svg", "Python logo"), logo("150x150/d34a92bbd4/js_logo.svg", "JavaScript logo")],
  },
  {
    title: { uk: "Канали", en: "Channels" },
    list: {
      uk: "Telegram, Instagram, Viber, WhatsApp, Messenger, віджет на сайті",
      en: "Telegram, Instagram, Viber, WhatsApp, Messenger, website widget",
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
    q: { uk: "Чим AI-автоматизація відрізняється від звичайної?", en: "How is AI automation different from regular automation?" },
    a: {
      uk: "Звичайна автоматизація (Make, Zapier, n8n) переносить дані за чіткими правилами: «якщо прийшла оплата — створи ТТН». AI додається там, де потрібно зрозуміти текст: відповісти клієнту, розібрати лист, витягти дані з документа. Найчастіше ми поєднуємо обидва підходи.",
      en: "Regular automation (Make, Zapier, n8n) moves data by fixed rules: “when a payment arrives, create a shipment”. AI is added where text needs to be understood: answering a customer, sorting an email, extracting data from a document. We usually combine both.",
    },
  },
  {
    q: { uk: "У яких месенджерах може працювати AI-чат-бот?", en: "Which messengers can the AI chatbot work in?" },
    a: {
      uk: "Telegram, Instagram, Viber, WhatsApp, Facebook Messenger, а також віджет на вашому сайті. Один агент може працювати в кількох каналах одночасно з однією базою знань.",
      en: "Telegram, Instagram, Viber, WhatsApp, Facebook Messenger and a widget on your website. One agent can work across several channels at once with a single knowledge base.",
    },
  },
  {
    q: { uk: "Чи не вигадуватиме бот відповіді?", en: "Won't the bot make things up?" },
    a: {
      uk: "Ми обмежуємо агента вашою базою знань і правилами: якщо відповіді немає, він чесно каже про це і передає розмову менеджеру. Перед запуском тестуємо його на реальних запитаннях клієнтів.",
      en: "We limit the agent to your knowledge base and rules: if there's no answer, it says so and hands the conversation to a manager. Before launch we test it on real customer questions.",
    },
  },
  {
    q: { uk: "Скільки коштує AI-автоматизація?", en: "How much does AI automation cost?" },
    a: {
      uk: "Вартість залежить від кількості сценаріїв та інтеграцій. Окремо є щомісячна плата за використання AI-моделі — ми рахуємо її заздалегідь за вашими обсягами, зазвичай це менше, ніж година роботи менеджера на день.",
      en: "The price depends on the number of flows and integrations. There's also a monthly AI usage fee — we estimate it up front from your volumes; it's usually less than one hour of a manager's time per day.",
    },
  },
  {
    q: { uk: "Скільки часу займає запуск?", en: "How long does it take to launch?" },
    a: {
      uk: "Простий AI-чат-бот з базою знань — від 1–2 тижнів. Агент з інтеграціями в CRM, магазин і доставку — зазвичай 3–6 тижнів, залежно від кількості сервісів.",
      en: "A simple AI chatbot with a knowledge base takes from 1–2 weeks. An agent integrated with your CRM, store and delivery usually takes 3–6 weeks, depending on the number of services.",
    },
  },
  {
    q: { uk: "Чи безпечно передавати дані в AI?", en: "Is it safe to give our data to AI?" },
    a: {
      uk: "Ми використовуємо бізнес-API моделей, де ваші дані не йдуть на навчання, передаємо AI лише потрібне для задачі і зберігаємо доступи на вашій стороні. За потреби можна використати модель, розгорнуту на вашому сервері.",
      en: "We use business APIs where your data isn't used for training, pass AI only what the task needs and keep access on your side. If needed, a model hosted on your own server is an option.",
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
      title: l === "en" ? "🧩 What we automate with AI" : "🧩 Що ми автоматизуємо за допомогою AI",
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
      title: l === "en" ? "⚙️ How we implement AI automation" : "⚙️ Як ми впроваджуємо AI-автоматизацію",
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
      title: l === "en" ? "Tools we use" : "Інструменти, з якими працюємо",
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
      title: l === "en" ? "FAQ: AI automation and chatbots" : "FAQ: AI-автоматизація та чат-боти",
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
