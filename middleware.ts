import { i18nRouter } from "next-i18n-router";
import { i18nConfig } from "./i18nConfig";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // The blog is Ukrainian-only: serve /blog/* from the uk locale regardless of the
  // language cookie (otherwise the router would bounce English visitors to /en/blog).
  const { pathname } = request.nextUrl;
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    const url = request.nextUrl.clone();
    url.pathname = `/uk${pathname}`;
    return NextResponse.rewrite(url);
  }
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
