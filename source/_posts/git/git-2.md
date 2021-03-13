---
title: git(二) 子仓库
date: 2021-03-02 08:36:31
tags: git 
---

## 一、什么是git子仓库

通俗上的理解, 一个Git仓库下面放了多个其他的Git仓库,其他的Git仓库就是我们父级仓库的子仓库。
#### Git子仓库的两种使用方案

- 1、`git submodule`
- 2、`git subtree`

## 二、git submodule(子模块)用法

#### 一、使用git submodule(子模块)在父仓库中添加子仓库

```shell
# Add a submodule
# <url> git 子仓库的地址
# <path> 本地目录
git submodule add <url> <path>
```

#### 二、对子仓库进行pull, push

##### 1、在府项目的目录下直接使用`git submodule foreach`

如果觉得对每个子仓库进行提交繁琐的话,`git submodule foreach`就可以解决你这个烦恼
```shell
# 主仓库目录下   foreach 后面的git命令就是你对子模块的操作
# 对所有子仓库拉取一次最新代码
git submodule foreach git pull
```

##### 2、进入submodule使用git命令进行操作

#### 三、克隆含有子仓库的仓库的两种方式

##### 1、方式一

```shell
# Git会自动帮我们递归去拉取我们所有的父仓库和子仓库的相关内容。
git clone --recursive git@github.com:tongruixun/toy.git
```


##### 2、方式二
首先执行`git submodule init`用来初始化本地配置文件,也就是向.git/config文件中写入了子模块的信息。
`git submodule update`则是从子仓库中抓取所有的数据找到父级仓库对应的那次子仓库的提交id并且检出到父项目的目录中。
然后查看仓库下的目录结构，此时和提交的目录结构保持一致
```shell
# 克隆父仓库 此时并不会克隆子仓库 仓库中虽然有子仓库文件夹，但文件夹里面是空的。
# 需要运行git submodule的另外两个命令
git clone git@github.com:tongruixun/toy.git

# 初始化本地配置文件
git submodule init

# 
git submodule update
```

#### 四、删除submodule

git 不支持直接删除submodule需要手动删除对应的文件
进入项目根目录
```shell
# 1、进入项目根目录
git rm --cached 子仓库文件名

# 2、手动删除相关文件

rm -rf 子仓库文件名
rm .gitmodules

# 3、进入 .git/module 删除对应文件

```

## 参考链接

> https://zhuanlan.zhihu.com/p/100214931