import config from './config.json';
import posts from './posts.json';

import {keyBy} from "@/util/util";

const postsMap = keyBy(posts, 'id');
// 文章主题数据和id(文件名)
const themes = posts.map(({data, id}) => ({data, id}));
// 标签名数组
const tags = Array.from(new Set(posts.map(({data: {tags}}) => tags).flat(1)));

export {
    config,
    postsMap,
    posts,
    themes,
    tags
}