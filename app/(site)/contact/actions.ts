"use server";

import { headers } from "next/headers";

/**
 * Brief, Section 10.4. Every submission emails Eesaa. The address lives only in a private server
 * setting (NOTIFY_EMAIL), never in page code. Email is sent through Resend's HTTP API when
 * RESEND_API_KEY is set (NOTIFY_FROM must be a verified sender). No automatic reply goes to the visitor.
 *
 * NOT YET BUILT (needs a database decision): encrypted storage of submissions, CSV export of the
 * waitlist and deletion 24 months after last contact.
 */

export type FormKind = "waitlist" | "enquiry" | "demo";
export type FormState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<string, string>>;
  message?: string;
};

const ERR = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  confirm: "Please confirm you have read the statement above.",
  generic: "Something went wrong. Please try again.",
  required: "Please complete this field.",
};

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  organisation: "Organisation",
  role: "Role",
  country: "Country",
  investorType: "Investor type",
  strategy: "Strategy of interest",
  message: "Message",
  confirm: "Non-binding statement confirmed",
};

const FIELDS: Record<FormKind, string[]> = {
  waitlist: ["name", "email", "country", "investorType", "strategy", "message", "confirm"],
  enquiry: ["name", "email", "organisation", "country", "message"],
  demo: ["name", "email", "organisation", "role", "country", "investorType", "message"],
};
const REQUIRED: Record<FormKind, string[]> = {
  waitlist: ["name", "email", "country", "investorType", "confirm"],
  enquiry: ["name", "email", "country", "message"],
  demo: ["name", "email", "country", "investorType"],
};
const SUBJECT_TAG: Record<FormKind, string> = { waitlist: "Waitlist", enquiry: "Enquiry", demo: "Demo" };

const INVESTOR_TYPES = ["Family office", "Institution", "Private investor", "Adviser", "Other"];
const STRATEGIES = ["Flagship Fund", "Simat Catalyst", "Both", "Not sure yet"];

/* Simple in-memory rate limit: 5 submissions per IP per 10 minutes (per server instance). */
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: FormDataEntryValue | null, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function submitForm(kind: FormKind, _prev: FormState, formData: FormData): Promise<FormState> {
  if (!(kind in FIELDS)) return { status: "error", message: ERR.generic };

  // Honeypot: real visitors never see or fill this field. Pretend success for bots.
  if (clean(formData.get("website"))) return { status: "success" };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { status: "error", message: ERR.generic };

  const data: Record<string, string> = {};
  for (const f of FIELDS[kind]) data[f] = clean(formData.get(f), f === "message" ? 1000 : 200);

  const errors: Record<string, string> = {};
  for (const f of REQUIRED[kind]) {
    if (!data[f]) errors[f] = f === "name" ? ERR.name : f === "email" ? ERR.email : f === "confirm" ? ERR.confirm : ERR.required;
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = ERR.email;
  if (data.investorType && !INVESTOR_TYPES.includes(data.investorType)) errors.investorType = ERR.required;
  if (data.strategy && !STRATEGIES.includes(data.strategy)) data.strategy = "";
  if (Object.keys(errors).length) return { status: "error", errors };

  const subject = `[${SUBJECT_TAG[kind]}] ${data.name} — ${data.country}`;
  const rows = FIELDS[kind]
    .filter((f) => f !== "confirm" || data.confirm)
    .map((f) => [LABELS[f], f === "confirm" ? "Yes" : data[f] || "—"] as const);

  try {
    await notify(subject, rows);
  } catch (e) {
    console.error("[contact] notification failed", e);
    return { status: "error", message: ERR.generic };
  }
  return { status: "success" };
}

async function notify(subject: string, rows: ReadonlyArray<readonly [string, string]>) {
  const to = process.env.NOTIFY_EMAIL;
  const key = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM;

  if (!to || !key || !from) {
    if (process.env.NODE_ENV === "production") throw new Error("Notification email is not configured");
    console.info(`[contact] (email not configured; dev only) ${subject}\n` + rows.map(([k, v]) => `  ${k}: ${v}`).join("\n"));
    return;
  }

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text, html }),
  });
  if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
}
