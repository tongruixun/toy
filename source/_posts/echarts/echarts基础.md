---
title: echarts基础用法
date: 2021-03-18 15:33:37
tags: echarts
---

# echarts

## 一、安装与使用

使用命令 `npm install echarts --save` 进行安装

## 二、示例(在React中使用)

```javascript
// 引入
import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

const initOption = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
}

function EchartsTest() {

    const chartsRef = useRef(null);
    useEffect(() => {
        const myChart = echarts.init(chartsRef.current);
        myChart.setOption(initOption, true);
    }, [])
    return <div style={{ width: 200, height: 100}} className={styles.charts} ref={chartsRef} />
}
```

## 链接
> https://echarts.apache.org/zh/option.html#title
