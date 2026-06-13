#!/usr/bin/env node
/**
 * storyblok-pull.js
 * Завантажує всі stories зі Storyblok у папку content/
 * Запуск: node storyblok-pull.js
 */

const fs = require("fs");
const path = require("path");

const TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN || "sb_pat_u6Ug6Ut7NRAxn8YtVOfxxNaxCfgtc8wUms7R4hSFul8";
const CONTENT_DIR = path.join(__dirname, "content");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(endpoint, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(`https://mapi.storyblok.com/v1/${endpoint}`, {
      headers: { Authorization: TOKEN },
    });
    if (res.status === 429) {
      const wait = 1000 * (i + 1);
      console.log(`   ⏳ Rate limit, чекаю ${wait / 1000}с...`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
    return res.json();
  }
  throw new Error("Rate limit — спробуй ще раз");
}

async function main() {
  // 1. Знайти space
  console.log("🔍 Отримую список spaces...");
  const { spaces } = await api("spaces/");
  if (!spaces?.length) throw new Error("Spaces не знайдено");

  const space = spaces[0];
  console.log(`✅ Space: "${space.name}" (ID: ${space.id})`);

  // 2. Завантажити всі stories
  let page = 1;
  let allStories = [];
  while (true) {
    const { stories, total } = await api(
      `spaces/${space.id}/stories/?per_page=100&page=${page}`
    );
    if (!stories?.length) break;
    allStories = allStories.concat(stories);
    console.log(`   Завантажено ${allStories.length} / ${total} stories`);
    if (allStories.length >= total) break;
    page++;
  }

  // 3. Зберегти у content/
  if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });

  for (const story of allStories) {
    // Отримати повну story з контентом
    const { story: full } = await api(`spaces/${space.id}/stories/${story.id}`);
    const slug = full.full_slug.replace(/\//g, "__") || "home";
    const filePath = path.join(CONTENT_DIR, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(full, null, 2), "utf8");
    console.log(`   📄 Збережено: content/${slug}.json`);
    await sleep(200); // 5 req/s — нижче ліміту
  }

  // Зберегти space id для push скрипта
  fs.writeFileSync(
    path.join(CONTENT_DIR, "_space.json"),
    JSON.stringify({ space_id: space.id, space_name: space.name }, null, 2)
  );

  console.log(`\n✅ Готово! ${allStories.length} stories у папці content/`);
}

main().catch((err) => {
  console.error("❌ Помилка:", err.message);
  process.exit(1);
});
