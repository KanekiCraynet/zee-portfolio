import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "xenzee.site";
const LEGACY_MARKETING_PARAMS = new Set(["MA", "ND", "SA"]);

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let shouldRedirect = false;

  if (url.hostname === "www.xenzee.site") {
    url.hostname = CANONICAL_HOST;
    shouldRedirect = true;
  }

  for (const param of LEGACY_MARKETING_PARAMS) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      shouldRedirect = true;
    }
  }

  if (url.pathname.startsWith("/projects/")) {
    url.pathname = "/";
    url.hash = "projects";
    url.search = "";
    shouldRedirect = true;
  }

  if (url.pathname === "/blog/building-scalable-rails-applications") {
    url.pathname = "/blog";
    url.search = "";
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image).*)"],
};
