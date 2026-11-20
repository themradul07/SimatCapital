import type { ReactNode } from "react";

/**
 * Shell for the legal pages. All wording is a draft (brief, Section 12) and must be reviewed by a UK
 * solicitor with financial services experience before the site is public.
 */
export default function LegalPage({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <section className="pt-[160px] pb-28 md:pt-[200px]">
      <div className="wrap max-w-[860px]">
        <h1 className="h1 fade-in">{title}</h1>
        {updated && <p className="mt-4 text-[14px] secondary">Last updated: {updated}</p>}
        <div className="prose-legal fade-in mt-12 space-y-10" style={{ ["--d" as string]: "120ms" }}>
          {children}
        </div>
      </div>
    </section>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t pt-8" style={{ borderColor: "var(--hairline)" }}>
      <h2 className="h3">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
