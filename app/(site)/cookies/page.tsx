import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "The cookies this website uses.",
};

/*
 * Brief, Section 12.6. The site currently sets no non-essential cookies and uses no analytics,
 * so no consent banner is shown. If a non-essential cookie is ever added, list it here and add the
 * banner wording from 12.6 (Accept and Reject equally prominent).
 */
export default function Cookies() {
  return (
    <LegalPage title="Cookie policy">
      <LegalSection title="Our approach">
        <p>
          This website uses strictly necessary cookies only. We do not use advertising or tracking cookies, and any analytics we use are
          cookieless, so no consent banner is needed.
        </p>
      </LegalSection>
      <LegalSection title="Cookies in use">
        <div className="overflow-x-auto">
          <table className="table min-w-[520px]">
            <thead>
              <tr>
                <th scope="col">Cookie</th>
                <th scope="col">Purpose</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>None at present</td>
                <td>This website does not currently set any cookies.</td>
                <td>None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
