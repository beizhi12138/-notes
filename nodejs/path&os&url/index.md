# path
 path模块提供了，提供了处理文件和目录的路径，
 path在node做服务端免不了要处理文件需要用到
 path在打包和输出文件也需要用到
## basename
  basename 返回字符串，返回的是输入路径的最后的文件名
  basename接收一个参数，文件的路径

```JavaScript
const {basename}=require('name');
console.log(basename('./index.js'));
//basename不会管文件存不存在，都会返回最后的文件名
```

## dirname
  返回输入路径的目录名

```JavaScript
const {dirname}=reuqire('path');
console.log(dirname('./index/txt.js'));
//打印结果
// ./index
```
## extname
  返回输入路径的文件后缀，如果输入的是目录路径则返回目录名称

```JavaScript
const {extname} =reuqire('path');
console.log(extname('/index/index.js'));
//打印结果 .js
console.log(extname('/index'))
//打印结果 index

```
## format 
 将输入的路径，拼接为字符串

```JavaScript
const {format} =require('path');
console.log(format({
    root:'/', //未指定dir则使用root
    base:'index',//未指定base则使用name+ext
    ext:'.js', //文件后缀
    dir:'/home',//文件路径
    name:'index'//文件名称
}))
```

## isAbsolute
 判断路径是否是绝对路径
 只有带盘符才会被该方法认为是绝对路径
```JavaScript
const {isAbsolute} =require('path');
console.log(isAbsolute('D:/learnANDstudy/Nodejs/path/index')); // true
console.log(isAbsolute('./index/index.js')); //false
```
## join
 拼接字符串为路径

```JavaScript
 const {join} =require('path');
 console.log(join('D:/','nodejs','index'));
 //打印结果
 // D:/nodejs/index

 //我们通常这样使用join,在打包的时候设定输出目录
 join(__dirname,'dist')
```
## normalize
  解析 . 或者 ..这样的路径符号

```JavaScript
const {normalize}=require('path');
console.log(normalize('./index/../'));
//这个路径表示，当前目录下的index的上一层目录下，也就是当前目录
// 打印结果
// ./
```

## parse
 解析路径

```JavaScript
const {parse} =require('path');
console.log(join('./index/txt.js'))
//打印结果
//{ root: '', dir: './index', base: 'txt.js', ext: '.js', name: 'txt' }

```
# os
 os提供了当前操作系统的方法和属性,os应用于node做服务端，处理cpu负载均衡常用

 ## arch
   操作系统编译nodejs的cpu架构,windows一般是x64编译

```JavaScript
const os=require('os');
console.log(ops.arch);
//打印结果
 //x64编译
```
## cpus()
  返回当前设备的cpu内核信息
```JavaScript
const cpus=require('os').cpus();
console.log(cpus);
```
## freemem()
 返回空闲的内存数量，以字节为单位
```JavaScript
const fremem=require('os').freemem();
console.log(freemem);
```
## homedir()
  返回当前设备，主用户的路径
  windows就是C:/users/Administrator
  linux是 /root/
```JavaScript
 const homedir=require('os').homedir();
 console.log(homedit)
```

## hostname()
 返回操作系统的主机名

```JavaScript
const hostname=require('os').hostname();
console.log(hostname);
```
## platform
 返回当前的操作系统
```JavaScript
const platdorm=require('os').platform()
console.log(platform)

```
## release
返回操作系统的版本比如:win10,win7,win11

```JavaScript
const release=reuire('os').release();
console.log(release); // 10
```
# url
 nodejs提供给我们url模块用于解析和处理url

## 解析url的作用
     1. node做服务端时因为http监听到request事件，但是用户不可能只有一个请求，不同的请求就要请求不同的url，返回不同的数据，我们可以根据url模块去解析用户请求返回数据。
     2. 传统的服务端渲染是，服务端将页面和数据拼接好之后返回给客户端页面，通过url模块解析不同的url返回不同的页面
  
  ### 引发思考的问题
   先看一下前端渲染页面的历史发展，1.传统的服务端渲染后端拼接好数据后返回页面，但是这种的缺点就是出现bug前后端问题混淆不清，2.通过ajax分离，前端通过ajax请求数据，但是每切换一个页面都要向服务端请求，用户体验不好。3，有了spa单页面，前端开发完成打包后只有一个html和js文件，但是用户的首屏优化不好，而且spa单页面不容易被seo抓取，所以还是要用到服务端渲染，但是如何避免传统服务渲染的缺点，就是在sp单页面的基础上做服务端渲染就有了同构渲染(srr)。



     同构渲染(ssr)的流程就是客户端向node服务端发起请求,node服务端接收到请求后解析url找到对应的组件(这就可能用到了url模块和path模块)，node通过http(http模块)向服务端发起请求获取数据，将数据注入到组件然后将组件转化为html返回给客户端，此时就解决了spa页面首屏白屏和seo优化的问题


## URL类

 ### hash
   获取url的hash值
```JavaScript
const url=require('url').URL
const myurl=new url('https://example.org/foo#bar');
console.log(myurl.hash);//$bar
```
 ### host  hostname
  获取路径的域名
```JavaScript
const myurl=new url('https://example.org:8080/foo#bar');
console.log(myurl.host);//example.org:8080
consoel.log(myurl.hostname);//example.org
  //host 获取到的是带端口号的
  // hostname 获取的是不带端口号的
```
### port href
  port用于获取端口号，href用于获取完整的url

```JavaScript
const myurl=new url('https://example.org:8080/foo#bar');
console.log(myurl.port);//8080
consoel.log(myurl.href);//https://example.org:8080/foo#bar
```
### protocol
  获取和设置url的协议
```JavaScript
const myurl=new url('https://example.org:8080/foo#bar');
 console.log(myurl.protocol);//https
myurl.protocol='http';
console.log(myurl.protocol); //http
```
### search
  获取和设置url的?后的内容

```JavaScript
const myurl=new url('https://example.org:8080/foo?name=admin');
console.log(myurl.search); //name=admin
myurl.search='name=user';
console.log(myurl.search); // name=user
```
## URLSearchParams
  SearchParams的Api提供对url的?后内容进行的增删改查,也可以通过实例化URLSearchParams进行使用

  
SearchParams的使用

```JavaScript
 const myurl=new url('https://example.org:8080/foo?name=admin');

 // 查
 console.log(myurl.searchParams.get('name')); // admin
 //增
 myurl.searchParams.append('pwd','000');
 //删
 myurl.searchParams.delete('pwd');
 //改
```