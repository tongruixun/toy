---
title: webpack(一) 安装与使用
date: 2021-01-27 10:56:30
tags: webpack
---

## 一、安装

```bash
 node install webpack webpack-cli --save-dev
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
            // favicon: path.resolve('src/asset/favicon.ico')  // 设置网站图标
        })
    ],
    mode: "development"
}

```
## 三、清理输出文件夹 `clean-webpack-plugin`
#### 一、`clean-webpack-plugin`的用法，版本号3.0.0

```
// 一、安装
npm install clean-webpack-plugin -S
// 二、配置
plugins: [
    new CleanWebpackPlugin()
]
```

#### 二、Options and Defaults(Optional)

```javascript
new CleanWebpackPlugin({
    // Simulate the removal of files
    //
    // default: false
    dry: true,
 
    // Write Logs to Console
    // (Always enabled when dry is true)
    //
    // default: false
    verbose: true,
 
    // Automatically remove all unused webpack assets on rebuild
    //
    // default: true
    cleanStaleWebpackAssets: false,
 
    // Do not allow removal of current webpack assets
    //
    // default: true
    protectWebpackAssets: false,
 
    // **WARNING**
    //
    // Notes for the below options:
    //
    // They are unsafe...so test initially with dry: true.
    //
    // Relative to webpack's output.path directory.
    // If outside of webpack's output.path directory,
    //    use full path. path.join(process.cwd(), 'build/**/*')
    //
    // These options extend del's pattern matching API.
    // See https://github.com/sindresorhus/del#patterns
    //    for pattern matching documentation
 
    // Removes files once prior to Webpack compilation
    //   Not included in rebuilds (watch mode)
    //
    // Use !negative patterns to exclude files
    //
    // default: ['**/*']
    cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*'],
    cleanOnceBeforeBuildPatterns: [], // disables cleanOnceBeforeBuildPatterns
 
    // Removes files after every build (including watch mode) that match this pattern.
    // Used for files that are not created directly by Webpack.
    //
    // Use !negative patterns to exclude files
    //
    // default: []
    cleanAfterEveryBuildPatterns: ['static*.*', '!static1.js'],
 
    // Allow clean patterns outside of process.cwd()
    //
    // requires dry option to be explicitly set
    //
    // default: false
    dangerouslyAllowCleanPatternsOutsideProject: true,
});
```
## 问题及解决方案
```

## 参考链接

> https://webpack.docschina.org/guides/output-management/#setting-up-htmlwebpackplugin
