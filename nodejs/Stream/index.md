# 流
 ## 什么是流
    
## 为什么要使用流?s
   有这样一个场景，node作为服务器，我们开发完react/vue项目进行打包完之后有一个bundle.js，通常这个bunle.js是很大的，为什么很大因为我们写的各种组件等等都被Webpack进行解析完之后打包进了bundle.js里。
   当node作为服务器的时候，用户访问我们的网站，我们需要把index.html和bundle.js返回给浏览器但是bundle.js是很大的，我们返回给浏览器占用的内存也是很大的，但是我们使用流就完全不存在占用内存大的问题了

  实例介绍

```JavaScript
//index.js
  //首先我们使用流来创建一个大文件
  const fs=require('fs');
  const file=fs.createWriteStream('./big.txt');
  for(let i=0;i<999999;i++){
    file.write(`写入的第${i}次`)
  }
  file.end();
  //http.js
  //现在我们的big.txt起码要有及时MB了
  //搭建一个服务器来返回我们的大文件

    //不使用流
  const fs=require('fs');
  const http=require('http');
  const server=http.createServer();
  server.on('request',(req,res)=>{
    fs.readFile('./big.txt',(err,data)=>{
      if(err){console.log(err);return;}
      res.end(data);
    })
  })
  server.listen(9000);


  //使用流
  const fs=require('fs');
  const http=require('http');
  const server=http.createServer();
  server.on('request',(req,res)=>{
    const data=fs.createReadStream('./big.txt');
    data.pipe(res);
  })
  server.listen(8000);
```

  接下来我们运行http.js看看使用流和不使用流访问服务器的情况

使用流
<img src='./01.png' />
不使用流
<img src='./02.png'>

可以看见使用流和不使用流的内存情况相差了很多，显然使用流的内存占用更少，所以这就是使用流的好处