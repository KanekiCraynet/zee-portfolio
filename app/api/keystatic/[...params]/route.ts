import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ params: string[] }> };
type RouteHandler = {
  GET: (request: NextRequest, context: RouteContext) => Promise<Response> | Response;
  POST: (request: NextRequest, context: RouteContext) => Promise<Response> | Response;
};

let handler: RouteHandler | null = null;

async function getHandler() {
  if (handler) return handler;
  if (
    !process.env.KEYSTATIC_GITHUB_CLIENT_ID ||
    !process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ||
    !process.env.KEYSTATIC_SECRET
  ) {
    return null;
  }
  const { makeRouteHandler } = await import("@keystatic/next/route-handler");
  const { default: keystaticConfig } = await import("@/keystatic.config");
  handler = makeRouteHandler({ config: keystaticConfig });
  return handler;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const h = await getHandler();
  if (!h)
    return NextResponse.json({ error: "CMS not configured" }, { status: 503 });
  return h.GET(request, context);
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  const h = await getHandler();
  if (!h)
    return NextResponse.json({ error: "CMS not configured" }, { status: 503 });
  return h.POST(request, context);
}
