const {split} = require('./util/frontMatter');
const {keyBy} = require('./util/util');
const {parseMarkDown} = require('./util/marked');
const {readMarkDownDir, readMarkDownContent, writeFile} = require('./util/file');
const trxUtil = require('trx-util');

// 读取source/_posts目录下的所有文件
const files = readMarkDownDir('source/_posts');
// 读取单个markdown文件中的内容
const mdContent = readMarkDownContent(`source/_posts/${files[2]}`);
const postData = split(mdContent);
const { content } = postData;
const result = parseMarkDown(content);
console.log(result);
