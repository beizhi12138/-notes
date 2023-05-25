# Elasticesarch 

  基于Lucene的搜索引擎，它提供了一个分布式多用户能力的全文搜索引擎，基于Restful web接口。使用java开发的。

  一个App需要添加搜索功能，但是搜索功能的创建是非常苦难你的，我们希望搜索解决方案要运行速度快，希望有一个零配置的模式

  优点:
    扩展性好，可以部署上百台服务器集群，处理PB级数据

## es安装

   首先需要下载压缩包，对压缩包进行解压，解压完成之后，进行更改配置文件

- elasticsearch.yml ： 用于配置Elasticsearch运行参数 
- jvm.options ： 用于配置Elasticsearch JVM设置
- log4j2.properties： 用于配置Elasticsearch日志

#### 2.2.2 elasticsearch.yml

配置格式是 YAML，可以采用如下两种方式：

1. 层次方式
   path:   data: /var/lib/elasticsearch logs: /var/log/elasticsearch

2. 属性方式
    path.data: /var/lib/elasticsearch   path.logs: /var/log/elasticsearch
   本项目采用方式 2，例子如下

   ```yaml
   cluster.name: yunhe
   node.name: yh_node_1
   network.host: 0.0.0.0
   http.port: 9200
   transport.tcp.port: 9300
   node.master: true
   node.data: true
   #discovery.zen.ping.unicast.hosts: ["0.0.0.0:9300", "0.0.0.0:9301", "0.0.0.0:9302"] 
   discovery.zen.minimum_master_nodes: 1
   bootstrap.memory_lock: false
   node.max_local_storage_nodes: 1
   path.data:  F:\ElasticSearch\elasticsearch‐6.2.1\data 
   path.logs: F:\ElasticSearch\elasticsearch‐6.2.1\logs
   http.cors.enabled: true
   http.cors.allow‐origin: /.*/
   ```

注意path.data和path.logs路径配置正确。

常用的配置项如下：

- cluster.name
   配置elasticsearch的集群名称，默认是elasticsearch。建议修改成一个有意义的名称。

- node.name

  节点名，通常一台物理服务器就是一个节点，es会默认随机指定一个名字，建议指定一个有意义的名称，方便管理一个或多个节点组成一个cluster集群，集群是一个逻辑的概念，节点是物理概念，后边章节会详细介绍

- path.conf

  设置配置文件的存储路径，tar或zip包安装默认在es根目录下的conﬁg文件夹，rpm安装默认在 /etc

- elasticsearch path.data:   设置索引数据的存储路径，默认是es根目录下的data文件夹，可以设置多个存储路径，用逗号隔开。 

- path.logs:   设置日志文件的存储路径，默认是es根目录下的 logs文件夹 

- path.plugins:    设置插件的存放路径，默认是es根目录下的 plugins文件夹

- bootstrap.memory_lock: true 设置为true可以锁住ES使用的内存，避免内存与swap分区交换数据。

- network.host:    设置绑定主机的ip地址，设置为0.0.0.0表示绑定任何ip，允许外网访问，生产环境建议设置为具体的ip。 

- http.port: 9200   设置对外服务的http端口，默认为9200。

- transport.tcp.port: 9300 集群结点之间通信端口

- node.master: 指定该节点是否有资格被选举成为master结点，默认是true，如果原来的master宕机会重新选举新的master。 

- node.data: 指定该节点是否存储索引数据，默认为true。

- discovery.zen.ping.unicast.hosts: ["host1:port", "host2:port", "..."]   设置集群中master节点的初始列表。

- discovery.zen.ping.timeout: 3s   设置ES自动发现节点连接超时的时间，默认为3秒，如果网络延迟高可设置大些。

- discovery.zen.minimum_master_nodes:
   主结点数量的最少值 ,此值的公式为：(master_eligible_nodes / 2) + 1 ，比如：有3个符合要求的主结点，那么这里要设置为2。

- node.max_local_storage_nodes:
   单机允许的最大存储结点数，通常单机启动一个结点建议设置为1，开发环境如果单机启动多个节点可设置大于 1



#### 2.2.3 jvm.options

设置最小及最大的JVM堆内存大小 ， 在jvm.options中设置 -Xms和-Xmx

1. 两个值设置为相等
2. 将 Xmx  设置为不超过物理内存的一半



#### 2.2.4 log4j2.properties

日志文件设置，ES使用log4j，注意日志级别的配置





#### 2.2.5 系统配置

在linux上根据系统资源情况，可将每个进程最多允许打开的文件数设置大些。su limit -n 查询当前文件数使用命令设置limit。先切换到 root，设置完成再切回 elasticsearch 用户

```shell
sudo su  
ulimit ‐n 65536 
su elasticsearch
```

也可通过下边的方式修改文件进行持久设置

```
/etc/security/limits.conf
```

将下边的行加入此文件

```
elasticsearch  ‐  nofile  65530
```


### 启动es

windows双击elastisearch.bat

然后在浏览器输入localhost:9100

看到输出内容即为启动成功

## 快速上手

### 创建索引库

es的索引库是一个逻辑概念，它包括了分词列表以及文档列表，同一个索引库中存储了相同类型的文档。它就相当于mysql中的表。

- 索引(名词):es是基于lucene构建的一个搜索服务，它要从索引库搜索符合条件的索引数据。
- 索引(动词):索引库刚创建起来是空的，将数据添加到索引库的过程称为索引。

#### 通过postman创建索引

        1.url输入http://127.0.0.1:9100/索引名称

        2.使用put请求

        3.参数选择body,选择json格式

```JSON
  {
       "settings": {
           "index": {
               "number_of_shards": 1,
               "number_of_replicas": 0
           }
       }
   }
```

- number_of_shards  表示分片数量，分片就是把大块数据切割成较小的数据，以便于更有效的管理和操作

在集群中通常设置多个分片，表示一个索引库将拆分成多片存储不同的节点，提高了ES的处理能力和高可用性。


- number_of_replicas 表示副本数量，通过副本进行负载均衡
  
  设置副本是为了提高es的高可靠性。

### 创建映射

   映射就相当于我们在mysql中创建数据库时的表结构
  

   索引中的每个JSON文档都包含了一个或者多个字段，创建映射就是向索引库中创建字段的过程，每一个字段对应一个JSON文档。它

   与mysql的关系类比如下
       
         文档(document)--------(row)记录

         字段(field)--------(column)列


         上边创建的索引库，如果相对于mysql中的数据库的话，那么就表示一个索引库可以存储不同类型的文档。

         如果相对于mysql的表的话，就相当于一个索引库只能存储相同类型的文档，es官方建议在一个索引库中只存储相同类型的文档。

#### 使用postman创建映射

           1.url:http://127.0.0.1:9200/索引库/类型(type)/_mapping

           在es7以后就取消了type,_mapping是es官方文档给的在添加映射时需要加上的后缀
           
           
           2.选择post请求,body,json格式

```JSON
 {
  "properties":{
      "字段名":{
        "type":"类型"
      },
      "字段名":{
        "type":"类型"
      }
  }
 }
```
### 创建文档

es中的文档就相当于mysql数据表中的记录。

#### 使用postman创建文档

  1. 选择post请求

  2. url:http://127.0.0.1:9200/索引库名/type/id

id如果不指定的话，那么es会自动给添加上

### 使用postman搜索文档

#### 根据id查询文档

  1. postman发送get请求，且请求体中不携带任何参数
  2. url:http://127.0.0.1:9200/索引名/type/id
#### 查询所有文档
   
  1. postman发送get请求，且请求体中不携带任何参数
  2. url:http://127.0.0.1:9200/索引名/type/_search
#### 查询关键字
  1. postman发送get请求，且请求体中不携带任何参数
  2. url:http://127.0.0.1:9200/索引名/type/_search?q=字段名:关键字

#### 根据关键字模糊查询
1. postman发送get请求，且请求体中不携带任何参数
  2. url:http://127.0.0.1:9200/索引名/type/_search?q=字段名:关键字*
#### 查询结果分析
```JSON
{
    
    "took": 1, //查询时间(毫秒) 
    "timed_out": false,//是否超时
    "_shards": {//搜索了哪些分片
        "total": 1,//分片命中的记录
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": 1,//搜索到的文档数
        "max_score": 1.3486402,//文档匹配得分
        "hits": [//查询到的所有文档
            {
                "_index": "codes",
                "_type": "doc",
                "_id": "mPn7TIgBM-IUYZpvxJSd",
                "_score": 1.3486402,
                "_source": {
                    "name": "boostarp",
                    "descripton": "哈哈哈哈",
                    "model": "201001"
                }
            }
        ]
    }
}

```

## IK分词器

 在添加结果的时候会进行分词，索引中存放的就是一个个的词，当去搜索时就是拿关键字去匹配词，最终找到词关联的文档

### 首先进行安装IK分词器
  - github地址:https://github.com/medcl/elasticsearch-analysis-ik/tree/6.x

下载压缩包，将压缩包解压后放到es的plugins/ik目录下

注意版本问题:分词的版本和es的版本一定要一致

测试分词器

- url:http://127.0.0.1:9200/_analyze
```JSON
{
    "text":"测试分词器，好物得无扭纹龙滴滴滴", //需要分的词
    "analyzer":"ik_max_word"//分词模式
}
```

ik分词器有两种分词模式

- ik_max_word 最细粒度分词
- ik_smart 最粗粒度分词
  ### 自定义词库

  如果要让分词器有一些专有词语，可以自定义词库，IK分词器自带一个main.dic的文件此文件为词库文件是ik分词器给的词库

  自定义词库的话需要创建自己的dic文件，然后在当前目录的xml文件里进行配置

## 映射的维护方法

     上边写了ik分词器，那么如何在索引和搜索使用分词器，接下来开始深入映射。

### 查询所有映射
  1. postman发起GET请求，且请求体中不携带任何参数
  2. url:http://127.0.0.1:9200/_mapping

### 使用postMan创建映射

  1. postman发起PUT请求
  2. url:http://127.0.0.1:9200/索引名/type/_mapping
   ```JSON
     "properties":{
       "字段名":{
        "type":"类型"
      },"字段名":{"type":"类型"}
     }
   ```

### 更新映射
  只能添加映射，不能修改映射

### 删除映射
  删除映射的话只能删除当前索引

### 常见的映射类型

#### text
  text用来标记是字符串，使用analyzer属性标记是否使用分词器

DEMO

```JSON
{
    "properties":{
        "name":{
            "type":"text", //指定类型type
            "analyzer":"ik_max_word",//索引和搜索使用该分词模式
            "search_analyzer":"ik_smart"//搜索时使用该分词模式
        }
    }
}
```
上边指定了analyzer是指在索引和搜索都使用ik_max_word,如果单独定义搜索时使用的分词器可以通过search_analyzer属性,

对于分词器建议是索引时使用ik_max_word将搜索内容进行细粒度分词，搜索时使用ik_smart提高搜索精确性。

对于text类型:还有以下两种属性

  1. index(true/false)
      通过index属性指定是否索引，只有进行进行索引才能被搜索到，该属性的应用场景比如图片地只用来展示图片，不需要被搜索就可以不进行索引。

  2. store
     是否在source之外存储，每个文档索引之后会在ES中保存一原始文档，村房子soure中，一般情况下不需要设置store为true,因为在source中已经有一份原始文档了。

#### keyword 
  keyword类型是作为关键字字段的，
  通常搜索keyword类型是整体搜，不进行分词的

#### date 日期类型

日期类型不用设置分词器

通过format属性来设置日期格式

```JSON
{
  "time":{
    "type":"date",
    "format":"yyyy-MM-dd HH:mm:ss || yyyy-MM-dd"
  }
}

```

#### 数值类型
 es支持以下几种数值类型

 1. long
 2. Integer
 3. short
 4. byte
 5. double
 6. float
 7. half_float
 8. scaled_float

尽量选择范围小的类型，提高搜索效率

对于浮点数尽量使用比例因子:比如一个价格字段，单位元，我们将比例因子设置为100这在es中会按 分存

```JSON
{
  "price":{
    "type":"scaled_float",
    "scaling_fqactor":100
  }
}
```

因为比例因子为100,如果我们输入的价格是11.26那么会将11.26乘以100存储在Es中，如果输入的价格是11.136那么会将11.136再乘以100并取一个接近原始值的数字

如果使用比例因子不合适的话，则选择更小的范围
## Elasticesarch连接java

### ES客户端

  es提供了多种客户端

  1. TransportClient
     es传统的客户端，官方8.+以后版本将删除此客户端

  2. RestClient
     restClient是官方推荐使用的，它包括两种:Java Low Level REST client和Java High Level REST Client。

     接下来我们使用Java High Level Client如果缺失功能则使用Java Low Level Rest

### 首先进行添加依赖
```xml
<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>elasticsearch‐rest‐high‐level‐client</artifactId>
    <version>6.2.1</version>
</dependency>
<dependency>
    <groupId>org.elasticsearch</groupId>
    <artifactId>elasticsearch</artifactId>
    <version>6.2.1</version>
</dependency>
```

### 开始创建SpringBoot搜索工程
  

  首先进行添加pom依赖
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>study_20230524_esSearch</artifactId>
    <version>1.0-SNAPSHOT</version>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.6</version>
        <relativePath/>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.elasticsearch.client</groupId>
            <artifactId>elasticsearch-rest-high-level-client</artifactId>
            <version>6.2.1</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.elasticsearch</groupId>
            <artifactId>elasticsearch</artifactId>
            <version>6.2.1</version>
        </dependency>

    </dependencies>
</project>
```
然后进行配置文件(application.yml)
```

spring:
  application:
    name: lrz-es-search
<!-- 因为不是springboot的配置，所有我们需要自定义属性 -->
lrz:
  elasticSearch:
    ipList: ${eshostlist://127.0.0.1:9200} #如果是多个地址，使用,间隔
```

### 搭建配置类
 我们的配置类与官方文档的创建客户端有一些不同，
 因为我们希望ip地址是从配置文件里读取的，并且当有多个ip地址时可以进行统一管理
```java
@Configuration
public class ElasticSearchConfig {
//    RestHighLevelClient client = new RestHighLevelClient(
//        RestClient.builder(
//                new HttpHost("localhost", 9200, "http"),
//                new HttpHost("localhost", 9201, "http")));
    @Value("${elasticsearch.ip.list}")
    private String ipList;
//    高级版客户端配置
    public RestHighLevelClient restHighLevelClient(){
//        创建List数组用于存放所有HttpHost对象
        List<HttpHost> httpHost= new ArrayList<>();
        //截取字符串数组
        String[] ipArray=ipList.split(",");
        for(String item: ipArray){
            String [] ipAndPort=item.split(":");
            httpHost.add(new HttpHost(ipAndPort[0],Integer.valueOf(ipAndPort[1]),"http"));
        }
        return new RestHighLevelClient(RestClient.builder(httpHost.toArray(new HttpHost[httpHost.size()])));
    }
//    //低级版客户端设置
    public RestClient restClient(){
        public RestHighLevelClient restHighLevelClient(){
//        创建List数组用于存放所有HttpHost对象
            List<HttpHost> httpHost= new ArrayList<>();
            //截取字符串数组
            String[] ipArray=ipList.split(",");
            for(String item: ipArray){
                String [] ipAndPort=item.split(":");
                httpHost.add(new HttpHost(ipAndPort[0],Integer.valueOf(ipAndPort[1]),"http"));
            }
            return RestClient.builder(httpHost.toArray(new HttpHost[httpHost.size()])).build();
        }
    }
}

```
### 添加索引库

```java

/**
 * SpringBootTest(classes = Main.class)
 *
 * (classes = Main.class)如果该测试类与启动类在同一包名下则不需要写classes
 * 如果不在同一包下需要指定classes
 */

@SpringBootTest(classes = Main.class)
@RunWith(SpringRunner.class)
public class EsTest {
    @Autowired
    private RestHighLevelClient client ;

    //测试创建索引库
    @Test
    public void testCreateIndex() throws IOException {
//        创建索引库,(参数是索引库名称)
        CreateIndexRequest request=new CreateIndexRequest("lrz_index_twossss");

        //设置分片和副本
        request.settings(Settings.builder().put("number_of_shards", 1).put("number_of_replicas",0));
       //添加映射‘
        request.mapping("doc","{\n" +
                "    \"properties\": {\n" +
                "        \"pic\": {\n" +
                "            \"type\": \"text\",\n" +
                "            \"index\": false\n" +
                "        }\n" +
                "    }\n" +
                "}", XContentType.JSON);

        //创建索引库
        CreateIndexResponse response = client.indices().create(request);

        boolean acknowledged = response.isAcknowledged();
        System.out.println(acknowledged);
    }

}
```
### 添加文档

## 查询所有

## 分页查询

## 根据id精确匹配

## 关键词匹配

## 设置权重

## 多余匹配

## 布尔查询

## 过滤器

## 排序

## 高亮


## 集群

### 结点

 ES集群由多个服务器组成，每个服务器为一个node结点(该服务有一个ES进程)

 ### 分片AND副本
  分片和副本在上边有介绍

### 主节点
  一个集群中会有一个或者多个主节点，主节点的作用是集群管理，比如增加节点，删除节点等。
   主节点宕机了会再选取一个主节点
### 节点转发
  每个节点都指导其他节点的信息，可以对任意一个节点发起请求，该请求节点会转发给其他节点