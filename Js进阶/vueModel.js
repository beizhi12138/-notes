
// const obj={};
// Object.defineProperty(obj,'a',{
//     value:1,  //设置对象的值
//     // configurable:false,
//     // writable:false, //该属性的值是否可以被修改,默认为false
//     // enumerable:true, //是否可以被枚举(遍历)到，默认为false
// })
// let temp;
// Object.defineProperty(obj,'c',{
//     // value   //value和get不能同时存在
//     get(){
//         //当我们在访问对象属性的时候，会在get方法里被劫持，由此监听到数据变化
//         console.log('你正在尝试访问属性');
//         //我们去obj.c 并不会真正的返回c的值，我们在当前的get函数里返回什么那么这个obj.c就是什么
//         return temp;
//     },
//     set(value){
//         console.log('你正在修改属性')
//         //当我们修改属性的值的时候，会在set方法里被劫持到
//         //set里接受一个参数，就是对象属性被赋予的新值，但是在set里我们并不能去修改当前this的值
//         //只能去将新值赋予给临时变量，然后在get里返回
//         temp=value;
//     }
// })
// obj.c='11'
// console.log(obj.c);


//那么在vue里，室友很多data的，我们去存一个数据就需要有一个临时变量吗？，所以有的defineReactive;
// defineReactive 是一个函数
// function defineReactive(data,key,val){
//    Object.defineProperty(data,key,{
//     get(){
//         console.log('你正在尝试访问')
//         return val;
//     },
//     set(value){
//         console.log('你正在尝试修改')
//         val=value;
//     }
//    })
// }
// defineReactive(obj,'a',undefined);
// console.log(obj.a);
// obj.a=10;
// console.log(obj.a)

//但是现在又产生了两个问题，
// 1. vue里边的data 是有很多数据数据的，那么看见一个数据就要调用以下defineReactive方法吗？
// 2. 如果vue里的data是一个树形结构，那么又该怎么监听树结构最终节点的值呢
// import defineReactive  from "./defineReactive";
// 为了解决第二个问题，我们需要一个observe类，来进行解决
//  observe 类是将一个object的每个层次都转换成为相应式
import observe from './observe.js'
const obj={
    a:{
        b:{
            c:5
        }
    },
    d:{},
    g:[1,[2]]
}

//然后我们需要一个observe函数来递归进行解决监听，也就是说当data是一个树形结构，我们监听完根节点后，再遍历监听他的子节点
//整个这样的一个流程就是 observe(obj) 看传进来的obj有没有__ob__,如果没有，就通过observer给他加上，然后遍历他的下一层属性
//给他的下一层属性，逐个defineReactive，(当设置某个属性值的时候，会触发set里边有newvalue，这个newvalue也得被ovserve以下)



//数组的响应式
observe(obj);
// obj.d=11

//现在呢我们在data里添加了数组，但是我们改变数组，却没有相应set?
//vue做的操作是改写数组的方法，所以我们新建一个Array.js
obj.g.push(1);
obj.g.push([1,2]);
obj.g[obj.g.length -1].push([3,6])
obj.a=1;
// console.log(obj.g)


//现在我们已经实现了对数组和树结构的响应式，所以我们现在开始依赖收集
// 在vue里边依赖收集指的是在哪里用到了数据，哪里就是依赖收集
//在get中收集依赖，在set中出发依赖，首先我们需要一个Dep来进行管理依赖，每个observe的成员都要有一个dep
//然后我们需要有一个watcher类，watcher是一个中介，数据改变时通过watcher中转通知组件
