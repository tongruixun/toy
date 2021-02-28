---
title: Linux操作命令(一)  文件与目录管理
date: 2021-01-12 15:08:58
tags: Linux
---

## 一、目录的相关操作

#### 一、特殊目录

```
.       代表此层目录
..      代表上一层目录
-       代表前一个工作目录
~       代表目前使用者身份所在的目录

```

#### 二、处理目录常见命令

```
cd :     切换目录(change directory，切换目录)
pwd :    显示当前目录(Print Working Directory)
mkdir :  建立一个新目录 [-mp] -m 设置文件的权限。直接设置，不适用默认权限。 -p 帮助你直接将所需要的目录(包含上层目录)递归创建
rmdir :  删除一个空目录
```
<!--more-->
## 二、文件与目录管理

#### 一、文件与目录的查看 : ls

```
ls [-aAdfFhilnrRSt]
ls [--color={never,auto,always}]
ls [--full-time]

选项与参数
-a : 全部的文件，连同隐藏的文件(开头为 . 的文件)一起列出来(常用);
-A : 全部的文件，连同隐藏的文件，但不包括.与..这两个目录；
-d : 仅列出目录本身，而不是列出目录内的文件数据(常用)
-f : 直接列出结果，而不进行排序(ls默认会以文件名排序)；
-F :
-h :
-i :
-l :
-n :
-r :
-R :
-S :
-t :
--color=never :
--color=always :
--color=auto :
--full-time : 
--time={atime,ctime}
 ```

#### 二、复制、删除与移动: cp、rm、mv

```
cp [-adfilprsu] 源文件(source) 目标文件 (destination)
cp [options] source1 source2 source3 ... directory

选线与参数
-a : 相当于 -dr --preserve=all 的意思， 至于dr请参考下列说明(常用);
-d :
-f :
-i :
-l :
-p : 连同文件的属性(权限、用户、时间)一起复制过去，而非使用默认属性(备份常用);
-r : 递归复制，用于目录的复制操作(常用);
-s :
-u :
--preserve=all 除了 -p 的权限参数外，还加入SELinux的属性，links、xattr等也复制;
// 如果源文件有两个以上，则最后一个目标文件一定要是 “目录” 才行
```

## 参考资料

- 《鸟哥的Linxu私房菜基础学习篇·第四版》
