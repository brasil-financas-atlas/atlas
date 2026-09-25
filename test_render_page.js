const fs = require('fs');

const React = {
    createElement: (type, props, ...children) => {
        if (typeof type === 'function') {
            try {
                return type({ ...props, children });
            } catch (e) {
                return '<ERROR: ' + e.message + '>';
            }
        }
        let propsStr = '';
        if (props) {
            for (const [k, v] of Object.entries(props)) {
                if (k !== 'children' && typeof v !== 'object' && typeof v !== 'function') {
                    propsStr += ' ' + k + '=\"' + v + '\"';
                }
            }
        }
        const kids = children.flat().filter(Boolean).join('');
        return '<' + type + propsStr + '>' + kids + '</' + type + '>';
    },
    useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
    useEffect: () => {},
    useContext: () => ({}),
    createContext: () => ({}),
    useMemo: (fn) => fn(),
    useRef: () => ({ current: null })
};

global.React = React;
global.window = { innerWidth: 1024, katex: null, marked: { parse: x => x } };
global.BfaIcon = () => '<BfaIcon/>';

const dataContent = fs.readFileSync('src/data/contentData.js', 'utf-8');
const jsonStr = dataContent.replace('window.EXACT_CONTENT = ', '').replace(/;\s*$/, '');
global.window.EXACT_CONTENT = eval('(' + jsonStr + ')');

const editableBlockCode = fs.readFileSync('src/components/EditableBlock.jsx', 'utf-8')
    .replace(/export default EditableBlock;/g, '')
    .replace(/const { useState.*? = React;/g, '');
eval(editableBlockCode);

const lcCode = fs.readFileSync('src/components/LessonContent.jsx', 'utf-8')
    .replace(/window\.LessonContent = LessonContent;/g, '')
    .replace(/const { useState.*? = React;/g, '');
eval(lcCode);

const doCode = fs.readFileSync('src/pages/DisciplinaOverview.jsx', 'utf-8');
const mipMatch = doCode.match(/function ModuloIntroPage\(\{.*?\} \)\s*\{[\s\S]*?return \([\s\S]*?\);\s*\}/);
eval(mipMatch[0]);

const html = ModuloIntroPage({ subjectKey: 'financas', moduloSlug: 'modulo-1-fundamentos' });
const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
if (articleMatch) {
    console.log('\n--- ARTICLE CONTENT ---');
    console.log(articleMatch[1].substring(0, 1000));
} else {
    console.log('\nNO ARTICLE FOUND');
}
