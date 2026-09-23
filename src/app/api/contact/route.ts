import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rateLimit";
import { COURSES } from "@/lib/courses";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COURSE_TITLES = new Set(COURSES.map((c) => c.title));

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  mobile: 20,
  address: 500,
} as const;

function getClientIp(request: Request): string {
  // Vercel (and most reverse proxies) set this; it's the closest thing to a
  // stable per-visitor key available without requiring auth/cookies. Not
  // spoof-proof against a determined attacker, but sufficient to throttle
  // ordinary spam/abuse.
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.mobile !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.mobile.trim()
  ) {
    return NextResponse.json(
      { error: "Name, email, and mobile are required." },
      { status: 400 },
    );
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const mobile = body.mobile.trim();
  const address = typeof body.address === "string" ? body.address.trim() : "";
  const course = typeof body.course === "string" ? body.course.trim() : "";

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    mobile.length > MAX_LENGTHS.mobile ||
    address.length > MAX_LENGTHS.address
  ) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // An empty course is fine (it's optional in the form) — but a non-empty
  // value that isn't one of the real course names means the request didn't
  // come from the actual form, so it's rejected rather than emailed through.
  if (course && !COURSE_TITLES.has(course)) {
    return NextResponse.json({ error: "Invalid course selection." }, { status: 400 });
  }

  await sendLeadEmail("New contact form submission — Ultra Mobiles", [
    ["Name", name],
    ["Email", email],
    ["Mobile", mobile],
    ["Address", address || "—"],
    ["Interested course", course || "—"],
  ]);

  return NextResponse.json({ ok: true });
}
