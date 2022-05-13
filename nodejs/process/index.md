# process
 process是nodejs用来控制进程的工具。
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

## rejectionHandled && unhandledRejection
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