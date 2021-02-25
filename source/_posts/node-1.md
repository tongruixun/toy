---
title: node(一) 常用API
date: 2021-01-27 10:07:55
tags: node
---

## 一、目录操作fs

#### 一、读取目录

```javascript
// 引入fs模块
const fs = require('fs');
// 同步读取目录下的文件，返回文件数组列表 元素是文件名和文件类型对的组合 文件名.文件类型
// __dirname  当前模块的目录名
const files = fs.readdirSync(__dirname + '/source/_posts');
```
<!--more-->

#### 二、文件操作
```javascript
const fs = require('fs');
// 
const file = fs.readFileSync(__dirname + '/source/_posts/' + files[2]);
```

## 二、process
process 对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制。
#### 一、常用方法

```javascript
// 当前工作目录
process.cwd();
```

## 参考链接

> http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback
