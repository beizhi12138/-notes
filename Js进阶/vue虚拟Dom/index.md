# 什么是虚拟Dom (Vitural Dom)
  虚拟Dom 就是用JS对象来描述Dom，因为不是真实的Dom对象所以叫虚拟Dom
## 为什么要使用虚拟Dom
  1.因为在前端中，一个Dom对象包含的属性以及方法是很多的，然而虚拟DOm只需要我们去设置属性即可
   ```javaScript
   const element=document.querySelector('#app');
   let s='';
   for(let item in element){
       s+=','+item
   }
   console.log(s)  //真实dom此时的属性是有很多的

   //虚拟dom
   {
       sle:'div',
       data:{},
       children:undefined,
       text:'hello vitural dom',
       elm:undefined,
       key:undefined
   }
   ```
   2.手动操作dom比较复杂，还需要考虑浏览器兼容问题，虽然有jquery等库的简化动作操作，但随着项目的复杂，dom操作复杂提升。为了简化dom操作的复杂，出现了很多mvvm框架，mvvm框架解决了视图和状态的同步问题，为了简化视图的操作，可以使用模板引擎，但是模板引擎没有跟踪状态的变化，所以虚拟dom出现了，虚拟dom的好处是当状态改变时，不需要立即更新dom，只需要创建一个虚拟树来描述dom，虚拟dom内部将理解如何更新(diff) dom
   虚拟dom可以维护程序的状态，跟踪上一次的dom
   通过前两次比较差异进行跟新dom

## 虚拟Dom的作用
   监视视图和状态的关系
   复杂视图情况下提升渲染性能
   除了渲染Dom以外，还可以实现SSR(next.js/nuxt.js) 原生应用Weex/React Native 小程序(mp-vue/uni-app)等

# 虚拟Dom库 (Virtul Dom || Snabbdom)
  我们学习Snabbdom 因为在vue2中使用的就是Snabbdom
## Snabbdom




       1.首先我们需要创建一个项目，
       2.我们需要创建一个文件夹，然后npm init -y(对项目初始化)
       3.然后安装parcel(用来启动项目)，也可以使用webpack 。(parcel使用起来更方便)
       4.新建一个index.html,新建一个src文件夹，在src下新建一个index.js,在index.html里进行引入index.js
       5.然后对package.json 进行设置

```JavaScript
{
  "name": "dom",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "parcel index.html --open",
    "build":"parcel build index.html"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel-bundler": "^1.12.5"
  }
}


```
  ### 引入Snabbdom 
    可以先看一下Snabbdom文档  然后快速建立一个Snnabbdom进行使用

    1.使用cnpm 安装snnabdom。
    2.在index.js里进行引入
