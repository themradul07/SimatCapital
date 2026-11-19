"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Closing band: Stay informed (email only) plus the demo and sign-up calls to action.
 * Submissions are not sent anywhere yet: storage, privacy notice and consent wording
 * are open items 9 and 16.
 */
export default function StayInformed({ id = "stay-informed" }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to the approved endpoint once agreed with the client.
    setDone(true);
  };

  return (
    <section id={id} className="k-section">
      <div className="wrap">
        <div
          className="relative overflow-hidden rounded-[28px] border p-8 sm:p-12"
          style={{ borderColor: "var(--line)", background: "radial-gradient(ellipse at 20% 0%, rgba(214,180,106,0.10), var(--panel) 60%)" }}
        >
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <span className="chip-gold">Our record is being built transparently</span>
              <h2 className="k-title">
                Follow along. <span className="italic-gold">Then decide.</span>
              </h2>
              <p className="max-w-lg muted">
                Occasional updates by email as the platform develops. This is not an investment account and no money is taken.
              </p>

              {done ? (
                <div className="flex max-w-md items-center gap-3 rounded-xl border p-4 text-[14px]" role="status" style={{ borderColor: "var(--gold-hairline)", color: "var(--cream)" }}>
                  <span className="h-2.5 w-2.5 rotate-45" style={{ background: "var(--gold)" }} />
                  Thank you. We will write when there is something worth reading.
                </div>
              ) : (
                <form onSubmit={onSubmit} className="max-w-md space-y-2">
                  <label htmlFor={`${id}-email`} className="sr-only">Email</label>
                  <div
                    className="flex items-center rounded-xl border p-1.5 transition-colors focus-within:border-[var(--gold)]"
                    style={{ borderColor: "var(--line)", background: "var(--bg)" }}
                  >
                    <input
                      id={`${id}-email`}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="w-full bg-transparent px-3 py-2 text-[14px] placeholder:text-[var(--faint)] focus:outline-none"
                      style={{ color: "var(--cream)" }}
                    />
                    <button type="submit" className="btn btn-gold !h-10 shrink-0 !px-5 !text-[13.5px]">
                      Stay informed
                    </button>
                  </div>
                  <p className="text-[12px]" style={{ color: "var(--faint)" }}>
                    We use your email only to send updates. Unsubscribe at any time. <em>Privacy notice to follow.</em>
                  </p>
                </form>
              )}

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-4 text-[14px]">
                <Link href="/demo" className="link-gold">Watch the demo</Link>
                <Link href="/sign-up" className="link-gold">Sign up</Link>
                <Link href="/individuals" className="link-gold">For Individuals</Link>
                <Link href="/institutions" className="link-gold">For Family Offices and Institutions</Link>
              </div>
            </div>

            {/* Envelope with the diamond seal */}
            <div className="flex justify-center lg:col-span-5">
              <div
                className="relative w-full max-w-sm rounded-2xl border p-5 shadow-2xl"
                style={{
                  borderColor: "var(--gold-hairline)",
                  background: "linear-gradient(145deg, var(--panel-2) 0%, var(--gold-tint) 100%)",
                  transform: "rotate(3deg)",
                  animation: "floaty 9s ease-in-out infinite",
                }}
              >
                <div className="relative flex h-48 flex-col justify-between overflow-hidden rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "rgba(6,5,4,0.6)" }}>
                  <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-25">
                    <line x1="0" y1="0" x2="50%" y2="60%" stroke="var(--gold)" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="50%" y2="60%" stroke="var(--gold)" strokeWidth="1" />
                  </svg>
                  <div className="z-10 flex items-center justify-between text-[10px] muted">
                    <span className="uppercase tracking-[0.18em]">Update</span>
                    <span className="font-semibold uppercase tracking-[0.18em] gold">Simat Capital</span>
                  </div>
                  <div className="z-10 my-2 flex justify-center">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full border-2 p-2.5"
                      style={{ borderColor: "var(--gold)", background: "var(--gold-tint)", boxShadow: "0 0 18px rgba(214,180,106,0.35)" }}
                    >
                      <span className="relative h-full w-full">
                        <Image src="/simat-mark.png" alt="" fill sizes="36px" className="object-contain" />
                      </span>
                    </div>
                  </div>
                  <p className="serif z-10 text-center text-[17px]" style={{ color: "var(--cream)" }}>
                    Investing with Purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
