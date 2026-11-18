import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up for updates from Simat Capital. This is not an investment account.",
};

export default function SignUp() {
  return (
    <section className="relative overflow-hidden pt-[150px] pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="wrap relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div>
          <span className="eyebrow fade-in">Sign up</span>
          <h1 className="h2 mt-6 fade-in" style={{ ["--d" as string]: "120ms" }}>
            Follow Simat Capital <span className="italic-gold">as it is built.</span>
          </h1>
          <div
            className="mt-8 rounded-2xl border p-6 fade-in"
            style={{ ["--d" as string]: "240ms", borderColor: "rgba(214,180,106,0.4)", background: "var(--gold-wash)" }}
          >
            <p className="font-semibold" style={{ color: "var(--cream)" }}>What you are signing up for</p>
            <p className="mt-2 muted">
              Email updates, and access to the demo if you ask for it. This is not an investment account. No money is taken, and
              Simat Capital does not manage outside capital today.
            </p>
          </div>
          <p className="mt-8 text-[15px] muted fade-in" style={{ ["--d" as string]: "360ms" }}>
            Representing a family office or institution?{" "}
            <Link href="/institutions#briefing" className="link-gold">Request the investor briefing</Link> instead.
          </p>
        </div>
        <Reveal delay={200}>
          <LeadForm variant="sign-up" />
        </Reveal>
      </div>
    </section>
  );
}
