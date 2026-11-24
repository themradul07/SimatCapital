const fs = require('fs');
const html = fs.readFileSync('public/interactive-demo/index.html', 'utf8');

const match = html.match(/<script type="text\/x-dc"[\s\S]*?>([\s\S]*?)<\/script>/);
if (!match) {
  console.error("No text/x-dc script tag found!");
  process.exit(1);
}

try {
  new Function(match[1]);
  console.log("JavaScript in index.html is valid syntax!");
} catch (e) {
  console.error("Syntax error in script:", e);
  process.exit(1);
}
