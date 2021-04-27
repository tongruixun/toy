# toy

## 一、完全自定义实现博客网站

#### 一、解析 source/_post下的markdown文档生成数据
使用`trx g`命令之后，回解析source下的所有markdown文件，生成JSON数据存放在src/db/posts.json中

```
trx n 标题 目录
// 如 trx n js语法 js
// 自定义命令行工具  执行命令生成数据
trx g
```

#### 二、启用webpack 编译项目
```bash
# 项目使用webpack打包
node run build

# 本地启动
node run dev
```
