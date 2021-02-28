---
title: Hexo(三) yilia主题添加分类页面
date: 2021-01-17 12:33:49
tags:
- hexo
- yilia
categories:
- 博客搭建
---

## 一、分类页面

根目录运行` hexo new page categories `, 会新建一个页面，将用作为分类展示页面。会在` \source\categories\index.md ` 生成文件

```
---
title: 分类
date: 2021-01-17 12:33:49
toc: false
comment: false
layout: categories
---
```

<!--more-->
##  二、新建一个布局文件

在主题路径下  ` \themes\yilia\layout\ `  新建` categories.ejs `, 内容如下

```
<article class="article">
  <h3 class="category-count">共计 <%= site.categories.length %> 个分类, <%= site.tags.length %> 个标签</h3>
  <% if (site.categories.length){ %>
  <ul class="category-list">
    <% site.categories.sort('name').each(function(item){ %>
      <% if(item.posts.length){ %>
        <li class="category-list-item">
          <a href="<%- config.root %><%- item.path %>" class="category-list-link" title="<%= item.name %>">
            <%= item.name %>
            <span class="category-list-count"><%= item.posts.length %></span>
          </a>
        </li>
      <% } %>
    <% }) %>
  </ul>
  <% } %>
  <div class="tag-cloud">
    <%- tagcloud({
      min_font: 20, 
      max_font: 35, 
      amount: 999
    }) %>
  </div>
</article>
```

## 三、添加样式

有能力的话可以根据需求自己修改样式。下面是参考样式， 在` \themes\yilia\source\main.0cf68a.css ` 中添加。不同主题main.内容不同

```

.category-count {
	text-align:center;
	line-height:3;
	font-size:18px;
	font-weight:bold;
}
.category-list {
	text-align:center;
	padding:20px
}
.category-list li.category-list-item {
	display:inline-block;
	margin:0 1em .5em 0;
	padding:4px;
	border:1px solid #aaaaaa;
	font-size:1.2rem
}
.category-list li.category-list-item:hover {
	background:rgba(204,204,204,0.3)
}
.tag-cloud {
	text-align:center;
	padding:20px
}
.tag-cloud a {
	margin:0 20px;
	word-break:keep-all;
	position:relative
}
.tag-cloud a:hover::before {
	width:100%;
	left:0;
	right:auto
}
.tag-cloud a::before {
	content:"";
	position:absolute;
	width:0;
	right:0;
	bottom:0;
	height:2px;
	background:#08c;
	-webkit-transition:width .3s ease;
	transition:width .3s ease
}
```

## 参考资料

> https://yansheng836.github.io/article/521a17ae.html
