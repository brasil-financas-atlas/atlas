const fs = require('fs');
const React = { useMemo: (fn) => fn(), useEffect: () => {}, useRef: () => ({}), useContext: () => ({}), createContext: () => ({}) };
const window = { katex: null, marked: { parse: (x) => x }, DOMPurify: null };
const AdminContext = {};

const content = fs.readFileSync('src/components/LessonContent.jsx', 'utf-8');
// Extract splitMarkdownIntoBlocks
const splitMatch = content.match(/function splitMarkdownIntoBlocks[\s\S]*?return blocks;\s*\}/);
eval(splitMatch[0]);

// Extract renderSingleBlock. It is inside LessonContent.
// We can just grab the whole LessonContent text and extract the renderSingleBlock function string
const renderMatch = content.match(/const renderSingleBlock = \(rawText\) => \{[\s\S]*?return parsedHtml;\s*\};/);
if (renderMatch) {
    eval("var renderSingleBlock = " + renderMatch[0].replace('const renderSingleBlock = ', ''));
} else {
    // If parsedHtml doesn't exist, it might return parsed instead
    const renderMatch2 = content.match(/const renderSingleBlock = \(rawText\) => \{[\s\S]*?return parsed;\s*\};/);
    eval("var renderSingleBlock = " + renderMatch2[0].replace('const renderSingleBlock = ', ''));
}

const dataContent = fs.readFileSync('src/data/contentData.js', 'utf-8');
const jsonStr = dataContent.replace('window.EXACT_CONTENT = ', '').replace(/;\s*$/, '');
const obj = eval('(' + jsonStr + ')');

const markdown = obj.financas.modulos[0].index;
const blocks = splitMarkdownIntoBlocks(markdown);
console.log(renderSingleBlock(blocks[0]));
