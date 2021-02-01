---
title: git(一) 远程仓库
date: 2021-01-26 10:26:58
tags: git
---

## 一、生成SSH密钥
#### 一、输入下面的git命令，生成SSH秘钥
```bash
ssh-keygen -t rsa -C "youremail@example.com"
```
找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。

linux   生成在路径 /root/.ssh/id_rsa.pub  文件中
windows 生成在路径 C:\Users\admin\.ssh\id_rsa.pub 文件中

<!--more-->

#### 二、找到github或gitee  SSH keys 页面，将`id_ras.pub`中的内容添加到key中

#### 三、解决配置ssh公钥后，每次都要输入用户名和密码

```bash
git config --global credential.helper store
```

#### 四、将本地仓库与远程仓库进行关联,`git push`推送到远程仓库

```bash
// 本地仓库关联远程仓库
git remote add origin https://github.com/tongruixun/trx-hexo.git
// 本地内容推送到远程仓库
git push
```

#### 五、克隆到本地到本地仓库

如果需要再另一台电脑上或另一个文件夹中克隆项目

```bash
git clone https://github.com/tongruixun/trx-hexo.git
```

#### 六、git错误

一、`error: failed to push some refs to 'https://github.com/tongruixun/trx-util.git`
问题原因: 远程库与本地库不一致造成的

执行 `git pull --rebase origin master`

该命令的意思是把远程库中的更新合并到（pull=fetch+merge）本地库中，–-rebase的作用是取消掉本地库中刚刚的commit，并把他们接到更新后的版本库之中

> https://blog.csdn.net/dietime1943/article/details/85682688
