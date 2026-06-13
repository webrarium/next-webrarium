#!/usr/bin/env node
/**
 * storyblok-push.js
 * Пушить змінені JSON файли з content/ назад у Storyblok
 * Запуск: node storyblok-push.js [filename.json]
 *   без аргументів — оновлює всі файли
 *   з аргументом — оновлює один файл, напр: node storyblok-push.js home.json
 */

const fs = require("fs");
const path = require("path");

const TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN || "sb_pat_u6Ug6Ut7NRAxn8YtVOfxxNaxCfgtc8wUms7R4hSFul8";
const CONTENT_DIR = path.join(__dirname, "content");

async function api(method, endpoint, body) {
  const res = await fetch(`https://mapi.storyblok.com/v1/${endpoint}`, {
    method,
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  return res.json();
}

async function pushStory(spaceId, filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const story = JSON.parse(raw);

  console.log(`⬆️  Оновлюю: ${path.basename(filePath)} (ID: ${story.id})`);

  await api("PUT", `spaces/${spaceId}/stories/${story.id}`, {
    story: {
      name: story.name,
      slug: story.slug,
      content: story.content,
      is_startpage: story.is_startpage,
    },
    publish: 1, // одразу публікуємо
  });

  console.log(`   ✅ Оновлено і опубліковано`);
}

async function main() {
  const spaceFile = path.join(CONTENT_DIR, "_space.json");
  if (!fs.existsSync(spaceFile)) {
    throw new Error('Спочатку запусти "node storyblok-pull.js"');
  }

  const { space_id, space_name } = JSON.parse(fs.readFileSync(spaceFile, "utf8"));
  console.log(`🚀 Space: "${space_name}" (ID: ${space_id})\n`);

  const targetFile = process.argv[2];

  if (targetFile) {
    // Один файл
    const filePath = path.join(CONTENT_DIR, targetFile);
    if (!fs.existsSync(filePath)) throw new Error(`Файл не знайдено: ${filePath}`);
    await pushStory(space_id, filePath);
  } else {
    // Всі файли
    const files = fs.readdirSync(CONTENT_DIR).filter(
      (f) => f.endsWith(".json") && f !== "_space.json"
    );
    console.log(`Оновлюю ${files.length} stories...\n`);
    for (const file of files) {
      await pushStory(space_id, path.join(CONTENT_DIR, file));
    }
  }

  console.log("\n✅ Готово! Зміни опубліковані на webrarium.com");
}

main().catch((err) => {
  console.error("❌ Помилка:", err.message);
  process.exit(1);
});
