import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "xenzee.site";

interface RedirectRule {
  type: "host" | "param" | "path-prefix" | "path-exact";
  from?: string;
  to?: string;
  target?: string;
  hash?: string;
  pattern?: string;
}

const REDIRECTS: RedirectRule[] = [
  { type: "host", from: "www.xenzee.site", to: CANONICAL_HOST },
  { type: "param", pattern: "MA" },
  { type: "param", pattern: "ND" },
  { type: "param", pattern: "SA" },
  { type: "path-exact", target: "/projects", to: "/" },
  { type: "path-exact", target: "/blog/building-scalable-rails-applications", to: "/blog" },
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let shouldRedirect = false;

  for (const rule of REDIRECTS) {
    if (rule.type === "host" && url.hostname === rule.from) {
      url.hostname = rule.to!;
      shouldRedirect = true;
    } else if (rule.type === "param" && url.searchParams.has(rule.pattern!)) {
      url.searchParams.delete(rule.pattern!);
      shouldRedirect = true;
    } else if (rule.type === "path-prefix" && url.pathname.startsWith(rule.target!)) {
      url.pathname = rule.to!;
      url.hash = "projects";
      url.search = "";
      shouldRedirect = true;
    } else if (rule.type === "path-exact" && url.pathname === rule.target!) {
      url.pathname = rule.to!;
      url.search = "";
      shouldRedirect = true;
    }
  }

  if (shouldRedirect) {
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image).*)"],
};
