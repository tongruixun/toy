---
title: npm(三) npm link
date: 2021-02-25 15:50:15
tags: npm
---

## 一、`npm link`介绍及使用

#### 一、介绍

npm link用来在本地项目和本地npm模块之间建立连接，可以在本地进行模块测试

#### 二、用法

```bash
# 1、项目和模块在同一个目录下，可以使用相对路径
node link ../module
# 2、项目和模块不在同一个目录下
# 在模块目录下使用 node link ,全局link
node link
# 到使用模块的项目目录下
node link modulename
# 3、 解除link
# 解除项目与模块link, 在项目目录下
node unlink modulename
# 解除全局link ,在模块目录下
node unlink modulename
```
