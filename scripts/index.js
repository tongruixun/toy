const fs = require('fs');
const path = require('path');
const marked = require('marked');
const hljs = require('highlight.js');
const trxUtil = require('trx-util');

const postsPath = path.resolve(__dirname, '../source/_posts')
const srcPath = path.resolve(__dirname, '../src')

// 读取source/_posts目录下的所有文件
const files = fs.readdirSync(postsPath);
const posts = [];

const rPrefixSep = /^(-{3,}|;{3,})/;
const rFrontMatter = /^(-{3,}|;{3,})\r\n([\s\S]+?)\n\1\r\n?([\s\S]*)/;
const rFrontMatterNew = /^([\s\S]+?)\n(-{3,}|;{3,})\n?([\s\S]*)/;


function split(str) {
    if (typeof str !== 'string') throw new TypeError('str is required!');

    const matchOld = str.match(rFrontMatter);
    if (matchOld) {
        return {
            data: matchOld[2],
            content: matchOld[3] || '',
            separator: matchOld[1],
            prefixSeparator: true
        };
    }

    if (rPrefixSep.test(str)) return { content: str };

    const matchNew = str.match(rFrontMatterNew);

    if (matchNew) {
        return {
            data: matchNew[1],
            content: matchNew[3] || '',
            separator: matchNew[2],
            prefixSeparator: false
        };
    }

    return { content: str };
}

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

// 遍历读取markdown文件
files.forEach((item) => {

    // 读取单个markdown文件中的内容
    const mdContent = fs.readFileSync(postsPath +'/'+ item, {encoding: "utf-8"});
    const postData = split(mdContent);
    const { data, content } = postData;
    postData.data = trxUtil.yaml2JavaScript(data);
    postData.content = marked(content);
    posts.push(postData);
})

// 将数据写入data.json
fs.writeFile(srcPath + '/data.json', JSON.stringify(posts), e => console.log(e));

