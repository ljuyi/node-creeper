# Node.js + http + express模块完成的网络爬虫
### 实现原理
通过chrome开发者工具查找api文件url，使用http模块模拟浏览器发送请求，将请求到的json文件解析，提取需要的数据保存在data文件夹下

### 开发日志
2017-6-4：完成豆瓣部分电影和书籍的爬取
2017-6-5：完成知乎用户信息的爬取（只能爬取首页十个）

### 使用方法
爬取知乎用户：clone到本地，npm install安装好插件，cd到zhihu目录下，node app.js启动服务器，在页面中的input框中输入要查询的用户名，点击查询

