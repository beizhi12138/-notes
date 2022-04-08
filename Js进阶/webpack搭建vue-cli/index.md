# webpack+vue.js 搭建vue-cli

   首先我们需要npm init -y 初始化以下package.json文件，初始化我们的项目

      npm init -y
   然后我们需要安装 webpack  和vue.js (注意要vue2.x版本)
      
       cnpm install --save-dev vue@2.0.6
       cnpm install --save-dev webpack

   然后创建src文件夹
   在src文件夹下创建components文件夹
   在文件夹根目录创建index.html 
   此时我们的文件夹目录是这样的:

      demo 
         index.html
         package.json
         node_modules
         src
           components
## 跑通测试用例
   
     在components下创建test.js


```JavaScript

//创建一个demo，测试我们是否能泡桐
 import VueTest from 'vue/dist/vue.esm.js';
 const Test=new VueTest({
     el:"#app",
     data:{},
     conponent:{
         test:{
             data(){
                 return {
                     tips:'Hello World'
                 }
             },
             template:'<div>{{tips}}</div>'
         }
     }
     template:'<div><test></test></div>'
 })

// 编辑webpack.config.js

const path=require('path');  //引入node的path模块,path是node的内置模块
const webpack=require('webpack')
module.exports={
  mode: 'none', //不打包
  entry:'./src/components/test.js', //入口文件
  //输出路径
  output:{ 
   path:path.resolve(__dirname,'dist'),
   filename:'index.js'
  },
  //公共设置
  plugins:[
      new webpack.DefinePlugin({
          'process.env':{
              NODE_ENV:process.env.NODE_ENV
          }
      })
  ]
}

// 通过命令编译test.js  // npx webpack

//此时我们的文件目录下会有一个dist文件夹，dist文件夹里就是我们打包好的js文件，然后我们来编辑index.html并在index.html里引入打包好的js文件

// index.html
 <div id='app'></div>
 <script src='./dist/index.js'></script>
```

## webpack-dev-server (3.11.0版本)
此时我们的demo跑通了，但是我们在开发的时候每次都打包代码，为了匹配版本问题，所以我们需要webpack@4.44.1 , webpack-cli@3.3.12

此时我们来跑通以下实时更新

      npx webpack-dev-server

开启服务之后，我们访问localhost:8080,去更改代码，发现还是不能更新，我们需要更改index.html路径

```JavaScript
  <script src='./index.js'></script>

  // 此时我们再去更改代码，发现实现了实时更新
```

## 区分开发环境和正式环境

  此时我们来区分开发环境和正式环境

//    我们需要三个文件
      webpack.dev.js 开发时的配置
      webpack.prod.js  正式上线的配置
      webpack.common.js 公共的配置

    我们还需要一个webpack-merge文件，用来合并公共文件就是使用公共文件

```JavaScript
 //webpack.dev.js
   //开发环境配置文件
const merge = require('webpack-merge');  // 引入webpack-merge功能模块
const common = require('./webpack.common.js'); // 引入webpack.common.js

module.exports = merge(common, {   // 将webpack.common.js合并到当前文件
    devServer: {
        contentBase: "./",   // 本地服务器所加载文件的目录
        port: "8088",  // 设置端口号为8088
        inline: true,  // 文件修改后实时刷新
        historyApiFallback: true, //不跳转
        hot: true     //热加载
    }
})

//webpack.prod.js

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, { // 将webpack.common.js合并到当前文件
    plugins: [
        // new CleanWebpackPlugin(['dist']),  // 所要清理的文件夹名称
    ]
})
  
  //webpack.common.js
   const path = require('path');  // 路径处理模块
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
//公共配置文件

module.exports = {
    entry: path.join(__dirname, "/src/components/test.js"), // 入口文件
    output: {
        path: path.join( __dirname, "/dist"), //打包后的文件存放的地方
        filename: "index.js" //打包后输出文件的文件名
    },
    module: {
       
    },
    plugins: [
   
    ]
}

```

配置package.json文件

```JavaScript
 "script":{
     "dev":"webpack-deve-server --open --config webpack.dev.js",
     "build":"webpack --config webpack.pord.js"
 }

```

此时我们实现了热更新，但是我们每次去更新前都要去更改index.html文件，所以我们接下来用到插件html-webpack-plugin来处理html,css,js的配置问题

## html-webpack-plugin

  首先安装html-webpack-plugin

       cnpm insall --save-dev html-webpack-plugin 

  然后在公共文件(webpack.common.js)里去进行配置

   示例代码

```JavaScript
   //webpack.commont.js

  plugin:{
      new Html({
          filrname:"index.html" ,//输出的文件
          template:"template",//模板文件
      })
  }

```

此时我们处理了html实时更新，但是webpack中除了js文件和json其他的文件都不能识别，所以我们需要用到plugin扩展

## plugin扩展
  因为我们的组件都是用vue写的所以我们需要下载vue的插件
     

        cnpm install --save-dev vue-html-loader //解析template
        cnpm install --save-dev vue-loader  //解析vue文件
        cnpm install --save-dev  vue-template-compiler //把vue的内容编译出来

  现在为了实现效果我们需要三个文件

   main.js  App.vue  test.vue

```JavaScript
  //main.js 

  import Vue from 'vue/dist/vue.esm.js';
  import App from './App.vue'
  new Vue({
   el:'#app',
   components:{App}
   template:'<div><App></App></div>' 
  })
 //App.vue
 <template>
 <div><Test></Test></div>
 </template>
 import Test from './src/components/test.vue';
 export default {
     components:{
         Test
     }
 }

 //test.vue
<template>
 <div>{{tips}}</div>
 </template>
 export default {
    data(){
        return {
            tips:'哈哈'
        }
    }
 }
```
然后更改我们的webpack配置

```JavaScript
const {VueLoaderPlugin} = require('vue-loader');

module.exports={
    ...
module{
 rules:[
        {test:/\.vue$/,use:'vue-loader'}
    ]
},
plugins:{
    ...,
    new VueLoaderPlugin()
}
   
}
```

此时我们就可以去写我们的vue组件了，但是为了更完美我们需要去去掉扩展名，也就是我们引入文件时需要写的.jsm.vue等等

## 去掉扩展名and取别名
 
  取别名是因为我们在main.js中引入vue是这样做的
  import Vue from 'vue/dist/vue.esm.js',取了别名之后我们可以这样写import vue from 'vue'

在webpack配置中这样做

```JavaScript
  resolve:{
      extensions:['.js','.vue','.css','.json'],
     alias:{
         vue:'vue/dist.esm.js'
     }
  }
```

## 组件样式

  我们肯定要给组件写样式，但是webpack却不能对css进行打包，所以我们需要使用css-loader@5.2.7,style-loader2.0.0

```JavaScript
 rules:[
     {
         test:/\.vue$\,lodaer:'vue-loader',

     },
     {
         test:/\.css/,loader:['style-loader','css-loader']
     }
 ]

```


loader是用来干什么的?

 因为webpack只能处理js的文件，所以利用loader将非js文件转换给webpack去打包，loader的执行顺序是后进先出的,loader是对源文件进行处理的。
 常用的loader:
    css-loader,style-loader,scss-loader.less-loader,vue-loader,babel-loader(将es6转换为es5),file-loader(处理图片等文件)

 plugin?
   plugin并不直接操作源文件，而是监听打包过程，然后执行，plugin是在loader执行完之后执行

 常用的plugin
   html-webpack-plugin (根据模板html，生成html自动引入css和js文件)
   extract-text-webpack-plugin (将js文件中引用 的样式单独抽离为css文件)
   HotModuleReplacementPlugin  热加载
   clean-webpack-plugin 清理上一次打包的文件夹
   optimize-css-assets-webpack-plugin 压缩css代码
   ParallelUglifyPlugin 压缩js代码


 打包和加载优化
   优化loader，设置loader搜索目录，减少loader搜索事件避免所有不必要的文件，
   将babel编译过的文件缓存起来，
   Tree shaking ,删除项目中未被引用的代码，

   通过压缩代码的大小，实现加载优化

   purgecss-webpack-plugin 删除没有用的样式
   preload-webpack-plugin 静态资源预加载
   UglifyJsPlugin 压缩js
   CompressionPlugin 优化首屏加载时间
   ParallelUglifyPlugin 开启多个子进程优化打包时间
   splitchanksPlugin