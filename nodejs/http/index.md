# http
   nodejs提供给了我们http模块，http有两个作用
   1、搭建服务端，express,和koa就是基于http.createServer
   2、做客户端，向其他服务端请求

## Agent模块
   http协议是通过，浏览器发送请求，服务端相应请求这种方式交互，每次交互都需要进行，建立-传输-销毁的过程，http提供了持久连接即已经通过的连接可以重复使用，在客户端这个操作是浏览器完成的，但是在服务端需要我们自己来完成，所以有了agent
   我们必须使用agent类来创建一个实例化，进行配置之后再去设置我们的请求的的agent

```JavaScript
 const http=require('http');
 const agent=new http.Agent({
      keepAlive:true, //开启长连接，因为每一次请求服务器，都要创建一次连接，完成后关闭，所以开启keep-live后会使得连接持续有效
    maxSockets:10, //最大的套接字(socket)数量
    keepAliveMsecs:1000, //指定Tcp的初始延迟时间
    maxTotalSockets:10, //主机允许的最大套接字(socket数量)
    maxFreeSockets:156,//主机在空闲状态下保持打开的最大套接字(socket)数量
    timeout:2000,//创建socket设置超时
 })
 http.get({
    hostname: 'localhost', 
        port: 80,//端口号
        path: '/',
        agent: agent  // 仅为这个请求创建新代理
 },res=>{
    res.on('data',data=>{
       console.log(data.toString(),'data')
    })
 })
```
 上边的Agent的配置信息一直在提到套接字(socket)所以我们来看一下socket是什么
 ### 什么是socket?
   socket的中文是 "插座" ，在计算机通信领域socket被译为套接字，它是计算机之间进行通信的一种或者一种方式，通过socket这种方式一台计算机可以接收数据，也可以发送数据。
   socket最典型的例子就在身边，就是web服务器和浏览器，浏览器获取用户输入的url,服务器分析接收到的url将对应的html返回给浏览器。
   浏览器在服务器发起请求时会有socket,然后服务器接收请求时也会有socket，socket一定是成对出现的

 ### agent的方法
   #### agent.createConnection
     创建一个可用于http请求的socket,返回一个socket或者是可读可写的双工流

```JavaScript
const a=agent.createConnection({ //创建一个可以用于http请求的socket //返回一个可读可写的双工流
 //path  或者  port
},(err,stream)=>{
    console.log(e,'e');
    console.log(s,'s')
    a.write('11')
})
a.on('data',e=>{
    console.log(e.toString())
})
```
 #### agent.getName
   获取当前使用agent的请求的名称

```JavaScript
  agent.getName({host:'127.0.0.1',port:'80'})
```
 #### agent.sockets
   返回当前代理的socket的数组

```JavaScript
 console.log(agent.sockets)
```
## Server类 
  server是用于我们使用node搭建服务器，