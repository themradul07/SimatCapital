import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Website terms",
  description: "The terms on which you may use this website.",
};

/* Brief, Section 12.7 key clauses. Draft wording pending solicitor review. */
export default function Terms() {
  return (
    <LegalPage title="Website terms">
      <LegalSection title="Who we are">
        <p>The site is operated by Eesaa Simat, trading as Simat Capital.</p>
      </LegalSection>
      <LegalSection title="Information only">
        <p>The content of this website is provided for information only. You should not rely on it in making any decision.</p>
      </LegalSection>
      <LegalSection title="No offer or advice">
        <p>Nothing on this website is an offer, an invitation to invest or investment advice.</p>
      </LegalSection>
      <LegalSection title="Intellectual property">
        <p>The intellectual property in this website and its content belongs to Simat Capital.</p>
      </LegalSection>
      <LegalSection title="Liability">
        <p>To the extent permitted by law, Simat Capital accepts no liability for any loss arising from use of this website.</p>
      </LegalSection>
      <LegalSection title="Third-party links">
        <p>Links to third-party websites are provided for convenience and are not endorsements.</p>
      </LegalSection>
      <LegalSection title="Governing law">
        <p>These terms are governed by the laws of England and Wales.</p>
      </LegalSection>
    </LegalPage>
  );
}
