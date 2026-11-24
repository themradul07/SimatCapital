const fs = require('fs');
const html = fs.readFileSync('public/interactive-demo/index.html', 'utf8');

// Get template and script
const scriptMatch = html.match(/<script type="text\/x-dc"[\s\S]*?>([\s\S]*?)<\/script>/);
const template = html.substring(0, scriptMatch.index);

// Extract all {{ identifier }} or {{ identifier... }}
const exprs = new Set();
const reg = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
let m;
while ((m = reg.exec(template)) !== null) {
  exprs.add(m[1]);
}

// Find renderVals return properties
const renderValsMatch = scriptMatch[1].match(/renderVals\s*\([^)]*\)\s*\{([\s\S]*?)return\s*\{([\s\S]*?)\};/);
if (!renderValsMatch) {
  console.log("Could not locate renderVals return block");
} else {
  const returnBody = renderValsMatch[2];
  console.log("Total template identifiers:", exprs.size);
  // Check which are not in returnBody or invVals or loopVals or opsVals
  const missing = [];
  for (const id of exprs) {
    if (
      !returnBody.includes(id) &&
      !scriptMatch[1].includes(`'${id}'`) &&
      !scriptMatch[1].includes(`"${id}"`) &&
      !scriptMatch[1].includes(`${id}:`)
    ) {
      // Could be loop variable like dr, pv, k, ill
      if (!['dr', 'pv', 'k', 'ill', 'mt', 'vc', 'd', 'p', 's', 'r', 'c', 't'].includes(id)) {
        missing.push(id);
      }
    }
  }
  console.log("Potentially missing from return:", missing);
}
