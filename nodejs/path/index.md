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
