---
title: CSS 滚动条样式优化及相关属性
date: 2021-02-26 14:21:03
tags:
---

## 一、滚动条伪元素

#### 一、webkit内核下的滚动条伪元素（使用在支持webkit的浏览器上如Chrome和Safari）
```css
/* 整个滚动条 */
::-webkit-scrollbar
/* 滚动条上的按钮 (上下箭头) */
::-webkit-scrollbar-button
/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb
/* 滚动条轨道 */
::-webkit-scrollbar-track
/* 滚动条没有滑块的轨道部分 */
::-webkit-scrollbar-track-piece
/* 当同时有垂直滚动条和水平滚动条时交汇的部分 */
::-webkit-scrollbar-corner
```

## 参考链接

> https://juejin.cn/post/6844904078296743943
