# process
 process是nodejs用来控制和管理进程的工具。
 ## beforeExit
   当node清空其事件循环，没有额外的工作要安排时会触发beforeExit事件。也就是说当nodejs没有事情要做，或者其他的事情都做完了之后会触发beforeExit事件。
```JavaScript
const process=require('process');
process.on('beforeExit',code=>{
    console.log('触发了beforeExit事件',code);
})
console.log(123);
//当nodejs打印完123之后,此时没有事情要做了，会触发beforeExit事件
// 如果node没有事情做是因为process.exit()进行的终止不会触发beforeExit事件
```
## exit
  exit事件,也是在node清空其事件循环没有额外的工作要安排时会触发exit事件，而且在调用process.exit()时也会触发exit事件,在exit事件和beforeExit事件共存时，会先触发exit事件再触发beforeExit是事件

```JavaScript
const process=require('process');
process.on('exit',code=>{
    console.log('触发exit事件',code);
});
process.on('beforeExit',code=>{
    console.log('触发了beforeExit事件',code);
})
process.exit(); //process.exit以后的代码不会执行
//调用process.exit();不会触发beforeExit事件
//如果不调用process.exit(); 会先打印123然后再触发exit事件，再触发beforeExit事件
console.log(123);
```
## disconnect
  当主进程断开与子进程的连接时会触发disconnect事件
```JavaScript
// index.js 主进程
const process=require('process');
const child_process=require('child_process');
const child=child_process.fork('./child.js');
child.send('Hello,My son');
child.disconnect(); //调用disconnect事件断开与子进程的连接】

// child.js 子进程
process.on('disconnect',()=>{
    console.log('即将断开连接')
})
```
## message
  当子进程接收到父进程传递过来的消息时会触发message事件
```JavaScript
//父进程传递消息
const process=reuqire('process');
const child_process=reuqire('child_process');
const child=child_process.fork('./child.js'); //连接到子进程
child.send('Hello,My Son')
//子进程接收消息 work.js
process.onI('message',e=>{
    //e就是传递过来的数据
    console.log(e,'Father Message');
})
```
## 异常处理事件
## rejectionHandled && unhandledRejection （用于捕获异步的异常）
  rejectionHandled和unhandledRejection都是用于处理promise错误未处理的事件的，例如:我们一般使用promise可能只写then但是不写catch就会触发unhandledRejection事件,写了catch且不在一轮事件循环中会触发rejectionHandled事件

```JavaScript
const unHandledMaps=new Map(); //新建一个map用于存储未处理的proimise
process.on('unhandledRejection',(reason,promise)=>{
    console.log('触发到了unhandled事件');
  unHandledMaps.set(reason,promise);
})
process.on('rejectionHandled',promise=>{
    console.log('触发了rejectionHandled事件');
})
const rejected=Promise.reject('Error'); //promise有了错误，但是未用catch处理，会触发unhandledRejection事件

//为了不在一轮事件循环写一个定时器
setTimeout(()=>{
  rejected.catch(()=>{}); //用间隔0.1秒用catch处理了，此时会触发rejectionHandled事件
},100);
```
## uncaughtException  &&  uncaughtExceptionMonitor (捕获同步的异常)

  uncaughtEcxcertion用于捕获异常，捕获到异常后进行异常处理，uncaughtExceptionMonitor会率先一步uncaughtException捕获到异常，但是如果没有注册uncaughtException事件，只注册uncaughtExceptionMonitor事件的话进程会直接报错。

```JavaScript
process.on('uncaughtException',(err,origin)=>{
    console.log('捕获到了异常',err);
})

process.on('uncaughtExceptionMonitor',(err,origin)=>{
    console.log('率先捕获到了异常');
})
function foo(){
    throw new Error();
}
foo();
// 此时执行foo的话如果不注册uncaughtException事件，进程会直接报错
// 但是注册了uncaughtException事件的话会执行异常处理后，再退出进程

//如果只注册了uncaughtExceptionMonitor会直接报错，不存在异常处理情况
```
## 信号事件
  无论我们的node部署在哪里，比如当我们的进程停止时，运行node的系统会发出信号，触发信号事件，信号事件是在liunx系统独有的，在windows不会发出信号

## abort()
   abort方法会立即退出进程，并且生成一个核心文件，但是在worke里此方法不可用
```JavaScript
process.abort();
```
## allowedNodeEnvironmentFlags
  返回node_options环境变量允许的标志
```JavaScript
const process=require('process');
console.log(process.allowedNodeEnvironmentFlags);
```
## arch argv
 arch返回当前正在运行node的系统的cpu架构 ,window是x64
 argv 返回一个数组，里边包含node的路径，当前正在执行js的路径，接下来的内容是运行进程时传入的参数

```JavaScript
//我们可以这样运行我们的进程

// node index.js 11  然后看下面的打印内容
const process=reuqire('process');
console.log(process.arch); // x64
console.log(process.argv); // ['node的路径','当前执行js的路径','11']
```

## channel
  channel属性只在子进程里有效，如果当前进程不是子进程则channel的值为undefined,
  ### ref unref()
   ref方法保持进程的事件循环运行，unref()终止进程的事件循环

```JavaScript
// 子进程child.js
process.on('message',(e)=>{
    console.log(e);
})
process.ref(); // 保持事件循环运行，正常触发message事件然后打印
process.unref();// 终止事件循环运行,message事件不会被触发
```
## config
  process的全局属性，可以修改
```JavaScript
 console.log(process.config)
```
## connected
  判断主进程与子进程是否连接
  连接:true
  未连接:flase
```JavaScript
// index.js 主进程
const process=require('process');
const child_process=require('child_process');
const child=child_process.fork('./child.js');
console.log(child.connected);  // true
child.disconnect();
console.log(child.connected); //false
// child.js 子进程
console.log(process.connected); //true
```
## cpuUsage
   返回当前的进程的user和cpu运行的时间，单位是百万分之一秒,
   接收一个参数
```JavaScript
const process=require('process')
 const user=process.cpuUsage(); //可以保存数据，作为下一次cpuUsage的参数查看差异
 setTimeout(()=>{console.log(process.cpuUsage(user))},500);
```
## cwd
  cwd方法返回当前进程的工作目录
```JavaScript
console.log(process.cwd());
```
## disconnect
  断开与父进程的连接
```JavaScript
// index.js 父进程 
  const process=reuqire('process');
  const child_process=reuqire('child_process');
  const child=child_process.fork('./child.js');
  child.disconnect();

// child.js 子进程
 process.on('disconnect',()=>{
     console.log('连接即将关闭');
 })


 // 在父进程调用child.disconnect() 的作用与 在子进程 process.disconnect()的作用是一样的
```

## emitwarning
  用于触发warnning事件，需要注册warning事件
```JavaScript
process.on('warnning',(warning)=>{
    console.warn('触发到了warning事件',warning);
})
process.emitwarning('SomeThing happend');
```
## env
 返回包含用户环境的对象，process.env用到的地方很多，比如在不同的环境下用到不同的环境变量
```JavaScript
console.log(process.env);
// 一般我们设置NODE_ENV在process.env上来在的打包或者开发时判断环境
process.env.NODE_ENV='development'; // 如果是开发环境一般就设置development
// 如果是打包就修该他的值
//以此来区分不同的开发环境在代码中使用
```
##  execArgv
 用于接收进程启动时传入的命令行选项
```JavaScript
// 当我们在cmd/shell里输入
//node --http index.js -- versiosn
// index.js前的值会放在execArgv里 
// index.js 后的值会放在argv里
console.log(process.execArgv);
console.log(process.argv);
//这个选项可以联想到 我们在cnpm 时 --save-dev 会将所下载的模块的名称写入package.json里
```
## kill 
 在非windows上会发出信号，在windows上会直接找到输入的pid然后杀死该进程
```JavaScript
//杀死子进程
// index.js 主进程
const process=require('process');
const child_process=reuqire('child_process');
const child=child_process.fork('./child.js');
child.send('HELLO ');
process.kill(child.pid,'SIGINT'); //这里的第二个参数在windows上可传可不传
//子进程
process.on('message',e=>{
    console.log(e);
})

// 因为在主进程中调用kill杀死了子进程，所以子进程并不会执行message事件
```
## memoryUsage
 返回当前进程的内存使用量
```JavaScript
console.log(process.memoryUsage());
```
## nextTick
 nextTick方法用处也是比较多的,nextTick是nodejs提供的一个异步执行函数，
 nextTick会在下一个事件循环前执行，他的执行顺序要优先于SetTimeout
 ### node的什么是事件循环
  nodejs的事件循环会经历一下六个阶段，在这六个阶段结束之后开启下一轮的事件循环
    1. timers 阶段: 这个阶段执行 setTimeout(callback) 和 setInterval(callback) 预定的 callback;
    2. I/O callbacks 阶段: 此阶段执行某些系统操作的回调，例如TCP错误的类型。 例如，如果TCP套接字在尝试连接时收到 ECONNREFUSED，则某些* nix系统希望等待报告错误。 这将操作将等待在==I/O回调阶段==执行;
   3. idle, prepare 阶段: 仅node内部使用;
   4. poll 阶段: 获取新的I/O事件, 例如操作读取文件等等，适当的条件下node将阻塞在这里;
   5. check 阶段: 执行 setImmediate() 设定的callbacks;
   6. close callbacks 阶段: 比如 socket.on(‘close’, callback) 的callback会在这个阶段执行;

 代码示例
 ```JavaScript
setTimeout(() => {
    console.log('setTimeout1')
    process.nextTick(()=>{
      console.log('nextTick')
    })
  }, 0);
  
  setTimeout(() => {
    console.log('setTimeout2')
  }, 0);
// 打印结果 setTmieout1 -> nextTick -> SetTimeout2
// 首先我们node index.js就会开启一轮事件循环 ，在代码执行中遇到SetTimeout挂起等待下一轮循环,(如果这时setTimeout时间到了会开启下一轮循环),等待两个setTimeout都被挂起第一轮的node idnex.js的时间循环就结束了，开始下一轮，会先执行setTimeout的回调，打印setTimeout1,然后遇到process.nextTick(等待下一轮事件循环开始前执行),setTimeout1打印完之后事件循环已经结束了，会执行nextTick,然后再打印setTimeout2
 ```

 ## pid && ppid
 pid: 返回当前进程的pid
 ppid: 返回当前进程的父pid
```JavaScript
 console.log(`this:${process.pid};parent:${parocess.ppid}`);
```
## platform
 返回操作系统平台，例如:linux就是linux windows就是win32
```JavaScript
console.log(process.platform);
```
## send
  用于父子进程间通信
```JavaScript
// index.js 父进程
 const process=require('process');
 const child_process=require('child_process');
 const child=child_process.fork('./child.js');
 //向子进程发送数据
 child.send('data');
 process.on('message',(data)=>{
   console.log('父进程接收子进程的数据');
 })
 // child.js 子进程
 process.on('message',data=>{
   console.log('接收父进程数据',data);
 })
 process.send('向父进程发送数据');
```
## uptime
 返回当前进程运行的时间
```JavaScript
console.log(process.uptime());
```
## versions
  返回当前node运行的版本
