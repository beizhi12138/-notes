# 什么是SpringSecunity

 SpringSecunity是Spring提供的安全权限框架，

 安全包括两个操作:

   认证
      为用户建立一个它声明的主体，就是指用户登录

   授权

      给用户授权，比如管理员，普通用户，超级管理员


## 首先进行导入依赖

spring-security-config

spring-security-web

## 配置web.xml


## jsp权限标签

### 首先需要导入标签库

 spring-security-taglibs

### 在jsp页面中导入


 ```jsp
<%@taglib pretix="security" uri="http://www.springframework.org/security/tags" %>

 ```

 #### security 提供了以下标签

 ##### authentication
```jsp
 
 <security:authentication
    property="获取当前登录用户的属性信息"
    htmlEscape="是否进行html转义"
    scope="作用域"  
    var="属性名"
 ></security:authentication>

```

##### authorize

  authorize是用来判断普通权限的，判断用户是否有指定访问的权限

```jsp
 <security:authorize
   assess="hasRole('角色名')"
  
 >
 <!-- hasRole 是用途有哪个角色可以访问 -->
  </security:authorize>
```
##### accessontrollist
 
    角色下的权限所属认证


## spring-security 日志


