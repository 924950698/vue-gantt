1. 前端打包命令

在项目根目录下执行：scp -rp ./nginx root@47.108.160.159:/root

如果当前正在运行nginx，则停止后，执行下面命令：

```
docker run --name nginx -d -p 80:80 -v /root/nginx/log:/var/log/nginx -v /root/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /root/nginx/conf.d:/etc/nginx/conf.d -v /root/nginx/html:/usr/share/nginx/html f00ab1b3ac6d
```