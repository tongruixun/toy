---
title: 自定义博客(二) trx命令的用法
date: 2021-02-28 11:44:55
tags: blog
---

## 一、创建文章

```bash
 trx new <title> [dir] [configPath]
 # 等价于 trx n <title> [dir] [configPath]
 # title 必需 文章标题
 # dir 可选 所在目录
 # configPath 可选 配置文件所在路径
```

## 二、文件生成

```bash
trx generate [configPath]
# 等价于 trx g [configPath]
# configPath 可选 配置文件所在路径
```

## 三、配置文件

根目录下的_config.yaml文件，将解析`source_dir`目录下的位于`posts_dir`中的所有markdown文件包括子目录中的文件。
解析成json格式的数据保存在`datasource_dir`中，`posts_db_name`中存放文章数据，
`config_db_name`中存放`_config.yaml`的数据
```yaml
# 链接图标
subNav:
  github: "https://gihub.com/tongruixun"
  gitee: "https://gitee.com/tongruixun"
  weixin: #
  qq: #
  bilibili: #
  zhifubao: #
  Gitlab-fill: #
  yuque-fill: #
  twitter: #
  weibo: #
  zhihu: #
  email: #
  juejin: #

# Directory
source_dir: source  # 资源文件夹
posts_dir: _posts   # 文章所在路径

template_dir: template # 模板文件目录
post_template: post.md # 文章模板

# Writing
datasource_dir: src/db # 数据写入的目录
posts_db_name: posts.json # 文章数据写入的文件名
config_db_name: config.json # 配置文件数据写入的文件名
```

