---
title: React富文本插件react-quill的用法
date: 2021-04-23 08:28:28
tags: react
---

## 一、安装

此次用法写于2021-4-23，在安装过程中发现不兼容React 17.0.1，将React版本降到16可以成功安装react-quill

```shell
npm install react-quill --save
```

## 二、使用


#### 一、基本用法

````javascript
import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <ReactQuill theme="snow" value={value} onChange={setValue}/>
  );
}
````

#### 二、自定义工具栏(Custom Toolbar)


