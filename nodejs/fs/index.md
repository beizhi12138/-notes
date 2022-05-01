# fs 
   fs是node中的内置模块，是用来对文件进行读写，复制，删除，重命名,创建文件，文件夹等操作的

## 使用fs

  ### stat (检查是文件还是文件夹)

  ```javaScript
    var fs=require('fs');
fs.stat('./module',(err,data)=>{
     if(err){console.log(err)}
     if(data.isFile()){
         //data就是所识别到的给的路径文件的信息
         //通过isfile方法判断是不是文件，是文件返回true不是返回false
         console.log('./module是文件')
     }else{
         console.log('./module是文件夹')
     }
})
  ```
  ### mkdir(创建文件)

   ```JavaScript
     fs.mkdir('./test',(err)=>{
    if(err){console.log(err)}
    console.log('创建成功')
}) 
   ```
 ### writefile(写入内容)

 ```JavaScript
   fs.writeFile('./tests.js','var aaa=1;',(err)=>{
    //写入内容，如果有文件则覆盖掉原文件的内容，如果没有则创建文件再写入内容
   if(err)console.log(err);
   console.log('写入成功')
})
 ```

 ### appendFile (向文件里写入内容)

 ```JavaScript
   fs.appendFile('./tests.js','var aa=1;',(err)=>{
       //向文件里写入内同，如果有文件向原文件里添加内容(不会覆盖掉原文件的内容)，没有则创建文件再写入内容
    if(err)console.log(err);
    console.log('写入成功')
}) 

 ```

 ### readFile (读取文件)
  
  ```JavaScript
   fs.readFile('./tests.js',(err,data)=>{
    if(err) console.log(err);
    //因为读取出来的内容是十六进制的，所以我们需要使用toString方法转换为字符串
    console.log(data.toString());
})
  
  ```

  ### readdir(读取文件夹)

  ```JavaScript
   fs.readdir('./module',(err,data)=>{
    if(err) console.log(err);
    //data是一个数组包含了文件夹里的文件和文件夹
    console.log(data)
})

  ```

  ### rename(对文件重命名)

  ```JavaScript
   fs.rename('./tests.js','./module/inde.js',(err,data)=>{
    //对文件重命名，并且移动文件

    //第一个参数是要重命名的文件，第二个文件是要移动的路径和新的名称
    if(err) console.log(err);
    console.log(data)
})
  ```

  ### rmdir (删除文件夹)

  ```JavaScript
   fs.rmdir('module',(err,data)=>{
    //删除文件夹，要删除的文件夹的必须是空的
    if(err) console.log(err);
    console.log(data)
})
  ```

  ### unlink(删除文件)

 ```JavaScript
fs.unlink('./tests.js',(err,data)=>{
    if(err)console.log(err);
    console.log('删除成功')
})
   
 ```
 ### createReadSteam ('文件路径')(以流的方式读取文件)

 ```JavaScript
const readStarm=fs.createReadStream('./tests.js');
readStarm.on('data',data=>{
    
    console.log(data.toString(),'data')
})
readStarm.on('end',()=>{
   
})
 ```

 ### createWriteSteam (以流的方式写入内容)

 ```JavaScript
  const wariteStream=fs.createWriteStream('./tests.js');
wariteStream.write('var cod=3;'); //写入内容，会覆盖掉原文件的内容
wariteStream.end();
wariteStream.on('finish',()=>{
    //监听写入完成
    console.log('写入完成')
})

 ```

### 管道流(读取一个文件的内容写入到另一个文件中)

```JavaScript
  const c=fs.createReadStream('./tests.js');
const writeSteam=fs.createWriteStream('./aa.js');
c.pipe(writeSteam)
```

### realpath (获取文件的真实路径)

```JavaScript
   fs.realpath('./test.js',(err,data)=>{
       if(err) console.log(err);
       console.log(data);
   })
```

## 使用fs实现base64 与png/jpg/jpeg 互相转换

  ### png与jpg转换

```JavaScript
// 因为要用到异步操作所以需要用到util.promisify将函数转换
//第一种写法，
const util = require('util')
const readFile=util.promisify(fs.readFile)
readFile('./index.png').then(res=>{
    //得到图片的编码后  
     fs.writeFile('./index.jpg',res,(err)=>{
         //写入到jpg文件里
         if(err){console.log(err)}
         console.log('写入成功')s
     })
})
//第二种写法
  const util=require('util');
  const readFile=util.promisify(fs.readFile);
  const aa=async ()=>{
        const data=await readFile('./index.png');
        fs.writeFile('./index.jpg',data,err=>{
            if(err){console.log(err);return;}
            console.log('写入成功');
        })
  }
  aa()

 //第三种写法
 const data=fs.readFileSync('./index.png');
 fs.writeFile('./index.jpg',data,err=>{
     if(err){console.log(err);return;}
     console.log('写入成功')
 })


```

  ### png与base64转换


```JavaScript
const base=(url)=>{
const data=fs.readFileSync(url).toString('base64');
   return 'data:image/bmp;base64,'+data
}
  base(url);//url图片的路径

```

  ### base64与png转换

```JavaScript
  const BasePng=(base)=>{
      //base就是需要转换的base64编码
      const data=base.replace(/^data:image\/\w+;base64,/,'')
      //通过正则匹配掉base64的前缀
      fs.writeFile('./index.png',data,'base64',err=>{
          if(err){console.log(err);return;}
          console.log('写入成功')
      })
  }

```

### 使用images实现图片压缩

  实现图片批量压缩需要使用到images模块，所以需要先npm install images

```JavaScript
  const fs=require('fs');
  const images=require('images');
  const MySet=new Set();
  //声明一个集合用来存储所有图片文件的后缀
  MySet.add('jpg');
  MySet.add('png');
  MySet.add('jpeg')
  const jpgY=(path)=>{
      //path就是需要压缩图片的文件夹路径
      fs.readdir(path,(err,data)){
          if(err){console.log(err);return;}
          data.forEach(item=>{
              //对文件夹的内容进行遍历
              const FilePath=path+'/'+item
              fs.stat(FilePath,(err,stat)){
                  if(err){console.log(err);return;}
                  if(stat.isFile()){
                      //判断是文件还是文件夹
                      if(MySet.has(item.split('.')[1])){
                          //如果是文件则判断后缀是否是图片文件
                          const outPutName=path+'/author_'+item;
                          images(FilePath).save(outPutName,{ quality : 30  }) //图片质量为30
                      }
                  }else{
                      //如果是文件夹则循环进行遍历
                     jpgY(FilePath);
                  }
              }
          })
      }
  }
  jpgY('./Img')
```