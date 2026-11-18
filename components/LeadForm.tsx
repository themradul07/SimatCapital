"use client";

import { useState, type FormEvent } from "react";
import Arrow from "./Arrow";

type Variant = "stay-informed" | "briefing" | "demo" | "sign-up";

const copy: Record<Variant, { button: string; done: string }> = {
  "stay-informed": { button: "Stay informed", done: "Thank you. We will write when there is something worth reading." },
  briefing: { button: "Request the investor briefing", done: "Thank you. Your request has been noted and we will be in touch." },
  demo: { button: "Request demo access", done: "Thank you. We will be in touch about access to the demo." },
  "sign-up": { button: "Sign up", done: "Thank you. You are on the list." },
};

/**
 * Lead capture. NOTE: submissions are not sent anywhere yet. Where enquiries go,
 * where emails are stored and the consent wording are open items 9 and 16.
 */
export default function LeadForm({ variant }: { variant: Variant }) {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire to the approved enquiry endpoint once agreed with the client.
    setDone(true);
  };

  if (done) {
    return (
      <div className="card text-center md:p-12" role="status">
        <div className="mx-auto h-5 w-5 rotate-45" style={{ background: "var(--gold)", boxShadow: "0 0 30px var(--gold)" }} />
        <p className="serif mt-6 text-[28px]" style={{ color: "var(--cream)" }}>{copy[variant].done}</p>
      </div>
    );
  }

  const institutional = variant === "briefing";

  return (
    <form onSubmit={onSubmit} className="card space-y-5 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        {(institutional || variant === "demo") && (
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required className="input" autoComplete="name" />
          </div>
        )}
        <div className={`field ${institutional || variant === "demo" ? "" : "md:col-span-2"}`}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="input" autoComplete="email" placeholder="you@example.com" />
        </div>
        {institutional && (
          <>
            <div className="field">
              <label htmlFor="org">Organisation</label>
              <input id="org" name="organisation" required className="input" autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="type">Type</label>
              <select id="type" name="type" className="input" defaultValue="">
                <option value="" disabled>Choose one</option>
                <option>Family office</option>
                <option>Investor group</option>
                <option>Institution</option>
                <option>Adviser</option>
                <option>Other</option>
              </select>
            </div>
          </>
        )}
      </div>

      {variant === "sign-up" && (
        <fieldset className="space-y-3">
          <legend className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] muted">What would you like?</legend>
          {[
            ["updates", "Updates by email as the platform develops"],
            ["demo", "Access to the demo when it is available"],
          ].map(([v, label], i) => (
            <label key={v} className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors hover:border-[var(--gold)]" style={{ borderColor: "var(--line)" }}>
              <input type="checkbox" name="interest" value={v} defaultChecked={i === 0} className="h-4 w-4 accent-[var(--gold)]" />
              <span style={{ color: "var(--cream)" }}>{label}</span>
            </label>
          ))}
        </fieldset>
      )}

      {(institutional || variant === "demo") && (
        <div className="field">
          <label htmlFor="msg">Message (optional)</label>
          <textarea id="msg" name="message" className="input" />
        </div>
      )}

      <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-[12.5px]" style={{ color: "var(--faint)" }}>
          This is not an investment account and no money is taken. We use your details only to reply to you.{" "}
          <em>Privacy notice to follow.</em>
        </p>
        <button type="submit" className="btn btn-gold">
          {copy[variant].button} <Arrow />
        </button>
      </div>
    </form>
  );
}
