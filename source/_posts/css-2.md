---
title: CSS(二) 动画
date: 2021-01-24 16:48:26
tags: css
---

## 一、CSS动画API

<!--more-->
## 二、示例动画

#### 一、波纹动画

```css
.dot {
  position: relative;
  width: 2em;
  height: 2em;
  margin: 0.8em;
  border-radius: 50%;

  &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: inherit;
      animation: wave 2s ease-out infinite;
  }

}

@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
    
  }
  
  80%,
  100% {
    opacity: 0;
  }
}
```



## 参考链接

> https://juejin.cn/post/6844904033405108232

