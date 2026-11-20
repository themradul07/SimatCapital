import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Important information",
  description: "Important information about Simat Capital and this website.",
};

/* Brief, Section 12.1. Draft wording pending solicitor review. */
export default function ImportantInformation() {
  return (
    <LegalPage title="Important information">
      <div>
        <p>Simat Capital is a trading name used by Eesaa Simat, based in the United Kingdom. Simat Capital is not yet incorporated as a company.</p>
        <p>
          Simat Capital is not authorised or regulated by the Financial Conduct Authority. It does not manage, hold or accept capital from
          any third party.
        </p>
        <p>
          &ldquo;Flagship Fund&rdquo; and &ldquo;Simat Catalyst&rdquo; are the names of investment strategies run on the founder&apos;s
          own capital. They are not funds open to investors, collective investment schemes or products available to buy.
        </p>
        <p>
          This website is provided for information only. Nothing on it is, or should be read as, an offer, invitation or inducement to
          engage in investment activity, a financial promotion, investment advice or a recommendation to buy, sell or hold any investment.
        </p>
        <p>
          Joining the waitlist is a non-binding expression of interest. It is not an offer, an application or an agreement to invest, and
          it does not reserve any allocation or create any obligation on either side.
        </p>
        <p>
          Any figures, examples or illustrations on this website are for explanation only, do not represent the results of any client
          account and are not a guide to future performance.
        </p>
        <p>
          The value of investments and any income from them can fall as well as rise, and investors may get back less than they invest.
          Past performance is not a reliable indicator of future results. Investment objectives, including the pursuit of alpha, are aims
          and are not guaranteed.
        </p>
        <p>
          Shariah screening is applied using a recognised methodology. It is not a fatwa, certification or guarantee of Shariah
          compliance, and readers should seek their own Shariah guidance.
        </p>
        <p>
          Statements about the future reflect current intentions and may change without notice. This website is not directed at any
          person in any jurisdiction where its publication or availability would be unlawful.
        </p>
        <p>
          S&amp;P 500 is a trademark of S&amp;P Dow Jones Indices LLC. Other index names and methodologies referred to belong to their
          respective owners. Simat Capital is not affiliated with, endorsed by or sponsored by any index provider.
        </p>
      </div>
    </LegalPage>
  );
}
