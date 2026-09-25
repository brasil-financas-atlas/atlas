const fs = require('fs');
const content = fs.readFileSync('src/components/LessonContent.jsx', 'utf-8');
const match = content.match(/function splitMarkdownIntoBlocks[\s\S]*?return blocks;\s*\}/);
eval(match[0]);

const dataContent = fs.readFileSync('src/data/contentData.js', 'utf-8');
const jsonStr = dataContent.replace('window.EXACT_CONTENT = ', '').replace(/;\s*$/, '');
const obj = eval('(' + jsonStr + ')');

const markdown = obj.financas.modulos[0].index;
const blocks = splitMarkdownIntoBlocks(markdown);
console.log('Number of blocks:', blocks.length);
