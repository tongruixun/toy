---
title: 自定义博客
date: 2021-01-27 08:52:40
tags: blog
---

## 一、创建项目

## 二、解析markdown
使用`marked`解析markdown

<!--more-->
#### 一、安装
```bash
npm install marked
```
#### 二、用法
一、基本用法
```javascript
// 引入  在node环境下测试  需使用commonjs模块
const marked = require('marked');
const src = '# Marked in the browser\n\nRendered by **marked**.'
// src 是符合markdown语法的字符串
// 会解析成HTML格式
console.log(marked(src));
```
二、代码块高亮
1、安装`highlight.js`
```bash
npm install highlight.js
```
2、用法

```javascript
import marked from 'marked';
// 引入
import hljs from 'highlight.js';
// 需要引入样式，否则会没有效果
import 'highlight.js/styles/atom-one-dark.css';

// 基本设置
marked.setOptions({
    // 在此处使用
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

// 将<pre> 替换成 <pre class='hljs'>  为pre标签加上类名hljs  显示代码块背景
document.body.innerHTML = marked(data.post).replace(/<pre>/g, "<pre class='hljs'>");
```

## 三、解析yaml

#### 一、安装`js-yaml`

```bash
npm install js-yaml
```

#### 二、使用

1、解析yaml格式的内容
```javascript
var yaml = require('js-yaml');
var fs   = require('fs');

try {
  var doc = yaml.load(
    fs.readFileSync('./example.yml', 'utf8')
  );
  console.log(doc);
} catch (e) {
  console.log(e);
}
```
2、从 JavaScript 对象还原到 yaml 文件的代码如下。
```javascript
var yaml = require('js-yaml');
var fs   = require('fs');

var obj = {
  fn: function () { return 1 },
  reg: /test/
};

try {
  fs.writeFileSync(
    './example.yml',
    yaml.dump(obj),
    'utf8'
  );
} catch (e) {
  console.log(e);
}
```

