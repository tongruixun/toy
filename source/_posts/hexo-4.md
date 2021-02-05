---
title: Hexo(三) 添加动态模型插件
date: 2021-01-23 09:24:54
tags: hexo
categories: 博客搭建
---

<meta name="referrer" content="no-referrer" />

## 一、安装模块

```
npm install --save hexo-helper-live2d
```

## 二·、下载模型


使用 `npm install {packagename}` 安装模型

```
// hijiki 一只黑色小猫
npm install live2d-widget-model-hijiki
```

模型仓库

> https://github.com/xiazeyu/live2d-widget-models

<!--more-->
## 三、添加配置

#### 在hexo的根目录下的`_config.yml`中添加下面的内容
```yml

# Live2D
## https://github.com/EYHN/hexo-helper-live2d
## https://l2dwidget.js.org/docs/class/src/index.js~L2Dwidget.html#instance-method-init
live2d:
  enable: true
  #enable: false
  scriptFrom: local # 默认
  pluginRootPath: live2dw/ # 插件在站点上的根目录(相对路径)
  pluginJsPath: lib/ # 脚本文件相对与插件根目录路径
  pluginModelPath: assets/ # 模型文件相对与插件根目录路径
  # scriptFrom: jsdelivr # jsdelivr CDN
  # scriptFrom: unpkg # unpkg CDN
  # scriptFrom: https://cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js # 你的自定义 url
  tagMode: false # 标签模式, 是否仅替换 live2d tag标签而非插入到所有页面中
  debug: false # 调试, 是否在控制台输出日志
  model:
    use: live2d-widget-model-hijiki
    # use: live2d-widget-model-wanko # npm-module package name
    # use: wanko # 博客根目录/live2d_models/ 下的目录名
    # use: ./wives/wanko # 相对于博客根目录的路径
    # use: https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json # 你的自定义 url
  display:
    position: right
    width: 145
    height: 315
  mobile:
    show: true # 是否在移动设备上显示
    scale: 0.5 # 移动设备上的缩放       
  react:
    opacityDefault: 0.7
    opacityOnHover: 0.8
``` 

## 四、部分模型展示

Epsilon
![](https://gitee.com/tongruixun/trx-imgs/raw/master/hexo/live2d-widget-model/51hexo.png)

shizuku
![](https://gitee.com/tongruixun/trx-imgs/raw/master/hexo/live2d-widget-model/53hexo.png)

z16
![](https://gitee.com/tongruixun/trx-imgs/raw/master/hexo/live2d-widget-model/56hexo.png)

hibiki
![](https://gitee.com/tongruixun/trx-imgs/raw/master/hexo/live2d-widget-model/57hexo.png)

koharu
![](https://gitee.com/tongruixun/trx-imgs/raw/master/hexo/live2d-widget-model/58hexo.png)

hijiki
![](https://gitee.com/tongruixun/trx-imgs/raw/master/hexo/live2d-widget-model/ia_100000062.gif)
