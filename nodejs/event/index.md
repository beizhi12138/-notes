# events(事件触发器)
   events是node内置的事件触发器，在node的内置模块里很多都用到了events,比如http.server在每次接受到请求时触发事件，还有stream就是基于事件的使用on来监听对应的事件。
   所有触发事件的对象都是EventEmitter实例，这些对象暴露了EventEmitter.on('事件',callback)，通常使用EventTmitte.on注册事件，EventEmitter.emit触发事件。

   例子：

```JavaScript
  const events= require('events');
const event=new events();//实例化EventEmitter
event.on('data',(a,b)=>{
    console.log('参数'+a+b)
    console.log(this,'this')
    //注意，如果callback是 箭头函数的话this指向的是全局对象
    //      如果callback是function(){}形式的话，this会绑定到EventEmitter实例上
    console.log('emit触发了data事件')
})
event.emit('data',1,2); //使用emit触发事件
```

## 异步操作
 因为EventEmitter.on('事件名称',callback)里的callback是同步执行的，但是在某些情况下我们不得不使用异步操作所以我们可以在使用SetImmediate来执行异步操作
```JavaScript
 const events= require('events');
const event=new events();
event.on('event', (a, b) => {
    
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
  //因为这里的监听器是同步执行的，但是我们可以使用setImediate函数等待监听器里的其他内容执行完再执行
});
event.emit('event',1,2);

```
## 触发一次
  我们正常通过emit触发事件时，emit有几个事件就会被触发几次，但是我们可以使用once注册事件，使用once触发的事件只能被触发一次

```JavaScript
  const EventEmitter =require('events');
  const MyEventEmitter=new EventEmitter();
  let a=0;
  //正常注册事件和触发
  MyEventEmitter.on('add',()=>{
      a++
      console.log(a) 
  })
  MyEventEmitter.emit('add'); // 1;
  MyEventEmitter.emit('add'); // 2;
  // 使用once注册
  MyEventEmitter.once('add',()=>{
      a++
      console.log(a);
  })
  MyEventEmitter.emit('add') // 1
  MyEventEmitter.emit('add') // 不生效了
```
## error事件
  EventEmitter是没有error事件的，所以当发生错误的时候只能强制退出执行，所以我们必须自己注册一个error事件，以致于在发生错误的时候触发到error事件

```JavaScript
 const EventEmitter=require('events');
 const MyEventEmitter=new EventEmitter();
 MyEvenEmitter.on('error',(err)=>{
   console.error(err,'报错了')
 })
```
  除了上面那种方式我们还可以通过errorMonitor在不注册error事件的情况下，来监听emit触发的报错
  使用了errorMonitor我们就不必要再去通过手动注册error事件了
```JavaScript
  const {EventEmitter,errorMonitor}=require('events');
  const MyEventEmitter=new EventEmitter();
  MyEventEmitter.on(errorMonitor,(err)=>{
      console.log(err);
  })
  MyEventEmitter('error' , new Error('报错了'))
```

## EventEmitter类

  ### newListener事件
    在我们添加事件监听的时候会触发newListener事件，所以我们可以注册newListener事件用来在添加事件监听的时候做一些事情
```JavaScript
 const {EventEmitter}=require('events');
  const MyEvent=new EventEmitter();
  MyEvent.on('newListener',(name,litener)=>{
      //name就是正在监听的事件的名称
      //listener是事件的处理函数
      MyEvent.on('event',()=>{
        console.log('在newListener添加的事件')
      })  
  })
  MyEvent.on('event',()=>{
      console.log('正常注册的event事件')
  })
  //此时我们再不触发event事件的情况下，newListener事件就会执行，因为我们只要正在注册事件就会触发newListener事件
  //注意:newListener事件必须要使用EventEmitter.once()注册，因为如果我们在newListener事件里再去添加注册事件的话，而且外边有多个注册事件就会触发多次newListener事件,就会发生堆栈溢出
 MyEvent.emit('event');

 //打印的结果
   //    在newListener注册的事件
   //     正常注册的event事件
```
  ### removeListener事件
    removeListener事件用于删除已经注册的事件，但是，removeListener不会阻止掉正在被emit触发的事件
```javaScript
 const callbackB=()=>{
    console.log('B')
}
const callbackA=()=>{
    console.log('A')
    event.removeListener('data',callbackB)
}
event.on('data',callbackA)
event.on('data',callbackB)

event.emit('data'); //在执行callbackA的时候删除了data，但是不会阻止掉下一个emit的触发
event.emit('data'); //在这里的时候才是真正被删除掉了

```