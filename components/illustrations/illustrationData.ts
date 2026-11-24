export type IllustrationCategory = "geometric" | "instruments" | "nature-architecture" | "process" | "agentic";

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
  // 1. NATURE & HERITAGE (Cosmos & Heritage)
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
  {
    id: "london-portico-enhanced",
    name: "London Colonnade · Masterwork Edition",
    category: "nature-architecture",
    categoryLabel: "Cosmos & Heritage",
    badge: "Masterwork Edition",
    animationType: "Live Order Walk & 3D Parallax Colonnade",
    animationDescription:
      "A live order token walks the stylobate column by column — Signal, Research, Control, Execution — lighting each discipline while the tympanum reports its stage. The colonnade tilts in 3D with the pointer.",
    subtitle: "Classical Mayfair Portico with Interactive Discipline Pillars",
    description:
      "Grand Neoclassical portico featuring 4 monumental fluted columns representing Signal, Research, Control, and Execution. Features engraved Mayfair elevation coordinates, pediment tympanum frieze, and interactive hover tooltips for every pillar.",
    symbolism: [
      "Dual Meridian Beams: Unwavering alignment with Mayfair institutional standards",
      "Four Fluted Columns: Signal, Research, Control, and Execution with hover telemetry",
      "Flank Lantern Beacons: 24/7 continuous oversight grounded in London financial stability",
    ],
    details: [
      { title: "Column 01 · Signal", sub: "Quantitative algorithmic screening and ratio drift alerts." },
      { title: "Column 02 · Research", sub: "Fundamental moat analysis, bear cases, and valuation ranges." },
      { title: "Column 03 · Control & Execution", sub: "11 pre-trade gates, CIO passkey token, and Interactive Brokers custody." },
    ],
  },

  // -------------------------------------------------------------
  // 2. PROCESS & PROOF (rendered by ProcessIllustrations.tsx)
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
    id: "ratio-drift-enhanced",
    name: "Ratio Drift · Real-Time Audit Engine",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Audit Engine",
    animationType: "Live Filing Replay & 3D Ratio Prisms",
    animationDescription:
      "Filings arrive quarter by quarter: 3D ratio prisms rise, the spline extends, a live D/A readout counts up, and the hard limit alarms on the Q3 breach before the position is stamped EXITED.",
    subtitle: "Continuous debt surveillance with dual 30% caution and 33.33% hard limit lines",
    description:
      "Real-time algorithmic balance sheet audit tracking debt-to-assets across four quarters. Highlights internal 30.0% caution line and 33.33% AAOIFI hard limit, with instant 90-day liquidation trigger on Q3 breach.",
    symbolism: [
      "Spline Curve: Dynamic trajectory connecting filing timestamps",
      "Dual Threshold Lines: 30% internal warning buffer and 33.33% hard stop",
      "Q3 Sonar Ripple: Algorithmic detection flagged within 14ms of 10-Q filing",
    ],
    details: [
      { title: "Q1–Q2 · Headroom", sub: "24.0% and 29.0% debt-to-assets with positive headroom buffers." },
      { title: "Q3 · Sonar Breach", sub: "35.2% debt crosses limit; automated alert dispatched in 14ms." },
      { title: "Q4 · Full Resolution", sub: "Position fully exited under mandate rules; gains purified." },
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
    id: "four-gates-enhanced",
    name: "The Four Gates · Continuous Pipeline",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Filtration Pipeline",
    animationType: "Live Company Stream & Gate Rejections",
    animationDescription:
      "Named companies stream down the pipeline in real time; non-compliant ones are knocked out at the exact gate they fail, with live Eligible and Non-Permissible counters.",
    subtitle: "Four systematic gates with quarantine holding dock and live SEC ingestion",
    description:
      "An industrial filtration pipeline testing companies against business activities, financial ratios, income purity, and continuous filing review. Divergent tracks separate uncertain disclosures for Scholar review.",
    symbolism: [
      "Laser Core Conduit: High-throughput continuous automated screening",
      "Rotating Iris Scanners: AAOIFI Standard 21 verification algorithms",
      "Quarantine Branch: Uncertain filings held until resolved by scholars",
    ],
    details: [
      { title: "Gates 01–02", sub: "0% non-permissible revenue; Debt, Cash, and Receivables each < 33.33%." },
      { title: "Gates 03–04", sub: "Impure revenue < 5%; continuous scraping of SEC, Companies House, TDnet." },
      { title: "Quarantine & Exclusions", sub: "Uncertain cases held; 1,790 non-compliant tickers permanently excluded." },
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
    id: "eleven-checks-enhanced",
    name: "Eleven Pre-Trade Checks · Holographic Console",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Holographic Console",
    animationType: "Live Order Scan & Laser Handshake",
    animationDescription:
      "Each incoming order is scanned check by check by a rotating laser beam; most pass 11 of 11, while some are blocked mid-sequence at the failing check with the reason shown.",
    subtitle: "Sub-millisecond invariants tested across Data, Limits, and Governance sectors",
    description:
      "Mission control console evaluating 11 pre-trade invariants in under 35 milliseconds. Every order must clear reconciliation, data freshness, Shariah screens, concentration caps, and risk policies before CIO passkey authorization.",
    symbolism: [
      "Three Operational Sectors: Data Integrity, Portfolio Limits, and Governance",
      "Sub-millisecond Latencies: 1ms to 7ms check times stamped beside every node",
      "Central Passkey Core: Ed25519 hardware authorization required for every order",
    ],
    details: [
      { title: "Sector Alpha · Data", sub: "Reconciliation, data freshness, SEC filing hash, market price sanity." },
      { title: "Sector Beta · Limits", sub: "Cash availability, ADV liquidity, 10% position cap, 30% sector cap." },
      { title: "Sector Gamma · Risk", sub: "Shariah status, duplicate order shield, tamper-evident record." },
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
    id: "opportunity-funnel-enhanced",
    name: "The Alpha Sieve · 2,400 to Six Shortlist",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Alpha Sieve",
    animationType: "Live Sieve Inflow & Shortlist Arrivals",
    animationDescription:
      "Companies are pulled inward through the sieve and drop out ring by ring; rare survivors reach the core, bumping the live shortlist count and screened-today tally.",
    subtitle: "From 2,400 global companies to a high-conviction shortlist of six",
    description:
      "Concentric gravitational sieve illustrating how Simat filters 2,400 companies down to 610 Shariah-compliant firms, 142 moat allocators, 48 valuation opportunities, and 6 high-conviction ideas ready for bear-case testing.",
    symbolism: [
      "Outer Cosmos: 2,400 companies across the UK, US, and Japan with twinkling stars",
      "Intermediate Sieve: Shariah filter (610), Moat filter (142), Valuation filter (48)",
      "Concentrated Core: Shortlist of 6 companies earning full written bear cases",
    ],
    details: [
      { title: "2,400 → 610 Permissible", sub: "Global universe filtered against AAOIFI Standard 21 guidelines." },
      { title: "142 → 48 Fair Value", sub: "High ROIC, positive free cash flow, and margin of safety to bear case." },
      { title: "Shortlist Core", sub: "Concentrated 11 to 14 holding portfolio; founder capital invested alongside." },
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
    id: "purification-flow-enhanced",
    name: "Purification Ledger · Multi-Lot Micro-Bifurcation",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Purification Ledger",
    animationType: "Live Dividend Split & Charity Reservoir",
    animationDescription:
      "New dividends land every few seconds, droplets ride both conduits, investor and charity totals accumulate live, and the charity reservoir fills toward each disbursement.",
    subtitle: "Exact tax-lot dividend purification with verified charity escrow",
    description:
      "Granular ledger tracing a dividend through three distinct tax lots. Illustrates the Ex-Date gate, 96.8% clean capital retention, and 3.2% non-operating impure income routing to verified Islamic charities.",
    symbolism: [
      "Ex-Date Gate: Only shares held on the record date incur purification",
      "Dual Cascading Streams: 96.8% to investor custody, 3.2% to charity escrow",
      "Ripple Reservoir: Verified charitable distribution, never counted as return",
    ],
    details: [
      { title: "Tax Lots #01 & #02", sub: "150 shares held through ex-date: $146.36 kept, $4.03 purified." },
      { title: "Tax Lot #03 · Exempt", sub: "30 shares purchased after ex-date: $25.20 kept, $0.00 purified." },
      { title: "Annual Audit Seal", sub: "Purification statements issued annually for investor tax schedules." },
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
    id: "grace-clock-enhanced",
    name: "The 90-Day Grace Chronometer · Precision Liquidation Dial",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Grace Chronometer",
    animationType: "Live 90-Day Countdown & Liquidation Meter",
    animationDescription:
      "The breach clock actually counts from Day 0 to Day 90: the needle and arc advance, milestones fire as they are reached, and the remaining-position meter drains to zero.",
    subtitle: "Precision liquidation countdown with automated escalation alerts",
    description:
      "A 360-degree fiduciary chronometer tracking the strict 90-day grace period triggered upon a Shariah ratio breach. Automatically freezes buy orders on Day 0 and guides staged exit to prevent forced market dumping.",
    symbolism: [
      "Day 0 Lock: New buys blocked and breach-date benchmark price frozen",
      "Days 30–80 Stations: Escalating notifications to PM, CIO, and Shariah board",
      "Day 90 Hard Exit: Position 100% sold; all post-breach price gains purified",
    ],
    details: [
      { title: "Day 0 · Breach Lock", sub: "Automated trading block; breach benchmark price recorded in audit chain." },
      { title: "Days 30–80 · Staged Escalation", sub: "Liquidity review, staged order routing, and formal governance notices." },
      { title: "Day 90 · Complete Sale", sub: "Full orderly liquidation; capital returned, post-breach gain purified." },
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
    id: "hash-chain-enhanced",
    name: "Cryptographic Audit Chain · Merkle Tree & Block Telemetry",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Merkle Audit Chain",
    animationType: "Live Block Sealing & Tamper Test",
    animationDescription:
      "New records are sealed and appended as the chain slides left, each showing the previous hash; a periodic tamper test edits one block and visibly breaks every link after it.",
    subtitle: "Immutable decision ledger linking filing ingestion to custodian settlement",
    description:
      "Five cryptographically linked records capturing Trigger, Pre-Trade Checks, CIO Passkey Decision, Broker FIX Execution, and Custodian Settlement. Any retroactive alteration invalidates all subsequent block digests.",
    symbolism: [
      "Five Immutable Diamonds: Full lifecycle of a single investment decision",
      "Optical Bus Conduits: Parent hash fingerprints binding each step to the last",
      "Tamper Detection Shield: Mathematical guarantee of zero revisionist bias",
    ],
    details: [
      { title: "Blocks 01–02 · Trigger & Checks", sub: "SEC ingestion timestamp, 11/11 invariant results, Merkle root hash." },
      { title: "Block 03 · CIO Decision", sub: "Ed25519 hardware token signature and full dissenting arguments recorded." },
      { title: "Blocks 04–05 · Execution & Seal", sub: "Broker FIX fill price, time-in-force, and custodian IBKR reconciliation." },
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
    id: "drawdown-bands-enhanced",
    name: "Drawdown Levels · Dynamic Radar Defense Grid",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Radar Defense Grid",
    animationType: "Live Drawdown Front & Radar Escalation",
    animationDescription:
      "A live drawdown front expands and contracts through the bands, lighting the active escalation zone while the radar sweep pings each holding it passes.",
    subtitle: "Four escalating defense zones with cash & physical gold ballast protection",
    description:
      "Quantitative drawdown management architecture establishing protocol responses at Normal (0-5%), Elevated (5-10%), Material (10-15%), and Severe (15%+) levels. Enforces strict rules against forced selling at market bottoms.",
    symbolism: [
      "Radar Sweep Arm: 24/7 algorithmic tracking of peak-to-trough NAV divergence",
      "Concentric Risk Rings: Clear escalation hierarchy from PM to full committee",
      "Gold Ballast Shield: 6-12% cash & gold buffer absorbing ~38% of market shocks",
    ],
    details: [
      { title: "Normal to Elevated (0–10%)", sub: "Daily algorithmic monitoring; PM and CIO alerted if drawdown exceeds 5%." },
      { title: "Material to Severe (10–15%+)", sub: "Investment committee emergency session; mandate limits remain fixed." },
      { title: "Invariant Rule", sub: "No automatic forced liquidation at market bottoms; limits never loosen." },
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
    id: "sector-cap-enhanced",
    name: "Sector Cap & Risk Architecture · Multi-Sleeve Portfolio Console",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Risk Console",
    animationType: "Live Orders & Real-Time Portfolio Resizing",
    animationDescription:
      "Live orders arrive: one bounces off the 30% Industrials cap, others fill and the whole book resizes — tiles, sector mix, cash ballast and concentration gauges all re-balance in real time.",
    subtitle: "Hard 30% sector barrier and multi-sleeve portfolio concentration controls",
    description:
      "Institutional risk console modeling a £1M multi-sleeve portfolio. Shows Industrials exactly at its 30.0% cap with automatic pre-trade rejection of an incremental 1% order, plus Top-5 concentration and stress-test gauges.",
    symbolism: [
      "Hard Barrier Gate: Strict 30.0% single-sector maximum mandate",
      "Blinking Sliver: Proposed 1.0% trade rejected before broker transmission",
      "Three Metric Gauges: Sector cap, Top-5 holdings (40%/45%), and stress loss (17.9%/20%)",
    ],
    details: [
      { title: "30.0% Sector Cap", sub: "Industrials sleeve at maximum capacity; further capital redirected to cash." },
      { title: "Top-5 Concentration", sub: "Top five holdings limited to 45% (currently 40% with +5% headroom)." },
      { title: "Stress Test Boundary", sub: "Simulated sharp market fall loss of 17.9% safely inside 20% limit." },
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
    id: "three-markets-enhanced",
    name: "Three Markets, One Clock · Tri-Continental Global Sweep",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Tri-Continental Dial",
    animationType: "Live UTC Clock & 3D Exploded Dial",
    animationDescription:
      "A live UTC clock opens and closes London, New York and Tokyo; open sessions stream data packets into the hub and the overlap halo blazes. On hover the dial tilts back into a layered 3D view.",
    subtitle: "Continuous 24-hour global equity coverage across London, New York, and Tokyo",
    description:
      "A 24-hour UTC dial coordinating continuous coverage across the UK (LSE), US (NYSE/NASDAQ), and Japan (TSE). Highlights the peak transatlantic liquidity overlap between 14:30 and 16:30 UTC.",
    symbolism: [
      "Outer Arc · London: 08:00–16:30 UTC; under-researched small/mid caps",
      "Middle Arc · New York: 14:30–21:00 UTC; deep liquidity and innovation leaders",
      "Inner Arc · Tokyo: 00:00–06:00 UTC; cash-rich balance sheet compounders",
    ],
    details: [
      { title: "Peak Overlap Window", sub: "14:30–16:30 UTC transatlantic overlap; optimal execution liquidity." },
      { title: "Continuous Data Ingestion", sub: "Automated scrapers for SEC EDGAR, Companies House, and Tokyo TDnet." },
      { title: "Currency & Execution", sub: "Disciplined execution across GBP, USD, and JPY without retail latency." },
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
  {
    id: "high-water-mark-enhanced",
    name: "High-Water Mark & Hurdle · Compound Alpha Waterfall",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Alpha Waterfall",
    animationType: "Live NAV Replay & Fee Ledger",
    animationDescription:
      "NAV is replayed year by year with a live cursor; the high-water mark steps up on each new peak, alpha zones appear, and a live ledger tracks the three company shares (London, New York, Tokyo) that make up NAV.",
    subtitle: "Mudarabah profit share aligned to high-water mark and 5% preferred hurdle",
    description:
      "Illustrative 5-year mudarabah profit-share schedule demonstrating total alignment. Simat receives a 40% share exclusively on growth exceeding the investor's previous peak plus a 5% hurdle; loss and recovery years incur £0 fee.",
    symbolism: [
      "Stepped High-Water Mark: Permanent record of highest historical NAV",
      "Stepped 5% Hurdle: First 5% of real compounded growth belongs solely to investor",
      "Golden Shading: 60/40 profit share applies exclusively within surplus alpha zones",
    ],
    details: [
      { title: "Year 1 · Alpha Surplus", sub: "NAV reaches 125.0 (+25%); growth above hurdle shared 60% investor / 40% Simat." },
      { title: "Years 2 & 3 · Drawdown & Recovery", sub: "Drawdown to 106.0 and recovery to 117.0: £0 fee; investor keeps 100% of recovery." },
      { title: "Years 4 & 5 · Breakout & Compounding", sub: "NAV surpasses prior high-water mark; profit share re-engages above 5% hurdle." },
    ],
  },

  // -------------------------------------------------------------
  // AGENTIC AI — research agents that recommend, humans that decide
  // -------------------------------------------------------------
  {
    id: "agent-swarm",
    name: "Agentic Research Swarm · Orchestrator & Specialists",
    category: "agentic",
    categoryLabel: "Agentic AI",
    badge: "Multi-Agent",
    animationType: "Live Delegation, Tool Calls & Reasoning Trace",
    animationDescription:
      "An orchestrator agent plans a task, dispatches it to four specialist agents that call their tools in turn, gathers their results, reflects, and drafts a memo for CIO sign-off — narrated by a live typing reasoning trace.",
    subtitle: "One orchestrator, four specialist agents, one human decision",
    description:
      "A swarm of AI agents researches each candidate in parallel: a Filing Reader pulls the latest filing, a Shariah Screener checks the ratios, a Valuation Analyst builds the bear case and a Risk Sentinel tests the portfolio impact. The orchestrator weighs their findings and hands a memo to the CIO. Illustrative.",
    symbolism: [
      "Central orchestrator: plans, delegates and reflects on the combined evidence",
      "Hexagonal specialists: each agent owns one tool and one question",
      "Reasoning trace: every tool call and observation is written down and auditable",
    ],
    details: [
      { title: "Plan & Delegate", sub: "The orchestrator splits one question into four focused sub-tasks." },
      { title: "Tool Calls", sub: "Agents query filings, screens, valuation models and risk engines." },
      { title: "Human Sign-off", sub: "The swarm drafts a memo; only the CIO can approve a trade." },
    ],
  },
  {
    id: "agent-react-loop",
    name: "Autonomous Compliance Agent · Think → Act → Observe",
    category: "agentic",
    categoryLabel: "Agentic AI",
    badge: "Agent Loop",
    animationType: "Live Reasoning Loop & Self-Written Plan",
    animationDescription:
      "A compliance agent writes its own six-step plan, then works through it in a think → act → observe → reflect loop: the orbiting marker lights each phase, plan items tick off and every step types into the agent trace.",
    subtitle: "An agent that detects a breach, investigates it and escalates it",
    description:
      "When a new filing lands, the compliance agent re-reads it, extracts the ratios, re-screens the four gates, measures exit impact and drafts a staged exit plan, then stops and escalates to the CIO. It never trades on its own. Illustrative.",
    symbolism: [
      "Four-phase loop: think, act, observe, reflect, repeated for every plan step",
      "Self-written checklist: the agent decomposes the job before it starts",
      "Guardrail: the final step is always a human, never an autonomous trade",
    ],
    details: [
      { title: "Detect & Extract", sub: "New 10-Q fetched, balance sheet parsed, debt/assets computed." },
      { title: "Re-screen & Measure", sub: "Gate 02 breach confirmed; exit impact sized against daily volume." },
      { title: "Plan & Escalate", sub: "Staged exit drafted inside the 90-day window and sent to the CIO." },
    ],
  },
  {
    id: "agent-debate",
    name: "Multi-Agent Investment Debate · Bull, Bear & Judge",
    category: "agentic",
    categoryLabel: "Agentic AI",
    badge: "Agent Debate",
    animationType: "Live Agent Debate & Conviction Meter",
    animationDescription:
      "A bull agent and a bear agent trade arguments over three rounds; each argument flies to a judge agent and moves the live conviction meter, ending in a sized verdict that waits for the CIO's signature.",
    subtitle: "Agents argue both sides so the decision does not have to guess",
    description:
      "Every idea is stress-tested by two adversarial agents: one builds the strongest case for, the other the strongest case against. A judge agent scores the evidence and proposes a position size, and the CIO makes the final call. Illustrative.",
    symbolism: [
      "Bull and bear agents: the written bear case, automated and adversarial",
      "Conviction meter: evidence moves the needle, not enthusiasm",
      "CIO signature: the verdict is a recommendation until a human signs",
    ],
    details: [
      { title: "Case For", sub: "Moat, balance sheet strength and base-case fair value." },
      { title: "Case Against", sub: "Cyclicality, valuation premium and the bear-case price." },
      { title: "Verdict", sub: "Judge proposes BUY at half weight; CIO signature required." },
    ],
  },
];
