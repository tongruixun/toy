---
title: git版本操作和代码暂存
date: 2021-03-29 10:45:13
tags: git 
---


## 一、版本回退

#### 一、查看版本

```shell
git log  # 查看完整版日志，只能查“过去”
git reflog  # 查看简易版日志，能看“过去”和“将来”
git log --pretty=oneline   # 让日志一行显示，比git reflog更详细一些
```

#### 二、版本回退

```shell

# 暂存区和工作区保持不变。此时本地仓回滚到版本号commit完成的那一刻。
git reset --soft

# 表示本地仓和暂存区，都回滚到Y版本号。工作区代码不受影响
git reset --mixed  # 或者  git reset

# 本地仓、暂存区、工作区，三区都回滚
git reset --hard HEAD~1
```

## 二、暂存修改

```shell
git stash save   # + ‘说明信息’ # 暂存代码，并添加说明
git stash list   # 查看stash列表
git stash apply  # 取出最近一次的stash
git stash apply  # 数字  // 输入list里对应的数字，取出对应的stash
git stash --all  # // 暂存所有文件，包括没有被git追踪的文件
```