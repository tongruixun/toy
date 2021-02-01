---
title: npm(一) npm模块开发与发布
date: 2021-01-28 09:33:07
tags: npm
---

## 一、创建目录、初始化、开发模块、发布模块

#### 一、创建一个目录

#### 二、在目录下执行 `npm init` (默认已安装node环境)
```bash
D:\tongruixun\GithubRepository\trx-util>npm init
```

<!--more-->

#### 三、创建`index.js`

```javascript
// 声明一个函数
function func() {
    // dosomething...
}

// 导出模块   
module.exports.func = func;
```

#### 四、发布到npm

到`https://www.npmjs.com`注册账号,记住自己的账号，密码，邮箱。

```bash
// 登录  本地模块文件
D:\tongruixun\GithubRepository\trx-util>npm adduser
Username: tongruixun
Password:
Email: (this IS public) 1*****4342@qq.com
Logged in as tongruixun on https://registry.npmjs.org/.

// 查看登录用户
D:\tongruixun\GithubRepository\trx-util>npm whoami
tongruixun

// 发布模块到npm
D:\tongruixun\GithubRepository\trx-util>npm publish


```

#### 五、更新npm模块版本

在`package.json`中修改version字段，然后执行 `npm publish`

版本号没有修改的话会报错


版本格式：主版本号.次版本号.修订号，版本号递增规则如下：
- 主版本号：当你做了不兼容的 API 修改
- 次版本号：当你做了向下兼容的功能性新增
- 修订号：当你做了向下兼容的问题修正


## 二、使用

#### 一、安装
```bash
npm install trx-util
```

#### 二、使用

```javascript
const trxUtil = requier('trx-util');

trxUtil.func();
```

