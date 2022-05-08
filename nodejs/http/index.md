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

## ClientRequest类
    clientRequest类是由http.request返回给我们的，用于管理已经被放入请求队列中的请求,http.request是供给我们向服务端发起请求的,http.request创建请求后会返回给我们ClientRequest类,在请求创建时并不会发起，我们可以通过setHeader,getHeader,removeHead来对请求头进行操作，在request.end()之后请求才会发起

   实例演示
```JavaScript
 const Http=require('http');
 const ClientRequest=Http.request({
  protoclo:'http:', //请求的协议
  host:'localhost', // 地址//域名
  port:'80', //端口号
  method:'GET', //请求方式
  agent,
  path:'/' ,//请求路径'
  timeout:1000 //超时时间
  },res=>{
      //请求受到相应之后的回调
  //res就是 http.IncomingMessage的实例这个在后边写
    res.on('data',data=>{
       //data就是返回过来的数据
    })
 })
 //http.request只是创建请求，创建完请求后就会返回ClientRequest
 //我们调用ClientRequest.end才会发起请求
 ClientRequest.end();
```
  ### ClientRequest的方法
   
   #### getHeader,setHeader,removeHead (获取，修改，删除请求头)
     我们可以在发起请求之前去进行获取，修改和删除请求头

```JavaScript
  const Http=require('http');
 const ClientRequest=Http.request({
  protoclo:'http:', 
  host:'localhost', 
  port:'80',
  method:'GET', 
  agent,
  path:'/' ,
  timeout:1000},res=>{res.on('data',data=>{} })

  //在发起请求前去获取，修改，删除，。请求头
  console.log(ClientRequest.getHeader('host'));
     //getHeader方法接收一个参数，请求头的名称，返回值是请求头的值
   ClientRequest.setHeader('cookie','{c:"11"}')
     //setHeader 方法接收两个参数，第一个是要设置的请求头的名称，第二个是请求头的值

   ClientRequest.removeHead('cookie');
    //removeHead 方法接收一个参数  ， 要删除的请求头的名称
 ClientRequest.end(); 
```
 #### destory
    destory方法用于关闭请求
```JavaScript
  ClientRequest.destory();
  //一定要注册error事件，进行错误处理
  // 比如我们使用destory关闭请求时可能会抛出异常，触发error所以我们要注error事件进行错误处理
  ClientRequest.on('error',(err)=>{
     console.log('错误处理')
  })
```
 #### destoryed 
   destoryed是ClinetRequest的属性，它的值分为以下两种情况

     未关闭请求:false
     关闭请求:true
 #### close 
   close事件，当请求被关闭时会被触发
```JavaScript
  ClientRequest.on('close',()=>{
     console.log('请求被关闭')
  })
```
 #### connect 
 connect事件是只有当请求是connect请求时才会被触发
```JavaScript
   // 我们需要把method 请求方式改为connect

   ClientRequest.on('connect',()=>{
      console.log('connect事件被触发')
   })
```
#### continue 
  continue事件，只有请求头带有 'Expect:100-continue' 才会被触发

  ```JavaScript
 //为了触发continue事件我们必须先设置请求头

  ClientRequest.setHeader('Expect':'100-continue');
   ClientRequest.on('continue',()=>{
      console.log('continue事件被触发')
   })

  ```
  #### finish
    finish事件是在发送请求时触发
```JavaScript
  ClientRequest.on('finish',()=>{
     console.log('发送请求时触发finish事件')
  })
```
 #### information
   information事件是在请求发送1xx中间时触发

```JavaScript
  ClientRequest('information',info=>{
     //info里包含了http版本,http状态码，请求头等信息
  })
```
 #### socket
   socket事件，在socket被分配到请求时触发

```JavaScript
   ClientRequest.on('socket',()=>{
      console.log('socket事件被触发')
   })
```
## Server类 
  server是用于我们使用node搭建服务器，