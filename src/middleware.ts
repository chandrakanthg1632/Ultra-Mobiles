import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Content-Security-Policy needs to live here rather than in next.config.ts's
// static headers() because the JSON-LD <script> blocks in layout.tsx/page.tsx
// are legitimate inline scripts — allowing inline scripts with a blanket
// 'unsafe-inline' would defeat most of what CSP protects against, so instead
// each request gets its own random nonce, which is threaded through to those
// specific script tags via the x-nonce request header and next/headers().
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  // React's dev mode uses eval() for Fast Refresh/debugging (its own error
  // message says it "will never use eval() in production mode") — so this
  // only loosens script-src for `next dev`, never for a production build.
  const isDev = process.env.NODE_ENV === "development";

  // @vercel/analytics loads its debug build from this external host only in
  // dev mode (that's the source of the "[Vercel Web Analytics] Debug mode..."
  // console messages) — production instead loads the same-origin
  // /_vercel/insights/script.js path, already covered by 'self'.
  const devScriptSrc = isDev ? " https://va.vercel-scripts.com" : "";

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-eval'" : ""}${devScriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    `connect-src 'self'${devScriptSrc}`,
    "frame-src https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    // Every route except static assets and the favicon, which don't render
    // any inline scripts and don't need a nonce.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
