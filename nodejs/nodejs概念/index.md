## nodejs是用来干什么的
  ndoejs是一个js的运行器，在传统的开发中前后端分离开发中前端请求，需要请求后端用(php/java/ruby)的接口这样会很麻烦,nodejs解决了这个问题，nodejs使得我们可以直接使用js写后端连接数据库提供接口的代码，这样使得前后端的开发语言统一，nodejs的最大的有点就是他的非阻塞，和异步io
  nodejs不仅仅可以做后端在前端开发中也有很大的应用，比如传统的下载npm模块和打包代码，以及转换代码
  nodejs不仅仅是做后端，还有nodejs的事件监听比如

## nodejs的非阻塞

  非阻塞就是 当一段代码未执行完成时我们可以去执行下一段代码

```JavaScript
  //阻塞代码
const data=fs.readFileSync('./tests.js');
console.log(data.toString());
console.log('程序执行结束');

 //输出顺序
 //   tests.js的内容
 //   程序执行结束


//非阻塞代码
fs.readFile('./tests.js',(err,data)=>{
  console.log(data.toString());
})
console.log('程序结束')

  //输出结果
  //    程序结束
  //    tests.js的内容


//可以看见阻塞就是必须要等待一段代码执行完成之后再去执行下一段代码，然而非阻塞可以跳过当前程序的执行去执行下一段代码
   
```
