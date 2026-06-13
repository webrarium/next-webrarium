#!/usr/bin/env node
/**
 * storyblok-upload-image.js
 * Завантажує зображення в Storyblok CDN і оновлює cover у вказаній story
 *
 * Запуск:
 *   node storyblok-upload-image.js <шлях_до_файлу> <slug_story>
 *
 * Приклад:
 *   node storyblok-upload-image.js ebay-cover.png projects__ebay-product-monitoring-system-with-telegram-alerts-and-interactive-dashboard
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

async function uploadAsset(spaceId, filePath) {
  const filename = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  const fileSize = fileBuffer.length;

  // 1. Запросити signed URL для завантаження
  console.log(`📤 Запрошую signed URL для "${filename}"...`);
  const signedRes = await fetch(`https://mapi.storyblok.com/v1/spaces/${spaceId}/assets/`, {
    method: "POST",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filename,
      size: fileSize,
      content_type: filename.endsWith(".png") ? "image/png" : "image/jpeg",
    }),
  });
  if (!signedRes.ok) throw new Error(`Signed URL error: ${await signedRes.text()}`);
  const signed = await signedRes.json();

  // 2. Завантажити файл через FormData на S3
  console.log(`   ⬆️  Завантажую на CDN...`);
  const { FormData, Blob } = await import("node:buffer").catch(() => {
    // Node 18+
    return { FormData: global.FormData, Blob: global.Blob };
  });

  const form = new global.FormData();
  for (const [key, val] of Object.entries(signed.fields)) {
    form.append(key, val);
  }
  form.append("file", new global.Blob([fileBuffer]), filename);

  const uploadRes = await fetch(signed.post_url, {
    method: "POST",
    body: form,
  });
  if (!uploadRes.ok && uploadRes.status !== 204) {
    throw new Error(`Upload error: ${uploadRes.status}`);
  }

  // 3. Підтвердити завантаження
  console.log(`   ✅ Підтверджую asset...`);
  await fetch(`https://mapi.storyblok.com/v1/spaces/${spaceId}/assets/${signed.id}/finish_upload`, {
    method: "POST",
    headers: { Authorization: TOKEN },
  });

  const cdnUrl = signed.pretty_url || `https://a.storyblok.com/f/${spaceId}/${filename}`;
  console.log(`   🌐 CDN URL: ${cdnUrl}`);
  return { id: signed.id, filename: cdnUrl };
}

async function main() {
  const [, , imgArg, storySlug] = process.argv;
  if (!imgArg || !storySlug) {
    console.error("Використання: node storyblok-upload-image.js <файл> <slug>");
    console.error("Приклад: node storyblok-upload-image.js ebay-cover.png projects__ebay-product-monitoring-system-with-telegram-alerts-and-interactive-dashboard");
    process.exit(1);
  }

  const imgPath = path.resolve(__dirname, imgArg);
  if (!fs.existsSync(imgPath)) throw new Error(`Файл не знайдено: ${imgPath}`);

  // Зчитати space id
  const spaceFile = path.join(CONTENT_DIR, "_space.json");
  if (!fs.existsSync(spaceFile)) throw new Error('Спочатку запусти "node storyblok-pull.js"');
  const { space_id } = JSON.parse(fs.readFileSync(spaceFile, "utf8"));

  // Завантажити зображення
  const asset = await uploadAsset(space_id, imgPath);

  // Оновити story
  const storyFile = path.join(CONTENT_DIR, `${storySlug}.json`);
  if (!fs.existsSync(storyFile)) throw new Error(`Story не знайдено: content/${storySlug}.json`);

  const story = JSON.parse(fs.readFileSync(storyFile, "utf8"));

  const assetObj = {
    id: asset.id,
    alt: story.content.title || "",
    name: path.basename(imgArg),
    focus: null,
    title: story.content.title || "",
    source: null,
    filename: asset.filename,
    copyright: null,
    fieldtype: "asset",
    meta_data: {},
  };

  // Встановити cover
  story.content.cover = assetObj;

  // Зберегти JSON локально
  fs.writeFileSync(storyFile, JSON.stringify(story, null, 2), "utf8");
  console.log(`\n💾 Оновлено локальний JSON: content/${storySlug}.json`);

  // Запушити в Storyblok
  console.log(`🚀 Публікую в Storyblok...`);
  await api("PUT", `spaces/${space_id}/stories/${story.id}`, {
    story: {
      name: story.name,
      slug: story.slug,
      content: story.content,
      is_startpage: story.is_startpage,
    },
    publish: 1,
  });

  console.log(`\n✅ Готово! Зображення опубліковано на webrarium.com`);
}

main().catch((err) => {
  console.error("❌ Помилка:", err.message);
  process.exit(1);
});
