/**
 * Investor demo copy (brief, Section B · "Demo content, screen by screen").
 * Copy is final: do not paraphrase. Everything here is illustrative.
 * Language rules (brief, 14): no "code", "AI agents", "passkey"; alpha is an objective, never a promise.
 * Not in this demo by design: fees, terms, return targets, projections, a Shariah adviser, Simat Technologies.
 */

/** The brief's four-colour system: emerald = opportunity, coral = risk, blue = market, gold = brand. */
export const C = {
  gold: "var(--gold-accent)",
  em: "#3ccb8f",
  co: "#ff8a73",
  bl: "#6ea8ff",
} as const;

/**
 * Screens 4 (Track record), 5 (The competition) and 18 (Factsheet) stay hidden until legal sign-off
 * (brief, B: "Build them behind a switch, off by default"). Turn them on only after sign-off by setting
 * NEXT_PUBLIC_DEMO_LEGAL_SCREENS=on at build time.
 */
export const LEGAL_SCREENS = process.env.NEXT_PUBLIC_DEMO_LEGAL_SCREENS === "on";

export interface ChapterMeta {
  id: string;
  n: string;
  short: string;
  eyebrow: string;
  question?: string;
  headline: string;
  body?: string;
  accent: string;
  /** Hidden until legal sign-off. */
  gated?: boolean;
}

const ALL_CHAPTERS: Omit<ChapterMeta, "n">[] = [
  {
    id: "beliefs",
    short: "Our beliefs",
    eyebrow: "Our beliefs",
    question: "If a share passes a Shariah screen, is it a good investment?",
    headline: "Compliant is the start, not the finish.",
    accent: C.gold,
  },
  {
    id: "problems",
    short: "The problems we solve",
    eyebrow: "The problems we solve",
    question: "Would you know if a holding stopped being compliant tomorrow?",
    headline: "Three gaps in Shariah investing.",
    accent: C.co,
  },
  {
    id: "why-hard",
    short: "Why Shariah is hard",
    eyebrow: "Why Shariah is hard",
    question: "What happens to a compliant company that takes on new debt?",
    headline: "Shariah compliance is not a one-time label.",
    body: "A company's status can change with every set of results: new borrowing, a shift in cash holdings or a new source of revenue.",
    accent: C.bl,
  },
  {
    id: "track-record",
    short: "Track record",
    eyebrow: "Track record",
    headline: "Our record, stated plainly.",
    body: "Every figure calculated by the system from broker records.",
    accent: C.gold,
    gated: true,
  },
  {
    id: "competition",
    short: "The competition",
    eyebrow: "A fair question",
    question: "Why not simply buy a Shariah ETF?",
    headline: "ETFs are not bad. They make different trade-offs.",
    accent: C.bl,
    gated: true,
  },
  {
    id: "engine",
    short: "The Simat engine",
    eyebrow: "The Simat engine",
    question: "How many filings, results and market events could one analyst read in a day?",
    headline: "Machine-scale research. Human judgement.",
    body: "Specialised research models monitor, analyse and test every idea. Systematic controls must pass. The Chief Investment Officer makes every decision.",
    accent: C.gold,
  },
  {
    id: "edge",
    short: "How we find alpha",
    eyebrow: "Our edge",
    question: "Why own only what everyone else already owns?",
    headline: "Alpha where others are not looking.",
    accent: C.em,
  },
  {
    id: "portfolio",
    short: "Building the portfolio",
    eyebrow: "Portfolio construction",
    question: "How large should one idea be allowed to become?",
    headline: "Concentrated by conviction. Limited by design.",
    body: "Each position is sized by conviction, valuation, liquidity and risk, inside hard limits that apply to every trade.",
    accent: C.bl,
  },
  {
    id: "downside",
    short: "The downside",
    eyebrow: "The downside",
    question: "What happens when markets fall?",
    headline: "We plan for the bad days first.",
    accent: C.co,
  },
  {
    id: "shariah-in-action",
    short: "Shariah in action",
    eyebrow: "Shariah in action",
    question: "What should happen the day a holding's status changes?",
    headline: "A real case, step by step.",
    accent: C.em,
  },
  {
    id: "transparency",
    short: "What you receive",
    eyebrow: "Transparency",
    question: "When did a manager last show you the ideas they rejected?",
    headline: "Transparency, by default.",
    accent: C.gold,
  },
  {
    id: "governance",
    short: "Governance",
    eyebrow: "Governance",
    question: "Who is accountable for each decision?",
    headline: "Clear ownership of every decision.",
    accent: C.bl,
  },
  {
    id: "risks",
    short: "Risks",
    eyebrow: "Risks",
    question: "What could go wrong, and what do we do about it?",
    headline: "Risks, stated plainly.",
    accent: C.co,
  },
  {
    id: "factsheet",
    short: "Factsheet",
    eyebrow: "Factsheet",
    // [Confirm] The brief gives no headline for Screen 18.
    headline: "The Flagship strategy, on one page.",
    accent: C.gold,
    gated: true,
  },
  {
    id: "measure",
    short: "How we measure",
    eyebrow: "How we measure",
    headline: "What we measure, and what is illustrative.",
    accent: C.gold,
  },
  {
    id: "next-step",
    short: "Next step",
    eyebrow: "Next step",
    headline: "Register your interest.",
    body: "Simat Capital does not accept external capital today. To stay close to what we are building, join the waitlist or send an enquiry. Eesaa replies personally.",
    accent: C.gold,
  },
];

/** The screens shown, numbered in order. Gated screens drop out until legal sign-off. */
export const CHAPTERS: ChapterMeta[] = ALL_CHAPTERS.filter((c) => LEGAL_SCREENS || !c.gated).map((c, i) => ({
  ...c,
  n: String(i + 1).padStart(2, "0"),
}));

export const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;

/* ------------------------------ intro ------------------------------ */
export const NOTICE =
  "This demonstration is confidential and provided for information only. All figures are illustrative. It is not an offer, advice or a record of results, and it cannot place orders.";

export const DISCLAIMER =
  "Illustrative only · Not an offer or investment advice · Simat Capital is not authorised by the FCA and does not accept external capital yet.";

export const MARK_LABELS = ["Researched", "Screened", "Approved", "Recorded"] as const;

/* ------------------------------ 01 beliefs ------------------------------ */
export const BELIEFS = [
  { title: "Compliance is a filter, not a strategy.", body: "Screens tell us what we may own. Research tells us what is worth owning.", color: C.em },
  { title: "Alpha lives where few are looking.", body: "Under-researched companies reward original work.", color: C.em },
  { title: "Price matters.", body: "A great company bought at the wrong price is a poor investment.", color: C.bl },
  { title: "Every decision is owned by a person.", body: "Technology researches and tests. The CIO decides.", color: C.gold },
];

/* ------------------------------ 02 problems ------------------------------ */
export const PROBLEMS = [
  {
    gap: "Compliance checked too rarely.",
    gapBody: "Many products re-screen only at scheduled index reviews.",
    answer: "We re-screen on every new filing.",
  },
  {
    gap: "Concentration hidden in passive exposure.",
    gapBody: "Index weights can leave a portfolio heavily exposed to a few large companies.",
    answer: "Hard position and sector limits, tested before every trade.",
  },
  {
    gap: "Purification left to the investor.",
    gapBody: "Impure income is often left for investors to work out.",
    answer: "Calculated and recorded for every holding.",
  },
];

/* ------------------------------ 03 why hard ------------------------------ */
export const DEBT_LIMIT = 33.33;
export const QUARTERS = [
  { q: "Q1", debt: 24, status: "Compliant", note: "Debt 24% of total assets. Well inside the limit." },
  { q: "Q2", debt: 29, status: "Compliant", note: "New borrowing lifts debt to 29%. Still compliant, now closer to the line." },
  { q: "Q3", debt: 35, status: "Breach", note: "Results show debt at 35% of assets. The holding no longer passes." },
  { q: "Q4", debt: 35, status: "Exited", note: "Exited under the method's rules. The decision and its reasons are recorded." },
] as const;

/* ------------------------------ 04 engine ------------------------------ */
export const ENGINE = [
  { name: "Signals", line: "Filings, results, prices and events across the UK, US and Japan.", color: C.bl },
  { name: "Research", line: "Builds and updates the thesis for each company.", color: C.gold },
  { name: "Valuation", line: "Fair-value ranges and scenarios.", color: C.em },
  { name: "Risk", line: "Exposure, drawdown, liquidity and the bear case.", color: C.co },
  { name: "Shariah", line: "Screens, monitors and calculates purification.", color: C.em },
  { name: "Investment committee", line: "Argues both sides and records dissent.", color: C.gold },
  { name: "CIO", line: "Approves or rejects, with reasons recorded.", color: C.gold },
];

export const ENGINE_FEED = [
  "Half-year results filed: Calderwick, UK industrial",
  "Thesis updated: margin recovery on track",
  "Fair-value range revised: base case unchanged",
  "Bear case refreshed: exposure within limits",
  "Re-screened after filing: passes all four screens",
  "Both sides argued: one dissent recorded",
  "Proposal approved by the CIO: reasons recorded",
];

/* ------------------------------ 05 edge ------------------------------ */
export const GLOBE_LABEL = "Research universe: UK · US · Japan";
export const PLAYBOOK = [
  { t: "Under-researched", b: "Small and mid-sized companies with light analyst coverage.", color: C.em },
  { t: "Variant perception", b: "Every thesis states what the market is missing.", color: C.bl },
  { t: "Catalysts", b: "Results, re-ratings and events that can close the gap.", color: C.em },
  { t: "Discipline", b: "A fair-value range set before buying; cash held when ideas are scarce.", color: C.gold },
];

/* ------------------------------ 06 portfolio ------------------------------ */
export const IDEAS = [
  // Illustrative companies. sector = [room already used, added per conviction step]; liq = exit time per step.
  // Each limit is shown as a share of its ceiling (1 = at the limit). No percentages are shown on screen.
  { name: "Calderwick", desc: "UK industrial · mid cap", sector: [0.3, 0.08], liq: 0.1 },
  { name: "Meridian Health", desc: "US healthcare · mid cap", sector: [0.72, 0.1], liq: 0.12 },
  { name: "Aster Robotics", desc: "Japan · small cap", sector: [0.4, 0.07], liq: 0.26 },
];
export const CONVICTION = ["Watch", "Low", "Moderate", "High", "Highest"];
export const LIMITS = ["Single position", "Sector", "Liquidity", "Cash"] as const;

/* ------------------------------ 07 downside ------------------------------ */
export const DOWNSIDE_POINTS = [
  "A written bear case before every decision.",
  "Stress tests against past market shocks before any trade.",
  "Drawdown limits that trigger a review.",
  "Cash held as a defence when conviction is low.",
];

export const SHOCKS = [
  { name: "2008 credit crisis", path: [60, 66, 72, 84, 98, 120, 146, 170, 196, 214, 222, 214, 200] },
  { name: "2020 sudden crash", path: [60, 58, 62, 60, 92, 160, 206, 190, 160, 130, 110, 96, 86] },
  { name: "2022 rate shock", path: [60, 70, 82, 96, 104, 122, 138, 150, 162, 156, 164, 152, 140] },
];

/* ------------------------------ 08 shariah in action ------------------------------ */
// [Confirm] Before launch: check every figure against Honeywell's filing and show its date and source.
export const CASE_STEPS = [
  { t: "New filing detected", d: "Honeywell separates its aerospace business in June 2026.", status: "Compliant", color: C.em },
  { t: "Ratios re-tested", d: "Debt rises to about 52% of market value, above the Shariah threshold.", status: "Re-testing", color: C.bl },
  { t: "Status flagged", d: "New purchases blocked. A review opens with the evidence and compliant alternatives.", status: "Flagged", color: C.co },
  { t: "CIO decision", d: "Exit, unless the next quarterly filing brings debt back within limits.", status: "CIO review", color: C.gold },
  { t: "Action recorded and purification updated", d: "The decision, its reasons and the purification amount go into the permanent record.", status: "Recorded", color: C.gold },
];
export const CASE_SOURCE = "Source: Honeywell company filing, June 2026.";

/* ------------------------------ 09 transparency ------------------------------ */
export const RECEIVE = [
  { id: "quarterly", t: "Quarterly report", b: "Holdings, performance, risk and attribution." },
  { id: "alert", t: "Shariah alerts", b: "When a holding's status changes, and what we did." },
  { id: "purification", t: "Purification statement", b: "Impure income per holding, recorded." },
  { id: "log", t: "Decision log", b: "Every proposal, including rejected ideas, with reasons." },
] as const;

export const SAMPLE_HOLDINGS = [
  { name: "Calderwick", region: "UK", thesis: "On track", impure: "0.8%", amount: "£4.10" },
  { name: "Aster Robotics", region: "Japan", thesis: "On track", impure: "0.0%", amount: "£0.00" },
  { name: "Meridian Health", region: "US", thesis: "Under review", impure: "1.9%", amount: "£11.62" },
  { name: "Norvale Instruments", region: "UK", thesis: "On track", impure: "3.1%", amount: "£7.95" },
  { name: "Kestrel Logistics", region: "US", thesis: "On track", impure: "0.4%", amount: "£1.38" },
];

export const DECISION_LOG = [
  { date: "12 Sep", idea: "Brightcell Mobile", outcome: "Rejected", why: "Margins falling; price above fair-value range." },
  { date: "09 Sep", idea: "Calderwick · trim", outcome: "Approved", why: "Position resized after results; thesis intact." },
  { date: "02 Sep", idea: "Harbourline Group", outcome: "Rejected", why: "Fails business-activity screen." },
  { date: "28 Aug", idea: "Aster Robotics", outcome: "Approved", why: "Variant view documented; liquidity limit respected." },
  { date: "21 Aug", idea: "Vantor Semis", outcome: "Rejected", why: "Would breach the sector limit." },
  { date: "14 Aug", idea: "Orrin Foods", outcome: "Rejected", why: "Committee dissent unresolved; bear case stronger." },
];

/* ------------------------------ 10 governance ------------------------------ */
export const PROVIDERS: { role: string; who?: string; status: string; kind: "in" | "planned" | "later" }[] = [
  { role: "Broker and custody", who: "Interactive Brokers", status: "Move planned", kind: "planned" }, // [Confirm timing]
  { role: "Engineering", who: "Development team", status: "In place", kind: "in" },
  { role: "Legal counsel", status: "To appoint", kind: "later" },
  { role: "Fund administrator", status: "Before any external capital", kind: "later" },
  { role: "Auditor", status: "Before any external capital", kind: "later" },
];

/* ------------------------------ hidden until legal sign-off: 4, 5, 18 ------------------------------ */
// Figures are deliberately empty. Fill them from the system's broker-record calculations only after legal sign-off.
export const PENDING = "Pending sign-off";
export const TRACK_PERIODS = ["Latest quarter", "Year to date", "Since start"];
export const TRACK_SERIES = ["Flagship", "S&P 500 (GBP)", "MSCI ACWI Islamic"];
export const TRACK_RISK = ["Volatility", "Maximum drawdown", "Sharpe ratio", "Beta"];
export const TRACK_LABELS = ["Founder's own capital", "Unaudited", "Past performance is not a reliable indicator of future results."];

export const COMPARISON = [
  { topic: "Selection", etf: "Owns every compliant company at any price", simat: "Buys only at a sensible price" },
  { topic: "Concentration", etf: "Weights follow the index, often heavy in a few large names", simat: "Hard position and sector limits; conviction over index weight" },
  { topic: "Compliance timing", etf: "Re-screened at index review dates", simat: "Re-screened on every new filing" },
  { topic: "Purification", etf: "Often left to the investor", simat: "Calculated and recorded for every holding" },
  { topic: "Downturns", etf: "Falls with the index", simat: "Risk set before every trade; cash held when ideas are scarce" },
];
export const COMPARISON_CAVEAT = "A general comparison of approaches, not of any named product.";

export const FACTSHEET = [
  { t: "Objective", b: "To outperform the benchmark over 3–5 years, owning only Shariah-compliant companies. An objective, not a promise." }, // [Confirm wording]
  { t: "Approach", b: "Conviction-led, quality at a sensible price." },
  { t: "Horizon", b: "3–5 years." },
  { t: "Holdings", b: "Concentrated, typically 11–14 holdings." },
  { t: "Benchmark", b: "S&P 500 (GBP), with a Shariah index alongside." },
];

/* ------------------------------ 11 risks ------------------------------ */
export const RISKS = [
  { risk: "Short track record.", how: "Reported in full, and verified before anything is published." },
  { risk: "Early-stage firm.", how: "Controls enforced by the system, with a full audit trail." },
  { risk: "Key person.", how: "Every decision documented and reproducible." },
  { risk: "Concentrated portfolio.", how: "Hard position and sector limits." },
  { risk: "Shariah status changes.", how: "Re-screened on every filing; exits under the method's rules." },
  { risk: "Technology failure.", how: "Nothing proceeds if any check fails; daily broker reconciliation." },
];

/* ------------------------------ 12 measure ------------------------------ */
export const MEASURE = [
  { t: "Returns", b: "Net of all costs." },
  { t: "Benchmarks", b: "S&P 500 (GBP), with an Islamic ACWI index alongside." },
  { t: "Sources", b: "Broker records and company filings." },
  { t: "Shariah standard", b: "A recognised methodology, applied with its published thresholds." },
  { t: "What is illustrative", b: "All examples, samples and activity feeds in this demo." },
  { t: "Status", b: "Founder capital only, unaudited, and features in development marked as such." },
];

export const RISK_WARNING =
  "The value of investments can fall as well as rise and you may get back less than you invest. Past performance is not a reliable indicator of future results. Simat Capital is not authorised by the FCA and does not accept external capital.";
