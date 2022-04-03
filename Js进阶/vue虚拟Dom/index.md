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
```javaScript
   //index.js
   import {h,thunk,init} from 'snabbdom';
   //index.html
   <div id='#app'></div>
   <script src='./src/index.js'></script>
```
  h , thunk , init 是snabbdom里的三个最基本的方法

    init是一个高阶函数，返回patch()
    h返回虚拟节点，相当于vue/React里的render函数
    thunk是一种优化策略，可以在处理不可变数据时使用

 ###  使用Snabbdom简单案例

```JavaScript
  // index.js
  import {h,init} from 'snabbdom';

  // 首先初始化一个patch函数
  //初始化patch需要调用init函数，因为init函数返回patch函数，init函数需要接收一个参数是空数组
   const patch=init([]);

   //patch 函数用来更新dom的接收两个参数
   // 1.旧的dom节点(会转化为虚拟dom)或者虚拟dom
   // 2.新的虚拟dom
 // patch函数回对这两个虚拟dom进行比较，然后更新dom节点

 //使用h函数创建一个dom节点,h函数接收两个参数，返回值是一个虚拟dom
  // 1.标签名称+id或者.class  例:div#app.class名称
  // 2.要在标签里显示的内容
 const center=h('div#app','Hello');

   //获取到页面上的dom节点进行更新

   const app=document.getelementById('#app');
 //调用patch进行更新
  patch(app,center);









  //嵌套标签
  const patch=init([]);
  const app=document.getelementById('#app');

  //如果要使用嵌套标签，则h函数的第二个参数接受一数组，数组里的内容都会显示在父级标签里，如果是虚拟dom则进行dom渲染，如果是字符串则显示字符串
  const newVdom=h('div#app',[
      h('div','这是一个div'),
      h('p','这是一个p标签'),
      '我是app里显示的内容'
  ])
   patch(app,newVdom);




   //清空页面中的dom节点

   const patch=init([]);
   const app=document.getelementById('#app');
    //如果清空页面中的dom节点，只需要用h函数创建一个注释标签，然后使用patch函数对dom进行更新即可
   patch(app,h('!'));
```
## 模块 
  Snabbdom的核心库并不能处理dom的样式和事件等，所以我们需要使用模块
    
    6个常用的模块

     1.attributes 
       设置Dom元素的属性 使用Setattributes
       处理Boolean类型的属性
     2.class
        切换类样式
        注意:给元素设置类样式是通过sel选择器
     3.props
        和attributes相似设置元素的属性 element{attr} =value
        不处理Boolead类型的属性
     4.Style
       设置dom的样式，支持动画
     5.dataset
       设置自定义属性 data-xxx=value
     6.evevtlisteners 
       注册和移除事件

    我们还可以通过hero模块自定义模块

 使用模块示例

 ```javaScript

   //给Vnode添加样式和点击事件
   import {h,init} from 'snabbdom';
   //引入模块;
   import {styleModule} from 'snabbdom/src/modules/style';
   import {evevtlistenersModule} from 'snabbdom/src/modules/evevtlisteners';
  const app=document.getelementById('#app');
   //注册模块

   const patch=init([
       styleModule,
       eventlistenersModules
   ]);
   //init函数接收一个数组，数组内的元素就是我们需要使用的模块

   //使用模块
  const Vnode=h('div#app',{
      style:{
          width:'100px';
          height:'200px';
      },
      on:{
          click:()=>{
              console.log('点击我了')
          }
      }
  },'我是一个div');
//使用模块时h函数接收三个参数，第二个参数是一个对象可以在对象里添加style设置样式，在on里添加事件，第三个参数则与之前的参数一样，可以是字符串/数组
  patch(app,Vnode);
 ```

# Snabbdom源码解析

 ## h函数
     h函数用来创建Vnode 
 ## 函数重载 (因为源码中用到了函数的重载，我们来理解一下函数的重载)
    参数个数或者不同类型的函数
    JavaScript中没有重载的概念
    TypeScript中有重载，不过重载的实现还是通过代码调整参数

重载代码示例
```JavaScript
 function add(a,b){
     console.loe(a+b);
 }
function add(a,b,c){
    console.log(a+b+c);
}
add(1,2); //如果传入的是两个参数，那么调用的就是只有两个参数的add函数
add(1,2,3);//如果传入的是三个参数，那么调用的就是有三个参数的add函数
```

### 源码解析
  h函数的源码地址在snabbdom/src/h.ts

    h函数使用了函数的重载，然后在通过对函数参数个数的不同，对参数进行处理，最后将数据传递给vnode函数，通过vnode函数创建虚拟dom，然后返回

h函数源码，+ 注释
```TypeScript
 import { vnode, VNode, VNodeData } from "./vnode";
import * as is from "./is";

export type VNodes = VNode[];
export type VNodeChildElement =
  | VNode
  | string
  | number
  | String
  | Number
  | undefined
  | null;
export type ArrayOrElement<T> = T | T[];
export type VNodeChildren = ArrayOrElement<VNodeChildElement>;

export function addNS(
  data: any,
  children: Array<VNode | string> | undefined,
  sel: string | undefined
): void {
  data.ns = "http://www.w3.org/2000/svg";
  if (sel !== "foreignObject" && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      if (typeof child === "string") continue;
      const childData = child.data;
      if (childData !== undefined) {
        addNS(childData, child.children as VNodes, child.sel);
      }
    }
  }
}

export function h(sel: string): VNode;
export function h(sel: string, data: VNodeData | null): VNode;
export function h(sel: string, children: VNodeChildren): VNode;
export function h(
  sel: string,
  data: VNodeData | null,
  children: VNodeChildren
): VNode;
export function h(sel: any, b?: any, c?: any): VNode {
  let data: VNodeData = {};
  let children: any;
  let text: any;
  let i: number;

  //处理参数实现重载的机制
  if (c !== undefined) {
    //处理三个参数的情况
    //sel  data children/text
    //三个参数分别对应我们使用h函数时传入的参数  sel 就是当前要设置的div , 如果传入三个参数data此时就是 样式等模块,c就是子元素
    if (b !== null) {
      data = b;
      //判断如果传入了b则把b存储在data中
    }
    if (is.array(c)) {
      //如果c是数组，则把c放进chilren里
      children = c;
    } else if (is.primitive(c)) {
      //如果c是字符串或者是数字，则当作正常值对待
      text = c.toString();
    } else if (c && c.sel) {
      //如果c是一个Vnode，则把他存储在子元素中
      children = [c];
    }
  } else if (b !== undefined && b !== null) {
    //处理如果传入两个参数,a就是当前的div，b就是文本或者子元素或者是样式等模块
    if (is.array(b)) {
      //b如果是数组，那么则存储进children里
      children = b;
    } else if (is.primitive(b)) {
      text = b.toString();
    //b是文本则当作普通值对待
    } else if (b && b.sel) {
      //如果b是一个Vnode则存储进chidlren里
      children = [b];
    } else {
      //b是样式等模块，则存储进data里
      data = b;
    }
  }
  if (children !== undefined) {
    //处理children中的原始值
    for (i = 0; i < children.length; ++i) {
      //如果是文本则创建文本节点
      if (is.primitive(children[i]))
        children[i] = vnode(
          undefined,
          undefined,
          undefined,
          children[i],
          undefined
        );
    }
  }
  //如果传进来的是svg则调用addns函数给svg添加一个命名空间
  if (
    sel[0] === "s" &&
    sel[1] === "v" &&
    sel[2] === "g" &&
    (sel.length === 3 || sel[3] === "." || sel[3] === "#")
  ) {
    addNS(data, children, sel);
  }
  //最后将所有的数据传递给vnode函数，通过vnode函数创建虚拟节点，最后返回
  return vnode(sel, data, children, text, undefined);
}

/**
 * @experimental
 */
export function fragment(children: VNodeChildren): VNode {
  let c: any;
  let text: any;

  if (is.array(children)) {
    c = children;
  } else if (is.primitive(c)) {
    text = children;
  } else if (c && c.sel) {
    c = [children];
  }

  if (c !== undefined) {
    for (let i = 0; i < c.length; ++i) {
      if (is.primitive(c[i]))
        c[i] = vnode(undefined, undefined, undefined, c[i], undefined);
    }
  }

  return vnode(undefined, {}, c, text, undefined);
}


```
 ### vnode函数
     vnode函数返回一个对象，对象里包含了所有要求的数据
     vnode函数源码里，定义了两个接口，给vnode函数传递的参数要满足接口数据的要求

 vnode函数源码+注释

 ```TypeScript
import { Hooks } from "./hooks";
import { AttachData } from "./helpers/attachto";
import { VNodeStyle } from "./modules/style";
import { On } from "./modules/eventlisteners";
import { Attrs } from "./modules/attributes";
import { Classes } from "./modules/class";
import { Props } from "./modules/props";
import { Dataset } from "./modules/dataset";

export type Key = string | number | symbol;

export interface VNode {
  //选择器，可以是字符串或者是undefined
  sel: string | undefined;
  //节点数据，属性样式，事件等 //data要满足Vnodedata里的数据
  data: VNodeData | undefined;
  //子节点，和text互斥，有children无text，有text无children  //chidlren如果是数组的话要数组里的每一项元素都要满足vnode的要求
  children: Array<VNode | string> | undefined;
  //记录vnode对应的真实数据
  elm: Node | undefined;
  //文本
  text: string | undefined;
  //优化的时候使用
  key: Key | undefined;
}
// ?: 代表可有可无的数据
export interface VNodeData {
  props?: Props;
  attrs?: Attrs;
  class?: Classes;
  style?: VNodeStyle;
  dataset?: Dataset;
  on?: On;
  attachData?: AttachData;
  hook?: Hooks;
  key?: Key;
  ns?: string; // for SVGs
  fn?: () => VNode; // for thunks
  args?: any[]; // for thunks
  is?: string; // for custom elements v1
  [key: string]: any; // for any other 3rd party module
}
//给vnde传递进来的参数必须要满足Vnode接口的要求
export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | DocumentFragment | Text | undefined
): VNode {
  //key 存储在data里
  const key = data === undefined ? undefined : data.key;
//vnode 函数返回一个对象，里边包含以下这些数据
  return { sel, data, children, text, elm, key };
}
 ```
## patch函数
  通过h函数创建完成vnode之后我们需要通过patch函数，把vnode转变成真实的节点，接下来我们看patch函数

  ### patch的执行过程
    1. patch(oldVode,newVode);
    2. 打补丁，把新节点中变化的内容渲染到真实rom,然后返回新节点作为下一次新旧节点的比较;
    3. 对比新旧Vnode是否相同节点，(节点的key和sel相同);
    4. 如果是相同节点，再判断新的vnode是否有text，如果有并且和旧节点的text不同，直接更新文本内容
    5. 不是相同节点，则删除之前的内容，重新渲染
    6. 如果新的vnode有children，判断子节点是否有变化，判断子节点使用的就是diff算法
    7. diff过程只进行同层级比较
   
 ### patch函数源码解析

  patch函数在 snabbdom/src/init.ts;

patch函数块执行过程+注释
```TypeScript
//init函数返回patch函数，把vnode渲染为真实dom，最后返回vnode，所以我们看以下patch函数的实现
  return function patch(
    oldVnode: VNode | Element | DocumentFragment,
    vnode: VNode
  ): VNode {
    let i: number, elm: Node, parent: Node;
    //保存新新插入节点的队列，为了触发钩子函数
    const insertedVnodeQueue: VNodeQueue = [];
    //执行模块的 pre 钩子函数
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
   //判断传进来的节点是否是真实节点
   //如果是真实节点旧调用emptyNodeAt函数把它转换为vnode
    if (isElement(api, oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode);
    } else if (isDocumentFragment(api, oldVnode)) {
      oldVnode = emptyDocumentFragmentAt(oldVnode);
    }
    //判断新旧节点是否是相同节点
    if (sameVnode(oldVnode, vnode)) {
      //是相同节点，则找节点的差异并更新dom
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      //如果新旧节点不同，创建对应的dom
      elm = oldVnode.elm!;
      parent = api.parentNode(elm) as Node; //获取节点的父节点
     //创建真实的Dom元素，并触发钩子函数
      createElm(vnode, insertedVnodeQueue);
   //如果父节点不为空
      if (parent !== null) {
        //则把创建好的vnode对应的节点插入到文档中
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
        //移除旧节点
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }
   //执行用户的insert钩子函数
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
    }
    //执行模块的post方法
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    //最终返回vnode最为一次的老节点使用
    return vnode;
  };
}


```