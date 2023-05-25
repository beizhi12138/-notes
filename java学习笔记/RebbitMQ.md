# 消息队列
  消息队列这个词可能在JS中听到过，

  消息队列主要是将不需要同步除了的并且耗时长的操作由消息队列通知消息接收方进行异常处理。

  消息队列还可以将应用程序解耦


  市面上常见的消息队列有:ActiveMQ,RabbitMQ,ZeroMQ,Kafka

  
# RabbitMQ
   
   为什么要使用RabbitMq

   1. 使用简单，功能强大
   2. 基于AMQP协议
   3. 社区活跃，文档完善
   4. 高并发性能好，主要得益于erlang语言
   5. springboot 默认已经集成RabbitWQ


  首先是安装，由于RabbitMQ是使用erlang语言开发的，所以需要先安装Erlang环境，消息队列是基于AMQP协议实现的消息队列，是应用程序之间的通信方法，消息队列在分布式系统应用中非常广泛。

## RabbitMQ的工作原理

 RabbitMQ主要有几下几种结构组成

 Broker： 消息队列服务进程  包括两个部分Exchange和Queue

 Exchange 消息队列交换机 按一定的股则将消息路由转发到某个队列，对消息进行过滤

 Queue 消息队列 存储消息的队列，消息到达并转发给执行的消费方。

 Consumber 消息消费者 接受MQ转发的消息

 Producer 消息生产者 发送消息到MQ

 ## 安装Rabbit

  因为rabbit是基于erlang语言的，所以需要进行安装erlang语言的环境，下载安装包，右键管理员身份运行,直接安装。(注意不要用中文路径)

  然后下载rabbit的安装包，右键管理员身份运行，(注意不要用中文路径)

  然后以管理员身份运行cmd,切换到rabbit的安装目录下

     运行:
        rabbit-server.bat start 启动服务

        rabbitmq-plugins.bat enable rabbitmq_management 启动浏览器客户端

        浏览器访问 127.0.0.1:15672

        账号密码:guest guset

## HelloWorld程序
  首先HelloWorld程序就是一个简单的模式，让我们简单的认识以下rebbitMq

  这里的Helloworld程序就是一个生产者对应一个消费者

```java
// 生产者
@SpringBootApplication
public class Main {
    //生产者
    //队列名称
    private final static String QUEUENAME="hzj";
    public static void main(String[] args) throws IOException, TimeoutException {
        SpringApplication.run(Main.class,args);
    //建立连接工厂
        ConnectionFactory factory=new ConnectionFactory();
        factory.setHost("localhost");
        //设置端口号，默认端口号5672
        factory.setPort(5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        //创建连接
        Connection connection = factory.newConnection();
        /**
         * 创建与Exchange的通道，每个连接可以创建多个通道，每个通道代表一个会话任务
         * 使用channel就不需要在代码中显示的关闭连接
         */
        Channel channel = connection.createChannel();
        //声明一个队列
        channel.queueDeclare(QUEUENAME, true,false,false,null);
        /**
         * 第一个参数是，队列名称
         * 第二个参数:是否持久化
         * 第三个参数 是否独占连接
         * 第四个参数：队列不再使用时是否删除此队列
         * 第五个参数: 队列参数
         */
        String message="你好，我是汉昭杰";
        //发送消息
        channel.basicPublish("",QUEUENAME,null,message.getBytes());
        /**
         * 参数1 交换机名称如果没有则使用空字符串
         * 参数2  队列名称
         * 参数3 消息包含的属性
         * 参数4 消息主体
         */
        System.out.println("已经发送"+message);
    }
}
//消费者
@SpringBootApplication
public class Main {
    private final static  String QUEUENAME = "hzj";
    //接收端
    public static void main(String[] args) throws IOException, TimeoutException {
        //创建工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        factory.setPort(5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        //建立连接
        Connection connection = factory.newConnection();
        //建立通道
        Channel channel = connection.createChannel();
        //声明队列
        channel.queueDeclare(QUEUENAME, true, false,false,null);
        System.out.println("等待发送消息");
        DeliverCallback deliverCallback=(tag,delivery)->{
            //接受消息主体
             String message=new String(delivery.getBody(), "UTF-8");
            System.out.println("接收到消息"+message);
        };
       channel.basicConsume(QUEUENAME,false,deliverCallback,tag->{});
    }
}
```
## work模式

  work模式就是一个生产者，生产者发送多个消息给消费者，一条消息只能给一个消费者。如果有多个消费者则生产者会轮询消息给多个消费者。
```java
// 生产者
public class Main {
    private final static String QUEUE_NAME="Work_mode";
    public static void main(String[] args) throws IOException, TimeoutException, InterruptedException {
        System.out.println("我是生产者");
        SpringApplication.run(Main.class, args);

        //创建工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 主机名称
        factory.setHost("localhost");
        factory.setPort(5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        // 创建连接
        Connection connection=factory.newConnection();
        // 创建会话通道
        Channel channel=connection.createChannel();
        //声明队列
        channel.queueDeclare(QUEUE_NAME,true,false,false,null);
        //循环发送10条消息
        for(int i=0;i<10;i++){
            channel.basicPublish("", QUEUE_NAME, null, ("Hello RabbitMQ WorkMode Message "+i).getBytes("UTF-8"));
            System.out.println("已经发送了消息"+"Hello RabbitMQ WorkMode Message "+i);
            //每次发送消息休眠10秒，依次递加
            Thread.sleep(i*100);
        }
    }
}
// 消费者1
@SpringBootApplication
public class Main {
    private static final String QUEUE_NAME = "Work_mode";;

    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("我是消费者");
        SpringApplication.run(Main.class, args);
        //创建工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 主机名称
        factory.setHost("localhost");
        factory.setPort(5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        // 创建连接
        Connection connection=factory.newConnection();
        // 创建会话通道
        Channel channel=connection.createChannel();
        //声明队列
        channel.queueDeclare(QUEUE_NAME,true,false,false,null);

        //设置回调函数
        DeliverCallback deliverCallback =(constomTag,delivery)->{
            String message=new String(delivery.getBody(), "UTF-8");
            System.out.println("接收到了消息"+message);
            //接收到消息之后进行休眠1000
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag->{});
        /**
         * 第一个参数 队列名称
         *  第二个参数 是否自动回复
         *  第三个参数 接收到参数的回调
         *  第四个参数 消费者标签
         */
    }
}
// 消费者2
@SpringBootApplication
public class Main {
    private static final String QUEUE_NAME = "Work_mode";;

    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("我是消费者2");
        SpringApplication.run(Main.class, args);
        //创建工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 主机名称
        factory.setHost("localhost");
        factory.setPort(5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        // 创建连接
        Connection connection=factory.newConnection();
        // 创建会话通道
        Channel channel=connection.createChannel();
        //声明队列
        channel.queueDeclare(QUEUE_NAME,true,false,false,null);

        //设置回调函数
        DeliverCallback deliverCallback =(constomTag, delivery)->{
            String message=new String(delivery.getBody(), "UTF-8");
            System.out.println("接收到了消息"+message);
            //接收到消息之后进行休眠1000
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag->{} );
    }
}
```
## 发布订阅模式(publish/Subscribe)

发布订阅模式是通过交换机实现的。

在上边两种模式中，生产者和消费者都需要去声明同一个队列才能进行发送和接受到消息。

在发布订模式中是通过交换机进行实现的，生产者声明交换机，生产者将消息发送给交换机。消费者需要声明队列，消费者声明队列完之后将队列绑定至交换机，进行监听消息。


```java
// 生产者
@SpringBootApplication
public class Main {
    private final static String EXCHANGE_NAME="hzj_exchange";
    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("我是发布订阅模式的生产者");
        SpringApplication.run(Main.class, args);
        //创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        factory.setPort(5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        //获取连接
        Connection connection = factory.newConnection();
        //创建通道
        Channel channel = connection.createChannel();
        //创建交换机
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
        //发送消息
        String message="我是生产者消息";
        channel.basicPublish(EXCHANGE_NAME,"",null,message.getBytes());
        System.out.println("已经成功发送消息");
    }
}
//消费者1
@SpringBootApplication
public class Main {
    private final static String EXCHANGE_NAME="hzj_exchange";
    private final static String QUEUE_NAME="publish_test";
    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("我是发布订阅模式的消费者1");
       SpringApplication.run(Main.class, args);
       //创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        factory.setPort(5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        //获取连接
        Connection connection = factory.newConnection();
        //创建通道
        Channel channel = connection.createChannel();
       //声明队列
        channel.queueDeclare(QUEUE_NAME,true,true,false,null);
        //创建交换机
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
        //绑定交换机
        channel.queueBind(QUEUE_NAME, EXCHANGE_NAME,"");
        /**
         * 第一个参数 队列名称
         * 第二个参数 交换机名称
         * 第三个参数 路由key
         */
        //创建回调函数
        DeliverCallback deliverCallback=(tag,delivery)->{
           String message=new String(delivery.getBody(),"UTF-8");
            System.out.println("接收到了消息"+message);
        };
        //监听接收消息
        channel.basicConsume(QUEUE_NAME,false,deliverCallback,tag->{});
    }
}
//消费者2
@SpringBootApplication
public class Main {
    private final static String EXCHANGE_NAME="hzj_exchange";
    private final static String QUEUE_NAME="publish_test_twos";
    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("我是发布订阅模式的消费者2");
        SpringApplication.run(Main.class, args);
        //建立连接工厂
        ConnectionFactory factory=new ConnectionFactory();
        factory.setHost("localhost");
        factory.setPort(5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        //建立连接
        Connection connection = factory.newConnection();
        //建立通道
        Channel channel = connection.createChannel();
        //声明队列
        channel.queueDeclare(QUEUE_NAME,true,true,false,null);
        //创建交换机
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
        //绑定交换机
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"");
        //设置接收到消息的回调
        DeliverCallback deliverCallback=(tag,delivery)->{
            String message=new String(delivery.getBody(),"UTF-8");
            System.out.println("接收到了消息"+message);
        };
        //监听接收消息
        channel.basicConsume(QUEUE_NAME,true,deliverCallback,tag->{});
    }
}
```
注意，发布订阅模式中，生产者只需要声明交换机，消费者不仅需要声明队列还需要声明交换机(否则先启动交换机的话会报错)

## 路由模式()

