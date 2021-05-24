---
title: nginx(一)
date: 2021-03-08 17:19:17
tags: nginx
---

## 一、基本命令

```shell
# 启动
nginx

# 重启
nginx -s reload

# 查看进程号
ps -ef |grep nginx

# nginx 服务停止
nginx -s stop
```

## 二、nginx.conf

```yml
    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/local/trx/toy-blog;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }

```
