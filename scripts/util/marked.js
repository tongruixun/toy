const marked = require('marked');
const hljs = require('highlight.js');

let toc = [];

const renderer = {
    heading(text, level, raw) {
        const tocItem = {label: raw, level};
        toc.push(tocItem);

        return `<a id="${raw}"><h${level}>${text}</h${level}></a>\n`;
    }
}

marked.use({renderer});

marked.setOptions({
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

function parseMarkDown(markDownString) {
    const content = marked(markDownString).replace(/<pre>/g, "<pre class='hljs'>");
    const dir = toc;
    toc = [];
    return [content, dir];
}




module.exports.parseMarkDown = parseMarkDown;