import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const preferredRegion = "bom1";
export const dynamic = "force-dynamic";

const LAST_SEEN_KEY = "portfolio:owner:last-seen";
const ONLINE_KEY = "portfolio:owner:online";
const ONLINE_TTL_SECONDS = 75;

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

async function redisCommand<T>(command: string[]) {
  const config = getRedisConfig();
  if (!config) throw new Error("Presence storage is not configured");

  const response = await fetch(`${config.url}/${command.map(encodeURIComponent).join("/")}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}` },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Presence storage request failed");
  const payload = (await response.json()) as { result: T; error?: string };
  if (payload.error) throw new Error(payload.error);
  return payload.result;
}

export async function GET() {
  if (!getRedisConfig()) {
    return NextResponse.json({ online: false, lastSeen: null, configured: false });
  }

  try {
    const [lastSeen, online] = await Promise.all([
      redisCommand<string | null>(["GET", LAST_SEEN_KEY]),
      redisCommand<string | null>(["GET", ONLINE_KEY]),
    ]);

    return NextResponse.json(
      {
        online: online === "1",
        lastSeen: lastSeen ? Number(lastSeen) : null,
        configured: true,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch {
    return NextResponse.json({ online: false, lastSeen: null, configured: false });
  }
}

export async function POST(request: NextRequest) {
  const expectedToken = process.env.PRESENCE_OWNER_TOKEN;
  if (!expectedToken) {
    return NextResponse.json({ error: "Presence is not configured" }, { status: 503 });
  }

  let body: { ownerToken?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.ownerToken || body.ownerToken !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!getRedisConfig()) {
    return NextResponse.json({ error: "Presence storage is not configured" }, { status: 503 });
  }

  try {
    const now = Date.now();
    await Promise.all([
      redisCommand<string>(["SET", LAST_SEEN_KEY, String(now)]),
      redisCommand<string>(["SET", ONLINE_KEY, "1", "EX", String(ONLINE_TTL_SECONDS)]),
    ]);

    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not update presence" }, { status: 502 });
  }
}
