---
title: JavaScript(一)参数传递
date: 2021-03-15 17:06:58
tags: javascript
---

## 一、值传递和引用传递

#### 一、值传递

函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是传值传递（passes by value）。这意味着，在函数体内修改参数值，不会影响到函数外部。

#### 二、引用传递

但是，如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递（pass by reference）。
此时形式参数的值是指向复合类型的地址，在函数中对形式参数重新赋值，形式参数会改变指向，从而指向另一个地址。如果对形式参数的属性进行赋值，则是操作原有对象，将会影响原始值。

> https://github.com/mqyqingfeng/Blog/issues/10
