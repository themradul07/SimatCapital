import { NextResponse } from "next/server";

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 15;
}

export async function POST(req: Request) {
  try {
    const ip =
      (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
    }

    const body = (await req.json()) as { rating?: unknown; slide?: unknown };
    const rating = Number(body?.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ ok: false, error: "Invalid rating" }, { status: 400 });
    }

    const slide = typeof body?.slide === "string" ? body.slide.slice(0, 60) : "closing";
    const to = process.env.NOTIFY_EMAIL;
    const key = process.env.RESEND_API_KEY;
    const from = process.env.NOTIFY_FROM;

    if (to && key && from) {
      const subject = `[Demo Feedback] ${rating}/5 stars (${slide})`;
      const text = `Demo feedback received\nRating: ${rating} / 5\nSlide: ${slide}\nTimestamp: ${new Date().toISOString()}`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          subject,
          text,
          html: `<p><strong>Demo Feedback</strong></p><p>Rating: <strong>${rating} / 5</strong></p><p>Slide: ${slide}</p>`,
        }),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: "Upstream email error" }, { status: 502 });
      }
    } else {
      console.info(`[demo-feedback] Rating: ${rating}/5 (slide=${slide})`);
    }

    return NextResponse.json({ ok: true, rating });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
