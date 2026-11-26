"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { submitForm, type FormKind, type FormState } from "@/app/(site)/contact/actions";

const CARDS: { kind: FormKind; title: string; line: string }[] = [
  { kind: "waitlist", title: "Join the waitlist", line: "Register non-binding interest and hear from Eesaa personally." },
  // { kind: "enquiry", title: "Make an enquiry", line: "Ask a question about Simat Capital." },
  // { kind: "demo", title: "Request a demo", line: "The confidential investor overview, with a walkthrough from the founder on request." },
];

const SUCCESS: Record<FormKind, string> = {
  waitlist: "Thank you. You are on the waitlist. Eesaa will be in touch personally.",
  enquiry: "Thank you. Eesaa will reply to you personally.",
  demo: "Thank you. Eesaa will be in touch to arrange a time.",
};
const BUTTON: Record<FormKind, string> = { waitlist: "Join the waitlist", enquiry: "Send enquiry", demo: "Request a demo" };

const INVESTOR_TYPES = ["Family office", "Institution", "Private investor", "Adviser", "Other"];
const STRATEGIES = ["Flagship Fund", "Simat Catalyst", "Both", "Not sure yet"];

const isKind = (h: string): h is FormKind => h === "waitlist";

export default function ContactForms() {
  const [kind, setKind] = useState<FormKind | null>("waitlist");

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1);
      if (isKind(h)) {
        setKind(h);
        document.getElementById("form-panel")?.scrollIntoView({ block: "start" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const choose = (k: FormKind) => {
    setKind(k);
    history.replaceState(null, "", `#${k}`);
  };

  return (
    <div>
      <div className="grid gap-4 max-w-[520px]" role="tablist" aria-label="How would you like to hear from us?">
        {CARDS.map((c) => {
          const on = kind === c.kind;
          return (
            <button
              key={c.kind}
              id={c.kind}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="form-panel"
              onClick={() => choose(c.kind)}
              className="flex scroll-mt-28 flex-col items-start justify-start border p-6 text-left transition-colors duration-300 hover:border-[var(--gold-accent)] md:p-7"
              style={{ borderColor: on ? "var(--gold-accent)" : "var(--hairline)", background: on ? "var(--bg-raised)" : "transparent" }}
            >
              <span className="flex items-center gap-3">
                <span className={`dia ${on ? "" : "dia-outline"}`} aria-hidden />
                <span className="serif text-[24px]" style={{ color: "var(--text-primary)" }}>
                  {c.title}
                </span>
              </span>
              <span className="mt-3 block text-[15px] secondary">{c.line}</span>
            </button>
          );
        })}
      </div>

      <div id="form-panel" role="tabpanel" className="scroll-mt-28" aria-live="polite">
        {kind && <Form key={kind} kind={kind} />}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && (
          <span style={{ color: "var(--gold-accent)" }} aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="error">
          {error}
        </p>
      )}
    </div>
  );
}

function Form({ kind }: { kind: FormKind }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm.bind(null, kind), { status: "idle" });
  const [local, setLocal] = useState<Record<string, string> | null>(null);
  const e = local ?? state.errors ?? {};

  // Validate in the browser first, so a simple mistake never clears what the visitor typed.
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(ev.currentTarget);
    const v = (n: string) => String(fd.get(n) ?? "").trim();
    const errs: Record<string, string> = {};
    if (!v("name")) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) errs.email = "Please enter a valid email address.";
    if (!v("country")) errs.country = "Please complete this field.";
    if (kind !== "enquiry" && !v("investorType")) errs.investorType = "Please complete this field.";
    if (kind === "enquiry" && !v("message")) errs.message = "Please complete this field.";
    if (kind === "waitlist" && !fd.get("confirm")) errs.confirm = "Please confirm you have read the statement above.";
    if (Object.keys(errs).length) {
      ev.preventDefault();
      setLocal(errs);
      ev.currentTarget.querySelector<HTMLElement>("[aria-invalid=true], :invalid")?.focus();
      return;
    }
    setLocal(null);
  };
  const p = (name: string) => ({
    id: `${kind}-${name}`,
    name,
    "aria-invalid": e[name] ? true : undefined,
    "aria-describedby": e[name] ? `${kind}-${name}-error` : undefined,
    className: "input",
  });

  if (state.status === "success") {
    return (
      <div className="fade-in mt-10 border p-10 text-center md:p-14" style={{ borderColor: "var(--line-soft)" }} role="status">
        <span className="dia" aria-hidden />
        <p className="serif mt-6 text-[28px] leading-snug" style={{ color: "var(--text-primary)" }}>
          {SUCCESS[kind]}
        </p>
      </div>
    );
  }

  return (
    <form action={action} onSubmit={onSubmit} noValidate className="fade-in mt-10 space-y-6 border p-6 md:p-10" style={{ borderColor: "var(--line-soft)" }}>
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${kind}-website`}>Website</label>
        <input id={`${kind}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id={`${kind}-name`} label="Name" required error={e.name}>
          <input {...p("name")} autoComplete="name" required />
        </Field>
        <Field id={`${kind}-email`} label="Email" required error={e.email}>
          <input {...p("email")} type="email" autoComplete="email" required />
        </Field>

        {kind !== "waitlist" && (
          <Field id={`${kind}-organisation`} label="Organisation">
            <input {...p("organisation")} autoComplete="organization" />
          </Field>
        )}
        {kind === "demo" && (
          <Field id={`${kind}-role`} label="Role">
            <input {...p("role")} autoComplete="organization-title" />
          </Field>
        )}

        <Field id={`${kind}-country`} label="Country" required error={e.country}>
          <input {...p("country")} autoComplete="country-name" required />
        </Field>

        {kind !== "enquiry" && (
          <Field id={`${kind}-investorType`} label="Investor type" required error={e.investorType}>
            <select {...p("investorType")} defaultValue="" required>
              <option value="" disabled>
                Choose one
              </option>
              {INVESTOR_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        )}

        {kind === "waitlist" && (
          <Field id={`${kind}-strategy`} label="Strategy of interest">
            <select {...p("strategy")} defaultValue="">
              <option value="">Choose one</option>
              {STRATEGIES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        )}
      </div>

      <Field
        id={`${kind}-message`}
        label={kind === "enquiry" ? "Message" : "Message (optional)"}
        required={kind === "enquiry"}
        error={e.message}
      >
        <textarea
          {...p("message")}
          maxLength={1000}
          required={kind === "enquiry"}
          placeholder={kind === "waitlist" ? "Anything you would like Eesaa to know" : undefined}
        />
      </Field>

      {kind === "waitlist" && (
        <div>
          <label className="flex cursor-pointer items-start gap-4">
            <input
              type="checkbox"
              name="confirm"
              value="yes"
              required
              className="mt-1 h-5 w-5 shrink-0 accent-[var(--gold-accent)]"
              aria-invalid={e.confirm ? true : undefined}
              aria-describedby={e.confirm ? "waitlist-confirm-error" : undefined}
            />
            <span className="text-[15px]" style={{ color: "var(--text-primary)" }}>
              I understand this is a non-binding expression of interest. It is not an offer, an application or a commitment to invest, and
              Simat Capital is not accepting capital.
            </span>
          </label>
          {e.confirm && (
            <p id="waitlist-confirm-error" className="error mt-2 pl-9">
              {e.confirm}
            </p>
          )}
        </div>
      )}

      {state.message && (
        <p className="error" role="alert">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-6 pt-2 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[52ch] text-[14px] secondary">
          We will use your details only to respond to your request. We will not add you to a mailing list or share your details for
          marketing. Read our{" "}
          <Link href="/privacy" className="text-link">
            Privacy notice
          </Link>
          .
        </p>
        <button type="submit" className="btn btn-gold" disabled={pending}>
          {BUTTON[kind]}
        </button>
      </div>
    </form>
  );
}
