# Cookie
cookie就是客户端保存的数据，客户端每次发起请求时会携带cookie

cookie保存的大小只有4k，同一域名下的cookie数量不能超过50个，浏览器可以存储cookie的数量为300个

当用户第一次登录时，服务端会创建cookie,然后返回给客户端，并且存储在客户端。

## 添加cookie
添加cookie 需要在response上操作

```java
 //首先新建一个cookie

 Cookie cookie=new Cookie(key,value);
 cookie.setMaxAge(存活时间/秒);

 responser.addCookie(cookie);
```

## 获取cookie

获取cookie需要通过request操作

```java
//返回cookie数组，数组里保存的是cookie对象
req.getCookies();

```
### 删除cookie
删除cookie就是重新添加，覆盖掉之前的，并且将存活时间设置为1
```java
   Cookie cookie=new Cookie(key,value);
 cookie.setMaxAge(1);

 responser.addCookie(cookie);
```
# Session

 cookie是存储在客户端，由客户端存储每次请求返回给服务端，Session是保存在服务端的，并且session依赖于cookie里的JSESSIONID，这个可以认为是设备的id,不同设备是不一样的，session依赖于JSESSIONID区分设备。当cookie被禁用后session也会受到影响

 session的默认存活时间是30分钟

 可以通过web.xml进行设置

 ```xml
<servlet-config>
 <session-timeout>1(单位是分钟)</session-timeout>
</servlet-config>
 ```

 ## session的销毁方式

  1、 无交互，达到存活时间自动销毁
  2、 关闭服务器，自动销毁
  3、 手动销毁 session.invalidate(); 

  4、session.setMaxInactiveInterval(5); 设置存活时间(单位秒)

  ## session的方法
   getAttribute 获取属性
   
   setAttribute 设置属性
   
   removeAttribute 移除属性
   
   isNew 判断session是否是新的    


通过session统计在线人数
```java
  //设置在线人数
        int count=0;
      ServletContext context=getServletContext();
      Object old_count=context.getAttribute("count");
        if(old_count != null){
           count=(Integer) old_count;
        }
        HttpSession session=req.getSession();
        if(session.isNew()){
            count++;
        }
        System.out.println(count);
        getServletContext().setAttribute("count",count);
      res.sendRedirect("index.jsp");

```

### 防止用户禁用cookie

 使用res.encodeURL对跳转的连接进行编译

 ```java
 res.encodeURL("url")
 ```
# 过滤器(Filter) 
  
  使用过滤器，需要实现Filter接口
  过滤器主要的作用就是拦截请求，所以过滤器也可以称之为拦截器
## 过滤器的生命周期

  过滤器的生命周期和Servlet的一样

   都是经过
   init(初始化，配置参数) --- doFilter(过滤) ---- destory(对象销毁之前调用)

## 过滤器实现字符集过滤

```java
package Filter;

import javax.servlet.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebFilter(filterName = "ChatFilter")
public class ChatFilter implements Filter {
    private String encode="utf-8"; //默认编码
    public void init(FilterConfig config) throws ServletException {
      encode= config.getInitParameter("encode");
    }

    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
    /*

    * 因为不同的请求或者浏览器传输过来的数据的编码不一致，所以导致Contorller层接收到的乱码，使用过滤器重新进行编码设置

    */
//        request.setCharacterEncoding("utf-8");
//        response.setCharacterEncoding("utf-8");
//        response.setContentType("text/html;charset=utf-8");
     /*
     *  升级版，获取参数，进行设置字符集
     * */
        request.setCharacterEncoding(encode);
        response.setCharacterEncoding(encode);
        response.setContentType("text/html;charset="+encode);
            chain.doFilter(request,response);



    /**
         * 升级版 根据请求区分字符集
         */
    
HttpServletRequest req=(HttpServletRequest) request;
        HttpServletResponse res=(HttpServletResponse) response;
        String method=req.getMethod();
        if("post".equalsIgnoreCase(method)){
            req.setCharacterEncoding(this.Encode);
            res.setCharacterEncoding(this.Encode);
            res.setContentType("text/html;charset="+this.Encode);
        }else{
            MyRequest myRequest=new MyRequest(req);
            myRequest.setEncode(this.Encode);
            myRequest.setGetEncode(this.GetEncode);
            req=myRequest;
        }
        chain.doFilter(req,res);
    }
}





import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.Set;

public class MyRequest extends HttpServletRequestWrapper {
    private HttpServletRequest request;
    private String Encode;
    private String GetEncode;
    public String getEncode() {
        return Encode;
    }

    public void setEncode(String encode) {
        Encode = encode;
    }

    public String getGetEncode() {
        return GetEncode;
    }

    public void setGetEncode(String getEncode) {
        GetEncode = getEncode;
    }


    public MyRequest(HttpServletRequest request) {
        super(request);
        this.request=request;
    }

    @Override
    public String getParameter(String name) {
        String old_content=this.request.getParameter(name);
        if(old_content != null){
            try {
                old_content=new String(old_content.getBytes(this.GetEncode),this.Encode);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return old_content;
    }

    @Override
    public Map<String, String[]> getParameterMap() {
       Map<String,String[]> old_content=this.request.getParameterMap();
       if(old_content!=null){
           Set<Map.Entry<String,String[]>> old_set=old_content.entrySet();
           for(Map.Entry<String,String[]> items:old_set){
               String key=items.getKey();
               String [] values=items.getValue();
               for(int i=0;i<values.length;i++){
                   try {
                       values[i]=new String(values[i].getBytes(this.GetEncode),this.Encode);
                   } catch (UnsupportedEncodingException e) {
                       e.printStackTrace();
                   }
               }
               old_content.put(key,values);
           }
       }
       return old_content;
    }
}

```
# Listener(监听器)
 

   使用监听器，根据不同的范围和监听事件的不同，需要实现不同的接口 

 
 
 
  监听器主要是对ServletRequest域   HttpSession域   ServletContext域这三个范围对象的监听，

   监听器又分为三类
     
       监听对象创建和销毁的监听器

       监听对象属性变更的监听器

       监听 Session 中对象状态改变的监听器

## 监听创建和销毁的监听器
  主要包含两个方法：创建和销毁的方法

### session作用域的创建和销毁
   sessionCreated (HttpSessionEvent se)

   sessionDestoryed (HttpSessionEvent se)

#### request作用域的创建和销毁  
   requestInitialized (ServletRequestEvent sre)
   requestDestroyed (ServletRequestEvent sre)
  
### Context作用域的创建和销毁方法
   contextInitialized(ServletContextEvent sce)
   contextDestroyed(ServletContextEvent sce)

## 监听对象属性变更的监听器

public void attributeAdded (ServletContextAttributeEvent scae) 

public void attributeRemoved (ServletContextAttributeEvent scae) 

public void attributeReplaced (ServletContextAttributeEvent scae) 

属性变更的监听器使用的方法都是一样的，只不过是参数不一样

 session 使用  HttpSessionBindingEvent

 context 使用 ServletRequestAttributeEvent

 request 使用 ServletContextAttributeEvent

 ## 监听Session对象改变的监听器


 ## 注册监听器

  注册监听器有两种方式，一种是xml配置，一种是使用注解

```xml
  <listener>
    <listener-class>监听器路径</listener-class>
  </listener>
```

使用注解配置
```java
@WebListener
``` 