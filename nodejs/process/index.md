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
```