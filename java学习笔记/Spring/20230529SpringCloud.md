# SpringCloud
 
## 什么是SpringCloud
Spring Cloud流程序应用启动器是基于SpringBoot的Spring集成应用程序，提供与外部系统的集成。
### 系统架构演变

#### 单体架构
  最早之前的系统是单体架构的，整个系统的功能和产品都集中在一个项目里，以减少部署节点和成本。

  缺点:代码耦合，开发和维护困难，无法针对不同模块进行优化，并发能力差。

#### 垂直拆分
   根据业务功能，对系统进行拆分。

   系统拆分实现了流量分担，解决了并发问题

   针对不同模块进行优化，方便水平扩展

   缺点:  
     系统间相互独立，会有很多重复开发工作


#### 分布式服务

 当垂直应用越来越多，应用之间交互不可避免，做为独立的服务，作为稳定的服务中心


 将基础服务进行了抽取，系统间相互调用，提高代码复用和开发效率

 系统间耦合度变高，难以维护。

 #### 流动计算架构

 服务治理，通过调度中心来管理服务。
 

 服务注册中心，实现服务自动注册和发现，服务自动订阅，服务列表推送，服务调用透明化，无需关心依赖，动态监控服务状态。

 但是，服务间会有依赖关系，一旦某个环节出现错影响较大，服务关系复杂，运维测试，部署困难。

 #### 微服务
  微服务是一种架构模式或者说是，一种架构风格，它提倡将单一应用程序划分为一组小的服务，每个服务运行在其独立的自己的进程中，服务之间相互协调，互相配合，为用户提供最终价值。服务之间采用轻量级的通信机制互相沟通(通常是基于HTTp的Restful风格Api)，每个服务都围绕着具体的业务进行构建，并且能够被独立的构建在生产环境，类生产环境等。另外，应避免统一的，集中的服务管理机制，对具体的一个服务而言，应该根据业务上下文，选择合适的语言，工具对其进行构建，可以有一个非常轻量级的集中式管理来协调这些服务，可以使用不同的语言来编写服务，也可以使用不同的数据存储。
##### 微服务架构带来的收益

 高内聚，低耦合

 单个的微服务，可以选择任意语言开发，扩展性强

 对于整个应用而言，代码不再耦合，不会出现大量的冲突。

 微服务可以重用，应用发布事件可控性更强。
 
 通过故障隔离，让错误在微服务中降级，不会影响到整个应用

##### 不遵循微服务架构原则会出现的问题

微服务之间的依赖错综复杂，难以维护

开发过程互相纠缠。


## 微服务架构需要遵循的原则

 1. 职责独立，每个微服务只做自己功能范围内的事，微服务之间的依赖链不要过长。
 2. 使用熔断器实现快速的故障容错和线程隔离，例如:Hystrix,Sentinel
 3. 通过网关代理微服务请求，网关是微服务架构对外暴露的唯一接口
 4. 确保微服务Api变更后能够向后兼容
   

## 服务调用方式
 服务间的调用方式有两种，RPC和HTTP
  
## Eureka注册中心

 Eureka帮助我们同一管理，服务的地址

 - 服务提供者(Service Provider) 服务提供者是一个独立的微服务组件，它实现的特定的业务功能并向外部提供服务。服务提供者通过将自己的服务注册到服务注册中心，以使其他服务消费者能够发现和调用它。服务提供者通常通过网络接口向外界暴露服务功能。并负责处理接收到的请求并返回相应的相应。服务提供者可以有一个或多个实例，通过注册中心实现负载均衡和高可用性。

 - 服务消费者(Service Consumer) 服务消费者是使用特定服务功能的微服务组件。它通过服务注册中心发现可用的服务提供者，并向其发送请求以索取所需的服务。服务消费者在运行时动态地获取服务提供者的地址和信息，然后使用相应的通信协议与服务提供者进行通信，服务消费则会负责构造请求，发送请求并处理服务提供者返回的响应结果。

 - 注册中心(EureKa Server)就是服务注册中心(服务的注册与发现,服务的健康状态管理)（可以是一个集群），对外暴露自己的地址


   
首先来进行搭建服务注册中心

首先进行添加依赖(以下的代码，都用一套依赖)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.example</groupId>
    <artifactId>study_20230529_SpringCloudEureka</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>
    <modules>
        <module>Eureka-server</module>
        <module>Eureka-provider</module>
        <module>Eureka-Consumer</module>
    </modules>
    <properties>
        <maven.compiler.source>18</maven.compiler.source>
        <maven.compiler.target>18</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.6</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bootstrap</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-netflix-eureka-client</artifactId>
        </dependency>
    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>2022.0.1</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
```
主函数
```java
//Main
@SpringBootApplication
@EnableEurekaServer
/**
 * 
 * EnableEurekaServer注解用来声明该服务是注册中心服务
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("注册中心被启动了");
        SpringApplication.run(Main.class, args);
    }
}
```
配置文件
```
spring:
  application:
    name: Eureka-register
server:
  port: 8091
eureka:
  client:
    service-url:
      defaultZone: "http://127.0.0.1:8091/eureka/"
```

接下来是服务生产者
```java
// 主函数
@SpringBootApplication

@EnableDiscoveryClient
/**
 * EnableDiscoveryClient注解用来表示当前服务是客户
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("我是服务生产者");
        SpringApplication.run(Main.class,args);
    }
}
//controller
@RestController
@RequestMapping("/order/")
public class Order {
    @GetMapping("/orderId/{id}")
    public String getOrderId(@PathVariable("id") int id){
        return "this is OrderId"+id ;
    }
}
```
配置文件
```
server:
  port: 10086
spring:
  application:
    name: provider
eureka:
  client:
    service-url:
      defaultZone: "http://127.0.0.1:8091/eureka/"
    register-with-eureka: true //表示是否将自己注册到Eureka Server 默认是true
    fetch-registry: true  //表示是否从Eureka Server获取注册的服务信息
```
接下来是服务消费者
```java
//主函数

//controller函数
@SpringBootApplication
@EnableDiscoveryClient
public class Main {
    public static void main(String[] args) {
        System.out.println("我是服务消费者");
        SpringApplication.run(Main.class, args);
    }
    // 注册restTemplate，通过restTemplate来调用其他服务
    @Bean
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
//controller

@RestController
@RequestMapping("/")
public class User {
    @Autowired
    RestTemplate restTemplate;
    @GetMapping("/user/{id}")
    public String getHome(@PathVariable("id") int id) {
        String orderId=restTemplate.getForObject("http://127.0.0.1:10086/order/orderId/2",String.class);
        return "home被调用了，home将调用服务生产者用户id"+ id+"订单id"+ orderId;
    }
}
```
配置文件
```
server:
  port: 10010
spring:
  application:
    name: eureka-consumer
eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: "http://127.0.0.1:8091/eureka/"
```

## Ribbon负载均衡

  由于Eureka已经整合进了ribbon所以我们不需要再添加依赖了

   ribbon的负载均衡值需要在resttemplate加上LoabBlance注解就可以了
```java
   @Bean
    @LoadBalanced //开启负载均衡
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
```

## Hystrix
   使用熔断机制来解决雪崩现象

   雪崩就是，微服务中一个服务出问题了，导致整个服务出错

### 线程隔离，服务降级
 Hystrix为每个依赖服务调用分配一个小的线程池，如果线程池已满掉调用将立即被决绝，默认不采用排队。加速失败判定时间，用户的请求将不再直接访问服务，而是通过线程池中的空闲线程来访问服务，如果线程池已满或者请求超时，则会进行降级处理，什么是服务降级?
        优先保证核心服务，而非核心服务不可用或弱可用

用户的请求故障时，不会被阻塞，更不会无休止的等待或看到系开通崩溃，至少可以看到一个执行结果。

### 熔断降级



## Openfeign
  远程调用工具

## Nacos(阿里开源组件)
macos是阿里的一个开源产品，针对微服务架构中的服务发现，配置管理，服务治理的综合性解决方案。
nacos不仅可以做注册中心，还可以做配置中心
### 注册中心

服务的注册与发现，服务的健康状态管理

使用注册中心的话，需要下载注册中心压缩包

<a href="https://github.com/alibaba/nacos/releases">注册中心压缩包</a>

下载完成之后进行解压，解压完成进入到bin目录双击startup.cmd然后通过终端提供给我们的地址可以访问注册中心图形化界面


#### 注册中心服务注册与消费
首先我们进行导入依赖
```xml
 <properties>
        <maven.compiler.source>18</maven.compiler.source>
        <maven.compiler.target>18</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <spring-cloud.version>2022.0.1</spring-cloud.version>
        <spring-boot.version>3.0.6</spring-boot.version>
        <project.versions>2022.0.0.0-RC1</project.versions>
    </properties>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.6</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <dependencies>
    <!-- springboot 依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!-- cloud nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- loadbalancer 负载均衡组件，springBoot3一定要单独引入
        
            因为在新版本中，已经不再使用ribbon了
           -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-loadbalancer</artifactId>
        </dependency>
    </dependencies>
    <dependencyManagement>
        <dependencies>
            <!--            springcloud-->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!--            alibaba  cloud-->
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>${project.versions}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!--            springBoot-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```
然后我们开始写服务提供者代码
```java
//main
@SpringBootApplication
@EnableDiscoveryClient
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class,args);
    }
}
//controller
@RestController
public class Order {
    @GetMapping ("/order/{id}")
    public String order(@PathVariable("id") int id) {
        return "订单id是"+id;
    }
}
```
接下来是配置文件

```
spring:
  application:
    name: provider
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
server:
  port: 8091
```

然后开始写消费者

```java
//mian
@SpringBootApplication
@EnableDiscoveryClient
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        SpringApplication.run(Main.class, args);
    }
    @Bean
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
//controller
@RestController
public class User {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private LoadBalancerClient loadBalancerClient;
    @GetMapping("/user/{id}")
public String user(@PathVariable int id){
        ServiceInstance provider = loadBalancerClient.choose("provider");
        String host=provider.getHost();
        int port=provider.getPort();
        System.out.println(host + ":"+port);
        System.out.println("http://"+host+":"+port+"/order/"+id);
       String orderId= restTemplate.getForObject("http://"+host+":"+port+"/order/"+id,String.class);
        return "用户id是"+id+"订单id是"+orderId;
}
}
```
配置文件
```
server:
  port: 8082
spring:
  application:
    name: consumer
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
```
### Dubbo

Apache Dubbo是一款高性能的JAVA rpc框架，可以和Spring无缝集成

Rpc就是远程过程调用手段。

一般我们在浏览器访问的后端接口是通过http协议(七层)，dubbo如果不进行配置的话默认使用dubbo协议。
dubbo协议相对于http协议的话要快。但是浏览器与后端交互又只能使用http协议，虽然改变不了，但是可以改变微服务之间的调用，微服务之间如果使用http协议进行调用的话速度稍慢，但是如果微服务之间使用dubbo协议调用会快。

- 使用dubbo之后的微服务架构是这样的:浏览器进行访问后端使用http协议，后端之间的服务调用通过dubbo协议。

  对于dubbo的服务提供者进行分包编写，一个包提供接口，一个包进行实现。消费者调用时只需要调用接口即可。

#### Dubbo搭建微服务架构

  这个Demo使用两个服务提供者，一个服务消费者，来进行搭建。

  首先是添加依赖(依赖在前边已经有，这里就不放了)

 - service1代码
    api包(因为api包只写接口，所以并不需要任何配置和启动类)
```java
//api接口
public interface Order {
    String changeOrder(String name);
}
```
   server包
```java

//mian
@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        System.out.println("我是dubbo的service1的server");
        SpringApplication.run(Main.class,args);
    }
}
/***
 * 
 * 实现该接口时，一定要在maven依赖里依赖该api接口的包
 */
//实现类
@DubboService
public class OrderImpl implements Order{
    @DubboReference
    private Goods goods;
    @Override
    public String changeOrder(String name) {
        //这里调用了另外一个微服务
      String goodsName=goods.changeGoods("李靖");
        return "订单名称是"+name+goodsName;
    }
}
```
配置
```
server:
  port: 8011
spring:
  application:
    name: dubbo_service1
#    服务的注册中心
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
dubbo:
  scan:
#    扫描包
    base-packages: org.example.service
  protocol:
#    使用协议名称
    name: dubbo
#    dubbo协议端口
    port: 10191
  registry:
#    注册中心地址
    address: nacos://127.0.0.1:8848
  application:
#    运维服务是否开启
    qos-enable: false
  consumer:
#    是否启动检查时依赖
    check: false

```
 - service2代码
api包
```java
public interface Goods {
  String changeGoods(String name);
}
```
server包
```java
//main
@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        System.out.println("我是dubbo2的server");
        SpringApplication.run(Main.class, args);
    }
}
//实现类
@DubboService
public class GoodsImpl implements Goods{
    @Override
    public String changeGoods(String name) {
        return "商品的名称是"+name;
    }
}

```
配置文件
```
server:
  port: 8016
spring:
  application:
    name: dubbo_service3
  #    服务的注册中心
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
dubbo:
  scan:
    #    扫描包
    base-packages: com.lrz.service
  protocol:
    #    使用协议名称
    name: dubbo
    #    dubbo协议端口
    port: 10196
  registry:
    #    注册中心地址
    address: nacos://127.0.0.1:8848
  application:
    #    运维服务是否开启
    qos-enable: false
  consumer:
    #    是否启动检查时依赖
    check: false

```

 - consumer代码
```java
//main
@SpringBootApplication
public class Main {
    public static void main(String[] args) {

        System.out.println("我是dubbo的消费者");
        SpringApplication.run(Main.class, args);
    }
}
//controller
@RestController
public class Tb {
    @DubboReference
    private Order order;
    @DubboReference
    private Goods goods;
    @GetMapping("/oders")
    public String getOrders(){
           return order.changeOrder("订单一号");
    }
    @GetMapping("/goods")
    public String getGoods(){
        return goods.changeGoods("商品一号");
    }
}
```
配置文件
```
spring:
  application:
    name: dubbo_consumer
server:
  port: 8888
  # 这里虽然是消费者，但是也要配置dubbo
dubbo:
    scan:
      #    扫描包
      base-packages: org.example.controller
    protocol:
      #    使用协议名称
      name: dubbo
      #    dubbo协议端口
      port: 10198
    registry:
      #    注册中心地址
      address: nacos://127.0.0.1:8848
    application:
      #    运维服务是否开启
      qos-enable: false
    consumer:
      #    是否启动检查时依赖
      check: false

```

### 配置中心

应用程序在启动和运行的时候往往需要一些配置信息，配置基本上伴随着App的声明周期:例如数据库参数。
#### SDK拉取配置
#### 主配置

#### 扩展配置

## Zuul网关(zuul对于springBoot3.0已经不支持，springcloud2021以后的版本都不支持)
Zuul是Netfix开源的微服务网关，它可以和Eureka，Hystrix,Ribon等组件配合使用。

Zuul的核心是一些系列的过滤器。这些过滤器可以完成以下功能。

          身份认证与安全：识别每个资源的验证要求，拒绝与要求不符的请求。
          审查与监控：在边缘位置追踪有意义的数据和统计结果
          动态路由:动态的将请求路由到不同的后端集群。
          压力测试:逐渐增加指向集群的流量，以了解性能
          负载分配:为每一种负载类型分配对应容量，并启用超出限定值的请求
          静态响应处理:在边缘位置直接建立部分响应，从而避免其转发到内部集群。
          多区域弹性:跨越AWS Region进行请求路由。

    由于zuull网关已经停更，所以这里只做一个小Demo

首先是添加依赖

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>study_0601_zull</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>
    <modules>
        <module>controller</module>
        <module>zuul</module>
    </modules>

    <properties>
        <maven.compiler.source>18</maven.compiler.source>
        <maven.compiler.target>18</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.3.RELEASE</version>
    </parent>
   <dependencies>

       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
       </dependency>
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-web</artifactId>
       </dependency>

   </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>2.1.3.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Greenwich.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
```
然后开始写服务

```java
//main
@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);System.out.println("Hello world!");
    }
}
//controller
@RestController
public class User {
    @GetMapping("/user")
    public String user(){
        return "我是用户服务";
    }
}
```
配置文件
```
server:
  port: 8081
spring:
  application:
    name: controller
```
然后是zull网关

```java
//main
@SpringBootApplication
@EnableZuulProxy
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        SpringApplication.run(Main.class, args);
    }
}

```
配置文件
```
server:
  port: 18888 #服务端口
spring:
  application:
    name: zull-boot #指定服务名
zuul:
  routes:
    service-provider: # 这里是路由id，随意写
      path: /controller/** # 这里是映射路径
      url: http://127.0.0.1:8081 # 映射路径对应的实际url地址
```
## gateway网关
## SpringCloud常见面试题
### 什么是SpringCloud
### 什么是微服务

# SpringCloud(慕课网学习笔记)
## 认识领域驱动设计(DDD)
DDD是一种软件架构设计方法，它并不定义软件开发过程

DDD利用面向对象的特性，以业务为核心驱动，而不是传统的数据库开发

领域是对功能需求的划分；大的领域下面还有很多小的子领域(比如电商下边还有商品，订单，账户，物流等)

1. 分析领域模型，推演实体，值对象，领域服务
2. 找出聚合边界(降低服务耦合)
3. 为聚合配置存储仓库(数据持久化)
4. 实践DDD，并不断推倒和重构 

## 电商工程业务解读

    电商App:
        用户账户服务 

        商品服务

        订单服务

        物流服务

### 微服务模块拆分

#### 工程入口及用户鉴权微服务
   网关是微服务架构的唯一入口

   鉴权微服务(用户登录/注册)

#### 账户 商品 订单 物流





