import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { getArticle, getArticles, getCategory } from "@/app/lib/blog";

// Cover image for a blog article: hero image on the page, OG image and Twitter card.
// Pre-rendered at build time for every article.
const size = { width: 1200, height: 630 };
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

const font = (f: string) => fs.readFileSync(path.join(process.cwd(), "public/fonts", f));

// Pupa mark (same shapes as app/icon.svg), drawn as an SVG data URI
const PUPA = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#507A49"/><g transform="translate(7 12) scale(.78)"><path d="M10 47V31c0-3.3 1-6.4 2.6-9l.5-9.6c.1-1.7 2.1-2.5 3.4-1.4l8.2 7.1c4.8-1.6 9.8-1.6 14.6 0l8.2-7.1c1.3-1.1 3.3-.3 3.4 1.4l.5 9.6c1.6 2.6 2.6 5.7 2.6 9v16z" fill="#fff"/></g><circle cx="24.6" cy="38.6" r="6" fill="#3d6b35"/><ellipse cx="25.4" cy="38.6" rx="1.9" ry="4.8" fill="#1d3019"/><circle cx="23.2" cy="36.2" r="1.3" fill="#fff"/><circle cx="39.4" cy="38.6" r="6" fill="#6FA8DC"/><ellipse cx="40.2" cy="38.6" rx="1.9" ry="4.8" fill="#1d3019"/><circle cx="38" cy="36.2" r="1.3" fill="#fff"/><path d="M11 48h42" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/></svg>'
)}`;

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  const cat = a ? getCategory(a.category) : undefined;
  const title = a?.coverTitle || a?.title || "Webrarium";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0b120a 0%, #13210f 55%, #2c4727 100%)",
          color: "#fff",
          fontFamily: "Craftwork",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid #8fbf87",
              color: "#cfe5ca",
              fontSize: 28,
            }}
          >
            {cat?.name || "Блог"}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PUPA} width={120} height={120} alt="" />
        </div>
        <div style={{ display: "flex", fontSize: title.length > 70 ? 56 : 66, fontWeight: 700, lineHeight: 1.12, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, color: "#b9d4b3" }}>
          <span style={{ fontWeight: 700, color: "#fff", fontSize: 34 }}>webrarium</span>
          <span>Автоматизуйте нудне. Розвивайте решту.</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Craftwork", data: font("CraftworkGrotesk-Regular.woff"), weight: 400, style: "normal" },
        { name: "Craftwork", data: font("CraftworkGrotesk-Bold.woff"), weight: 700, style: "normal" },
      ],
    }
  );
}
