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

## createelm 函数

   因为我们在patch函数里，如果传入进来的节点不同则创建对应dom,在这个创建对应dom时调用了createelm函数，所以我们先来解析cretaeelm函数
      
      首先执行模块的init钩子函数
    createElm函数答题步骤总共分为三步
     1.判断传入的vnode是否是 ! 如果是! 则创建注释标签
     2.如果传入的vnode不是undefined则创建真实的Dom(不渲染)
        1.解析节点:标签名称 , id , class
        2.有没有data且有没有命名空间,如果有命名空间一般是svg,则创建svg，如果没有命名空间则创建真实的Dom
        3.执行模块的create函数
        4.给标签添加class和id.
        5.判断当前节点有没有子节点
        6.子节点如果是文本节点则创建文本节点，并添加到当前节点中
        7.子节点如果是vnode，则挨个创建真实Dom，并添加到当前节点中
        8.执行用户传入的hook,如果hook中有insert则添加到队列中，等待执行
     3.如果用户传入的是文本，则创建文本节点
     最后返回vnode.elm 用于下一步渲染

 createElm函数执行过程+源码+注释
 ```TypeScript
 function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let i: any;
    let data = vnode.data;
 
    if (data !== undefined) {
         //执行用户设置的init钩子函数
      const init = data.hook?.init;
      if (isDef(init)) {
        //判断data有没有数据
        init(vnode); 
        //如果有的话则执行钩子函数
        data = vnode.data;
        //假设用户在钩子函数里改变了vnode的data，所以我们要把执行完钩子函数之后的data,再赋值给data
      }
    }
    const children = vnode.children; //vnode的子节点
    const sel = vnode.sel; //vnode的选择器  例如:div#app
    //把vnode转换成真实dom (没有渲染到页面)
    if (sel === "!") {
      //判断选择器是否未! ,如果是!那么我们则创建注释节点
      if (isUndef(vnode.text)) { //判断dom有没有文本，如果有文本则将文本设置为空
        vnode.text = "";
      }
      vnode.elm = api.createComment(vnode.text!);
    } else if (sel !== undefined) {  //如果sel 不等于undefined 则创建真实Dom
      // Parse selector
      //解析选择器
      const hashIdx = sel.indexOf("#");
      const dotIdx = sel.indexOf(".", hashIdx);
      const hash = hashIdx > 0 ? hashIdx : sel.length;
      const dot = dotIdx > 0 ? dotIdx : sel.length;
      const tag =
        hashIdx !== -1 || dotIdx !== -1
          ? sel.slice(0, Math.min(hash, dot))
          : sel;
          //以上五行代码都是，解析标签名称，解析id，解析class
      const elm = (vnode.elm =
        isDef(data) && isDef((i = data.ns))
          ? api.createElementNS(i, tag, data)
          : api.createElement(tag, data));
          //判断有没有data，有没有命名空间，有命名空间一般是svg，如果不是则创建普通的真实Dom
      if (hash < dot) elm.setAttribute("id", sel.slice(hash + 1, dot));
      if (dotIdx > 0)
        elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
        //给标签，添加上id和class
        //执行模块中的钩子函数
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      //判断当前节点有没有子节点
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          const ch = children[i];
          if (ch != null) {
            //如果有子节点，则挨个创建子节点，并把子节点添加到当前节点中
            api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue));
          }
        }
      } else if (is.primitive(vnode.text)) {
        //如果没有子节点，则判断当前节点有没有text如果有text则把创建文本节点，并添加到当前节点中
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      const hook = vnode.data!.hook;

      //执行用户传入的hook
      if (isDef(hook)) {
        // 判断用户传入的hook有没有create ，如果有则执行
        hook.create?.(emptyNode, vnode);
        if (hook.insert) {
          //把vnode添加到队列中，为后续执行钩子做准备
          insertedVnodeQueue.push(vnode);
        }
      }
    } else if (options?.experimental?.fragments && vnode.children) { //判断有没有子节点
      const children = vnode.children;
      vnode.elm = (
        api.createDocumentFragment ?? documentFragmentIsNotSupported
      )();
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      for (i = 0; i < children.length; ++i) {
        const ch = children[i];
        if (ch != null) {
          api.appendChild(
            vnode.elm,
            createElm(ch as VNode, insertedVnodeQueue)
          );
        }
      }
    } else {
      //如果是字符串则创建文本节点
      vnode.elm = api.createTextNode(vnode.text!);
    }
    //返回创建好的真实dom
    return vnode.elm;
  }
 ```

 ### removeVnode  && addVnode
   在创建完真实节点之后我们需要移除老节点，所以我们需要removeVnode函数

    removeVnode总共分四步

    1.获取到当前节点的所有子节点
    2.判断当前子节是否为文本节点(判断sel属性)
    3.如果为文本节点则直接删除文本节点
    4.不为文本节点，执行节点的destory钩子函数，同时会执行节点的子节点的destory钩子函数
    5.创建删除的钩子函数
    6.执行模块中的remove钩子函数
    7.判断用户是否传入删除的回调函数，
    8.如果传入则执行用户删除的回调函数之后，再执行删除函数(第5步创建的那个函数)，没有传入，则直接执行钩子函数

 removeVnode函数+源码+注释

```TypeScript
  function removeVnodes(
    parentElm: Node,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number
  ): void {
    for (; startIdx <= endIdx; ++startIdx) {
      let listeners: number;
      let rm: () => void;
      const ch = vnodes[startIdx]; //获取到当前节点所有的子节点
      if (ch != null) {
        //判断当前子节点是否为空，如果为空不做任何处理
        if (isDef(ch.sel)) {
          //判断当前节点有没有sel属性，也就是标签名称

          invokeDestroyHook(ch);
          //执行destory钩子函数，(会执行所有子节点的钩子函数)
          listeners = cbs.remove.length + 1; ///防止重复删除元素
          //创建删除的回调函数
          rm = createRmCb(ch.elm!, listeners); //返回变量listeners的值以及调用删除节点的函数，只有当listeners == 0 的时候才会去删除节点
          for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);  //执行模块中的remove钩子函数
          const removeHook = ch?.data?.hook?.remove;
          if (isDef(removeHook)) {
            //执行用户传入的删除的回调函数，
            removeHook(ch, rm);
          } else {
            // 如果用户没有传入，则执行删除元素的函数
            rm();
          }
        } else {
          // Text node   
          //如果没有sel(属性)标签名称，则为文本节点则删除文本节点
          api.removeChild(parentElm, ch.elm!);
        }
      }
    }
  }


```

## PatchVnode函数
  在patch函数里，我们有一个判断是来进行比较新旧节点是否相同，如果不同则创建新节点，再移除老节点，所以我们用到了createElm函数和removeVnode函数。
  
  但是，如果节点相同，我们就需要调用patchVnode函数，来比较新旧节点的差异然后，更新Dom
  所以我们来看以下PatchVnode函数

  patchVnode函数里有大量的判断，通过text和children来判断新老节点的差异，做出了不同差异的处理

PatchVnode函数有以下几个步骤

    1.获取用户传入的hook,执行用户传入的prepatch函数。
    2.将老节点的真实Dom(elm属性)，赋值给新节点的真实Dom(elm)。
    3，执行模块的update函数，执行用户传入的update函数。
    4.判断新节点有没有text
      有text
         判断老节点有子节点，且新节点也有子节点
           如果都有 if(true)
              判断老节点的子节点不等于新节点的子节点 if (true) 执行updateChildren函数(对比子节点的差异，更新子节点)。
          else if (只有新节点有子节点) 
              1. 判断老节点有没有text，有text则设置text为空
               2.添加新节点的子节点 (addVnode函数）
          else if (只有老节点有子节点)
               删除老节点的子节点  (removeVnode函数)
          else if (老节点有text)
              设置老节点的text为空
      没有text
          1.判断老节点有没有子节点，如果有删除老节点的子节点
          2.设置新的text
    5.执行用户传入postPatch钩子函数

patchVnode函数+源码+注释


```TypeScript
 function patchVnode(
    oldVnode: VNode,
    vnode: VNode,
    insertedVnodeQueue: VNodeQueue
  ) {
    const hook = vnode.data?.hook;
    hook?.prepatch?.(oldVnode, vnode);
    //执行用户传入的prepatch钩子函数
    const elm = (vnode.elm = oldVnode.elm)!;
    //将老节点的真实DOm赋值给新节点的真实Dom然后在赋值给elm这个变量
    const oldCh = oldVnode.children as VNode[];
    //保存老节点的子节点
    const ch = vnode.children as VNode[];
    // 保存新节点的子节点
    if (oldVnode === vnode) return;  //因为老节点与新节点，都是Object，所以判断内存地址是否相同如果相同说明没有变化则直接返回
    if (vnode.data !== undefined) {
       //执行模块update函数
      for (let i = 0; i < cbs.update.length; ++i)
     
        cbs.update[i](oldVnode, vnode);
        //执行用户传入的uodate函数
      vnode.data.hook?.update?.(oldVnode, vnode);
    }
    //判断新节点有没有text
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        //判断老节点有子节点，且，新节点也有子节点，则调用updatechildren函数，对比子节点，更新差异
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        //如果只有新节点有子节点
        if (isDef(oldVnode.text)) api.setTextContent(elm, ""); //判断老节点有没有text，如果有则设置老节点的text为空
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue); //最后添加新节点，也就是新节点的子节点
      } else if (isDef(oldCh)) {
        //如果只有老节点有子节点
        //则删除老节点的子节点
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        //如果老节点有text则设置老节点的text为空
        api.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      //如果没有text
      if (isDef(oldCh)) {
        //判断老节点有没有子节点，如果有子节点则移除老节点的子节点
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      //最后更新节点的文本
      api.setTextContent(elm, vnode.text!);
    }
    //执行用户传入的posyPatch函数
    hook?.postpatch?.(oldVnode, vnode);
  }
```

### UpdateChild函数 (diff算法的核心)
  因为我们在patchVnode函数里，遇到了如果老节点有子节点，且新节点，也有子节点，所以我们需要对老节点的子节点和新节点的字节点做比较，并更新差异，所以我们用到了UpdateChidlren函数,

  updateChildren和patchVnode是一个递归调用的过程，实际上在更新Dom树的过程就是一个广度优遍历，在PtchVnode里对根节点进行判断是否有相同且是否有子节点，如果有子节点对子节点进行通过UpodateChidlren函数进行遍历子节点，比较，如果过子节点还有子节点就通过patchVnode继续进行判断

  UpdateChildren的步骤

     1.拿到新节点，和，老节点
     2.获取到，老节点，和新节点的，子节点
     3.对新老节点的字节点进行同时遍历
     4.在遍历过程中进行两个新旧子节点的比较
       遍历过程的比较
          1.开始节点比较，开始节点相同，调用PatchVnode进行比较差异，移动开始节点的下标，最后进入下一次遍历
          2.结束节点比较，如果开始节点不相同，从结束节点开始，结束节点相同，调用patchVnode比较差异，移动结束节点的索引，最后进入下一次遍历
          3.新节点的开始节点，和，老节点的结束节点进行比较，如果相同，调用patchVnode比较差异，将老节点的结束节点移动到老节点的卡死hi节点之前，移动新节点的开始节点和老节点的结束节点，移动下标，进行下一次遍历
          4.老节点的开始节点，新节点的结束节点进行比较，相同调用PatchVnode比较差异，将老节点的开始节点移动到老节点的结束节点之前，移动下标，进行下一次变量
          5.如果不满足以上四个条件则把老节点存入
          map中，键:老节点的key,值:index,
          6.开始拿着新节点key在创建的map中寻找，如果没有找到对应节点，则创建Dom，找到对应节点，则比较对应节点是否相同，相同调用PatchVnode,进行比较差异，不相同则创建真实Dom并插入到老节点的开始节点之前
          7.移动新节点的开始节点下标，进行下一次遍历
     5.如果老节点先遍历完成，新节点没有遍历完有剩余，则把剩余的节点添加到Dom树中
     6.如果新节点先遍历完成，老节点没有遍历完有剩余，则删除多余的节点
     