---
title: less(一) css预处理器
date: 2021-02-03 10:29:49
tags: less
---

## 一、安装

#### 一、安装less
```bash
npm install less --save-dev
```
#### 二、安装less-loader

```bash
npm install less-loader --save-dev
```
## 二、基本用法

```less
// 变量定义
@width: 96px;
@color: #0f59a4;

// 嵌套语法
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px 24px;
  .pageIcon {
    flex-basis: @width;  // 变量使用
    // 全局变量  用于修改原有的css样式
    :global {
      .iconfont {
        font-size: 48px;
        cursor: pointer;
        color: #737c7b;

        &:hover {
          color: @color; // 变量使用
        }
      }
    }
  }
  .num {
    font-size: 24px;
    color: @color; // 变量使用
  }
}
```
## 三、使用webpack5，配置文件如下

```javascript
// 
module.exports = {
    ...,
    module: {
        rules: [
            {
                test: /\.less$/i, // 匹配.less结尾的文件，交给webpack处理
                exclude: /node_modules/, // 排除node_modules下的文件
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                compileType: "module",  // 开启支持css模块
                                localIdentName: "[path][name]__[local]"
                            }
                        }
                    },{
                        loader: "less-loader",
                    }
                ]
            }
        ]
    },
    ...
}

```

## 四、使用别名一个less文件引用另一个less文件

#### 一、webpack配置

```javascript
// __dirname 表示当前文件所在的绝对路径
module.exports = {
    resolve: {
        extensions: ["*", ".js", ".jsx", "less"], // 配置后可以省略后缀进行引入
        alias: {
            '@': path.resolve(__dirname, 'src'), // 
            'styles' : path.join(__dirname, 'src/styles')
        }
    }
}
```

#### 二、用法

在目标文件中引入src/styles下的animation.less，注意:在前面加入 ~ 

```less
@import '~styles/animation.less';


  // ...something
```


