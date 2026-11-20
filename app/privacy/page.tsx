import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Simat Capital uses the personal data you share through this website.",
};

/* Brief, Section 12.5. Draft wording pending solicitor review. Replace [date] before launch. */
export default function Privacy() {
  return (
    <LegalPage title="Privacy notice" updated="[date]">
      <LegalSection title="Who we are">
        <p>
          Eesaa Simat, trading as Simat Capital, is the controller of your personal data. To contact us about your data, use the{" "}
          <Link href="/contact#enquiry">enquiry form</Link> on this website.
        </p>
      </LegalSection>
      <LegalSection title="What we collect">
        <p>
          The details you give us through our forms (name, email, organisation, role, country, investor type, strategy of interest, and
          your message), and basic technical data needed to run the website securely.
        </p>
      </LegalSection>
      <LegalSection title="Why, and our lawful basis">
        <p>
          To respond to your request and keep a record of your interest (legitimate interests); to keep the website secure (legitimate
          interests); to meet legal obligations (legal obligation).
        </p>
      </LegalSection>
      <LegalSection title="Who we share it with">
        <p>
          Our website hosting, database and email providers, acting only on our instructions. We do not sell your data or share it for
          marketing.
        </p>
      </LegalSection>
      <LegalSection title="International transfers">
        {/* [Confirm: whether developers or providers outside the UK can access submissions.] */}
        <p>
          Where data is processed outside the UK, we use approved safeguards such as the UK International Data Transfer Agreement or the UK
          Addendum.
        </p>
      </LegalSection>
      <LegalSection title="How long we keep it">
        <p>24 months after our last contact with you, or sooner if you ask.</p>
      </LegalSection>
      <LegalSection title="Your rights">
        <p>
          Access, correction, erasure, restriction, objection and portability. You can also withdraw from the waitlist at any time.
        </p>
      </LegalSection>
      <LegalSection title="Complaints">
        <p>
          You can complain to the Information Commissioner&apos;s Office (
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>
          ).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
