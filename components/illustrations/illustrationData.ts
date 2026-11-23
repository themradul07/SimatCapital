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
  // 1. SCALES & INSTRUMENTS
  // -------------------------------------------------------------
  {
    id: "scales-mizan",
    name: "The Scales of Equity (Al-Mizan)",
    category: "instruments",
    categoryLabel: "Precision Instrument",
    badge: "Al-Mizan",
    animationType: "Oscillating Equilibrium",
    animationDescription: "Balance beam gently tilts and settles in dynamic equilibrium with counter-floating scale pans.",
    subtitle: "Classical Balance of Compliance and Alpha",
    description:
      "The classical balance scale (Al-Mizan) mounted on a fluted pillar and Mayfair pedestal, weighing ethical compliance against fundamental valuation in perpetual equilibrium.",
    symbolism: [
      "Left Pan: Shariah purity, debt limits, and purification",
      "Right Pan: Fundamental valuation, cash-flow yield, and margin of safety",
      "Central Fulcrum: Human CIO decision making and fiduciary mandate",
    ],
    details: [
      { title: "Left Pan: Shariah Purity", sub: "Zero debt breach; continuous audit of business activities." },
      { title: "Central Pivot Gauge", sub: "Calibrated equilibrium dial with vertical indicator needle." },
      { title: "Right Pan: Intrinsic Alpha", sub: "Cash-flow yield and original research edge." },
    ],
  },
  {
    id: "marine-sextant",
    name: "Navigational Sextant",
    category: "instruments",
    categoryLabel: "Precision Instrument",
    badge: "Maritime Instrument",
    animationType: "Horizon Arc Sweep",
    animationDescription: "Index arm sweeps smoothly across the degree limb measuring the horizon with vernier drum pulses.",
    subtitle: "Technical Drafting of a Maritime Navigational Sextant",
    description:
      "A technical blueprint drafting of an antique marine sextant used by maritime navigators to calculate position by measuring angles between the horizon and the stars.",
    symbolism: [
      "Curved Limb: The 120-degree market horizon",
      "Index Arm: Dynamic benchmark alignment against fair value",
      "Sighting Optic: Unclouded long-term visibility past market noise",
    ],
    details: [
      { title: "Index Mirror", sub: "Benchmarking intrinsic thesis against market price." },
      { title: "Vernier Micrometer", sub: "Precision execution with zero slippage or tracking drift." },
      { title: "Telescope Sight", sub: "3-5 year investment horizon focused on durable cash generation." },
    ],
  },
  {
    id: "vernier-caliper",
    name: "Precision Horizon Vernier",
    category: "instruments",
    categoryLabel: "Precision Instrument",
    badge: "Architectural Caliper",
    animationType: "Vernier Slider Glide",
    animationDescription: "Slider jaw glides across the millimeter scale bar, locking onto optimal valuation entry points.",
    subtitle: "Engineering Measurement of Value & Risk",
    description:
      "A horizontal architectural measurement instrument with graduated vernier scale, micrometric calibration, and central balance dial framing the Simat emblem.",
    symbolism: [
      "Graduated Bar: Continuous measurement of valuation multiples and safety margin",
      "Micrometric Thumbwheel: Fine adjustments to position sizing and risk parameters",
      "Dial Reticle: Zero tolerance for unauthorized mandate breach",
    ],
    details: [
      { title: "Graduated Scale", sub: "Quantitative threshold scanning across 1,000+ eligible equities." },
      { title: "Measurement Jaws", sub: "Pinpointing the exact entry point with highest risk-adjusted upside." },
      { title: "Locking Screw", sub: "Orders locked to one exact price; any broker change voids the order." },
    ],
  },
  {
    id: "astrolabe-dial",
    name: "Planispheric Astrolabe",
    category: "instruments",
    categoryLabel: "Precision Instrument",
    badge: "Islamic Astrometry",
    animationType: "Rete Rotation",
    animationDescription: "Rete plate rotates gracefully over altitude almucantar curves with star pointers tracking catalysts.",
    subtitle: "Antique Astrolabe Plate with Rete & Horizon Rings",
    description:
      "A detailed technical drafting of an antique Islamic planispheric astrolabe with mater rim, altitude circles (almucantars), rete star pointers, and suspension shackle.",
    symbolism: [
      "Mater Rim: 360-degree boundary of the global equity universe",
      "Rete Plate: Stellar coordinates indicating high-conviction opportunities",
      "Throne Shackle: Fiduciary custody and institutional independence",
    ],
    details: [
      { title: "Almucantar Arcs", sub: "Elevation curves tracking earnings momentum and free cash flow." },
      { title: "Rete Pointers", sub: "Navigational star pointers marking inflection catalysts." },
      { title: "Degree Limb", sub: "Astronomical graduations with London latitude coordinates." },
    ],
  },

  // -------------------------------------------------------------
  // 2. GEOMETRIC SHAPES
  // -------------------------------------------------------------
  {
    id: "hex-prism",
    name: "Isometric Hexagonal Prism",
    category: "geometric",
    categoryLabel: "Geometric Shape",
    badge: "3D Isometric",
    animationType: "Facet Sequence Pulse",
    animationDescription: "Isometric facets transition sequentially in luminosity and stroke glow (Research → Screening → Governance).",
    subtitle: "Multifaceted Institutional Crystal Lens",
    description:
      "A regular 3D isometric hexagon divided into three distinct isometric rhombic facets, filtering the global equity universe through three non-negotiable lenses.",
    symbolism: [
      "Top-Left Facet: Machine-scale quantitative research & catalyst models",
      "Top-Right Facet: Four-gate Shariah compliance & dividend purification",
      "Bottom Facet: Human CIO governance, position caps, and execution discipline",
    ],
    details: [
      { title: "Proprietary Research", sub: "Specialised financial models covering the UK, US, and Japanese equity markets." },
      { title: "Shariah Screening", sub: "Continuous debt, cash, and receivables balance-sheet threshold audits." },
      { title: "Fiduciary Governance", sub: "Founder co-investment, independent administration, and custodian custody." },
    ],
  },
  {
    id: "armillary",
    name: "Celestial Gyroscope & Gimbals",
    category: "geometric",
    categoryLabel: "Geometric Shape",
    badge: "3D Curvilinear",
    animationType: "Multi-Axis Gyro Drift",
    animationDescription: "Planetary orbital rings drift at varying speeds and inclinations around a fixed polar axis.",
    subtitle: "Planetary Rings & Multi-Axis Equilibrium",
    description:
      "Three interlocking 3D elliptical rings tilted at 0°, +60°, and -60° angles holding the core in dynamic equilibrium through market volatility.",
    symbolism: [
      "Equatorial Ring (0°): Real-time liquidity, drawdown, and sector caps",
      "Orbital Ring (+60°): Continuous Shariah compliance monitoring",
      "Meridian Ring (-60°): Active alpha search in under-analysed equities",
    ],
    details: [
      { title: "Equatorial Risk Plane", sub: "Maintaining portfolio stability and risk budget across market cycles." },
      { title: "Shariah Orbital Axis", sub: "Automated daily surveillance against non-compliant business drift." },
      { title: "Alpha Search Meridian", sub: "Concentrated high-conviction ideas with documented variance from consensus." },
    ],
  },
  {
    id: "octagram",
    name: "Islamic Sacred Octagram",
    category: "geometric",
    categoryLabel: "Geometric Shape",
    badge: "Rub el Hizb",
    animationType: "Counter-Rotating Astrometry",
    animationDescription: "Inner 8-pointed star and outer degree calibration rim counter-rotate in stately harmonic motion.",
    subtitle: "Dual Interlocking Squares & Astrolabe Calibrations",
    description:
      "The classical Islamic Rub el Hizb (eight-pointed star) formed by two interlocking 45° squares, intersecting concentric astrolabe degree circles and 8-way compass rays.",
    symbolism: [
      "Square 1: The ethical mandate of Shariah jurisprudence",
      "Square 2: The quantitative rigor of systematic equity analysis",
      "Central Octagram: Harmony of moral alignment and commercial alpha",
    ],
    details: [
      { title: "Cardinal Orientation", sub: "Fixed north-south ethical baseline guiding all capital allocation." },
      { title: "Diagonal Balance", sub: "Dynamic rebalancing between capital growth and capital preservation." },
      { title: "Calibration Ring", sub: "Micro-notches representing precision measurement across 360 degrees." },
    ],
  },
  {
    id: "triquetra",
    name: "Curvilinear Triquetra Shield",
    category: "geometric",
    categoryLabel: "Geometric Shape",
    badge: "Sacred Arc",
    animationType: "Resonant Arc Cycle",
    animationDescription: "Light pulses cycle sequentially through the three intersecting arcs, illuminating the central Opportunity Set.",
    subtitle: "Three-Lobe Venn of the Opportunity Set",
    description:
      "Three sweeping mathematical circular arcs intersecting to form the golden opportunity set: Compliant, Understood, and Fairly Priced.",
    symbolism: [
      "Arc A: Compliant (Passes all 4 Shariah hurdles)",
      "Arc B: Understood (Direct bottom-up fundamental modeling)",
      "Arc C: Fairly Priced (Intrinsic cash-flow discount)",
    ],
    details: [
      { title: "Compliant?", sub: "Zero compromise on Shariah purity; audited financial ratios." },
      { title: "Understood?", sub: "Deep fundamental thesis built from primary filings; no consensus reliance." },
      { title: "Fairly Priced?", sub: "Substantial margin of safety protecting against drawdowns." },
    ],
  },
  {
    id: "golden-spiral",
    name: "Logarithmic Compounding Spiral",
    category: "geometric",
    categoryLabel: "Geometric Shape",
    badge: "Golden Ratio",
    animationType: "Continuous Spiral Path Trace",
    animationDescription: "A glowing gold energy wave flows continuously along the logarithmic Fibonacci curve outward from the core.",
    subtitle: "Fibonacci Geometry & Exponential Growth",
    description:
      "A mathematically exact logarithmic golden spiral (Phi = 1.618) radiating outward from the Simat mark, symbolizing disciplined compounding over generational horizons.",
    symbolism: [
      "Golden Rectangles: Proportionate risk allocation at each portfolio tier",
      "Expanding Spiral: Compounding alpha over generational horizons",
      "Central Origin: Unchanging fiduciary and ethical anchor",
    ],
    details: [
      { title: "Origin Node", sub: "Initial capital seed deployed under strict founder co-investment." },
      { title: "Expansion Arc", sub: "Reinvested returns compounded with systematic downside protection." },
      { title: "Terminal Trajectory", sub: "Multi-decade wealth preservation for family offices and endowments." },
    ],
  },
  {
    id: "diamond-seal",
    name: "Concentric Diamond Seal",
    category: "geometric",
    categoryLabel: "Geometric Shape",
    badge: "Canonical I1",
    animationType: "Ambient Core Breathing",
    animationDescription: "Slow 8-second ambient warmth pulse behind the Simat mark with subtle quadrant crosshair alignment.",
    subtitle: "Triple Concentric Diamonds & Cardinal Disciplines",
    description:
      "The canonical hallmark from Section 5 of the design brief. Three concentric diamonds in fine 1.2px gold line work anchoring the four cardinal investment stages.",
    symbolism: [
      "Inner Diamond: Proprietary fundamental research",
      "Mid Diamond: Systematic controls and balance checks",
      "Outer Diamond: Researched → Screened → Approved → Recorded",
    ],
    details: [
      { title: "Researched", sub: "Documented valuation model, fair-value range, and bear-case downside thesis." },
      { title: "Screened", sub: "Four-gate Shariah filter and eleven pre-trade quantitative checks." },
      { title: "Approved", sub: "Single CIO order authorization; bound to exact parameters and expires if unused." },
      { title: "Recorded", sub: "Immutable audit ledger tracking every decision against its thesis." },
    ],
  },

  // -------------------------------------------------------------
  // 3. NATURE, COSMOS & ARCHITECTURE
  // -------------------------------------------------------------
  {
    id: "star-chart",
    name: "Celestial Star Chart & Polaris",
    category: "nature-architecture",
    categoryLabel: "Cosmos & Heritage",
    badge: "Astrometry",
    animationType: "Stellar Twinkle & Polaris Pulse",
    animationDescription: "Constellation stars twinkle in asynchronous phases while Polaris radiates a gentle starlight beam.",
    subtitle: "Night Sky Navigating by the North Star",
    description:
      "An authentic astronomical sky map featuring Ursa Major, Cassiopeia, and Cygnus navigating toward Polaris (The North Star) at the true zenith center.",
    symbolism: [
      "Polaris (Center): The immutable ethical standard anchored at the zenith",
      "Ursa Major: Market intelligence and fundamental research scanning",
      "Celestial Grid: Systematic coordinates guiding capital allocation",
    ],
    details: [
      { title: "Polaris (Zenith)", sub: "Fixed North Star crowned by the Simat emblem; unwavering principles." },
      { title: "Pointer Stars", sub: "Two pointer stars pointing directly to truth and intrinsic value." },
      { title: "Hour Markers", sub: "Right Ascension hours marking continuous global market surveillance." },
    ],
  },
  {
    id: "topography",
    name: "Topographic Contour Terrain",
    category: "nature-architecture",
    categoryLabel: "Cosmos & Heritage",
    badge: "Swiss Cartography",
    animationType: "Elevation Laser Scan",
    animationDescription: "A golden laser scanline sweeps vertically across the terrain, illuminating contour ridges from base to summit.",
    subtitle: "Elevation Contours of Fundamental Alpha",
    description:
      "Organic Swiss cartographic elevation contour lines depicting market depth, margin of safety ridges, and the summit of intrinsic fair value.",
    symbolism: [
      "Base Contours (+400m): The verified Shariah compliance floor",
      "Mid Contours (+1,200m): The margin of safety protecting against drawdowns",
      "Summit Peak (+1,850m): True intrinsic value discovered through original research",
    ],
    details: [
      { title: "+400m Shariah Floor", sub: "Zero non-compliant revenue; comprehensive sector negative screens." },
      { title: "+1,200m Safety Ridge", sub: "Under-studied small and mid-caps with substantial margin of safety." },
      { title: "+1,850m Summit Peak", sub: "Geodetic survey marker holding the Simat mark at peak intrinsic value." },
    ],
  },
  {
    id: "harmonic-waves",
    name: "Alpha Signal Harmonic Wave",
    category: "nature-architecture",
    categoryLabel: "Cosmos & Heritage",
    badge: "Signal Frequency",
    animationType: "Harmonic Oscilloscope Wave",
    animationDescription: "Three layered sinusoidal wave ribbons flow continuously across the horizon, separating pure signal from market noise.",
    subtitle: "Mathematical Oscilloscope of Signal vs. Noise",
    description:
      "A layered harmonic wave visualization representing the continuous processing of global financial filings, price volatility, and catalyst events into pure actionable signal.",
    symbolism: [
      "High Frequency Wave: Market volatility and consensus noise filtered out",
      "Mid Harmonic Ribbon: Structural industry inflections and earnings catalysts",
      "Fundamental Baseline: Intrinsic cash flow value and durable competitive edge",
    ],
    details: [
      { title: "Signal Detection", sub: "Filings, results, prices and events across the UK, US, and Japan." },
      { title: "Harmonic Filter", sub: "Eliminating short-term momentum noise through systematic quantitative rules." },
      { title: "Pure Alpha Stream", sub: "Documented fair-value thesis executed with absolute discipline." },
    ],
  },
  {
    id: "tree-of-roots",
    name: "Tree of Deep Roots & Canopy",
    category: "nature-architecture",
    categoryLabel: "Cosmos & Heritage",
    badge: "Organic Botanical",
    animationType: "Subterranean Sap Pulse",
    animationDescription: "Golden light energy pulses down through subterranean roots and ascends into canopy branches and leaf nodes.",
    subtitle: "Subterranean Research Roots & Fruitful Growth",
    description:
      "Fine gold botanical line art of a noble tree with deep subterranean root architecture and an ascending canopy, reflecting Quran 14:24.",
    symbolism: [
      "Subterranean Roots: Deep fundamental research and unshakeable ethical principles",
      "Fluted Trunk: Fiduciary governance, transparency, and founder co-investment",
      "Ascending Canopy: Sustainable, ethical capital growth across generations",
    ],
    details: [
      { title: "Anchor Taproot", sub: "Primary financial modeling built directly from audited regulatory filings." },
      { title: "Heartwood Trunk", sub: "Founder's own capital deployed side-by-side with investors." },
      { title: "Canopy Branches", sub: "Long-term compounding without speculative leverage or derivatives." },
    ],
  },
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
    id: "four-rulebooks",
    name: "Four Rulebooks, Two Answers",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Shariah Standards",
    animationType: "Static Comparison",
    animationDescription: "A static four-card comparison: the same filing read by AAOIFI, S&P, MSCI and FTSE.",
    subtitle: "Why a house standard matters",
    description:
      "One illustrative company measured by four Shariah standards. Debt divided by market value fails AAOIFI and S&P; debt divided by total assets passes MSCI and FTSE. Simat applies one house standard and records why.",
    symbolism: [
      "Top row: market-value tests that fail",
      "Bottom row: total-asset tests that pass",
      "Centre: one company, one filing",
    ],
    details: [
      { title: "AAOIFI", sub: "33.7% of market value against a 30% limit: fail." },
      { title: "S&P Shariah", sub: "33.7% of average market value against 33%: fail." },
      { title: "MSCI & FTSE", sub: "32.0% of total assets against 33.33%: pass." },
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
    id: "one-order-seal",
    name: "One Exact Order, One Approval",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "CIO Approval",
    animationType: "Expiry Seal Unwind",
    animationDescription: "The ring around the approval seal unwinds, showing the approval expiring if it goes unused.",
    subtitle: "A person decides, once, for one order",
    description:
      "An order ticket bound to a single CIO approval: exact shares, exact limit price, eleven checks and the committee view attached. The approval is given by passkey, covers only this order, and expires if unused. Any change cancels it.",
    symbolism: [
      "Ticket: one exact order, nothing else",
      "Seal: the CIO's approval, bound to it",
      "Unwinding ring: it expires if unused",
    ],
    details: [
      { title: "The order", sub: "Buy 1,418 shares, limit £42.30 (illustrative)." },
      { title: "The evidence", sub: "11 of 11 checks passed, committee view attached." },
      { title: "The approval", sub: "CIO passkey; any change to the order cancels it." },
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
    id: "fair-value-range",
    name: "Fair-Value Range & Margin of Safety",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Valuation",
    animationType: "Price Marker Bob",
    animationDescription: "The price marker floats gently above the bear-to-bull range, below the base value.",
    subtitle: "Price can veto a great company",
    description:
      "Every idea is valued three ways before it is sized: bear, base and bull. The gap between today's price and the base value is the margin of safety. A great company at the wrong price waits on the watchlist. Figures are illustrative.",
    symbolism: [
      "Band: bear £36 to bull £68",
      "Marker: today's price, £42",
      "Bracket: the margin of safety to base value",
    ],
    details: [
      { title: "Bear case", sub: "£36: what the position is worth if we are wrong." },
      { title: "Base case", sub: "£55: the documented fair value." },
      { title: "Margin of safety", sub: "Price below base value leaves room for error." },
    ],
  },
  {
    id: "committee-five",
    name: "The Committee of Five",
    category: "process",
    categoryLabel: "Process & Proof",
    badge: "Investment Committee",
    animationType: "Voices in Fixed Order",
    animationDescription: "Each of the five views lights in turn before the case reaches the CIO.",
    subtitle: "Bull and bear argued in full; dissent kept",
    description:
      "Five views speak once, in a fixed order: Research, Valuation, Risk, Shariah and Portfolio. Risk's dissent travels with the proposal on the record. The committee recommends; only the CIO decides.",
    symbolism: [
      "Arc of five: each view speaks once",
      "Dashed node: dissent recorded, not discarded",
      "Base: the CIO, the only one who can approve",
    ],
    details: [
      { title: "Research & Valuation", sub: "Thesis traced to sources; base value against price." },
      { title: "Risk (dissent)", sub: "Prefers a smaller size; the dissent stays on record." },
      { title: "Shariah & Portfolio", sub: "Code-only screen; sized, costed proposal to the CIO." },
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
