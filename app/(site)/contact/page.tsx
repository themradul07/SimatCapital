import type { Metadata } from "next";
import ContactForms from "@/components/contact/ContactForms";

export const metadata: Metadata = {
  title: { absolute: "Contact · Simat Capital" },
  description: "Join the waitlist for Simat Capital.",
};

/** Brief, Section 10. No email address, phone number or postal address is shown anywhere. */
export default function Contact() {
  return (
    <section className="pt-[160px] pb-28 md:pt-[200px]">
      <div className="wrap">
        <h1 className="h1 fade-in">Join the waitlist.</h1>
        <p className="lead fade-in mt-6 !text-[var(--text-secondary)]" style={{ ["--d" as string]: "120ms" }}>
          Register non-binding interest and hear from Eesaa personally.
        </p>
        <div className="fade-in mt-14" style={{ ["--d" as string]: "220ms" }}>
          <ContactForms />
        </div>
      </div>
    </section>
  );
}
