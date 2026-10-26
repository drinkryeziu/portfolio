import { NextResponse } from "next/server";

/* Sends a message from the contact page to Drin's inbox.
   Needs RESEND_API_KEY (resend.com) in the Vercel project's Environment Variables.
   Optional: CONTACT_FROM, e.g. "Portfolio <hello@drinkryeziu.com>" once the domain is verified in Resend.
   Without a key the form falls back to opening the visitor's own mail app. */

export const runtime = "nodejs";

const TO = "drinkryeziu@gmail.com";
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Small in-memory limit per IP (resets when the server restarts); enough to stop casual spam loops.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  const str = (k: string, max: number) => String(body[k] ?? "").trim().slice(0, max);
  const name = str("name", 120);
  const email = str("email", 200);
  const subject = str("subject", 200);
  const message = str("message", 5000);

  // Honeypot: a hidden field people never see. Pretend it worked.
  if (str("company", 200)) return NextResponse.json({ ok: true });

  if (!name || !emailOk(email) || !subject || message.length < 5) {
    return NextResponse.json({ error: "Please fill in your name, a valid email, a subject and a message." }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many messages for now. Please try again later." }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "Email sending isn't set up yet.", fallback: "mailto" }, { status: 503 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [TO],
      reply_to: email,
      subject: `[drinkryeziu.com] ${subject}`,
      text: `${message}\n\n— ${name} <${email}>\nSent from the contact page on drinkryeziu.com`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "The message couldn't be sent right now.", fallback: "mailto" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
