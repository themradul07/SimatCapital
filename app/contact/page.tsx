import type { Metadata } from "next";
import ContactForms from "@/components/contact/ContactForms";

export const metadata: Metadata = {
  title: { absolute: "Contact · Simat Capital" },
  description: "Join the waitlist, make an enquiry or request a demo.",
};

/** Brief, Section 10. No email address, phone number or postal address is shown anywhere. */
export default function Contact() {
  return (
    <section className="pt-[160px] pb-28 md:pt-[200px]">
      <div className="wrap">
        <h1 className="h1 fade-in">Get in touch.</h1>
        <p className="lead fade-in mt-6 !text-[var(--text-secondary)]" style={{ ["--d" as string]: "120ms" }}>
          Choose how you would like to hear from us. Eesaa replies personally.
        </p>
        <div className="fade-in mt-14" style={{ ["--d" as string]: "220ms" }}>
          <ContactForms />
        </div>
      </div>
    </section>
  );
}
