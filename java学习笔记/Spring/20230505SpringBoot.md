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


            使用SpringBoot就能享有整个Spring生态圈提供的服务

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

## 了解自动配置原理


### SpringBoot配置原理

#### 依赖管理

```xml
 <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.0.6</version>
    <relativePath/>
  </parent>
  <!-- 当前项目的所有依赖都在spring-boot-starter-parent 
  但是这里我们并没有看到具体的依赖项和版本号
  -->
  <?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>3.0.6</version>
  </parent>
  <artifactId>spring-boot-starter-parent</artifactId>
  <packaging>pom</packaging>
  <name>spring-boot-starter-parent</name>
  <description>Parent pom providing dependency and plugin management for applications built with Maven</description>
  <properties>
    <java.version>17</java.version>
    <resource.delimiter>@</resource.delimiter>
    <maven.compiler.source>${java.version}</maven.compiler.source>
    <maven.compiler.target>${java.version}</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
  </properties>
  <url>https://spring.io/projects/spring-boot</url>
  <licenses>
    <license>
      <name>Apache License, Version 2.0</name>
      <url>https://www.apache.org/licenses/LICENSE-2.0</url>
    </license>
  </licenses>
  <developers>
    <developer>
      <name>Spring</name>
      <email>ask@spring.io</email>
      <organization>VMware, Inc.</organization>
      <organizationUrl>https://www.spring.io</organizationUrl>
    </developer>
  </developers>
  <scm>
    <url>https://github.com/spring-projects/spring-boot</url>
  </scm>
  <build>
    <resources>
      <resource>
        <directory>${basedir}/src/main/resources</directory>
        <filtering>true</filtering>
        <includes>
          <include>**/application*.yml</include>
          <include>**/application*.yaml</include>
          <include>**/application*.properties</include>
        </includes>
      </resource>
      <resource>
        <directory>${basedir}/src/main/resources</directory>
        <excludes>
          <exclude>**/application*.yml</exclude>
          <exclude>**/application*.yaml</exclude>
          <exclude>**/application*.properties</exclude>
        </excludes>
      </resource>
    </resources>
    <pluginManagement>
      <plugins>
        <plugin>
          <groupId>org.jetbrains.kotlin</groupId>
          <artifactId>kotlin-maven-plugin</artifactId>
          <version>${kotlin.version}</version>
          <configuration>
            <jvmTarget>${java.version}</jvmTarget>
            <javaParameters>true</javaParameters>
          </configuration>
          <executions>
            <execution>
              <id>compile</id>
              <phase>compile</phase>
              <goals>
                <goal>compile</goal>
              </goals>
            </execution>
            <execution>
              <id>test-compile</id>
              <phase>test-compile</phase>
              <goals>
                <goal>test-compile</goal>
              </goals>
            </execution>
          </executions>
        </plugin>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-compiler-plugin</artifactId>
          <configuration>
            <parameters>true</parameters>
          </configuration>
        </plugin>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-failsafe-plugin</artifactId>
          <executions>
            <execution>
              <goals>
                <goal>integration-test</goal>
                <goal>verify</goal>
              </goals>
            </execution>
          </executions>
          <configuration>
            <classesDirectory>${project.build.outputDirectory}</classesDirectory>
          </configuration>
        </plugin>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-jar-plugin</artifactId>
          <configuration>
            <archive>
              <manifest>
                <mainClass>${start-class}</mainClass>
                <addDefaultImplementationEntries>true</addDefaultImplementationEntries>
              </manifest>
            </archive>
          </configuration>
        </plugin>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-war-plugin</artifactId>
          <configuration>
            <archive>
              <manifest>
                <mainClass>${start-class}</mainClass>
                <addDefaultImplementationEntries>true</addDefaultImplementationEntries>
              </manifest>
            </archive>
          </configuration>
        </plugin>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-resources-plugin</artifactId>
          <configuration>
            <propertiesEncoding>${project.build.sourceEncoding}</propertiesEncoding>
            <delimiters>
              <delimiter>${resource.delimiter}</delimiter>
            </delimiters>
            <useDefaultDelimiters>false</useDefaultDelimiters>
          </configuration>
        </plugin>
        <plugin>
          <groupId>org.graalvm.buildtools</groupId>
          <artifactId>native-maven-plugin</artifactId>
          <extensions>true</extensions>
        </plugin>
        <plugin>
          <groupId>io.github.git-commit-id</groupId>
          <artifactId>git-commit-id-maven-plugin</artifactId>
          <executions>
            <execution>
              <goals>
                <goal>revision</goal>
              </goals>
            </execution>
          </executions>
          <configuration>
            <verbose>true</verbose>
            <dateFormat>yyyy-MM-dd'T'HH:mm:ssZ</dateFormat>
            <generateGitPropertiesFile>true</generateGitPropertiesFile>
            <generateGitPropertiesFilename>${project.build.outputDirectory}/git.properties</generateGitPropertiesFilename>
          </configuration>
        </plugin>
        <plugin>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-maven-plugin</artifactId>
          <executions>
            <execution>
              <id>repackage</id>
              <goals>
                <goal>repackage</goal>
              </goals>
            </execution>
          </executions>
          <configuration>
            <mainClass>${start-class}</mainClass>
          </configuration>
        </plugin>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-shade-plugin</artifactId>
          <configuration>
            <keepDependenciesWithProvidedScope>true</keepDependenciesWithProvidedScope>
            <createDependencyReducedPom>true</createDependencyReducedPom>
            <filters>
              <filter>
                <artifact>*:*</artifact>
                <excludes>
                  <exclude>META-INF/*.SF</exclude>
                  <exclude>META-INF/*.DSA</exclude>
                  <exclude>META-INF/*.RSA</exclude>
                </excludes>
              </filter>
            </filters>
          </configuration>
          <dependencies>
            <dependency>
              <groupId>org.springframework.boot</groupId>
              <artifactId>spring-boot-maven-plugin</artifactId>
              <version>3.0.6</version>
            </dependency>
          </dependencies>
          <executions>
            <execution>
              <phase>package</phase>
              <goals>
                <goal>shade</goal>
              </goals>
              <configuration>
                <transformers>
                  <transformer implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
                    <resource>META-INF/spring.handlers</resource>
                  </transformer>
                  <transformer implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
                    <resource>META-INF/spring.schemas</resource>
                  </transformer>
                  <transformer implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
                    <resource>META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports</resource>
                  </transformer>
                  <transformer implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
                    <resource>META-INF/spring/org.springframework.boot.actuate.autoconfigure.web.ManagementContextConfiguration.imports</resource>
                  </transformer>
                  <transformer implementation="org.springframework.boot.maven.PropertiesMergingResourceTransformer">
                    <resource>META-INF/spring.factories</resource>
                  </transformer>
                  <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
                  <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                    <mainClass>${start-class}</mainClass>
                  </transformer>
                </transformers>
              </configuration>
            </execution>
          </executions>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
  <profiles>
    <profile>
      <id>native</id>
      <build>
        <pluginManagement>
          <plugins>
            <plugin>
              <groupId>org.springframework.boot</groupId>
              <artifactId>spring-boot-maven-plugin</artifactId>
              <configuration>
                <image>
                  <builder>paketobuildpacks/builder:tiny</builder>
                  <env>
                    <BP_NATIVE_IMAGE>true</BP_NATIVE_IMAGE>
                  </env>
                </image>
              </configuration>
              <executions>
                <execution>
                  <id>process-aot</id>
                  <goals>
                    <goal>process-aot</goal>
                  </goals>
                </execution>
              </executions>
            </plugin>
            <plugin>
              <groupId>org.graalvm.buildtools</groupId>
              <artifactId>native-maven-plugin</artifactId>
              <configuration>
                <classesDirectory>${project.build.outputDirectory}</classesDirectory>
                <metadataRepository>
                  <enabled>true</enabled>
                </metadataRepository>
                <requiredVersion>22.3</requiredVersion>
              </configuration>
              <executions>
                <execution>
                  <id>add-reachability-metadata</id>
                  <goals>
                    <goal>add-reachability-metadata</goal>
                  </goals>
                </execution>
              </executions>
            </plugin>
          </plugins>
        </pluginManagement>
      </build>
    </profile>
    <profile>
      <id>nativeTest</id>
      <dependencies>
        <dependency>
          <groupId>org.junit.platform</groupId>
          <artifactId>junit-platform-launcher</artifactId>
          <scope>test</scope>
        </dependency>
      </dependencies>
      <build>
        <plugins>
          <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <executions>
              <execution>
                <id>process-test-aot</id>
                <goals>
                  <goal>process-test-aot</goal>
                </goals>
              </execution>
            </executions>
          </plugin>
          <plugin>
            <groupId>org.graalvm.buildtools</groupId>
            <artifactId>native-maven-plugin</artifactId>
            <configuration>
              <classesDirectory>${project.build.outputDirectory}</classesDirectory>
              <metadataRepository>
                <enabled>true</enabled>
              </metadataRepository>
              <requiredVersion>22.3</requiredVersion>
            </configuration>
            <executions>
              <execution>
                <id>native-test</id>
                <goals>
                  <goal>test</goal>
                </goals>
              </execution>
            </executions>
          </plugin>
        </plugins>
      </build>
    </profile>
  </profiles>
</project>


<!-- 
  
  所以我们继续看父项目spring-boot-dependencies 
  因为这里的文件太长，所以就不放了。
  在spring-boot-dependencies可以看到所有的依赖项和版本 
  -->

```

父项目用来做依赖管理，父项目内执行了所有的依赖版本。我们也可以指定。

```xml

<!-- 在当前项目中指定版本号 -->
<properties>
<mysql.version>版本号</mysql.version>
</properties>
<!-- 指定完版本号之后进行刷新 -->
```

#### 自动配置

  自动配置了tomcat依赖

  配置tomcat

  自动配置springmvc
     引入了springmvc组件
     自动配置好了springMvc常用组件

   自动配好web的常见功能(比如字符编码)

   默认的包结构

   各种配置拥有默认值

   按需加载所有配置自动项

   默认的包结构

      主程序下和同级的类都会被扫描

      如果要改变扫描路径，两种方式

                   1.SpringBootApplication注解的源码里的ComponentScan注解里进行配置

                   2.SpringBootApplication(scanBasePackages="希望被扫描的包路径")


        各种类拥有默认值(默认值对应一个类)
            配置文件的值最终会绑定到每个类上，这个类会在容器内创建对象。

        按需加载所有自动配置项

            非常多的starter
            引入了哪些场景这个场景的启动配置才会开启
            SpringBoot所有的自动配置功能都在spring-boot-autoconfigure包内    

## 容器功能

### 组件添加(SpringBoot底层注解)

  在之前我们的组件添加需要，配置bean文件，但是在springBoot里我们通过@Configuration注解来配置类表示配置类来代替配置文件

  #### @Configuration
    用于标注类是一个配置类
  
  #### @Bean
    用于标注方法是获取bean的

DEMO

```java
// APP
@SpringBootApplication()
public class App 
{
    public static void main( String[] args )
    {

        ConfigurableApplicationContext run=SpringApplication.run(App.class,args);
        myConfig bean=run.getBean(myConfig.class);
//        @Configuration(proxyBeanMethods = true)代理对象调用方法，SpringBoot总会检查容器中有没有该实例
//        保持组件单实例
        Eat eat1=bean.getEat();
        Eat eat2=bean.getEat();
        User zhangsan=bean.getUser();
       System.out.println(zhangsan.getEat() == eat2);

    }
}
// myConfig

/**
 * Lite(proxyBeanMethods = false) 轻量级模式
 *
 * 轻量化模式每次运行的时候会跳过检查，
 *
 * Full(proxyBeanMethods = false) 全模式
 *
 * 全模式每次运行的时候都会经过检查容器内是否有该组件
 *
 *
 * 全模式很好的解决了组件依赖的问题，
 *
 *
 */

@Configuration(proxyBeanMethods = true) //告诉springBoot这是一个配置类
public class myConfig {
 @Bean(name = "eat")
 /**
  * 无论外部被获取多少次，获取的都是单例的
  */
 public Eat getEat(){
     return new Eat("猫",21);
 }
 @Bean
 public User getUser(){
     User zhangsan=new User("张三",this.getEat());
     return zhangsan;
 }
}

// User

public class User {
    private String name;
    private Eat eat;

    public Eat getEat() {
        return eat;
    }

    public void setEat(Eat eat) {
        this.eat = eat;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User(String name, Eat eat) {
        this.name = name;
        this.eat = eat;
    }
}

//Eat
public class Eat {
    private String name;
    private int age ;

    public Eat(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Eat() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

```
#### @Import

  给容器内注入组件

```java
@Import({Eat.class})
public class myConfig
```

注解当使用Import导入组件时，组件内一定不要有循环依赖关系否则会导致程序崩溃。
#### @Conditional

 满足Conditional指定的条件则进行组件注入。


#### @ImportResource

   配置文件导入

```java
@ImportResource("classpath:文件路径")
```
#### @ConfigurationProperties
  将配置文件注入到bean
```java
@Configuration
@ConfigurationProperties(prefix = "jdbc")
// prefix表示的是前缀，注意:配置文件一定要是application.properties
public class jdbcConfig {
    private String driverClassName;
    private String url;
    private String userName;
    private String password;
    public jdbcConfig() {
    }
    @Bean
    public DataSource getDataSource() {
      SimpleDriverDataSource springDatasource= new SimpleDriverDataSource();
        System.out.println(springDatasource);
//        System.out.println(userName);
//        System.out.println(password);
//        System.out.println(url);
      springDatasource.setUsername(this.userName);
      springDatasource.setPassword(this.password);
      springDatasource.setUrl(this.url);
      springDatasource.setDriverClass(Driver.class);
      return springDatasource;
    }
    public String getDriverClassName() {return driverClassName;}
    public void setDriverClassName(String driverClassName) {this.driverClassName = driverClassName;}
    public String getUrl() {return url;}
    public void setUrl(String url) { this.url = url;}
    public String getUserName() {return userName;}
    public void setUserName(String userName) { this.userName = userName;}
    public String getPassword() { return password; }
    public void setPassword(String password) {this.password = password;}
}
```
### 自动配配置原理入门

#### 引导加载自动配置类

```java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication 
```
SpringBootApplication注解是SpringBootConfiguration
EnableAutoConfiguration
ComponentScan

三个注解的合成注解

##### @SpringBootApplication注解
首先我们来看SpringBootConfiguration注解的源码

```java
@Configuration
@Indexed
public @interface SpringBootConfiguration 
```
可以发现它就是一个Configuration注解的类 
##### @ComponentScan

 指定扫描哪些包

##### @EnableAutoConfiguration

  自动配置类

```java

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration
```

   可以看到EnableAutoConfiguration注解里核心的注解就是AutoConfigurationPackage
   我们来看看这个的代码，这个注解翻译过来就是自动导入包

```java
@Import({AutoConfigurationPackages.Registrar.class})
public @interface AutoConfigurationPackage {
```
 ## SpringBoot部分底层自动配置DEMO

```java

    //第一种配置方式,属性注入配置
   /* @Autowired
    private JdbcProperties jdbcProperties;*/


    //第二种配置方式,构造函数注入配置
    /*private JdbcProperties jdbcProperties;
    public BootJdbcConfig(JdbcProperties jdbcProperties){
        this.jdbcProperties = jdbcProperties;
    }*/


    // //第三种配置方式,通过有bean注解的方法形参注入配置
  /*  @Bean
    public DataSource getDataSource(JdbcProperties jdbcProperties){
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setDriverClassName(jdbcProperties.getDriverClassName());
        druidDataSource.setPassword(jdbcProperties.getPassword());
        druidDataSource.setUsername(jdbcProperties.getUsername());
        druidDataSource.setUrl(jdbcProperties.getUrl());
        return druidDataSource;
    }*/

    // //第四种配置方式,通过有bean注解的方法加上ConfigurationProperties注解 注入配置
   /* @Bean
    @ConfigurationProperties(prefix = "jdbc")
    public DataSource getDataSource(){
        DruidDataSource druidDataSource = new DruidDataSource();
        return druidDataSource;
    }*/

```
## 整合SpringMvc

### 修改端口号
  在配置文件里进行修改

  server.port

```java
// yml文件
server:
  port:80
// properties文件
server.port=80
```
### 访问静态资源

  SpringBoot提供了ResourceProperties类指定静态资源放到哪个位置。

  默认的资源路径为classpath:static
### 拦截器

   SpringBoot实现拦截器同样需要实现HandlerInterceptor接口

   并且将该类交给Spring管理，添加Componect注解

   使用SpringBoot之后就没有配置文件了，所以我们需要去手动的告诉mvc添加该拦截器,有以下几种方式
   

    
   #### 配置类

     给配置类添加上Configuration注解，注意不要添加EnableWebMvc注解。如果加了EnableWebMvc注解则表示自定义SpringMvc配置。

     配置类需要实现WebMvcConfiguer接口

     重载该接口的addInterceptors方法。

     将自己的拦截器注入到当前配置类中

  ```java
  @Configuration
public class InceptorConfig implements WebMvcConfigurer {
    @Resource
    private TestInceptor testInceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(testInceptor).addPathPatterns("/**");
        WebMvcConfigurer.super.addInterceptors(registry);
    }
}

  ```

   #### Thymeleaf模板引擎

     Thymeleaf是一个跟velocity,FreeMarker类似的模板引擎，它可以完全替代jsp。相较于其他的搜索引擎它有以下几个特点

     动静结合:Thymeleaf在有网络无网络的环境修啊都可以运行

     开箱即用:
     多方言支持

     和SpringBoot完美整合 

## mybits-plus