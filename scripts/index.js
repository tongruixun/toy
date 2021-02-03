const trxUtil = require('trx-util');
const dayjs = require('dayjs');

const {split} = require('./util/frontMatter');
const {parseMarkDown} = require('./util/marked');
const {readMarkDownDir, readMarkDownContent, writeFile} = require('./util/file');

const dbPath = '/src/db/';

function parsePostData(files) {
    const result = [];
    files.forEach((item, index) => {

        // 读取单个markdown文件中的内容
        const mdContent = readMarkDownContent(`source/_posts/${item}`);
        const postData = split(mdContent);
        const { data, content } = postData;
        postData.data = trxUtil.yaml2JavaScript(data);
        const [article, directory] = parseMarkDown(content);
        postData.content = article;
        postData.directory = directory;
        postData.id = item.split('.')[0];
        result.push(postData);
    })
    return result;
}

// 读取source/_posts目录下的所有文件
const files = readMarkDownDir('source/_posts');

const posts = parsePostData(files);
// 按时间排序
const sortList = posts.sort((x, y) => {
    return dayjs(x.data.date).isBefore(dayjs(y.data.date)) ? 1 : -1;
})

const configYml = readMarkDownContent('_config.yml');
const configData = trxUtil.yaml2JavaScript(configYml);

// 将数据写入json
writeFile(sortList, `${dbPath}posts.json`);
writeFile(configData, `${dbPath}config.json`);

