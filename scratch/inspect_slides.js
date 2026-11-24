const fs = require('fs');
const s = fs.readFileSync('private-archive/shariah-ops-and-master-tour-archive.html', 'utf8').replace(/\r\n/g, '\n');

const scIfRegex = /<sc-if value="\{\{\s*(\w+)\s*\}\}"/g;
let match;
const tags = [];
while ((match = scIfRegex.exec(s)) !== null) {
  if (match[1].startsWith('inv_s') || match[1].startsWith('ops_s') || match[1].includes('Loop') || match[1] === 's0') {
    tags.push(match[1]);
  }
}
console.log('Slide tags found:', tags);
