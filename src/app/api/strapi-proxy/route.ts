import { NextRequest, NextResponse } from "next/server";

const STRAPI_BASE = process.env.STRAPI_API; 
// Example: http://localhost:1337/api/

const TOKEN = process.env.STRAPI_API_AUTH_TOKEN;

export async function GET(req: NextRequest) {
  return handle(req);
}
export async function POST(req: NextRequest) {
  return handle(req);
}
export async function PUT(req: NextRequest) {
  return handle(req);
}
export async function DELETE(req: NextRequest) {
  return handle(req);
}

async function handle(req: NextRequest) {
  if (!STRAPI_BASE) {
    return NextResponse.json(
      { error: "STRAPI base URL missing" },
      { status: 500 }
    );
  }

  const targetUrl = new URL(req.url);
  // remove "/api/strapi-proxy" from pathname
  const path = targetUrl.pathname.replace("/api/strapi-proxy", "");
  const forwardUrl = `${STRAPI_BASE.replace(/\/$/, "")}${path}${targetUrl.search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");

  // Always inject Strapi token
  if (TOKEN) {
    headers.set("Authorization", `Bearer ${TOKEN}`);
  }

  const body =
    req.method === "GET" || req.method === "HEAD" ? undefined : await req.text();

  const res = await fetch(forwardUrl, {
    method: req.method,
    headers,
    body,
  });

  const contentType = res.headers.get("content-type") || "";

  // Return JSON properly
  if (contentType.includes("application/json")) {
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  }

  // Return non-json response
  const text = await res.text();
  return new NextResponse(text, { status: res.status });
}
