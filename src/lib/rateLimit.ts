const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

// In-memory, so it only limits requests landing on the same warm serverless
// instance — on Vercel that still meaningfully throttles a single visitor or
// simple script hammering the endpoint, but it isn't a shared store, so it
// can't fully stop a distributed abuse campaign spread across many instances.
// A proper fix for that would need Redis/Upstash; this is a reasonable first
// line of defense without adding a paid external dependency.
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Bound memory: drop any key that's had no activity in the current window.
  if (hits.size > 5000) {
    for (const [k, timestamps] of hits) {
      if (timestamps.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_REQUESTS;
}
