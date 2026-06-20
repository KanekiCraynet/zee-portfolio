import { APP_NAME, APP_VERSION } from "../../../lib/meta";

export const runtime = "edge";

export async function GET() {
  return Response.json(
    {
      status: "ok",
      service: APP_NAME,
      version: APP_VERSION,
      runtime,
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
