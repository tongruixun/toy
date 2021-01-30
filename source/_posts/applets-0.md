---
title: 微信小程序开发 常用API汇总
date: 2021-01-19 15:09:23
tags: 微信小程序
---

## 微信小程序登录

#### 一、检查登录态 `wx.checkSession(Object object)`

检查登录态是否过期。 调用 `wx.login` 会获取新的用户登录态

> https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.checkSession.html

<!--more-->

#### 二、登录 `wx.login(Object object) `

调用登录接口获取登录凭证 (code)。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。

> https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html

#### 三、获取当前微信用户信息

一、使用 ` <open-data /> ` 获取用户信息，不需要经过用户授权可以展示开放数据，包括用户的头像，昵称，性别等

> https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html


二、`wx.getUserInfo(Object object)` 获取用户信息 需要使用 button 来授权登录


> https://developers.weixin.qq.com/miniprogram/dev/component/button.html
> https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html

#### 三、图片与文件


一、媒体图片
1、 `wx.choseImage(Object object)` 从本地相册或使用相机拍照
2、 `wx.chooseMessageFile(Object object)` 从微信的聊天列表中选择文件
3、 `wx.previewImage(Object object, boolean showmenu)` 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
4、 `wx.previewMedia(Object object, boolean showmenu)` 预览图片和视频
> https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.saveImageToPhotosAlbum.html

二、 文件管理器

> https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readFile.html
