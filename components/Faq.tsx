import Reveal from "./Reveal";

export type QA = { q: string; a: string };

export default function Faq({ items }: { items: QA[] }) {
  return (
    <Reveal className="faq border-t" style={{ borderColor: "var(--line)" }}>
      {items.map((it) => (
        <details key={it.q}>
          <summary>
            {it.q}
            <span className="plus" aria-hidden />
          </summary>
          <p className="answer">{it.a}</p>
        </details>
      ))}
    </Reveal>
  );
}

export const faqCore: QA[] = [
  {
    q: "Is Simat Capital Shariah-compliant?",
    a: "Shariah-compliant by method. Every stock is screened using the MSCI Islamic method, by code, before it can be proposed, and re-screened when companies publish new results. We do not claim certification. A Shariah adviser will rule on disputed cases.",
  },
  {
    q: "Does AI make the investment decisions?",
    a: "No. AI researches and proposes. Code decides what is allowed. A person, our founder and CIO, approves every investment decision. No agent can place an order, change a limit or approve anything.",
  },
  {
    q: "Can I invest today?",
    a: "Not yet. Simat Capital is in a paper trading phase and manages no outside capital. If you would like to hear when that changes, sign up to stay informed.",
  },
  {
    q: "How do you handle impure income?",
    a: "Impure income is calculated and recorded for every holding, so it can be purified, which means given away to charity.",
  },
  {
    q: "What happens if something goes wrong?",
    a: "A failed or missing check stops the trade; it is never assumed to pass. Our records are matched to the broker's every night. A kill switch stops new orders immediately and never sells a holding by itself.",
  },
  {
    q: "How do you protect my information?",
    a: "Private sign-in with passkeys, restricted access, and a locked audit copy of every record.",
  },
];
