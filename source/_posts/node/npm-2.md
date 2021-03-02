---
title: npm(二) 自定义命令行工具
date: 2021-02-05 10:06:51
tags:
 - npm
 - cli
 - node
---

## 一、新建一个目录

#### 一、执行 `npm init`

#### 二、 安装 `commander`

```shell
# -S  等同于 --save
node install commander -S
```

## 二、目录结构

目录结构可以按照自己的需求随意更改，只需在使用的地方符合路径查找规则
```yaml
trx-cli  #项目目录 
 - bin  # 指令目录
  - index.js
 - lib  # 指令对应的执行函数
  - index.js
 - package.json
```

#### 一、package.json的内容

bin中的key(trx)是你的指令，对应的值(bin/index.js)是要执行的文件
```json
{
  "name": "tong-cli",
  "version": "0.0.4",
  "description": "a cli util",
  "main": "bin/index.js",
  "bin": {
    "trx": "bin/index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}

```

#### 二、bin/index.js的内容

```javascript
#!/usr/bin/env node
const program = require('commander');
const {init} = require('../lib');
program
    .version('0.0.1')
    .command('init')
    .alias('i')
    .description('build init views')
    .action(init);

program.parse(process.argv);
```

#### 三、lib/index.js的内容

```javascript
function init() {
    console.log('this is trx-cli');
    console.log('__dirname', __dirname);
}

module.exports.init = init;
```

## 三、用法

#### 一、上传到npm仓库，在其他项目中安装就可以使用.用法:`trx init`

```shell
# 输入
trx init

# 结果
'this is trx-cli'
'__dirname', D:\tongruixun\GithubRepository\toy
```

#### 二、 使用node指令，例如:在本项目中的用法是 `node bin/index init`

#### 二、如果想在本模块中使用可以运行 `npm link` 建立符号链接， 运行`npm link`就可以直接使用了用法:`trx init`

## 四、commander的用法

#### 一、option用于定义命令选项
##### 一、.option('-n, --name', 'description', 'defaultValue')
第一个参数必填,是自定义标识,分为长短标识，用逗号隔开 后面可定义参数, 必填参数使用<>,选填参数使用[]
第二个参数选填,对标识的描述，使用--help命令时显示的内容
第三个参数选填,表示默认值

第三个参数可以是函数（此时第四个值是默认值），此函数接受两个参数：命令行的输入值和选项的默认值，函数的返回值为最终的解析结果

##### 二、用法
1、添加选项
```javascript
const program = require('commander');

program.version('0.0.1');
// 没有默认值时 命令后加上选项 debug值为true, 不加时为false或underfined
// 有默认值时 命令后加上选项 debug值为默认值, 不加时为false或underfined
// 有默认值时,且添加可选参数 命令后加或不加选项 debug值均为默认值
program.option('-d, --debug', 'output extra debugging')
```
2、option可以链式添加

```javascript
// -ds 等价于 -d -s 
program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');
```

3、选项前加 `no-`

```javascript
// 含义与之前相反  加上选项 debug为false 不加反而为true
program.option('-d, --no-debug', 'output extra debugging')
```

#### 二、command添加命令名称

```javascript
// 引入依赖
var program = require('commander');
// Command implemented using action handler (description is supplied separately to `.command`)
// Returns new command for configuring.
program
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    console.log('clone command called');
  });

// Command implemented using stand-alone executable file (description is second parameter to `.command`)
// Returns `this` for adding more commands.
program
  .command('start <service>', 'start named service')
  .command('stop [service]', 'stop named service, or all if no name supplied');
```

#### 三、action
action接收一个函数，函数前面的参数与命令的参数一一对应，最后一个参数为选项对象的值
```javascript
program
    .command('deploy [param1] [param2]')
    .alias('d')
    .option('-r, --recursive [name]', 'Remove recursively')
    .description('deploy')
    .action(function (param1, param2, dir) {
        console.log(param1)
        console.log(param2)
        console.log(dir)
    });

// 输入 指令名 d param1 param2 -r name
// 输出 param1 param2 {recursive: name}
```



