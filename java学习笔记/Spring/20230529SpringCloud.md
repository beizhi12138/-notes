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

# 以下是alibaba公司的组件
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





