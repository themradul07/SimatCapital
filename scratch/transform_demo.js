const fs = require('fs');

let content = fs.readFileSync('private-archive/shariah-ops-and-master-tour-archive.html', 'utf8');

// 1. Update title
content = content.replace(
  /<title>.*?<\/title>/s,
  '<title>Simat Capital — Confidential Investor Overview</title>'
);

// 2. In script, update DECKS to only have 'all' with the 10 slides and 'loop' with the interactive loop
const old_decks_pattern = /const DECKS = \{.*?\n\};\n/s;
const new_decks = `const DECKS = {
  all: [
    { type: 'inv', id: 1 },   // Slide 1: Our beliefs
    { type: 'inv', id: 2 },   // Slide 2: The problem (with 5 and 6 merged in)
    { type: 'inv', id: 15 },  // Slide 3: Why Shariah is hard
    { type: 'inv', id: 8 },   // Slide 4: Our process
    { type: 'inv', id: 9 },   // Slide 5: Shariah in action (Honeywell)
    { type: 'inv', id: 5 },   // Slide 6: When markets fall
    { type: 'inv', id: 10 },  // Slide 7: What investors would receive
    { type: 'inv', id: 11 },  // Slide 8: The founder
    { type: 'inv', id: 12 },  // Slide 9: Governance and risks (merged)
    { type: 'inv', id: 14 }   // Slide 10: Closing
  ],
  loop: [
    { type: 'loop', id: 0 }
  ]
};
`;
content = content.replace(old_decks_pattern, new_decks);

// 3. Update Slide 1 Beliefs data in _invCompute:
const old_patience = "{ t: 'Patience', b: 'At most 14 stocks, held for years.', how: 'Our horizon is three to five years for every holding.', anim: 'fb', accent: C.pl }";
const new_patience = "{ t: 'Patience', b: 'A concentrated portfolio of 11 to 14 companies, held for the long term.', how: 'Our horizon is three to five years for every holding.', anim: 'fb', accent: C.pl }";
content = content.replace(old_patience, new_patience);

// 4. In Slide 1 template:
const old_s1_header = `<div class="fu" style="display: flex; flex-direction: column; gap: 10px">
        <span style="font-size: 12px; letter-spacing: 0.22em; color: #C9A84C; font-weight: 600">OUR FOUR BELIEFS</span>
        <h1 style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 48px; line-height: 1.08">Four principles hold the whole mark together.</h1>
      </div>`;

const new_s1_header = `<div class="fu" style="display: flex; flex-direction: column; gap: 10px">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px">
          <span style="font-size: 11.5px; letter-spacing: 0.22em; color: #C9A84C; font-weight: 700; text-transform: uppercase">SIMAT CAPITAL – INVESTOR OVERVIEW. CONFIDENTIAL.</span>
          <span style="font-size: 12.5px; color: #B9AF9C; font-style: italic">Both strategies currently run on the founder’s own capital.</span>
        </div>
        <h1 style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 46px; line-height: 1.08">Four principles behind every decision.</h1>
      </div>`;
content = content.replace(old_s1_header, new_s1_header);

// 5. Update Slide 2 Q array in _invCompute:
const old_q = `    const Q = [
      { title: 'Concentrated in a few tech giants', stat: '~44%', statLabel: 'of the largest US Shariah ETF is in just 5 stocks.', problem: 'Screening leaves mostly tech, so one sell-off hits hard.', head: 'Hard limits, applied to us first.', answer: 'Our system flagged our own semiconductor weight on day one. We are bringing it down.', kind: 'reduced' },
      { title: 'A small investable universe', stat: 'Sukuk', statLabel: 'replaces bonds, but the market is small and thin.', problem: 'Most Shariah funds end up owning the same big names.', head: 'We look where others don’t.', answer: 'Compliant small and mid caps across the UK, US and Japan, with gold and cash as ballast.', kind: 'reduced' },
      { title: 'No single rulebook', stat: '30% vs 33%', statLabel: 'Different debt limits, measured different ways.', problem: 'The same stock can pass one board and fail another.', head: 'One house standard, checked against the rest.', answer: 'Disagreements are reviewed before any purchase, and the reason is recorded.', kind: 'solved' },
      { title: 'Status that flips with the price', stat: 'Price', statLabel: 'alone can push a company over the debt line.', problem: 'Funds get forced to sell at the worst moment.', head: 'Stable tests. No forced selling.', answer: 'Debt is measured against total assets, and a change opens a review, not a sale.', kind: 'solved' },
      { title: 'High cost of compliance', stat: '3 layers', statLabel: 'of extra cost: scholars, monitoring, purification.', problem: 'Those costs end up in your fees.', head: 'Automated and recorded.', answer: 'The system screens and purifies every holding. The scholar checks the method.', kind: 'reduced' },
      { title: 'Few tools to manage risk', stat: 'No hedges', statLabel: 'Derivatives are generally off limits.', problem: 'Little protection when markets crash.', head: 'Risk managed before it arrives.', answer: 'Limits, daily stress tests, gold and cash, and a check that blocks costly trades.', kind: 'limit' },
      { title: 'Oversight you take on trust', stat: '621', statLabel: 'board seats held by 20 scholars (2010 study).', problem: 'Investors rarely see why a stock was approved.', head: 'Evidence anyone can check.', answer: 'Every Shariah verdict is logged with its evidence and a plain-English reason.', kind: 'solved' }
    ];`;

const new_q = `    const Q = [
      {
        title: 'Passive fund concentration',
        stat: '24%',
        statLabel: 'in just 3 companies (Apple 8.2%, Microsoft 8.1%, Alphabet 8.0%) in the HSBC Islamic Global Fund.',
        problem: 'Screening concentrates capital in a handful of US tech mega-caps, leaving investors exposed to single-sector drawdowns.',
        head: 'We aim to own only the companies that earn their place.',
        answer: 'A concentrated portfolio of 11 to 14 companies built on bottom-up conviction across the UK, US and Japan, rather than copying index weight.',
        kind: 'solved'
      },
      {
        title: 'Always fully invested in a fall',
        stat: '−25.3%',
        statLabel: 'drop in the HSBC Islamic Global Fund in 2022.',
        problem: 'Index funds are required to stay 100% invested at all times, with no ability to hold cash or defensive ballast during market declines.',
        head: 'Aim to limit drawdowns.',
        answer: 'Gold and cash held as mandatory ballast in the mandate to cushion falls and provide dry powder to buy quality companies at lower prices.',
        kind: 'solved'
      },
      {
        title: 'Buying at any price',
        stat: 'No veto',
        statLabel: 'An ETF buys every stock left after screening.',
        problem: 'Passive funds must allocate capital regardless of valuation multiples, interest rates or debt trajectory.',
        head: 'Valuation discipline before sizing.',
        answer: 'Every holding must have an explicit margin of safety, tested bear case, and documented intrinsic valuation range.',
        kind: 'solved'
      },
      {
        title: 'Concentrated in tech / Semiconductor overweight',
        stat: 'Tech bias',
        statLabel: 'Screening leaves technology as the default sector.',
        problem: 'Without sector and theme caps, portfolios drift into crowded trades and correlated semiconductor risks.',
        head: 'Hard limits, applied to ourselves first.',
        answer: 'Our own limits flagged a semiconductor overweight, and we are reducing it within our rebalancing rules.',
        kind: 'solved'
      },
      {
        title: 'Status flips with the share price',
        stat: 'Price swings',
        statLabel: 'can trigger an arbitrary compliance breach.',
        problem: 'Measuring debt against fluctuating market cap forces funds into emergency selling at the market bottom.',
        head: 'Reduce the risk of being a forced seller.',
        answer: 'Debt is measured against total assets as well as market cap. A breach triggers review and an orderly grace period, not automatic fire-sales.',
        kind: 'solved'
      },
      {
        title: 'Few tools to manage downside',
        stat: 'No hedges',
        statLabel: 'Derivatives are impermissible under Shariah.',
        problem: 'Conventional risk mitigation tools are unavailable, leaving traditional funds with little protection when markets turn.',
        head: 'Pre-set plan, decided in advance.',
        answer: 'Position caps, daily stress tests, gold and cash ballast, and pre-trade checks that verify liquidity before any order.',
        kind: 'limit'
      },
      {
        title: 'Compliance you take on trust',
        stat: '621',
        statLabel: 'board seats held by 20 scholars (study).',
        problem: 'Investors rarely see the evidence, financial ratios or rationale behind Shariah approvals.',
        head: 'Evidence anyone can check.',
        answer: 'Every verdict, financial ratio, filing reference and CIO sign-off is versioned and permanently recorded.',
        kind: 'solved'
      }
    ];`;
content = content.replace(old_q, new_q);

// 6. Update Slide 2 Heading and Source in template:
const old_s2_header = `<span class="fu" style="font-size: 12px; letter-spacing: 0.22em; color: #C9A84C; font-weight: 600">THE PROBLEMS WE SOLVE</span>
          <h1 class="fu d1" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 40px; line-height: 1.08">Shariah investing has seven unsolved problems. We built Simat Capital around them.</h1>`;

const new_s2_header = `<span class="fu" style="font-size: 12px; letter-spacing: 0.22em; color: #C9A84C; font-weight: 600">THE PROBLEMS WE SOLVE</span>
          <h1 class="fu d1" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 38px; line-height: 1.08">Shariah investors face problems that screening alone doesn’t solve.</h1>`;
content = content.replace(old_s2_header, new_s2_header);

const old_s2_source = `<span class="fu d6" style="font-size: 11px; color: #6F675A">Sources: HalalWallet, SPUS fund review and screening comparison (2026); Bloomberg (2010) on scholar board seats; Hong Kong IFEC guide to Islamic funds.</span>`;
const new_s2_source = `<span class="fu d6" style="font-size: 11px; color: #6F675A">Sources: HSBC Islamic Global Equity Index Fund factsheet (30 Sep 2026); Bloomberg on scholar board seats; Hong Kong IFEC guide to Islamic funds. Simat aims are objectives, not guarantees.</span>`;
content = content.replace(old_s2_source, new_s2_source);

// 7. Slide 3 (inv_s15) - Replace Halal Terminal credit with "Illustrative example."
content = content.replace("Example adapted from Halal Terminal's methodology page", "Illustrative example.");

// 8. Slide 4 (inv_s8) - Add at top: "From a wide Shariah-screened universe across the UK, US and Japan to 11 to 14 holdings."
const old_s8_header = `<div style="display: flex; flex-direction: column; gap: 6px">
          <span class="fu" style="font-size: 12px; letter-spacing: 0.22em; color: #E8CF83; font-weight: 600">THE SIMAT ENGINE</span>
          <h1 class="fu d1" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 38px; line-height: 1.05">Six checks. One decision. Every idea, every time.</h1>
        </div>`;

const new_s8_header = `<div style="display: flex; flex-direction: column; gap: 6px">
          <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px">
            <span class="fu" style="font-size: 12px; letter-spacing: 0.22em; color: #E8CF83; font-weight: 600">OUR PROCESS</span>
            <span class="fu d1" style="font-size: 12.5px; color: #CFC6B5">From a wide Shariah-screened universe across the UK, US and Japan to 11 to 14 holdings.</span>
          </div>
          <h1 class="fu d1" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 38px; line-height: 1.05">Six checks. One decision. Every idea, every time.</h1>
        </div>`;
content = content.replace(old_s8_header, new_s8_header);

// 9. Slide 5 (inv_s9) - Change "We caught it" to "Our process flagged it the same day."
content = content.replace(
  "A spin-off pushed Honeywell over the line. We caught it.",
  "A spin-off pushed Honeywell over the line. Our process flagged it the same day."
);

// 10. Slide 6 (inv_s5) - Heading: "Every fund falls sometimes. Our response is decided in advance."
// Remove £10,000 chart and beta estimate
const old_s5 = `  <sc-if value="{{ inv_s5 }}" hint-placeholder-val="{{ false }}">
    <div class="slide" style="position: absolute; top: 112px; bottom: 70px; left: 56px; right: 56px; display: flex; flex-direction: column; gap: 20px; justify-content: center">
      <div style="display: flex; justify-content: space-between; align-items: flex-end">
        <div style="display: flex; flex-direction: column; gap: 6px">
          <span class="fu" style="font-size: 12px; letter-spacing: 0.22em; color: #FF8A73; font-weight: 600">THE DOWNSIDE</span>
          <h1 class="fu d1" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 42px; line-height: 1.05">Every fund falls sometimes. Ours has a plan decided in advance.</h1>
        </div>
        <div class="fu d2" role="group" aria-label="Choose a market fall" style="display: flex; gap: 6px">
          <sc-for list="{{ drops }}" as="dr" hint-placeholder-count="3">
            <button onClick="{{ dr.pick }}" style="height: 48px; width: 92px; border-radius: 24px; border: 1px solid {{ dr.bd }}; background: {{ dr.bg }}; color: {{ dr.fg }}; font-size: 16px; font-weight: 700; cursor: pointer; transition: background .3s ease">{{ dr.label }}</button>
          </sc-for>
        </div>
      </div>
      <div style="display: flex; gap: 28px; align-items: stretch">
        <div class="fu d2" style="flex: 1 1 0; display: flex; flex-direction: column; gap: 18px; border: 1px solid rgba(255,255,255,0.09); border-radius: 18px; padding: 26px 28px">
          <div style="display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; justify-content: space-between"><span style="font-size: 14px; color: #B9AF9C">Start</span><span style="font-size: 14px">£10,000</span></div>
            <div style="height: 22px; background: rgba(255,255,255,0.11); border-radius: 6px; width: 100%"></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; justify-content: space-between"><span style="font-size: 14px; color: #B9AF9C">The market</span><span style="font-size: 18px; font-weight: 600">{{ dMkt }}</span></div>
            <div style="height: 22px; background: rgba(255,255,255,0.07); border-radius: 6px"><div style="height: 22px; width: {{ dMktW }}%; background: #6EA8FF; border-radius: 6px; transition: width .7s cubic-bezier(.2,.7,.2,1)"></div></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; justify-content: space-between"><span style="font-size: 14px; color: #B9AF9C">Flagship Fund, estimated</span><span style="font-size: 18px; font-weight: 600; color: #FF8A73">{{ dFund }}</span></div>
            <div style="height: 22px; background: rgba(255,255,255,0.07); border-radius: 6px"><div style="height: 22px; width: {{ dFundW }}%; background: #FF8A73; border-radius: 6px; transition: width .7s cubic-bezier(.2,.7,.2,1)"></div></div>
          </div>
          <span style="font-size: 12px; line-height: 1.5; color: #8F8676">Estimate uses the Flagship's beta of 1.08: it has tended to move slightly more than the market. A real fall could be better or worse.</span>
        </div>
        <div style="flex: 0 0 400px; display: flex; flex-direction: column; gap: 12px">
          <div class="fr" style="border: 1px solid #3CCB8F; background: rgba(60,203,143,0.08); border-radius: 18px; padding: 22px 24px; display: flex; flex-direction: column; gap: 14px">
            <span style="font-size: 11px; letter-spacing: 0.18em; color: #3CCB8F; font-weight: 700">OUR PLAN, DECIDED IN ADVANCE</span>
            <div style="display: flex; gap: 12px; align-items: center"><span style="font-family: 'Cormorant Garamond', serif; font-size: 26px; color: #3CCB8F; width: 22px">1</span><span style="font-size: 15px">No panic selling</span></div>
            <div style="display: flex; gap: 12px; align-items: center"><span style="font-family: 'Cormorant Garamond', serif; font-size: 26px; color: #3CCB8F; width: 22px">2</span><span style="font-size: 15px">Gold and cash cushion the fall</span></div>
            <div style="display: flex; gap: 12px; align-items: center"><span style="font-family: 'Cormorant Garamond', serif; font-size: 26px; color: #3CCB8F; width: 22px">3</span><span style="font-size: 15px">Buy quality companies at lower prices</span></div>
          </div>
          <div class="fr" style="border: 1px dashed #5E574B; border-radius: 18px; padding: 18px 22px; display: flex; flex-direction: column; gap: 6px">
            <span style="font-size: 11px; letter-spacing: 0.18em; color: #B9AF9C; font-weight: 700">THE HONEST PART</span>
            <span style="font-size: 14px; line-height: 1.5; color: #CFC6B5">Shariah funds can't hedge with derivatives. Past falls have recovered, but sometimes over years.</span>
          </div>
        </div>
      </div>
    </div>
  </sc-if>`;

const new_s5 = `  <sc-if value="{{ inv_s5 }}" hint-placeholder-val="{{ false }}">
    <div class="slide" style="position: absolute; top: 112px; bottom: 70px; left: 56px; right: 56px; display: flex; flex-direction: column; gap: 24px; justify-content: center">
      <div style="display: flex; justify-content: space-between; align-items: flex-end">
        <div style="display: flex; flex-direction: column; gap: 6px">
          <span class="fu" style="font-size: 12px; letter-spacing: 0.22em; color: #FF8A73; font-weight: 600">DOWNSIDE RISK</span>
          <h1 class="fu d1" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 40px; line-height: 1.05">Every fund falls sometimes. Our response is decided in advance.</h1>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 24px; align-items: stretch">
        <div class="fu d2" style="border: 1px solid #3CCB8F; background: rgba(60,203,143,0.06); border-radius: 18px; padding: 28px; display: flex; flex-direction: column; gap: 20px">
          <div style="display: flex; align-items: center; justify-content: space-between">
            <span style="font-size: 11.5px; letter-spacing: 0.18em; color: #3CCB8F; font-weight: 700">OUR PLAN, DECIDED IN ADVANCE</span>
            <span style="font-size: 11px; color: #8F8676; font-family: monospace">IN THE MANDATE</span>
          </div>
          <div style="display: flex; gap: 16px; align-items: flex-start">
            <span style="font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #3CCB8F; line-height: 1">1</span>
            <div>
              <span style="font-size: 16px; font-weight: 600; color: #F7F3E8">No panic selling</span>
              <p style="margin: 4px 0 0; font-size: 13.5px; line-height: 1.5; color: #CFC6B5">Positions are sized from the start so no single mistake or temporary market dislocation forces an exit.</p>
            </div>
          </div>
          <div style="display: flex; gap: 16px; align-items: flex-start">
            <span style="font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #3CCB8F; line-height: 1">2</span>
            <div>
              <span style="font-size: 16px; font-weight: 600; color: #F7F3E8">Gold and cash cushion the fall</span>
              <p style="margin: 4px 0 0; font-size: 13.5px; line-height: 1.5; color: #CFC6B5">Mandatory defensive ballast (gold and unencumbered cash) is held directly in the portfolio to absorb volatility and protect capital.</p>
            </div>
          </div>
          <div style="display: flex; gap: 16px; align-items: flex-start">
            <span style="font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #3CCB8F; line-height: 1">3</span>
            <div>
              <span style="font-size: 16px; font-weight: 600; color: #F7F3E8">Buy quality companies at lower prices</span>
              <p style="margin: 4px 0 0; font-size: 13.5px; line-height: 1.5; color: #CFC6B5">Cash provides immediate dry powder to systematically accumulate exceptional, pre-researched businesses when market prices fall below fair value.</p>
            </div>
          </div>
        </div>
        <div class="fr d3" style="display: flex; flex-direction: column; gap: 18px">
          <div style="border: 1px dashed #5E574B; border-radius: 18px; padding: 24px; display: flex; flex-direction: column; gap: 12px; background: rgba(255,255,255,0.02)">
            <span style="font-size: 11.5px; letter-spacing: 0.18em; color: #E8CF83; font-weight: 700">THE HONEST PART</span>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #D8D0C0">Shariah funds cannot hedge with derivatives. When markets fall, equity prices fluctuate. What we control is what we own, what price we paid, and having the ballast to endure drawdowns without becoming forced sellers.</p>
          </div>
          <div style="border: 1px solid rgba(255,255,255,0.09); border-radius: 18px; padding: 22px; display: flex; flex-direction: column; gap: 8px">
            <span style="font-size: 11px; letter-spacing: 0.16em; color: #B9AF9C; font-weight: 700">FIDUCIARY MANDATE</span>
            <p style="margin: 0; font-size: 13.5px; line-height: 1.55; color: #8F8676">Strict position caps (maximum 10% in any single equity) and pre-trade liquidity filters ensure risk budgets cannot be overridden in volatile markets.</p>
          </div>
        </div>
      </div>
    </div>
  </sc-if>`;
content = content.replace(old_s5, new_s5);

// 11. Slide 7 (inv_s10 - What investors would receive)
// Remove return figures and [£ amount] placeholder
const old_s10 = `  <sc-if value="{{ inv_s10 }}" hint-placeholder-val="{{ false }}">
    <div class="slide" style="position: absolute; top: 112px; bottom: 70px; left: 56px; right: 56px; display: flex; flex-direction: column; gap: 22px; justify-content: center">
      <div style="display: flex; justify-content: space-between; align-items: flex-end">
        <div style="display: flex; flex-direction: column; gap: 8px">
          <span class="fu" style="font-size: 12px; letter-spacing: 0.22em; color: #C9A84C; font-weight: 600">WHAT YOU RECEIVE</span>
          <h1 class="fu d1" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 42px; line-height: 1.08">You see everything we see.</h1>
        </div>
        <span class="fu d2" style="font-size: 12px; color: #8F8676">Illustrative client views</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px">
        <div class="ft" style="border: 1px solid rgba(255,255,255,0.15); background: #F6F1E6; color: #0B0A08; border-radius: 18px; padding: 22px 24px; display: flex; flex-direction: column; gap: 12px; min-height: 330px; box-sizing: border-box">
          <div style="display: flex; justify-content: space-between; align-items: center"><span style="font-size: 11px; letter-spacing: 0.16em; font-weight: 700; color: #7A5C17">QUARTERLY REPORT</span><span style="font-size: 12px; color: #5E574B">Q3 2026</span></div>
          <span style="font-family: 'Cormorant Garamond', serif; font-size: 26px; line-height: 1.1">Your portfolio this quarter</span>
          <div style="display: flex; justify-content: space-between; font-size: 14px; border-bottom: 1px solid #E2D9C6; padding-bottom: 8px"><span style="color: #5E574B">Return</span><span style="font-weight: 600">+2.1%</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 14px; border-bottom: 1px solid #E2D9C6; padding-bottom: 8px"><span style="color: #5E574B">Benchmark</span><span>+2.0%</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 14px; border-bottom: 1px solid #E2D9C6; padding-bottom: 8px"><span style="color: #5E574B">Shariah status</span><span>Every holding screened</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 14px"><span style="color: #5E574B">Purification due</span><span style="font-weight: 600">[£ amount]</span></div>
          <span style="margin-top: auto; font-size: 12px; color: #5E574B">With the reasoning behind every change.</span>
        </div>
        <div class="fb" style="display: flex; flex-direction: column; gap: 12px">
          <div style="border: 1px solid #FF8A73; background: rgba(255,255,255,0.045); border-radius: 18px; padding: 18px 20px; display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; justify-content: space-between"><span style="font-size: 11px; letter-spacing: 0.16em; font-weight: 700; color: #FF8A73">SHARIAH ALERT</span><span style="font-size: 12px; color: #8F8676">Same day</span></div>
            <span style="font-size: 15px; font-weight: 600">Honeywell flagged for review</span>
            <span style="font-size: 13px; line-height: 1.5; color: #B9AF9C">Debt rose above the Shariah threshold after the spin-off. New purchases blocked. No action needed from you.</span>
          </div>
          <div style="border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.045); border-radius: 18px; padding: 18px 20px; display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; justify-content: space-between"><span style="font-size: 11px; letter-spacing: 0.16em; font-weight: 700; color: #3CCB8F">PURIFICATION STATEMENT</span><span style="font-size: 12px; color: #8F8676">Annual</span></div>
            <span style="font-size: 15px; font-weight: 600">Calculated per holding, in pounds</span>
            <span style="font-size: 13px; line-height: 1.5; color: #B9AF9C">Exactly what to give to charity, and why, so you never have to work it out yourself.</span>
          </div>
        </div>
        <div class="fr" style="border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.045); border-radius: 18px; padding: 22px 24px; display: flex; flex-direction: column; gap: 12px; min-height: 330px; box-sizing: border-box">
          <div style="display: flex; justify-content: space-between"><span style="font-size: 11px; letter-spacing: 0.16em; font-weight: 700; color: #6EA8FF">DECISION LOG</span><span style="font-size: 12px; color: #8F8676">Every trade</span></div>
          <div style="display: flex; flex-direction: column; gap: 4px; border-left: 2px solid #6EA8FF; padding-left: 12px"><span style="font-size: 12px; color: #8F8676">Example entry</span><span style="font-size: 14px; font-weight: 600">Trim semiconductor exposure</span><span style="font-size: 13px; line-height: 1.5; color: #B9AF9C">Reason: sector above its limit. Approved by the CIO. Evidence attached.</span></div>
          <div style="display: flex; flex-direction: column; gap: 4px; border-left: 2px solid #5E574B; padding-left: 12px"><span style="font-size: 12px; color: #8F8676">Example entry</span><span style="font-size: 14px; font-weight: 600">Idea rejected: valuation</span><span style="font-size: 13px; line-height: 1.5; color: #B9AF9C">Strong business, wrong price. Kept on the watchlist with a target entry.</span></div>
          <span style="margin-top: auto; font-size: 12px; color: #8F8676">Rejected ideas are recorded too.</span>
        </div>
      </div>
    </div>
  </sc-if>`;

const new_s10 = `  <sc-if value="{{ inv_s10 }}" hint-placeholder-val="{{ false }}">
    <div class="slide" style="position: absolute; top: 112px; bottom: 70px; left: 56px; right: 56px; display: flex; flex-direction: column; gap: 22px; justify-content: center">
      <div style="display: flex; justify-content: space-between; align-items: flex-end">
        <div style="display: flex; flex-direction: column; gap: 8px">
          <span class="fu" style="font-size: 12px; letter-spacing: 0.22em; color: #C9A84C; font-weight: 600">WHAT INVESTORS RECEIVE</span>
          <h1 class="fu d1" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 40px; line-height: 1.08">Full visibility of every decision that affects your capital.</h1>
        </div>
        <span class="fu d2" style="font-size: 12px; color: #8F8676">Institutional reporting standards</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px">
        <div class="ft" style="border: 1px solid rgba(255,255,255,0.15); background: #F6F1E6; color: #0B0A08; border-radius: 18px; padding: 22px 24px; display: flex; flex-direction: column; gap: 14px; min-height: 330px; box-sizing: border-box">
          <div style="display: flex; justify-content: space-between; align-items: center"><span style="font-size: 11px; letter-spacing: 0.16em; font-weight: 700; color: #7A5C17">QUARTERLY REPORT</span><span style="font-size: 12px; color: #5E574B">Executive summary</span></div>
          <span style="font-family: 'Cormorant Garamond', serif; font-size: 26px; line-height: 1.1">Your portfolio this quarter</span>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13.5px">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E2D9C6; padding-bottom: 8px"><span style="color: #5E574B">Holdings & Weights</span><span style="font-weight: 600">Complete transparency</span></div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E2D9C6; padding-bottom: 8px"><span style="color: #5E574B">Shariah status</span><span style="font-weight: 600">Every holding verified</span></div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E2D9C6; padding-bottom: 8px"><span style="color: #5E574B">Purification summary</span><span>Calculated per tax lot</span></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: #5E574B">Written rationale</span><span>Documented per order</span></div>
          </div>
          <span style="margin-top: auto; font-size: 12px; color: #5E574B">With the written reasoning behind every change.</span>
        </div>
        <div class="fb" style="display: flex; flex-direction: column; gap: 12px">
          <div style="border: 1px solid #FF8A73; background: rgba(255,255,255,0.045); border-radius: 18px; padding: 20px 22px; display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; justify-content: space-between"><span style="font-size: 11px; letter-spacing: 0.16em; font-weight: 700; color: #FF8A73">SHARIAH ALERT</span><span style="font-size: 12px; color: #8F8676">Same day</span></div>
            <span style="font-size: 15px; font-weight: 600">Real-time notification</span>
            <span style="font-size: 13px; line-height: 1.5; color: #B9AF9C">Immediate alert if a holding is flagged for review due to debt or corporate actions. New purchases blocked immediately.</span>
          </div>
          <div style="border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.045); border-radius: 18px; padding: 20px 22px; display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; justify-content: space-between"><span style="font-size: 11px; letter-spacing: 0.16em; font-weight: 700; color: #3CCB8F">PURIFICATION STATEMENT</span><span style="font-size: 12px; color: #8F8676">Per holding</span></div>
            <span style="font-size: 15px; font-weight: 600">Calculated per tax lot</span>
            <span style="font-size: 13px; line-height: 1.5; color: #B9AF9C">Exactly what to donate to charity and why, verified by audited dividend income ratios.</span>
          </div>
        </div>
        <div class="fr" style="border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.045); border-radius: 18px; padding: 22px 24px; display: flex; flex-direction: column; gap: 12px; min-height: 330px; box-sizing: border-box">
          <div style="display: flex; justify-content: space-between"><span style="font-size: 11px; letter-spacing: 0.16em; font-weight: 700; color: #6EA8FF">DECISION LOG</span><span style="font-size: 12px; color: #8F8676">Every trade</span></div>
          <div style="display: flex; flex-direction: column; gap: 4px; border-left: 2px solid #6EA8FF; padding-left: 12px"><span style="font-size: 12px; color: #8F8676">Executed trade</span><span style="font-size: 14px; font-weight: 600">Rebalance / Trim position</span><span style="font-size: 13px; line-height: 1.5; color: #B9AF9C">Reason: sector or holding above threshold. Approved by the CIO. Evidence attached.</span></div>
          <div style="display: flex; flex-direction: column; gap: 4px; border-left: 2px solid #5E574B; padding-left: 12px"><span style="font-size: 12px; color: #8F8676">Rejected idea</span><span style="font-size: 14px; font-weight: 600">Idea vetoed: valuation</span><span style="font-size: 13px; line-height: 1.5; color: #B9AF9C">Sound fundamental profile, but price exceeds margin of safety. Dissent recorded.</span></div>
          <span style="margin-top: auto; font-size: 12px; color: #8F8676">Rejected ideas and dissenting views are preserved in the permanent ledger.</span>
        </div>
      </div>
    </div>
  </sc-if>`;
content = content.replace(old_s10, new_s10);

// 12. Slide 8 (inv_s11 - The founder)
content = content.replace("My own capital is invested alongside yours.", "I invest my own capital through the same process.");

// 13. Slide 9 (inv_s12 - Governance & Risks merged)
const old_prv = `    const PRV = [
      ['Shariah adviser', 'Amanah Advisory', 'Being appointed', 'b'],
      ['Broker and custody', 'Interactive Brokers', 'Moving Q4 2026', 'b'],
      ['Engineering', 'Dedicated development team', 'In place', 'g'],
      ['Legal counsel', 'Specialist financial services firm', 'To appoint', 'o'],
      ['Fund administrator', 'Independent administrator', 'Before outside capital', 'o'],
      ['Auditor', 'Independent auditor', 'Before outside capital', 'o']
    ];`;

const new_prv = `    const PRV = [
      ['Shariah governance', 'Being formalised', 'In progress', 'b'],
      ['Broker and custody', 'Interactive Brokers', 'Confirmed', 'g'],
      ['Fund administration', 'Independent administrator', 'Before outside capital', 'o'],
      ['Auditor', 'Independent auditor', 'Before outside capital', 'o'],
      ['Legal counsel', 'Specialist financial services firm', 'To appoint', 'o']
    ];`;
content = content.replace(old_prv, new_prv);

const old_k = `    const K = [
      { t: 'Short track record', r: '18 months, own capital, unaudited.', m: 'Every quarter reported, weak ones too.' },
      { t: 'Small fund', r: 'Costs matter more at small size.', m: 'Expensive trades are blocked.' },
      { t: 'One decision-maker', r: 'The CIO approves everything.', m: 'Process coded, every decision logged.' },
      { t: 'Concentrated', r: 'At most 14 stocks.', m: 'Hard limits and daily stress tests.' },
      { t: 'Shariah changes', r: 'A filing can change a status.', m: 'Re-screened the same day.' },
      { t: 'Technology', r: 'Bad data or a system error.', m: 'Nightly checks. No order without the CIO.' }
    ];`;

const new_k = `    const K = [
      { t: 'Track record length', r: 'Founder capital since 2021.', m: 'Every quarter reported plainly, weak ones too.' },
      { t: 'Transaction costs', r: 'Friction impacts compounding.', m: 'Trading costs are checked before every order.' },
      { t: 'One decision-maker', r: 'Key-person risk addressed by system.', m: 'Process systematised, every decision logged.' },
      { t: 'Concentrated portfolio', r: '11 to 14 holdings.', m: 'Hard limits, sector caps, and daily stress tests.' },
      { t: 'Shariah changes', r: 'A new filing can alter compliance.', m: 'Re-screened as soon as new filings are published.' },
      { t: 'Technology safeguards', r: 'Data integrity and system checks.', m: 'Nightly checks; no order without CIO approval.' }
    ];`;
content = content.replace(old_k, new_k);

const old_s12 = `  <sc-if value="{{ inv_s12 }}" hint-placeholder-val="{{ false }}">
    <div class="slide" style="position: absolute; top: 112px; bottom: 70px; left: 56px; right: 56px; display: flex; flex-direction: column; gap: 22px; justify-content: center">
      <div style="display: flex; flex-direction: column; gap: 8px">
        <span class="fu" style="font-size: 12px; letter-spacing: 0.22em; color: #C9A84C; font-weight: 600">THE RISKS, STATED PLAINLY</span>
        <h1 class="fu d1" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 42px; line-height: 1.08">Every risk named, with an answer for each.</h1>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px">
        <sc-for list="{{ risks }}" as="k" hint-placeholder-count="6">
          <div class="fu {{ k.delay }}" style="border: 1px solid rgba(255,255,255,0.11); border-radius: 14px; padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; min-height: 150px; box-sizing: border-box">
            <div style="display: flex; align-items: center; gap: 10px"><span style="width: 8px; height: 8px; border-radius: 4px; background: #FF8A73"></span><span style="font-size: 16px; font-weight: 600">{{ k.t }}</span></div>
            <span style="font-size: 13px; line-height: 1.55; color: #B9AF9C">{{ k.r }}</span>
            <div style="height: 1px; background: rgba(255,255,255,0.11)"></div>
            <div style="display: flex; gap: 10px"><span style="font-size: 11px; letter-spacing: 0.14em; color: #3CCB8F; font-weight: 700; padding-top: 2px">HOW</span><span style="font-size: 13px; line-height: 1.55; color: #E8DDC6">{{ k.m }}</span></div>
          </div>
        </sc-for>
      </div>
    </div>
  </sc-if>`;

const new_s12 = `  <sc-if value="{{ inv_s12 }}" hint-placeholder-val="{{ false }}">
    <div class="slide" style="position: absolute; top: 112px; bottom: 70px; left: 56px; right: 56px; display: flex; flex-direction: column; gap: 18px; justify-content: center">
      <div style="display: flex; flex-direction: column; gap: 6px">
        <span class="fu" style="font-size: 12px; letter-spacing: 0.22em; color: #C9A84C; font-weight: 600">INSTITUTIONAL RIGOUR</span>
        <h1 class="fu d1" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 38px; line-height: 1.08">Governance and risks, stated plainly.</h1>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px; align-items: stretch">
        <!-- Left: Governance -->
        <div class="fl" style="border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); border-radius: 18px; padding: 22px 24px; display: flex; flex-direction: column; gap: 14px">
          <span style="font-size: 11px; letter-spacing: 0.18em; color: #E8CF83; font-weight: 700">GOVERNANCE &amp; CUSTODY</span>
          <div style="display: flex; flex-direction: column; border-top: 1px solid rgba(255,255,255,0.1)">
            <sc-for list="{{ provs }}" as="pv" hint-placeholder-count="5">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08)">
                <div style="display: flex; flex-direction: column"><span style="font-size: 13.5px; font-weight: 600">{{ pv.role }}</span><span style="font-size: 12px; color: #B9AF9C">{{ pv.who }}</span></div>
                <span style="font-size: 10.5px; font-weight: 700; padding: 3px 8px; border-radius: 10px; background: {{ pv.bg }}; color: {{ pv.fg }}; border: 1px solid {{ pv.bd }}">{{ pv.status }}</span>
              </div>
            </sc-for>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: auto">
            <span style="font-size: 11px; letter-spacing: 0.14em; color: #8F8676; font-weight: 700">THREE NON-NEGOTIABLE RULES</span>
            <div style="font-size: 13px; color: #F7F3E8; border-left: 2px solid #C9A84C; padding-left: 10px">1. The CIO approves every single trade</div>
            <div style="font-size: 13px; color: #F7F3E8; border-left: 2px solid #C9A84C; padding-left: 10px">2. Nothing is ever sold automatically</div>
            <div style="font-size: 13px; color: #F7F3E8; border-left: 2px solid #C9A84C; padding-left: 10px">3. Limits never loosen after a good quarter</div>
          </div>
        </div>
        <!-- Right: Risks -->
        <div class="fr" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
          <sc-for list="{{ risks }}" as="k" hint-placeholder-count="6">
            <div style="border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); border-radius: 14px; padding: 14px 16px; display: flex; flex-direction: column; gap: 6px">
              <div style="display: flex; align-items: center; gap: 8px"><span style="width: 7px; height: 7px; border-radius: 3.5px; background: #FF8A73"></span><span style="font-size: 14px; font-weight: 600">{{ k.t }}</span></div>
              <span style="font-size: 12px; color: #B9AF9C; line-height: 1.4">{{ k.r }}</span>
              <div style="height: 1px; background: rgba(255,255,255,0.08); margin: 2px 0"></div>
              <span style="font-size: 12.5px; color: #E8DDC6; line-height: 1.45"><b style="color: #3CCB8F; font-size: 10.5px">CONTROL: </b>{{ k.m }}</span>
            </div>
          </sc-for>
        </div>
      </div>
    </div>
  </sc-if>`;
content = content.replace(old_s12, new_s12);

// 14. Slide 10 (inv_s14 - Closing)
const old_s14 = `  <sc-if value="{{ inv_s14 }}" hint-placeholder-val="{{ false }}">
    <div class="slide" style="position: absolute; top: 112px; bottom: 70px; left: 56px; right: 56px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; text-align: center">
      <div class="rise" role="img" aria-label="Simat Capital" style="width: 340px; height: 138px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px"><span style="font-family: 'Cormorant Garamond', serif; font-size: 72px; line-height: 1; font-weight: 600; letter-spacing: 0.16em; padding-left: 0.16em; color: #E2C778">SIMAT</span><span style="font-family: 'Cormorant Garamond', serif; font-size: 22px; line-height: 1; font-weight: 600; letter-spacing: 0.52em; padding-left: 0.52em; color: #C9A84C">CAPITAL</span></div>
      <h1 class="fu d2" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 36px; line-height: 1.15; max-width: 860px">Shariah-compliant investing, with the judgement of an active manager and the discipline of a system.</h1>
      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; width: 900px; text-align: left">
        <div class="fl" style="border: 1px solid #C9A84C; background: rgba(255,255,255,0.045); border-radius: 18px; padding: 24px 26px; display: flex; flex-direction: column; gap: 10px">
          <span style="font-size: 11px; letter-spacing: 0.2em; color: #C9A84C; font-weight: 700">FOR INVESTORS</span>
          <span style="font-family: 'Cormorant Garamond', serif; font-size: 28px">Invest with Simat Capital</span>
          <span style="font-size: 14px; line-height: 1.55; color: #CFC6B5">Family offices and private investors who want a Shariah-compliant active manager.</span>
          <div style="display: flex; gap: 10px; margin-top: 6px">
            <a href="#" style="display: inline-flex; align-items: center; height: 46px; padding: 0 20px; border-radius: 23px; background: #C9A84C; color: #0B0A08; font-size: 14px; font-weight: 600; text-decoration: none">Book a call with the CIO</a>
            <a href="#" style="display: inline-flex; align-items: center; height: 46px; padding: 0 20px; border-radius: 23px; border: 1px solid #C9A84C; color: #E8CF83; font-size: 14px; text-decoration: none">Download the factsheet</a>
          </div>
        </div>
        <div class="fr" style="border: 1px solid rgba(255,255,255,0.15); border-radius: 18px; padding: 24px 26px; display: flex; flex-direction: column; gap: 10px">
          <span style="font-size: 11px; letter-spacing: 0.2em; color: #B9AF9C; font-weight: 700">FOR ADVISERS AND INSTITUTIONS</span>
          <span style="font-family: 'Cormorant Garamond', serif; font-size: 28px">Use our Shariah technology</span>
          <span style="font-size: 14px; line-height: 1.55; color: #CFC6B5">IFAs, family offices and funds who want their clients' portfolios screened and monitored. From Simat Technologies.</span>
          <a href="#" style="align-self: flex-start; margin-top: 6px; display: inline-flex; align-items: center; height: 46px; padding: 0 22px; border-radius: 23px; border: 1px solid #C9A84C; color: #E8CF83; font-size: 14px; text-decoration: none">Book a demo</a>
        </div>
      </div>
      <span class="fu d4" style="font-size: 12px; color: #8F8676">Full due diligence pack for qualified investors, under NDA.</span>
    </div>
  </sc-if>`;

const new_s14 = `  <sc-if value="{{ inv_s14 }}" hint-placeholder-val="{{ false }}">
    <div class="slide" style="position: absolute; top: 112px; bottom: 70px; left: 56px; right: 56px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; text-align: center">
      <div class="rise" role="img" aria-label="Simat Capital" style="width: 320px; height: 110px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px"><span style="font-family: 'Cormorant Garamond', serif; font-size: 64px; line-height: 1; font-weight: 600; letter-spacing: 0.16em; padding-left: 0.16em; color: #E2C778">SIMAT</span><span style="font-family: 'Cormorant Garamond', serif; font-size: 20px; line-height: 1; font-weight: 600; letter-spacing: 0.52em; padding-left: 0.52em; color: #C9A84C">CAPITAL</span></div>
      <h1 class="fu d2" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 36px; line-height: 1.15; max-width: 820px">Shariah-compliant global equity. Institutional discipline.</h1>
      
      <div class="fl" style="border: 1px solid #C9A84C; background: rgba(255,255,255,0.045); border-radius: 20px; padding: 28px 36px; display: flex; flex-direction: column; gap: 14px; max-width: 680px; width: 100%; box-sizing: border-box; text-align: left">
        <span style="font-size: 11px; letter-spacing: 0.2em; color: #C9A84C; font-weight: 700">NEXT STEPS</span>
        <span style="font-family: 'Cormorant Garamond', serif; font-size: 30px">Speak with the CIO</span>
        <span style="font-size: 15px; line-height: 1.55; color: #CFC6B5">Direct, confidential conversation with Eesaa Simat for family offices and institutional allocators assessing the fund.</span>
        <div style="display: flex; gap: 12px; margin-top: 6px; flex-wrap: wrap">
          <a href="/contact#demo" style="display: inline-flex; align-items: center; height: 46px; padding: 0 24px; border-radius: 23px; background: #C9A84C; color: #0B0A08; font-size: 14px; font-weight: 700; text-decoration: none">Speak with the CIO</a>
          <a href="/contact#waitlist" style="display: inline-flex; align-items: center; height: 46px; padding: 0 24px; border-radius: 23px; border: 1px solid #C9A84C; color: #E8CF83; font-size: 14px; font-weight: 600; text-decoration: none">Register your interest</a>
          <button onClick="{{ setLoop }}" style="display: inline-flex; align-items: center; gap: 6px; height: 46px; padding: 0 20px; border-radius: 23px; border: 1px solid rgba(60,203,143,0.6); background: rgba(60,203,143,0.1); color: #3CCB8F; font-size: 13.5px; font-weight: 600; cursor: pointer">
            <span>See the process in action</span>
            <span>↺</span>
          </button>
        </div>
      </div>

      <div class="fu d3" style="display: flex; flex-direction: column; gap: 6px; align-items: center">
        <span style="font-size: 12.5px; color: #CFC6B5">Further information is available on request, under NDA.</span>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: #8F8676">
          <span>Capital at risk. Simat Capital does not manage outside capital. This is not an offer or advice.</span>
          <span>·</span>
          <button onClick="{{ openLegalModal }}" style="background: transparent; border: none; padding: 0; color: #C9A84C; text-decoration: underline; font-size: 11.5px; cursor: pointer">Important information</button>
        </div>
      </div>
    </div>
  </sc-if>`;
content = content.replace(old_s14, new_s14);

// 15. In Interactive Loop, replace AI candidate wording with research engine shortlist
content = content.replace(/The AI picked Calderwick/g, "Research engine shortlisted Calderwick");
content = content.replace(/Let the AI research/g, "Run research engine");
content = content.replace(/AI candidate/g, "Research engine shortlist");
content = content.replace(/AI-picked candidate/g, "Research engine shortlist");

// 16. Update Header & Navigation for the 10 slides:
content = content.replace("inside: isInside,", "inside: true,");
content = content.replace("isCover: isCover,", "isCover: false,");
content = content.replace("pos === 0 ? 'Cover' : ('Slide ' + pos + ' of ' + total)", "'Slide ' + (pos + 1) + ' of ' + currentDeck.length");
content = content.replace("pos === total ? 'Restart ↺' : 'Next ›'", "pos === (currentDeck.length - 1) ? 'Restart ↺' : 'Next ›'");

// Remove Cover element (lines 135-212)
content = content.replace(
  /<sc-if value="\{\{ s0 \}\}" hint-placeholder-val="\{\{ true \}\}">.*?<\/sc-if>\s*<!-- TOP PERSISTENT HEADER/s,
  '<!-- TOP PERSISTENT HEADER'
);

// Replace the middle deck switcher in header with 10-slide indicator:
const old_header_middle = `      <!-- Middle: Deck switcher pills -->
      <div style="display: flex; align-items: center; gap: 8px;">
        <button onClick="{{ setAll }}" style="height: 34px; padding: 0 14px; border-radius: 17px; border: 1px solid {{ deckAllBd }}; background: {{ deckAllBg }}; color: {{ deckAllFg }}; font-size: 11.5px; font-weight: 600; cursor: pointer; transition: all .25s;">All (38)</button>
        <button onClick="{{ setLoop }}" style="height: 34px; padding: 0 14px; border-radius: 17px; border: 1px solid {{ deckLoopBd }}; background: {{ deckLoopBg }}; color: {{ deckLoopFg }}; font-size: 11.5px; font-weight: 600; cursor: pointer; transition: all .25s; display: flex; align-items: center; gap: 6px;">
          <span>Interactive Engine</span>
          <span style="color: #E8C97A;">↺</span>
        </button>
      </div>`;

const new_header_middle = `      <!-- Middle: Confidential badge & Engine link -->
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #C9A84C; font-weight: 700; padding: 4px 14px; border-radius: 14px; border: 1px solid rgba(201,168,76,0.4); background: rgba(201,168,76,0.08);">CONFIDENTIAL INVESTOR OVERVIEW</span>
      </div>`;
content = content.replace(old_header_middle, new_header_middle);

// Replace milestone rail with 10-slide milestones:
const old_rail = `        <button onClick="{{ jumpBeliefs }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mBeliefsBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mBeliefsFg }}; font-weight: 600; text-transform: uppercase;">Beliefs</span>
        </button>
        <button onClick="{{ jumpProblems }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mProblemsBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mProblemsFg }}; font-weight: 600; text-transform: uppercase;">Problems</span>
        </button>
        <button onClick="{{ jumpAlpha }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mAlphaBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mAlphaFg }}; font-weight: 600; text-transform: uppercase;">Alpha</span>
        </button>
        <button onClick="{{ jumpEngine }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mEngineBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mEngineFg }}; font-weight: 600; text-transform: uppercase;">Engine</span>
        </button>
        <button onClick="{{ jumpOps }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mOpsBg }}; border: 1px solid #6EA8FF; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mOpsFg }}; font-weight: 600; text-transform: uppercase;">Ops Platform</span>
        </button>
        <button onClick="{{ jumpProof }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mProofBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mProofFg }}; font-weight: 600; text-transform: uppercase;">Governance &amp; Proof</span>
        </button>`;

const new_rail = `        <button onClick="{{ jumpBeliefs }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mBeliefsBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mBeliefsFg }}; font-weight: 600; text-transform: uppercase;">1. Beliefs</span>
        </button>
        <button onClick="{{ jumpProblems }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mProblemsBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mProblemsFg }}; font-weight: 600; text-transform: uppercase;">2. The Problem</span>
        </button>
        <button onClick="{{ jumpProcess }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mProcessBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mProcessFg }}; font-weight: 600; text-transform: uppercase;">4. Process</span>
        </button>
        <button onClick="{{ jumpDownside }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mDownsideBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mDownsideFg }}; font-weight: 600; text-transform: uppercase;">6. Downside</span>
        </button>
        <button onClick="{{ jumpFounder }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mFounderBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mFounderFg }}; font-weight: 600; text-transform: uppercase;">8. Founder &amp; Governance</span>
        </button>
        <button onClick="{{ jumpClosing }}" style="background: #0E0E0E; border: none; padding: 2px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; z-index: 2; position: relative;">
          <span style="width: 8px; height: 8px; border-radius: 4px; background: {{ mClosingBg }}; border: 1px solid #C9A84C; transition: all .3s;"></span>
          <span style="font-size: 11px; letter-spacing: 0.12em; color: {{ mClosingFg }}; font-weight: 600; text-transform: uppercase;">10. Next Steps</span>
        </button>`;
content = content.replace(old_rail, new_rail);

// In script renderVals, update jump targets:
const old_jumps = `    // Milestone jumps
    const jumpBeliefs = () => this.go(1);
    const jumpProblems = () => this.go(2);
    const jumpAlpha = () => this.go(6);
    const jumpEngine = () => this.go(7);
    const jumpOps = () => {
      if (deckName === 'client') this.go(1);
      else if (deckName === 'all') this.go(14);
      else this.setDeck('client');
    };
    const jumpProof = () => {
      if (deckName === 'all') this.go(31);
      else if (deckName === 'investor') this.go(14);
    };

    const mBeliefsBg = (pos >= 1 && pos <= 1) ? '#E8C97A' : '#141414';
    const mBeliefsFg = (pos >= 1 && pos <= 1) ? '#E8C97A' : '#8F8676';
    const mProblemsBg = (pos >= 2 && pos <= 3) ? '#E8C97A' : '#141414';
    const mProblemsFg = (pos >= 2 && pos <= 3) ? '#E8C97A' : '#8F8676';
    const mAlphaBg = (pos >= 4 && pos <= 6) ? '#E8C97A' : '#141414';
    const mAlphaFg = (pos >= 4 && pos <= 6) ? '#E8C97A' : '#8F8676';
    const mEngineBg = (pos >= 7 && pos <= 13) ? '#E8C97A' : '#141414';
    const mEngineFg = (pos >= 7 && pos <= 13) ? '#E8C97A' : '#8F8676';
    const mOpsBg = ((deckName === 'client' && pos >= 1) || (deckName === 'all' && pos >= 14 && pos <= 30)) ? '#6EA8FF' : '#141414';
    const mOpsFg = ((deckName === 'client' && pos >= 1) || (deckName === 'all' && pos >= 14 && pos <= 30)) ? '#6EA8FF' : '#8F8676';
    const mProofBg = pos >= 31 ? '#E8CF83' : '#141414';
    const mProofFg = pos >= 31 ? '#E8CF83' : '#8F8676';`;

const new_jumps = `    // Milestone jumps across 10 slides
    const jumpBeliefs = () => this.go(0);
    const jumpProblems = () => this.go(1);
    const jumpProcess = () => this.go(3);
    const jumpDownside = () => this.go(5);
    const jumpFounder = () => this.go(7);
    const jumpClosing = () => this.go(9);

    const mBeliefsBg = pos === 0 ? '#E8C97A' : '#141414';
    const mBeliefsFg = pos === 0 ? '#E8C97A' : '#8F8676';
    const mProblemsBg = (pos >= 1 && pos <= 2) ? '#E8C97A' : '#141414';
    const mProblemsFg = (pos >= 1 && pos <= 2) ? '#E8C97A' : '#8F8676';
    const mProcessBg = (pos >= 3 && pos <= 4) ? '#E8C97A' : '#141414';
    const mProcessFg = (pos >= 3 && pos <= 4) ? '#E8C97A' : '#8F8676';
    const mDownsideBg = (pos >= 5 && pos <= 6) ? '#E8C97A' : '#141414';
    const mDownsideFg = (pos >= 5 && pos <= 6) ? '#E8C97A' : '#8F8676';
    const mFounderBg = (pos >= 7 && pos <= 8) ? '#E8C97A' : '#141414';
    const mFounderFg = (pos >= 7 && pos <= 8) ? '#E8C97A' : '#8F8676';
    const mClosingBg = pos === 9 ? '#E8C97A' : '#141414';
    const mClosingFg = pos === 9 ? '#E8C97A' : '#8F8676';

    const openLegalModal = () => alert('Capital at risk. The value of investments can fall as well as rise, and you may get back less than you invest. This presentation is for information only and is not an offer, recommendation or investment advice. Simat Capital does not currently manage outside capital. Features marked planned are not yet live.');`;
content = content.replace(old_jumps, new_jumps);

// Add return values for the new milestones in renderVals:
content = content.replace("jumpProof,", "jumpProcess, jumpDownside, jumpFounder, jumpClosing, openLegalModal, mProcessBg, mProcessFg, mDownsideBg, mDownsideFg, mFounderBg, mFounderFg, mClosingBg, mClosingFg,");

fs.writeFileSync('public/interactive-demo/index.html', content, 'utf8');
fs.writeFileSync('public/interactive-demo/Main.dc.html', content, 'utf8');

console.log("Transformed demo successfully into 10 slides!");
