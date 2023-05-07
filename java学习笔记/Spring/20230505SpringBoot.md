# SpringBoot

## SpringBoot 是什么?

  Spring因为太多的配置文件，所以被称为配置地狱，为了简化Spring应用的搭建和开发过程，SpringBoot出现了

  SpringBoot具有Spring的一切特性，Spring能做的事，SpringBoot都能做，而且使用更加简单，功能更加丰富，性能更加稳定而且更加健壮。

  SpringBoot继承了大量常用的第三方库配置，SpringBoot应用中这些第三方库几乎是零配置的开箱即用，大部分的SpringBoot应用都值需要少量的配置代码

## SpringBoot的特点

            独立运行的Spring项目，可以以jar包的形式独立运行。
            内嵌Servlet容器。
            使用starter简化maven配置
            提供了大量的自动配置
            自带应用监控
            无代码生成和xml配置

## SpringBoot启动

 首先创建一个空的maven项目，

 然后添加依赖

```xml
<!-- pom.xml -->
 <dependencies>
    <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
      <version>3.0.6</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <version>3.0.6</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
    <!-- 日志插件需要引入，否则会报错 -->
    <!-- https://mvnrepository.com/artifact/ch.qos.logback/logback-classic -->
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.4.7</version>
      <scope>test</scope>
    </dependency>

  </dependencies>
```
  然后开始编写main函数

```java
// SpringBoot的启动注解
@SpringBootApplication
public class App 
{
    public static void main( String[] args )
    {
    //    启动SpringBoot
        SpringApplication.run(App.class,args);

    }
}

```

## SpringBoot入门

 传统的Spring项目运行，需要导入各种依赖，还要有很多的配置文件，在SpringBoot项目创建完成后，不需要配置也能运行这都是
 Spring Boot的自动配置(starter机制)
### starter

  SpringBoot将日常开发的各个场景都抽取出来，做成一个个的starter(启动器),starter中整合了该场景下各种可能用到的依赖，用户只需要在maven中引入starter依赖，SpringBoot就能自动扫描到要加载的信息并启动相应的默认配置。starter提供了大量的自动配置，这些starter都遵循着约定成俗的默认配置，并允许用户调整这些配置。

## SpringBoot的四大核心

自动配置 Auto Configuration

起步依赖  Starter Dependency

Spring Boot Cli

Actuator