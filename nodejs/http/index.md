# http
   nodejs提供给了我们http模块，http有两个作用
   1、搭建服务端，express,和koa就是基于http.createServer
   2、做客户端，向其他服务端请求

## Agent模块
   http协议是通过，浏览器发送请求，服务端 响应请求这种方式交互，每次交互都需要进行，建立-传输-销毁的过程，http提供了持久连接即已经通过的连接可以重复使用，在客户端这个操作是浏览器完成的，但是在服务端需要我们自己来完成，所以有了agent
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
      //请求受到 响应之后的回调
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
## Server类 (node做web服务器的重中之重)
  server是用于我们使用node搭建服务器，express框架就是基于Server类的

  实例演示

```JavaScript
const Http=require('http');
const Server=new Http.Server();
//监听request事件，
Server.on('request',(req,res)=>{
    //两个参数
    //req  客户端请求的内容
    //res  服务端要 响应的内容
    res.wirte(); //向 响应内容里写入内容
    res.end(''); //结束的内容
    Server.close(); //关闭服务
})
Server.listen(8080); //开启服务，设置端口号
```

 ### Server的方法
  #### checkContinue
   当服务端的请求头有Expect:100-continue会触发此事件，而且不再触发request事件

```JavaScript
   const Http=require('http');
const Server=new Http.Server();
//如果请求头带有 Expect:100-continue 将会直接触发此事件，不再触发request事件
Server.on('checkContinue',(req,res)=>{
   //两个参数
    //req  客户端请求的内容
    //res  服务端要 响应的内容
    res.wirte(); //向 响应内容里写入内容
    res.end(''); //结束的内容
    Server.close(); //关闭服务
})
Server.listen(8080); //开启服务，设置端口号
```
#### checkExpectation
  请求头中带有,Expect属性且值不是100-continue会触发此事件，且不再触发request事件

```JavaScript
const Http=require('http');
const Server=Http.Server();
Server.on('checkExpectation',(req,res)=>{
   //请求头中带有Expect属性且是除了100-continue以外的任何值，且不再触发request事件
   //两个参数
    //req  客户端请求的内容
    //res  服务端要 响应的内容
    res.wirte(); //向 响应内容里写入内容
    res.end(''); //结束的内容
    Server.close(); //关闭服务
})
Server.listen(8080);
```
#### clientError
  当客户端连接触发error事件时，会触发此事件

```JavaScript
Server.on('clientError',(err,socket)=>{
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})
```

#### close
  当调用Server.close()时触发

```JavaScript
const Http=require('http');
const Server=new Http.Server();
Server.on('request',(req,res)=>{
   res.end();
   Server.close();
})
Server.on('close',()=>{
   console.log('监听到了服务关闭')
})
```
#### connect
  接收connect请求

```JavaScript
  Server.on('connect',(req,res)=>{
     console.log('接收到了connect请求')
  })
```
#### request
  每次接收到请求时都会触发request事件

```JavaScript
Server.on('request',(req,res)=>{
   //一般接收到请求后都会触发到request事件
})

```

#### close 
  close方法用于关闭服务,调用此方法会触发close事件

```JavaScript
 Server.close();
```

#### listen
  listen方法用于开启服务,

```JavaScript
 Server.listen(8080);
 //接收一个参数，端口号
```

#### headersTimeout
  headersTimeout方法用来限制，解析请求头的时间，如果超时则关闭连接

```JavaScript
 Server.headersTimeout(8000);

 //接收一个参数，限制多少毫秒
```
#### listening
  listenting属性用来查看是否正在监听连接，即服务是否开启
```JavaScript
 console.log(Server.listening);
 // false  未开启
 // true  开启了
```

## ServerResponse类
   ServerResponse就是request事件里的，res

```JavaScript
  const Http=require('http');
  const Server=new Http.Server();
  Server.on('request',(req,res)=>{
   //res就是ServerResponse类 它是一个可写流
  })
  Server.listen(8080);
```
 ### res的方法

   #### SetHeader
     设置响应头
```JavaScript
const Http=require('http');
  const Server=new Http.Server();
  Server.on('request',(req,res)=>{
   //res就是ServerResponse类 它是一个可写流
   res.setheader('Content-type':'text/json');
  })
  Server.listen(8080);

```
#### getHeader
  获取响应头
```JavaScript
res.getHeader('响应头名称')
```
#### hasHeader
  查询响应后

```JavaScript
  res.hasHeader('响应头名称');
```
#### getHeadersNames
  获取到所有响应头的名称

```JavaScript
 consoel.log(res.getHeadersNames());
```
#### getHeaders
  获取到所有的响应头
```JavaScript
console.log(res.getHeaders());
```
#### statusCode
 设置 响应的状态码
 
```JavaScript
  res.StatusCode=404
```

#### statusMeassage
  设置响应的状态信息

```JavaScript
 res.statusMessage='Not Found'
```

#### write
  写入响应内容，并发送
```JavaScript
   res.write('Hello World');
```
#### end
  结束写入内容,可参考writeableStream的end方法
```JavaScript
 res.end('Hello World');
```

#### finish
  finish事件，在开始响应请求时触发

```JavaScript
 res.on('finish',()=>{
    console.log('开始响应请求')
 })
```

#### close
  close事件，请求响应完成时触发

```JavaScript
  res.on('close',()=>{
     console.log('请求响应完成')
  })
```
## IncomingMessage类
  IncomingMessage分别存在于http.server(做服务端)里和http.request(发起请求)里边，在server里是request,在request里是response,它是一个可读流，包含了请求头，和数据和响应状态

  实例演示

```JavaScript
  const Http=require('http');
  const Server=new http.Server();
  Server.on('request',(request,response)=>{
      // request就是IncomingMessage
  })
  const ClientRequest=Http.request({
     port:'8080',
     host:"localhost",
     protocol:'http:',
     method:'GET',
     path:'/'
  },res=>{
     //这里的res就是 IncomingMessage的实例
  })
```
 ### IncominMessage的方法
   #### close
     当请求被关闭时触发,在server用req监听,在request里用res监听

```JavaScript
  //在server
    const Http=require('Http');
    const server=new Http.Server();
    server.on('request',(req,res)=>{
       req.on('close',()=>{console.log('服务端:请求关闭了')})
    })
    // 在request里

    Http.request({
       port:'8080',
       host:'localhost',
       protocol:'http:',
       method:'GET',
       path:'/'
    },res=>{
       res.on('claose',()=>{console.log('客户端:请求关闭了')})
    })
```
#### complete 属性
  如果已经成功解析HTTP消息，则complete属性为true,否则为false
  最好在服务关闭的时候进行判断
```javaScript
  console.log(req.complete)
```
#### destory
  关闭服务  或者  关闭请求

```JavaScript
//server.js
  req.destory();

//request
  res.destory();
```

#### headers  httpVersion
  http版本httpAVersion
  接收到的headers
  在服务端是客户端发来请求的的headers和http版本
  在客户端是服务端返回数据的headers和http版本

```JavaScript
//server
console.log(req.httpVersion);
   console.log(req.headers);
// request
console.log(res.httpVersion)
 console.log(res.headers);
```

#### method (仅使用于server)
 仅仅在服务端使用，客户端请求的方式，get 或者Post等
```JavaScript
//server
console.log(req.method)
```
#### socket
获取互相连接的socket,可在服务端或者客户端获取

#### url
  仅在服务端获取，得到客户端的url
```JavaScript
  console.log(req.url)
```
#### statucCode
  仅仅在客户端获取，得到请求响应的状态码

```JavaScript
 console.log(res.statusCode);
```

 ##### 常见的http状态码
   
   
      1、404  资源或者路径找不到

      2、200  请求成功
      3、204  请求成功，但是没有资源可以返回给客户端
      4、500  服务器在执行请求时出现错误
      5、505  服务器超载，无法处理请求
      6、502  网关无响应
      7、501  服务器不支持的请求方法
      8、505  服务器不支持的Http版本
      9、403  禁止访问
      10、405 不允许的请求方法
      11、407 要求通过代理的身份认证
      12、408 请求超时
      13、300 重定向
      14、301 永久重定向
      15、302 临时重定向
      16、101 请切换协议
      17、102 将继续执行请求
      18、101 请继续请求

# http上的方法

## METHODS

  列出所有node支持的请求方法

```JavaScript
 const Http=require('http');
 console.log(Http.METHODS); //返回一个数组
```

## STATUS_CODES
 返回一个对象,包含了所有http状态码，以及描述

```JavaScript
const Http=require('http');
console.log(Http.STATUS_CODES);
//返回数据

{
   404:"Not found",
   ...
}

```

## createServer
  createServer方法，帮助我们快速搭建一个web服务器，它返回一个Server实例

```JavaScript
 const Http=require('http');
 const server=Http.createServer();
 server.on('request',(req,res)=>{

 })
 server.listen(8080);
```

## get
 http.get方法，相当于http.request方法，主要用于请求，区别就是它的method固定于get

```JavaScript
const Http=require('http');
const ClierntRequest=Http.get('http://localhost:8080',res=>{
  res.on('data',data=>{
    console.log(data.toString())
  })
})
```

## maxHeaderSize
 设置请求头大小(默认是16kb)

```JavaScript
http.maxHeaderSize=10;
```
## globalAgent
  设置全局的agent

```JavaScript
const Http=require('http');
//如果不设置的话是有默认值的
console.log(Http.globalAgent);
 Http.globalAgent{keepAlive: true, //开启长连接，因为每一次请求服务器，都要创建一次连接，完成后关闭，所以开启keep-live后会使得连接持续有效
 maxSockets: 10, //最大的能使用的套接字(socket)数量
 keepAliveMsecs: 1000, //指定Tcp的初始延迟时间
 maxTotalSockets: 10, //主机允许的最大使用的套接字(socket)数量
 maxFreeSockets: 1, //主机在空闲状态下保持打开的最大套接字(socket)数量
 timeout: 2000} //连接超时
```
## request
  request方法用于发起请求,它返回ClientRequest实例

```JavaScript
const Http=require('http');
 const ClientRequest=Http.request({
         host:'localhost',
    port:'8080',
    protocol:'http:',
    method:'POST',
    path:'/'
 },res=>{
 });
     //如果是post请求用write方法用于写入数据
   ClientRequsst.write('{msg:'11'}');
 //request方法接收两个参数options,callback
   // options 就是要请求的地址的信息以及请求方式请求路径等
   // callback 就是请求接收到响应后的处理

   //必须通过调用end方法，来发起请求
ClientRequest.end();
```