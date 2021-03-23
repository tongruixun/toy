---
title: CSS(三) css变量 JS控制CSS属性
date: 2021-03-22 16:55:42
tags: css
---

## 一、CSS 变量提供了 JavaScript 与 CSS 通信的一种途径

#### 一、变量的声明
变量名大小写敏感，--header-color和--Header-Color是两个不同变量。
```css
body {
  --foo: #7F583F;
  --bar: #F7EFD2;
}
```

#### 二、var() 函数
var()函数用于读取变量。
```css
a {
  color: var(--foo);
  text-decoration-color: var(--bar);
}
```
var()函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

```css
color: var(--foo, #7F583F);
```


## 二、 通过attr()改变伪元素的值

attr() 理论上能用于所有的CSS属性但<font color='#de1c31'>目前支持的仅有伪元素的 content 属性</font>，其他的属性和高级特性目前是实验性的

```javascript

// 在html上
<div 属性名="属性值"/>

// 在css中

// div:after {
//     content: attr(属性名)
// }
```