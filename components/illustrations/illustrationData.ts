export type IllustrationCategory = "geometric" | "instruments" | "nature-architecture" | "process";

export interface IllustrationDefinition {
  id: string;
  name: string;
  category: IllustrationCategory;
  categoryLabel: string;
  badge: string;
  animationType: string;
  animationDescription: string;
  subtitle: string;
  description: string;
  symbolism: string[];
  details: { title: string; sub: string }[];
}

export const ILLUSTRATIONS: IllustrationDefinition[] = [
  // -------------------------------------------------------------
  // 2. GEOMETRIC SHAPES
  // -------------------------------------------------------------
  
  {
    id: "london-portico",
    name: "London Institutional Colonnade",
    category: "nature-architecture",
    categoryLabel: "Cosmos & Heritage",
    badge: "Architecture",
    animationType: "Horizon Beacon Sweep",
    animationDescription: "A gentle golden beacon beam sweeps across the Mayfair pediment and fluted colonnade against London coordinates.",
    subtitle: "Classical Mayfair Portico & Financial Skyline",
    description:
      "Neoclassical architectural elevation blueprint of a British financial portico: four classical fluted columns, triangular pediment, and archway framing the Simat emblem.",
    symbolism: [
      "Four Fluted Columns: The four gates of systematic investment governance",
      "Triangular Pediment: The apex of fiduciary care and institutional rigor",
      "Mayfair Coordinates: Grounded in centuries of London financial stability",
    ],
    details: [
      { title: "Pediment Tympanum", sub: "Architectural blueprint construction lines and drafting measurements." },
      { title: "Fluted Colonnade", sub: "Columns of discipline: Signal, Research, Control, Execution." },
      { title: "Stepped Stylobate", sub: "Engraved with Mayfair coordinates: 51.5074° N · 0.1278° W." },
    ],
  },

  // -------------------------------------------------------------
  // 4. PROCESS & PROOF (rendered by ProcessIllustrations.tsx)
  // -------------------------------------------------------------
  {
    id: "ratio-drift",
    name: "Ratio Drift Across Four Quarters",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Shariah Ratios",
    animationType: "Quarterly Bar Rise",
    animationDescription: "Each quarter's debt ratio rises in turn against the 33.33% limit line.",
    subtitle: "One company, four filings, one breach",
    description:
      "The same illustrative company traced across four quarters: compliant at 24% and 29% debt to total assets, a breach at 35%, then exited under the method's rules.",
    symbolism: [
      "Dashed line: the 33.33% debt-to-total-assets limit",
      "Q3 bar: the filing that crosses it",
      "Q4: exited, not ignored",
    ],
    details: [
      { title: "Q1–Q2 · Compliant", sub: "24% and 29% of total assets, inside the limit." },
      { title: "Q3 · Breach", sub: "35% after a new filing; flagged the same day." },
      { title: "Q4 · Exited", sub: "Sold under the adopted method's rules." },
    ],
  },
  {
    id: "four-gates",
    name: "The Four Shariah Gates",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Shariah Filter",
    animationType: "Stock Passes Each Gate",
    animationDescription: "An outlined diamond travels the line through all four gates and arrives as an eligible stock.",
    subtitle: "Screened systematically, monitored continuously",
    description:
      "A line with four gates every company must pass before it can be proposed: business activity, financial ratios, income purity and continuous review. A branch from the ratio gate excludes uncertain cases until they are resolved.",
    symbolism: [
      "Gate 1: no conventional finance, alcohol, tobacco or gambling",
      "Gate 2: three ratios, each below 33.33%",
      "Gates 3–4: impure income below 5%, re-screened on every filing",
    ],
    details: [
      { title: "Business activity", sub: "Excludes non-permissible sectors before any analysis." },
      { title: "Financial ratios", sub: "Debt, cash and receivables each below 33.33%." },
      { title: "Income purity & review", sub: "Impure income below 5%; re-screened on every new filing." },
    ],
  },
  {
    id: "eleven-checks",
    name: "The Eleven Pre-Trade Checks",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Systematic Controls",
    animationType: "Sequential Check Lighting",
    animationDescription: "Eleven nodes light one by one around the mark, the way code runs each check on a single order.",
    subtitle: "Code checks every order before the CIO sees it",
    description:
      "Every order is tested against eleven controls: reconciliation, data freshness, Shariah status, cash, liquidity, position and concentration limits, duplicates, risk policy, a complete trade record and market price. Passing approves nothing; failing stops everything.",
    symbolism: [
      "Ring of eleven: every control runs on every order",
      "Centre: 11 of 11, or the order goes nowhere",
      "A failed or unknown check always blocks",
    ],
    details: [
      { title: "Data & records", sub: "Reconciliation, data freshness and a complete trade record." },
      { title: "Limits", sub: "Cash, liquidity, position, concentration and risk policy." },
      { title: "Shariah & market", sub: "Screen must be recent and compliant; price must be sane." },
    ],
  },
  {
    id: "opportunity-funnel",
    name: "From 2,400 Companies to Six",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Opportunity Set",
    animationType: "Twinkling Universe",
    animationDescription: "The outer universe of companies twinkles while each inner ring narrows the field.",
    subtitle: "Thousands screened, a handful worth owning",
    description:
      "Concentric rings narrow the research universe: 2,400 companies in view across the UK, US and Japan, 610 passing the Shariah screen, 48 offering quality at a fair price, and six on the shortlist. Counts are illustrative.",
    symbolism: [
      "Outer ring: every listed company the system can see",
      "Second ring: what a passive Shariah fund would own",
      "Centre: the shortlist that earns a full thesis",
    ],
    details: [
      { title: "2,400 in view", sub: "Listed companies across the UK, US and Japan." },
      { title: "610 compliant", sub: "Pass the Shariah screen; passive funds stop here." },
      { title: "48 → 6", sub: "Quality, balance sheet and valuation filters, then the shortlist." },
    ],
  },
 
  {
    id: "purification-flow",
    name: "Purification by Tax Lot",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Purification",
    animationType: "Charity Stream Flow",
    animationDescription: "A fine stream flows continuously from each dividend to charity, separate from what the investor keeps.",
    subtitle: "The exact amount, per investor, to the cent",
    description:
      "A dividend passes the ex-date gate: only the shares held that day count. The impure share of income flows to charity, calculated per tax lot as shares held × dividend × impure income percentage, and is never counted as return.",
    symbolism: [
      "Ex-date gate: only lots held that day count",
      "Thin stream: the impure share given away",
      "Formula: shares × dividend × impure %",
    ],
    details: [
      { title: "Ex-date gate", sub: "150 of 180 shares held on the ex-date count." },
      { title: "The calculation", sub: "150 × $0.84 × 3.2% = $4.03 owed." },
      { title: "To charity", sub: "Recorded per holding; never counted as return." },
    ],
  },
  {
    id: "grace-clock",
    name: "The 90-Day Grace Clock",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Breach Manager",
    animationType: "Countdown Arc Draw",
    animationDescription: "The 90-day arc draws from breach to sale, with reminders on days 30, 45, 60 and 80.",
    subtitle: "The day a holding breaches, the clock starts itself",
    description:
      "A 90-day dial for a holding that fails its screen. New buying is blocked on day 0, reminders go out on days 30, 45, 60 and 80, and the position is sold within the grace period, with any gain after the breach date purified.",
    symbolism: [
      "Day 0: breach detected, new buys blocked",
      "Days 30–80: automatic reminders",
      "Day 90: sold; post-breach gains purified",
    ],
    details: [
      { title: "Day 0 · Breach", sub: "The clock starts and the breach-day price is locked." },
      { title: "Days 30–80", sub: "Reminders to the PM and compliance officer." },
      { title: "Day 90 · Sold", sub: "Exit within the grace period set by the Shariah board." },
    ],
  },
  
  {
    id: "hash-chain",
    name: "The Tamper-Evident Chain",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Audit Trail",
    animationType: "Sequential Record Lighting",
    animationDescription: "Each record lights in turn from trigger to result, each linked to the fingerprint of the one before.",
    subtitle: "Every decision can be replayed",
    description:
      "Five linked records trace one decision: trigger, checks, CIO decision, execution and result. Each carries a fingerprint of the previous record, so changing any past entry breaks every later one.",
    symbolism: [
      "Five diamonds: one decision, start to finish",
      "Links: each record fingerprints the one before",
      "Change one record and the chain breaks",
    ],
    details: [
      { title: "Trigger & checks", sub: "The filing or signal, and every control result." },
      { title: "CIO decision", sub: "Approve or reject, with the reason recorded." },
      { title: "Execution & result", sub: "Broker fill reconciled and sealed into the chain." },
    ],
  },

  
  {
    id: "drawdown-bands",
    name: "Drawdown Levels",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Risk Monitoring",
    animationType: "Outward Stress Ripple",
    animationDescription: "A ripple spreads from Normal through Elevated and Material to Severe, like a market shock.",
    subtitle: "Who is alerted, and when",
    description:
      "Four concentric drawdown levels, each with the people it alerts: Normal, Elevated (PM and CIO), Material (PM, CIO and investment committee) and Severe (full review). Risk limits never loosen and nothing is sold automatically.",
    symbolism: [
      "Centre: Normal, the everyday state",
      "Middle rings: escalating alerts",
      "Outer ring: Severe, a full review",
    ],
    details: [
      { title: "Normal", sub: "Daily monitoring; no escalation." },
      { title: "Elevated & Material", sub: "PM and CIO, then the investment committee." },
      { title: "Severe", sub: "Full review; limits never loosen." },
    ],
  },
  {
    id: "sector-cap",
    name: "The Sector Cap",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Portfolio Construction",
    animationType: "Breach Blink at the Cap",
    animationDescription: "The sliver beyond the 30% Industrials cap blinks: the point that would be blocked.",
    subtitle: "Find a size every rule accepts",
    description:
      "A fictional £1m portfolio as a strip of twelve holdings. A new 6% position takes Industrials to exactly its 30% sector cap; one more point is blocked. Gauges show sector, top-five concentration and estimated loss in a sharp fall against their caps.",
    symbolism: [
      "Bracket: Industrials at 30.0%, the cap",
      "Gold tile: the new 6% position",
      "Blinking sliver: what the cap blocks",
    ],
    details: [
      { title: "Largest sector", sub: "Industrials 30.0%: exactly at the cap." },
      { title: "Largest five holdings", sub: "40% against a 45% cap." },
      { title: "Loss in a sharp fall", sub: "17.9% estimated against a 20% limit." },
    ],
  },
  {
    id: "three-markets",
    name: "Three Markets, One Clock",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Global Coverage",
    animationType: "24-Hour Sweep",
    animationDescription: "A hand sweeps the 24-hour dial through the London, New York and Tokyo sessions.",
    subtitle: "Signals across the UK, US and Japan",
    description:
      "A 24-hour dial in UTC with the trading sessions of the three markets Simat researches: London, New York and Tokyo. Filings, results, prices and events are monitored around the clock, and any change triggers a review.",
    symbolism: [
      "Outer arc: London, 08:00–16:30 UTC",
      "Middle arc: New York, 14:30–21:00 UTC",
      "Inner arc: Tokyo, 00:00–06:00 UTC",
    ],
    details: [
      { title: "UK · London", sub: "Under-researched small and mid caps." },
      { title: "US · New York", sub: "The largest and deepest market." },
      { title: "Japan · Tokyo", sub: "Compliant companies few analysts cover." },
    ],
  },
  {
    id: "high-water-mark",
    name: "High-Water Mark & Hurdle",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Mudarabah Terms",
    animationType: "Value Line Draw",
    animationDescription: "The value line draws year by year; gold shading appears only where it rises above best plus 5%.",
    subtitle: "We only earn on growth above your best, plus 5%",
    description:
      "Proposed mudarabah profit share over five illustrative years. A dashed high-water mark records the investor's best value and a dotted hurdle sits 5% above it. Simat shares 40% only of growth above the hurdle; loss years and recoveries cost nothing.",
    symbolism: [
      "Dashed step: the high-water mark",
      "Dotted step: best plus 5% hurdle",
      "Gold shading: the only part that is shared",
    ],
    details: [
      { title: "High-water mark", sub: "No profit share until a loss is fully recovered." },
      { title: "5% hurdle", sub: "The first 5% above your best is always yours." },
      { title: "60 / 40 split", sub: "Above the hurdle: 60% you, 40% Simat. Proposed terms." },
    ],
  },
];
