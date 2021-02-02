const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname, '../../')
const postsPath = path.resolve(__dirname, '../../source/_posts')
const srcPath = path.resolve(__dirname, '../../src')

// 读取目录下的所有markdown  返回文件名组成的数组
function readMarkDownDir(dirPath, path = rootPath, ) {
    return fs.readdirSync(`${rootPath}/${dirPath}`);
}

// 读取单个文件中的内容
function readMarkDownContent(filePath, path = rootPath) {
    return fs.readFileSync(`${path}/${filePath}`, {encoding: "utf-8"});
}

// 将内容写入文件
function writeFile(data, filePath, path = rootPath) {
    fs.writeFile(`${path}/${filePath}`, JSON.stringify(data), e => console.log(e));
}

module.exports.readMarkDownDir = readMarkDownDir;
module.exports.readMarkDownContent = readMarkDownContent;
module.exports.writeFile = writeFile;