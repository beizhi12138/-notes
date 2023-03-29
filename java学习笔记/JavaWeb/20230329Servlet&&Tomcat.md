# Tomcat
 关于Tomcat的介绍可以去性能测试初始那个部分看

## Tomcat安装 && Idea配置(windows)
 
 ### Tomcat安装
 首先到apache去进行安装下载tomcat

 配置环境变量 
  
配置完环境变量之后

 windows : win+r startup 开启tomcat
 linux : sh catalina.sh run  开启tomcat

 访问:127.0.0.1:8080即可访问tomcat
 ### idea配置

   注意idea社区版需要安装插件才能运行web项目配置Tomcat所以请下载旗舰版!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

   首先通过maven构建webapp

    选择Maven Archetype 
    
    然后在Archtype选择 maven-archtype-webapp
    
     点击创建

     创建完成之后需要手动添加serc-test-java文件夹和src-text-resources文件夹

     之后点击编辑项目运行配置

     再项目运行配置里点击添加

      选择到tomcal local 之后选择运行

      即可运行javaweb项目

# Servlet

## 服务器如何保存一个网页

### 静态网页
   不与服务端交互，服务端直接返回html文件

### 动态网页
   与服务端交互，服务器保存组件，动态返回不同内容

   在java语言钟servlet就是这个组件

## servlet的特点
  是服务器端的组件
  可以动态拼资源(HTML/IMG等)
  满足sun公司的规范
  处理HTTP协议
## 什么是servlet
 是sun公司推出的，用于在服务端拼动态资源的组件

 可以这么理解，就是前后端不分离的情况下，浏览器发起http请求，到服务端的java,然后java通过servlet处理http请求返回html。

 前后端分离的情况下，同样是发起请求返回html,然后前端发起http请求数据，java通过servlet处理http请求返回数据

 ## 本质
  是一个软件
  它和浏览器是评级的关系

## 不同的厂商开发的不同服务器

 tomcat (Apache)
 WebLogic
 Nginx