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