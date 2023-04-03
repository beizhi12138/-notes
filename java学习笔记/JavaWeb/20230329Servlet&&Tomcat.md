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
## Tomcat配置项目
  1、直接将项目放在webapps下(如果idea配置了tomcat,那么会自动放到webapps下)

  2、在conf/Catalina/localhost配置xml文件

    xml文件名称自己起，自己创建xml

    然后直接访问127.0.0.1:8080/xml文件名/index.html
## Tomcat热部署
  注意!!!!!!!!!!!!!!!!!一定要选择Tomcat Server 不是<del>TomEE server</del>
 然后选择update classes and resourse

## Tomcat管理项目
  直接输入 127.0.0.1:8080 进入管理界面

  选择manageing Tomcat

  然后在Tomcat文件夹下找到tomcat-users.xml配置用户名和密码,配置完成之后，重启服务器，进行登录管理界面

```xml
<!-- 配置 -->
<Context doBase="项目路径"></Context>
```
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

 Servlet是sun提供的接口

  HttpServlet是这个接口的实现类

 ## 本质
  是一个软件
  它和浏览器是评级的关系

## 不同的厂商开发的不同服务器

 tomcat (Apache)
 WebLogic
 Nginx

 ## 开发Servlet

 ### Servlet接口 
   实现Servlet接口，需要实现servlet的六个方法
   

   一个Servlet，只能处理一次HTTP请求
```java

public class InitServlets implements Servlet {
    /**
      初始化，运行在service之前，就是在对象创建之后立即调用的方法
     */
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        // 通过该类servletConfig，获取到配置文件中的参数
    }
    
    /***
      获取Servlet全局配置

      也就是init方法里的sevletConfig
      */
    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {

    }
    
    /**
       作用等同于getServletConfig
     */
    @Override
    public String getServletInfo() {
        return null;
    }
    
    /***
      当前类的实例，被销毁前由系统调用
     */
    @Override
    public void destroy() {

    }
}

```
 ### 编写Servlet
 创建一个类，名为xxxServlet
 继承HttpServlet，从而间接地实现了Servlet接口，重写父类的方法

 配置web.xml文件


配置完成之后重新运行项目去进行访问
 ```xml
<servlet>
    <!--servlet的名字-->
    <servlet-name>MyServlet</servlet-name>
    <!--servlet所在的路径-->
    <servlet-class>java.Servlets.init.Servlets</servlet-class>
  </servlet>
  <servlet-mapping>
    <!--servlet的名写一定要于上面的名字保持一致-->
    <servlet-name>Servlets</servlet-name>
    <!--servlet请求路径（地址）-->
    <url-pattern>/Servlets</url-pattern>
  </servlet-mapping>
 ```
```java
//第一种方式，需要配置xml
public class InitServlets extends HttpServlet {
    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
//        super.service(req, res);
        PrintWriter pw = res.getWriter();
        res.setContentType("text/html");
        pw.write("<p>11111</p>");
        pw.close();
    }
}

//第二种方式，使用注解的方式，免去xml配置
@WebServlet(name = "Servlets", value = "/Servlets")
public class Servlets extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

        res.getWriter().write("1111");

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}


```

 ### Servlet的生命周期

   Servlet的生命周期方法就是init-service-destory 


       1、客户端请求Servlet
       2、服务端创建Servlet实例对象
       3、服务端自动调用init
       4、开始调用service
       5、service结束之后，实例被销毁之前调用destory
       6、

### request方法

  request里包含了许多方法，用于获取请求参数

   
   getparmeterMap() 获取参数集合

   getparmeter("参数名称") 获取单个参数
   
   getParmeters() 获取复选框


   getMethods() 获取请求类型

   getRequestURI() 获取请求的相对路径

   getRequestURL() 获取请求绝对路径

   getRemoteAddr() 获取请求地址

   getProtocol() 
### response
  

#### 重定向 
  sendRedirect(url) 重定向到url
#### 请求转发
  请求转发是在req对象里

  req.getRequestDispatcher(url).forWord(请求对象，响应对象) 
  
  浏览器只发生一次请求，后续对该请求进行多次转发传递，浏览器地址不发生改变


####  输出响应
res.getWriter().writer(String)

### HttpServlet
  HttpServlet是Servlet的实现类，包含doGet和doPost方法

```java
public class InitServlets extends HttpServlet {
    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
//        super.service(req, res);
        PrintWriter pw = res.getWriter();
        res.setContentType("text/html");
        pw.write("<p>11111</p>");
        pw.close();
    }
```