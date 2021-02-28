---
title: Hexo(二）发表文章常用命令
date: 2021-01-07 20:18:45
tags: hexo
categories: 博客搭建
---


## 文章配置

```
// 配置
title: Hexo(二) 发表文章常用命令
date: 2021-01-07 20:18:45
tags: Hexo
categories: hexo


// 属性说明
title: 文章标题
date: 文章的创建日期
tags: 为文章设置标签，方便搜索

  一个标签时
  tags: 标签名

  多个标签
  tags: 
  - 标签名一
  - 标签名二

categories: 为文章设置分类

  一个分类时
  categories: 分类名

  子分类时
  categories: 
  - 父分类名
  - 子分类名
```
<!--more-->
## 常用命令

```javascript
//新建文章
hexo new "postName"

// 新建页面
hexo new page "pageName"

//生成静态页面至public目录
hexo generate

//开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo server

//部署到Github
hexo deploy

//查看帮助
hexo help

//查看版本
hexo version

```

## 缩写

```javascript
hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy
```

## 组合命令

```javascript
//生成并本地预览
hexo s -g

// 生成并上传
hexo d -g
```
