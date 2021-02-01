---
title: node(fs) 文件系统API
date: 2021-01-27 10:07:55
tags: node
---

## 一、目录操作

#### 一、读取目录

```javascript
// 引入fs模块
const fs = require('fs');
// 同步读取目录下的文件，返回文件数组列表 元素是文件名和文件类型对的组合 文件名.文件类型
// __dirname  当前模块的目录名
const files = fs.readdirSync(__dirname + '/source/_posts');
```
<!--more-->

## 二、文件操作
```javascript
const fs = require('fs');
// 
const file = fs.readFileSync(__dirname + '/source/_posts/' + files[2]);
```


## 参考链接

> http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback
