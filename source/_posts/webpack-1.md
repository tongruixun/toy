---
title: webpack(一) 安装与使用
date: 2021-01-27 10:56:30
tags: webpack
---

## 一、安装

```bash
 npm install webpack webpack-cli --save-dev
```

## 二、基本配置

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
      rules: [
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader']
          },{
              test: /(\.js?|\.jsx?)$/i, // 排除JSON文件
              use: 'babel-loader',
              exclude: /node_modules/,
          },
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"  // 以src下的HTML为模板创建打包后的index.html
        })
    ],
    mode: "development"
}

```

## 问题及解决方案

#### 一、 报错信息 `Module not found: Error: Can't resolve 'fs' in 'D:\tongruixun\GithubRepository\toy`
webpack5解决方案

```javascript
  const path = require('path');
  
  module.exports = {
      entry: './index.js',
      output: {
          filename: 'main.js',
          path: path.resolve(__dirname, 'public')
      },
      // 增加这个配置  webpack5
      resolve: {
          fallback: {
              fs: false
          }
      },
      mode: "development"
  }
```

## 参考链接

> https://webpack.docschina.org/guides/output-management/#setting-up-htmlwebpackplugin
