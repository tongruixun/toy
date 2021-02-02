const rPrefixSep = /^(-{3,}|;{3,})/;
// linux \n 表示换行  windows \r\n 表示换行
const rFrontMatter = /^(-{3,}|;{3,})\r?\n([\s\S]+?)\n\1\r?\n?([\s\S]*)/;
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

    if (rPrefixSep.test(str)) return {content: str};

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

module.exports.split = split;