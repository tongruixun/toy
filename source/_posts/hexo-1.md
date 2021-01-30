---
title: Hexo(一) 基于Linux部署个人博客
date: 2021-01-07 20:00:00
tags: hexo
categories: 博客搭建
---

## 一、安装nodejs

```
// 官网下载二进制包的方式安装 node-v14.15.4-linux-x64.tar.xz
// 分两层 先解压xz  
// d 解压文件 
// k 保留原文件（如果不想保留，可以去掉k）
xz -dk node-v14.15.4-linux-x64.tar.xz

// 解压 tar  
// x 解压文件
// v 显示解压文件列表
// f 指定要解压的文件名
// -C 解压到指定目录
tar -xvf node-v14.15.4-linux-x64.tar

//或者一行命令直接解压
tar -xvf node-v14.15.1-linux-x64.tar.xz

// Linux 中建立软连接  相当于windows创建快捷方式
// /usr/local/node/node-v14.15.4-linux-x64/bin/node  node所在目录
// /usr/local/bin/node   
ln -s /usr/local/node/node-v14.15.4-linux-x64/bin/node /usr/local/bin/node
ln -s /usr/local/node/node-v14.15.4-linux-x64/bin/npm /usr/local/bin/npm

// 淘宝镜像源
npm install -g cnpm --registry=https//registry.npm.taobao.org


```

<!-- more -->

## 二、yum方式安装git

```bash
yum install -y git
```



##  三、安装Hexo



``` bash
cnpm install -g hexo cli
```

```bash
hexo init
```

启动 hexo 

```bash
hexo s   //hexo start 或 hexo sever 的简写
```

